/* ================= Đồng bộ tiến độ giữa các máy (Firebase: đăng nhập Google + Firestore) ================= */
(function(){
const A=window.App, {S,save,$,esc,toast,ago,KEY}=A;
const SY={mode:'off',user:null,status:'',last:0,err:''};
let db=null, auth=null, pushT=null, applying=false, lastPull=0;

/* ---------- gộp tiến độ: không làm mất dữ liệu của máy nào ---------- */
const maxMap=(a,b)=>{const o={...(b||{})};for(const [k,v] of Object.entries(a||{}))o[k]=Math.max(+v||0,+o[k]||0);return o};
function mergeState(L,R){
  L=L||{}; R=R||{};
  const o={...R,...L};                                   // tùy chọn (giọng, tốc độ, bài đang học) theo máy hiện tại
  o.name=L.name||R.name||'';
  o.xp=Math.max(+L.xp||0,+R.xp||0);
  if((R.last||'')>(L.last||'')){o.last=R.last;o.streak=R.streak||0}
  else if((R.last||'')===(L.last||'')){o.last=L.last||'';o.streak=Math.max(+L.streak||0,+R.streak||0)}
  else {o.last=L.last||'';o.streak=+L.streak||0}
  o.box=maxMap(L.box,R.box); o.best=maxMap(L.best,R.best); o.speak=maxMap(L.speak,R.speak);
  o.wrote={...(R.wrote||{}),...(L.wrote||{})};
  /* lịch ôn SRS: mỗi từ giữ bản được đánh giá gần nhất (lastReviewedAt mới hơn) */
  if(L.review||R.review){
    const rv={...(R.review||{})};
    for(const [h,c] of Object.entries(L.review||{})){
      const r=rv[h];
      if(!r||(c.lastReviewedAt||0)>(r.lastReviewedAt||0)||((c.lastReviewedAt||0)===(r.lastReviewedAt||0)&&(c.totalReviews||0)>=(r.totalReviews||0)))rv[h]=c;
    }
    o.review=rv;
    /* mức nhớ cũ (S.box) của từ đã được đánh giá SRS đi theo lịch ôn, không lấy mức cao nhất */
    if(A.srs)for(const [h,c] of Object.entries(rv))if((c.totalReviews||0)>0)o.box[h]=A.srs.boxFrom(c);
  }
  /* số liệu lộ trình và điểm yếu: bộ đếm lấy giá trị lớn nhất, đánh dấu thì hợp lại */
  if(L.done||R.done)o.done=maxMap(L.done,R.done);
  if(L.stats||R.stats)o.stats=maxMap(L.stats,R.stats);
  if(L.pyDone||R.pyDone)o.pyDone={...(R.pyDone||{}),...(L.pyDone||{})};
  if(L.skipSteps||R.skipSteps)o.skipSteps={...(R.skipSteps||{}),...(L.skipSteps||{})};
  o.track=L.track||R.track||'';
  o.schemaVersion=Math.max(+L.schemaVersion||1,+R.schemaVersion||1);
  if(L.srsDay||R.srsDay){const a=L.srsDay||{d:'',n:0},b=R.srsDay||{d:'',n:0};o.srsDay=a.d===b.d?{d:a.d,n:Math.max(a.n,b.n)}:(a.d>b.d?a:b)}
  if(L.sh||R.sh)o.sh={...(R.sh||{}),...(L.sh||{}),best:maxMap((L.sh||{}).best,(R.sh||{}).best)};
  const days={...(R.days||{})};
  for(const [d,v] of Object.entries(L.days||{})){
    const r=days[d]; days[d]=r?{xp:Math.max(v.xp||0,r.xp||0),min:Math.max(v.min||0,r.min||0),k0:Math.min(v.k0??Infinity,r.k0??Infinity),k:Math.max(v.k||0,r.k||0)}:{...v};
    if(!isFinite(days[d].k0))days[d].k0=days[d].k||0;
  }
  o.days=days;
  const seen=new Set(), log=[];
  for(const e of [...(R.log||[]),...(L.log||[])]){const k=e.t+'|'+e.a;if(!seen.has(k)){seen.add(k);log.push(e)}}
  o.log=log.sort((a,b)=>a.t-b.t).slice(-500);
  const se=new Set(), ex=[];
  for(const e of [...(R.exams||[]),...(L.exams||[])]){const k=[e.d,e.s,e.l,e.r].join('|');if(!se.has(k)){se.add(k);ex.push(e)}}
  o.exams=ex.slice(-30);
  delete o.oldName;
  return o;
}
A.mergeState=mergeState;

/* ---------- Firebase ---------- */
function setStatus(st,err){SY.status=st;SY.err=err||'';renderSyncUI()}
function init(){
  const cfg=window.FIREBASE_CONFIG;
  if(!cfg||!window.firebase){SY.mode='off';renderSyncUI();return}
  try{
    firebase.initializeApp(cfg);
    auth=firebase.auth(); db=firebase.firestore();
    SY.mode='on';
    auth.onAuthStateChanged(u=>{SY.user=u;if(u){pull(true)}else{setStatus('')}renderSyncUI()});
    auth.getRedirectResult().catch(e=>setStatus('error',friendly(e)));
  }catch(e){SY.mode='off';SY.err=friendly(e);renderSyncUI()}
}
function friendly(e){
  const c=(e&&e.code)||'';
  if(c.includes('popup-blocked'))return 'Trình duyệt chặn cửa sổ đăng nhập. Hãy cho phép cửa sổ bật lên (pop-up) cho trang này rồi bấm lại.';
  if(c.includes('operation-not-supported'))return 'Trình duyệt này không mở được cửa sổ đăng nhập Google. Hãy mở web bằng Safari hoặc Chrome.';
  if(c.includes('unauthorized-domain'))return 'Tên miền web chưa được cho phép trong Firebase (Authentication → Settings → Authorized domains).';
  if(c.includes('popup-closed')||c.includes('cancelled-popup'))return 'Bạn đã đóng cửa sổ đăng nhập.';
  if(c.includes('network'))return 'Không có mạng, sẽ đồng bộ lại khi có mạng.';
  if(c.includes('permission-denied'))return 'Firestore từ chối truy cập. Kiểm tra lại quy tắc bảo mật (Rules).';
  return (e&&e.message)||'Có lỗi khi đồng bộ.';
}
async function signIn(){
  if(SY.mode!=='on')return;
  const p=new firebase.auth.GoogleAuthProvider(); p.setCustomParameters({prompt:'select_account'});
  try{await auth.signInWithPopup(p)}
  catch(e){
    setStatus('error',friendly(e));
  }
}
async function signOut(){if(auth){await auth.signOut();toast('Đã đăng xuất. Tiến độ vẫn còn trên máy này.')}}
const docRef=()=>db.collection('users').doc(SY.user.uid);
async function pull(first){
  if(!SY.user)return; lastPull=Date.now(); setStatus('syncing');
  try{
    const snap=await docRef().get();
    const remote=snap.exists?snap.data().state:null;
    const merged=remote?mergeState(S,remote):mergeState(S,{});
    if(!merged.name&&SY.user.displayName)merged.name=SY.user.displayName.split(' ').slice(-1)[0];
    const changed=JSON.stringify(merged)!==JSON.stringify(S);
    applying=true; for(const k of Object.keys(S))delete S[k]; Object.assign(S,merged); save(); applying=false;
    A.renderStats();
    await push(true);
    if(changed){const h=location.hash||'#home'; if(['#home','#lichsu',''].includes(h))A.route(); if(first&&remote)toast('Đã gộp tiến độ từ máy khác')}
  }catch(e){applying=false;setStatus('error',friendly(e))}
}
async function push(now){
  if(!SY.user)return;
  clearTimeout(pushT);
  const run=async()=>{
    setStatus('syncing');
    try{
      await docRef().set({state:JSON.parse(JSON.stringify(S)),updatedAt:firebase.firestore.FieldValue.serverTimestamp(),device:(navigator.userAgentData&&navigator.userAgentData.platform)||navigator.platform||''});
      SY.last=Date.now(); setStatus('ok');
    }catch(e){setStatus('error',friendly(e))}
  };
  if(now)return run(); pushT=setTimeout(run,4000);
}
window.onAppSave=()=>{if(!applying&&SY.user)push(false)};
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible'&&SY.user&&Date.now()-lastPull>30000)pull(false)});
window.addEventListener('online',()=>{if(SY.user)pull(false)});

/* ---------- giao diện ---------- */
const CLOUD='<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17.5 19a4.5 4.5 0 0 0 .5-8.97A6 6 0 0 0 6.34 9.02 4 4 0 0 0 7 19z"/></svg>';
function chipText(){
  if(!SY.user)return `${CLOUD} Đồng bộ`;
  return `${CLOUD} ${SY.status==='syncing'?'Đang đồng bộ…':SY.status==='error'?'Lỗi đồng bộ':'Đã đồng bộ'}`;
}
function renderSyncUI(){
  let chip=$('#syncChip');
  if(SY.mode!=='on'){if(chip)chip.remove();}
  else{
    if(!chip){chip=document.createElement('button');chip.id='syncChip';chip.className='stat syncchip';chip.type='button';const s=$('.stats');if(s)s.prepend(chip);
      chip.onclick=()=>{if(!SY.user)signIn();else location.hash='lichsu'}}
    chip.innerHTML=chipText(); chip.classList.toggle('err',SY.status==='error'); chip.classList.toggle('on',!!SY.user&&SY.status!=='error');
    chip.title=SY.user?`Tài khoản ${SY.user.email||''}`:'Đăng nhập Google để đồng bộ giữa máy tính và điện thoại';
  }
  const p=$('#syncPanel'); if(p)p.innerHTML=panelInner();
  bindPanel();
}
function panelInner(){
  if(SY.mode!=='on') return `<p>Đồng bộ chưa được bật cho web này${SY.err?` (${esc(SY.err)})`:''}. Trong lúc chờ, bạn dùng file sao lưu bên dưới để chuyển tiến độ sang máy khác.</p>`;
  if(!SY.user) return `<p>Đăng nhập bằng tài khoản Google trên cả máy tính và điện thoại. Tiến độ sẽ tự gộp và cập nhật giữa các máy, không cần sao lưu thủ công.</p>
    <div class="row l"><button class="btn primary" id="syIn" type="button">${CLOUD} Đăng nhập Google để đồng bộ</button></div>${SY.err?`<p class="meta" style="color:var(--cinnabar)">${esc(SY.err)}</p>`:''}`;
  const st=SY.status==='syncing'?'Đang đồng bộ…':SY.status==='error'?`<span style="color:var(--cinnabar)">Lỗi: ${esc(SY.err)}</span>`:SY.last?`Đã đồng bộ ${ago(SY.last)}`:'Đã kết nối';
  return `<p>Đang đồng bộ với tài khoản <b>${esc(SY.user.email||SY.user.displayName||'')}</b>. ${st}.</p>
    <p class="meta">Mỗi khi bạn học xong một bài, tiến độ tự gửi lên sau vài giây. Mở web trên máy khác (đăng nhập cùng tài khoản) sẽ tự lấy về và gộp, giữ kết quả tốt nhất của mỗi từ.</p>
    <div class="row l"><button class="btn primary" id="syNow" type="button">Đồng bộ ngay</button><button class="btn" id="syOut" type="button">Đăng xuất</button></div>`;
}
function bindPanel(){
  const i=$('#syIn'); if(i)i.onclick=signIn;
  const n=$('#syNow'); if(n)n.onclick=()=>pull(false);
  const o=$('#syOut'); if(o)o.onclick=signOut;
}
A.syncPanel=()=>`<div class="gp" id="syncPanel">${panelInner()}</div>`;
A.bindSync=bindPanel;
A.SY=SY;
A.syncWipe=async()=>{if(SY.user){clearTimeout(pushT);await docRef().delete()}};

init();
/* sync.js tải sau (defer): nếu đang ở trang Lịch sử thì vẽ lại để hiện khung đồng bộ */
if((location.hash||'')==='#lichsu')A.route();
})();
