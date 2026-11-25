/* ================= core: dữ liệu, trạng thái, tiện ích, giọng nói, router ================= */
(function(){
const W = window;

/* ---------- dữ liệu ---------- */
const UNITS = W.HSK1_RAW.map((r,i)=>({
  n:i+1, t:r[0], hz:r[1],
  words:r[2].trim().split('\n').map(l=>{const [h,p,m]=l.split('|');return {h:h.trim(),p:p.trim(),m:m.trim(),U:i+1}}),
  sents:r[3].trim().split('\n').map(l=>{const [s,p,m]=l.split('|');return mkSent(s,p,m,i+1)})
}));
function mkSent(s,p,m,U){
  return {raw:s.trim(), tokens:s.replace(/[。？！，、：]/g,' ').trim().split(/\s+/), h:s.replace(/\s+/g,''), p:p.trim(), m:m.trim(), U};
}
const ALLWORDS = UNITS.flatMap(u=>u.words);
const ALLSENTS = UNITS.flatMap(u=>u.sents);

/* ---------- trạng thái ---------- */
const KEY='hanngu30-hsk-v2';
const S={xp:0,streak:0,last:'',box:{},unit:1,prev:false,rate:0.85,fmode:'hv',best:{},exams:[],speak:{},wrote:{},tab:'vocab',name:'',log:[],days:{}};
try{Object.assign(S,JSON.parse(localStorage.getItem(KEY)||'{}'))}catch(e){}
if(!UNITS[S.unit-1])S.unit=1;
function save(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){} if(W.onAppSave)W.onAppSave()}

const $=s=>document.querySelector(s);
const $$=(s,el=document)=>[...el.querySelectorAll(s)];
const box=w=>S.box[w.h]||0;
const unit=()=>UNITS[S.unit-1];
function dayStr(d){return d.toLocaleDateString('en-CA')}
/* ---------- nhật ký học: theo ngày (XP, phút, từ mới) và từng hoạt động ---------- */
const knownCount=()=>ALLWORDS.filter(w=>(S.box[w.h]||0)>=3).length;
function dayRec(){
  const d=dayStr(new Date());
  if(!S.days||typeof S.days!=='object')S.days={};
  if(!S.days[d]){const k=knownCount();S.days[d]={xp:0,min:0,k0:k,k};}
  return S.days[d];
}
function touchDay(){const r=dayRec();r.k=knownCount();return r}
function logAct(label,detail,xp){
  if(!Array.isArray(S.log))S.log=[];
  S.log.push({t:Date.now(),a:String(label).slice(0,80),d:detail?String(detail).slice(0,120):'',x:Math.round(xp||0)});
  if(S.log.length>500)S.log=S.log.slice(-500);
}
function addXP(n,label,detail){
  n=Math.round(n); if(n<=0)return;
  S.xp+=n;
  const today=dayStr(new Date()), y=new Date(); y.setDate(y.getDate()-1);
  if(S.last!==today){S.streak = S.last===dayStr(y) ? S.streak+1 : 1; S.last=today}
  const r=touchDay(); r.xp+=n;
  if(label)logAct(label,detail,n);
  save(); renderStats(); toast(`+${n} XP`);
}
/* đếm phút học: mỗi phút trang đang mở và có thao tác trong 2 phút gần nhất thì cộng 1 phút */
let lastInput=Date.now();
['pointerdown','keydown','touchstart','scroll'].forEach(ev=>W.addEventListener(ev,()=>{lastInput=Date.now()},{passive:true}));
setInterval(()=>{if(document.visibilityState==='visible'&&Date.now()-lastInput<120000){const r=touchDay();r.min++;save()}},60000);
function renderStats(){
  $('#sXp').textContent=S.xp; $('#sStreak').textContent=S.streak;
  $('#sKnown').textContent=ALLWORDS.filter(w=>box(w)>=3).length;
  const kt=$('#sKnownTotal'); if(kt)kt.textContent='/ '+ALLWORDS.length;
}
let toastT;
function toast(msg){const t=$('#toast');t.textContent=msg;t.classList.add('show');clearTimeout(toastT);toastT=setTimeout(()=>t.classList.remove('show'),1700)}

/* ---------- tiện ích ---------- */
const rand=n=>Math.floor(Math.random()*n);
function shuffle(a){for(let i=a.length-1;i>0;i--){const j=rand(i+1);[a[i],a[j]]=[a[j],a[i]]}return a}
const sample=(a,n)=>shuffle([...a]).slice(0,n);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const TONE={a:'āáǎà',e:'ēéěè',i:'īíǐì',o:'ōóǒò',u:'ūúǔù','ü':'ǖǘǚǜ',A:'ĀÁǍÀ',E:'ĒÉĚÈ',O:'ŌÓǑÒ'};
const REV={};for(const b in TONE)[...TONE[b]].forEach((c,i)=>REV[c]=[b,i+1]);
function toneOf(syl){for(const c of syl)if(REV[c])return REV[c][1];return 0}
function retone(syl,t){return [...syl].map(c=>REV[c]?TONE[REV[c][0]][t-1]:c).join('')}
function baseSyl(syl){return [...syl].map(c=>REV[c]?REV[c][0]:c).join('').toLowerCase().replace(/ü/g,'v').replace(/[^a-z]/g,'')}
const pyHTML=p=>`<span class="py">${p.split(' ').map(s=>`<span class="t${toneOf(s)}">${esc(s)}</span>`).join('')}</span>`;
const pyPlain=p=>p.replace(/ /g,'');
/* "nǐ hǎo" -> {base:"nihao", num:"ni3hao3"}; thanh nhẹ không số */
function pyKeys(p){
  const syl=p.split(' ');
  return {base:syl.map(baseSyl).join(''), num:syl.map(s=>{const b=baseSyl(s),t=toneOf(s);return b+(t||'')}).join('')};
}
function unitWords(){return UNITS.filter(u=>S.prev?u.n<=S.unit:u.n===S.unit).flatMap(u=>u.words)}
function unitSents(){return UNITS.filter(u=>S.prev?u.n<=S.unit:u.n===S.unit).flatMap(u=>u.sents)}
function distract(w,n,key,pool){
  const seen=new Set([w[key]]),out=[];
  for(const x of [...shuffle([...pool]),...shuffle([...ALLWORDS])]){if(!seen.has(x[key])){seen.add(x[key]);out.push(x)} if(out.length>=n)break}
  return out;
}
function mastery(u){return Math.round(u.words.reduce((a,w)=>a+Math.min(box(w),4),0)/(u.words.length*4)*100)}
const ICON={
  spk:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5 6 9H3v6h3l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M18.5 5.5a9 9 0 0 1 0 13"/></svg>',
  mic:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0"/><path d="M12 18v3"/></svg>',
  play:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 4.5v15l13-7.5z"/></svg>'
};

/* ---------- đọc thành tiếng (TTS) ---------- */
/* Chấm điểm giọng: ưu tiên giọng tự nhiên (Edge Natural, Google 普通话, Apple Nâng cao/Cao cấp), tránh giọng Quảng Đông và giọng "vui" của Apple */
let zhVoices=[], zhVoice=null, voicesChecked=false;
const NOVELTY=/eddy|flo|grandma|grandpa|reed|rocko|sandy|shelley|bad news|bahh|bells|boing|bubbles|cellos|jester|organ|superstar|trinoids|whisper|wobble|zarvox|albert|fred|junior|kathy|ralph/i;
function voiceScore(v){
  const n=(v.name||'')+' '+(v.voiceURI||''), l=(v.lang||'').toLowerCase().replace('_','-');
  if(/yue|zh-hk|cantonese|粤|廣東|广东/i.test(l+' '+n)) return -100;
  let s=0;
  if(l==='zh-cn'||l==='cmn-cn'||l==='cmn-hans-cn'||l.startsWith('zh-hans')) s+=50; else if(l.startsWith('zh-tw')||l.startsWith('cmn')) s+=20; else s+=10;
  if(/natural|neural/i.test(n)) s+=45;
  if(/online/i.test(n)) s+=10;
  if(/google/i.test(n)) s+=38;
  if(/premium|高品质|高级|优化/i.test(n)) s+=34;
  if(/enhanced|增强/i.test(n)) s+=28;
  if(/xiaoxiao|xiaoyi|yunxi|yunjian|xiaochen|xiaohan/i.test(n)) s+=6;
  if(/tingting|婷婷|yu-shu|语舒/i.test(n)) s+=4;
  if(/lili|莉莉/i.test(n)) s+=20;           // Lili chỉ có bản Cao cấp/Nâng cao
  if(/compact/i.test(n)) s-=8;             // bản rút gọn của Apple
  if(NOVELTY.test(n)) s-=40;
  if(v.localService===false) s+=3;
  return s;
}
function voiceTag(v){
  const s=voiceScore(v);
  const tw=/^(zh-tw|cmn-hant)/i.test((v.lang||'').replace('_','-'))?' · giọng Đài Loan':'';
  return (s>=85?'rất tự nhiên':s>=75?'tự nhiên':s>=50?'bình thường':'máy móc')+tw;
}
function loadVoices(){
  if(!('speechSynthesis' in W))return;
  const v=speechSynthesis.getVoices(); if(!v.length)return;
  voicesChecked=true;
  zhVoices=v.filter(x=>/^(zh|cmn)/i.test(x.lang)&&voiceScore(x)>-100).sort((a,b)=>voiceScore(b)-voiceScore(a));
  const picked=S.voice&&zhVoices.find(x=>x.voiceURI===S.voice);
  zhVoice=picked||zhVoices[0]||null;
  refreshPicker();
}
if('speechSynthesis' in W){loadVoices();speechSynthesis.onvoiceschanged=loadVoices;setTimeout(loadVoices,800)}
function speak(text,slow,btn,onb){
  return new Promise(res=>{
    if(!('speechSynthesis' in W)){toast('Trình duyệt này không hỗ trợ đọc thành tiếng');return res()}
    speechSynthesis.cancel();
    const u=new SpeechSynthesisUtterance(String(text).replace(/\s+/g,''));
    u.lang=zhVoice?zhVoice.lang:'zh-CN'; if(zhVoice)u.voice=zhVoice;
    u.rate=typeof slow==="number"?slow:slow?0.55:S.rate;
    let done=false; const fin=()=>{if(done)return;done=true;if(btn)btn.classList.remove('playing');res()};
    if(btn)btn.classList.add('playing');
    u.onend=fin; u.onerror=fin; if(onb)u.onboundary=e=>{try{onb(e.charIndex)}catch(x){}};
    setTimeout(fin, 1500+String(text).length*600/(u.rate||1)); // phòng khi trình duyệt không báo onend
    speechSynthesis.speak(u);
  });
}
/* gợi ý giọng hay hơn, tùy máy và trình duyệt */
const UA=navigator.userAgent;
const IS_IOS=/iPad|iPhone|iPod/.test(UA)||(/Macintosh/.test(UA)&&navigator.maxTouchPoints>1);
const IS_MAC=/Macintosh/.test(UA)&&!IS_IOS;
const IS_SAFARI=/Safari/.test(UA)&&!/Chrome|Chromium|CriOS|FxiOS|Edg|OPR|coc_coc|Firefox/i.test(UA);
const VOICE_TIP=IS_MAC&&IS_SAFARI
  ? `<b>Safari trên Mac không cho web dùng giọng Lili hay Tingting (Nâng cao)</b>, kể cả khi máy đã tải, nên chỉ có vài giọng mặc định. Muốn giọng hay hơn, hãy mở web bằng <b>Chrome</b> hoặc <b>Cốc Cốc</b> (web tự chọn Lili), rồi bấm <b>Đồng bộ</b> để giữ chung tiến độ.`
  : IS_IOS
  ? `Muốn giọng hay hơn trên iPhone/iPad: Cài đặt → Trợ năng → Nội dung được đọc → Giọng nói → Tiếng Trung (Trung Quốc đại lục) → tải <b>Lili (Cao cấp)</b> hoặc <b>Tingting (Nâng cao)</b>, rồi vuốt tắt hẳn trình duyệt và mở lại web.`
  : IS_MAC
  ? `Muốn giọng hay hơn: Cài đặt hệ thống → Trợ năng → Nội dung được đọc → Giọng hệ thống → Quản lý giọng → Tiếng Trung (Trung Quốc đại lục) → tải <b>Lili (Cao cấp)</b> hoặc <b>Tingting (Nâng cao)</b>. Sau đó thoát hẳn trình duyệt (⌘ Command + Q) rồi mở lại web.`
  : `Muốn giọng hay hơn: mở web bằng <b>Microsoft Edge</b> (giọng Xiaoxiao tự nhiên nhất) hoặc <b>Chrome</b> (giọng Google 普通话).`;
function voiceWarn(){
  if(!('speechSynthesis' in W)) return `<div class="note warn">Trình duyệt này không hỗ trợ đọc thành tiếng. Hãy dùng Chrome, Edge hoặc Safari bản mới.</div>`;
  if(voicesChecked&&!zhVoice) return `<div class="note warn">Máy bạn chưa có giọng đọc tiếng Trung nên âm thanh có thể sai. ${VOICE_TIP} Trên Windows: Cài đặt → Thời gian và ngôn ngữ → Giọng nói → thêm giọng tiếng Trung.</div>`;
  return '';
}
/* ô chọn giọng dùng chung */
function pickerOptions(){
  const best=zhVoices[0];
  return `<option value="">Tự động${best?` · ${esc(best.name)}`:''}</option>`+zhVoices.map(v=>`<option value="${esc(v.voiceURI)}" ${S.voice===v.voiceURI?'selected':''}>${esc(v.name)} (${esc(v.lang)}) · ${voiceTag(v)}</option>`).join('');
}
function pickerNote(){
  if(!('speechSynthesis' in W)) return 'Trình duyệt này không hỗ trợ đọc thành tiếng.';
  if(!voicesChecked) return 'Đang tìm giọng đọc trên máy…';
  if(!zhVoice) return 'Chưa có giọng tiếng Trung. '+VOICE_TIP;
  const s=voiceScore(zhVoice);
  return `Đang dùng: <b>${esc(zhVoice.name)}</b> · ${voiceTag(zhVoice)}. Máy có ${zhVoices.length} giọng tiếng Trung.`+(s<75?' '+VOICE_TIP:'');
}
function voicePicker(){
  return `<div class="voicepick"><div class="ctrl" style="margin-bottom:6px"><label for="vsel">Giọng đọc</label><select id="vsel">${pickerOptions()}</select>
    <button class="btn sm" id="vtest" type="button">${ICON.spk} Nghe thử</button></div><p class="meta" id="vnote" style="margin:0 0 14px">${pickerNote()}</p></div>`;
}
function bindPicker(){
  const s=$('#vsel'), t=$('#vtest'); if(!s)return;
  s.onchange=()=>{S.voice=s.value||'';save();zhVoice=(S.voice&&zhVoices.find(x=>x.voiceURI===S.voice))||zhVoices[0]||null;$('#vnote').innerHTML=pickerNote();speak('你好，我在学习汉语。',false,t)};
  t.onclick=()=>speak('你好，我在学习汉语。',false,t);
}
function refreshPicker(){
  const s=$('#vsel'); if(!s)return; s.innerHTML=pickerOptions(); const n=$('#vnote'); if(n)n.innerHTML=pickerNote();
}

/* ---------- nhận dạng giọng nói ---------- */
const SR = W.SpeechRecognition||W.webkitSpeechRecognition;
let activeRec=null;
function listen(){
  return new Promise((res,rej)=>{
    if(!SR) return rej(new Error('unsupported'));
    if(activeRec){try{activeRec.abort()}catch(e){}}
    if('speechSynthesis' in W)speechSynthesis.cancel();
    const r=new SR(); activeRec=r;
    r.lang='zh-CN'; r.interimResults=false; r.maxAlternatives=5; r.continuous=false;
    let got=false;
    r.onresult=e=>{got=true;const alts=[];for(const a of e.results[0])alts.push(a.transcript);res(alts)};
    r.onerror=e=>{got=true;rej(new Error(e.error||'error'))};
    r.onend=()=>{activeRec=null;if(!got)res([])};
    try{r.start()}catch(e){rej(e)}
  });
}
function stopListen(){if(activeRec){try{activeRec.stop()}catch(e){}}}
const strip=s=>String(s).replace(/[\s，。？！、：,.?!:；;“”"'…·]/g,'');
/* so khớp từng chữ theo dãy con chung dài nhất */
function scoreSpeech(target,heard){
  const a=[...strip(target)], b=[...strip(heard)];
  const n=a.length,m=b.length, dp=Array.from({length:n+1},()=>new Array(m+1).fill(0));
  for(let i=1;i<=n;i++)for(let j=1;j<=m;j++)dp[i][j]=a[i-1]===b[j-1]?dp[i-1][j-1]+1:Math.max(dp[i-1][j],dp[i][j-1]);
  const ma=new Array(n).fill(false), mb=new Array(m).fill(false);
  for(let i=n,j=m;i>0&&j>0;){if(a[i-1]===b[j-1]){ma[i-1]=mb[j-1]=true;i--;j--}else if(dp[i-1][j]>=dp[i][j-1])i--;else j--}
  const l=dp[n][m], score=n?Math.round(l/Math.max(n,m)*100):0;
  return {score,ma,mb,a,b};
}
function bestMatch(target,alts){
  let best={score:0,ma:[...strip(target)].map(()=>false),mb:[],a:[...strip(target)],b:[],text:''};
  for(const t of alts){const r=scoreSpeech(target,t);if(r.score>best.score||!best.text){best={...r,text:t}}}
  return best;
}
const markHTML=(chars,marks)=>chars.map((c,i)=>`<span class="${marks[i]?'m':'x'}">${esc(c)}</span>`).join('');
function recogWarn(){
  return SR?'':`<div class="note warn">Trình duyệt này chưa hỗ trợ nhận dạng giọng nói. Hãy mở web bằng Google Chrome hoặc Microsoft Edge trên máy tính hay Android, hoặc Safari trên iPhone, và cho phép dùng micro.</div>`;
}

/* ---------- vòng đời màn hình ---------- */
let keyHandler=null, raf=0, timers=[], cleanups=[];
function cleanup(){
  cancelAnimationFrame(raf); timers.forEach(t=>{clearInterval(t);clearTimeout(t)}); timers=[]; keyHandler=null;
  cleanups.splice(0).forEach(f=>{try{f()}catch(e){}});
}
document.addEventListener('keydown',e=>{if(e.target.matches('input,textarea,select'))return; if(keyHandler)keyHandler(e)});

/* MAIN: nơi các trò chơi/bài tập vẽ vào */
let MAIN=null;
const main=()=>MAIN;
function setMain(el){MAIN=el}

/* ---------- kết quả ---------- */
function showResult({title,score,correct,total,xp,replay,back,backLabel,bestKey,extra}){
  cleanup();
  const r=total?correct/total:0;
  const [g,gl]=r>=.9?['优','Xuất sắc']:r>=.7?['良','Khá tốt']:r>=.5?['中','Đạt']:['加油','Cố lên nhé'];
  let best='';
  if(bestKey&&score!=null){const old=S.best[bestKey]||0;if(score>old){S.best[bestKey]=score;best=old?'Kỷ lục mới!':''}}
  addXP(xp,title,`Bài ${S.unit} · đúng ${correct}/${total}${score!=null?" · "+score+" điểm":""}`);
  MAIN.innerHTML=`<div class="result">
    <div class="seal ${g.length>1?'long':''}">${g}</div><h2>${title}</h2><p class="gloss">${g} · ${gl} ${best?'· '+best:''}</p>
    <div class="rstats"><div><b>${correct}/${total}</b><small>đúng</small></div>${score!=null?`<div><b>${score}</b><small>điểm</small></div>`:''}<div><b>+${Math.round(xp)}</b><small>XP</small></div></div>
    ${extra||''}
    <div class="row"><button class="btn primary" id="again">Làm lại</button><button class="btn" id="tomenu">${backLabel||'Quay lại'}</button></div></div>`;
  $('#again').onclick=replay; $('#tomenu').onclick=back;
  MAIN.scrollIntoView({block:'nearest'});
}

/* ---------- trắc nghiệm dùng chung ---------- */
function runMC(cfg){
  cleanup();
  const R=cfg.rounds; let i=0,score=0,correct=0,combo=0,lives=cfg.lives||0,locked=false,answered=0;
  if(!R.length){MAIN.innerHTML='<p class="note">Chưa đủ dữ liệu cho bài này.</p>';return}
  const stats=()=>`<span>Câu <b>${Math.min(i+1,R.length)}</b>/${R.length}</span><span>Điểm <b>${score}</b></span>${combo>1?`<span class="combo">x${combo} combo</span>`:''}${cfg.lives?`<span class="hearts">${'♥'.repeat(Math.max(0,lives))}<span class="off">${'♥'.repeat(cfg.lives-Math.max(0,lives))}</span></span>`:''}`;
  function show(){
    cleanup(); locked=false; const r=R[i];
    MAIN.innerHTML=`<div class="play">
      <div class="phead"><button class="back" id="pback">← Thoát</button><div class="ptitle">${cfg.title}</div><div class="pstats" id="pstats">${stats()}</div></div>
      ${cfg.timed?'<div class="timer"><i id="tbar"></i></div>':''}
      <div class="prompt">${r.prompt}</div>
      <div class="opts ${r.cols||''}">${r.options.map((o,k)=>`<button class="opt" data-k="${k}"><kbd>${k+1}</kbd><span>${o.html}</span></button>`).join('')}</div>
      <div class="fb" id="fb"></div></div>`;
    $('#pback').onclick=cfg.back;
    $$('.opt',MAIN).forEach(b=>b.onclick=()=>pick(+b.dataset.k));
    keyHandler=e=>{const n=parseInt(e.key,10);if(!locked&&n>=1&&n<=r.options.length)pick(n-1);else if(locked&&e.key==='Enter')next()};
    if(r.onShow)r.onShow();
    if(cfg.timed){
      const t0=performance.now(),dur=cfg.timed*1000,bar=$('#tbar'); r._t0=t0;
      const tick=now=>{const f=Math.max(0,1-(now-t0)/dur);bar.style.transform=`scaleX(${f})`;bar.classList.toggle('low',f<.3);
        if(f<=0)pick(-1);else raf=requestAnimationFrame(tick)};
      raf=requestAnimationFrame(tick);
    }
  }
  function pick(k){
    if(locked)return; locked=true; cancelAnimationFrame(raf); answered++;
    const r=R[i], ok=k>=0&&r.options[k].ok;
    $$('.opt',MAIN).forEach((b,j)=>{b.disabled=true;if(r.options[j].ok)b.classList.add('ok');else if(j===k)b.classList.add('bad')});
    if(ok){combo++;correct++;let g=10+Math.min(combo-1,5)*2;
      if(cfg.timed)g+=Math.round(Math.max(0,1-(performance.now()-r._t0)/(cfg.timed*1000))*10);
      score+=g; if(r.word)S.box[r.word.h]=Math.min(5,box(r.word)+ (box(r.word)<2?1:0));}
    else{combo=0;if(cfg.lives)lives--;$('.prompt').classList.add('shake'); if(r.word){S.box[r.word.h]=Math.max(0,box(r.word)-1); if(W.App.srs)W.App.srs.flag(r.word.h)}}
    save();
    $('#pstats').innerHTML=stats();
    const over=cfg.lives&&lives<=0;
    $('#fb').innerHTML=`<div class="msg">${ok?'<b class="ok">Chính xác!</b>':k<0?'<b class="bad">Hết giờ!</b>':'<b class="bad">Chưa đúng.</b>'} ${r.reveal||''}</div>
      <button class="btn primary" id="pnext">${over||i===R.length-1?'Xem kết quả':'Tiếp tục'} <kbd>↵</kbd></button>`;
    $('#pnext').onclick=next; $('#pnext').focus({preventScroll:true});
    if(r.after)r.after(ok);
  }
  function next(){
    i++;
    if(i>=R.length||(cfg.lives&&lives<=0))
      showResult({title:cfg.title,score,correct,total:answered,xp:score/4+3,replay:cfg.replay,back:cfg.back,backLabel:cfg.backLabel||'Chọn bài khác',bestKey:cfg.key?cfg.key+'-'+S.unit:null});
    else show();
  }
  show();
}

/* ---------- menu thẻ ---------- */
function menu(el,list,intro){
  el.innerHTML=`${intro||''}<div class="gmenu">${list.map(g=>`<button class="gcard" data-k="${g.k}"><span class="ghz">${g.hz}</span><b>${g.name}</b><small>${g.d}</small>${g.k&&!g.nobest?`<em>Kỷ lục bài ${S.unit}: ${S.best[g.k+'-'+S.unit]||'chưa có'}</em>`:''}</button>`).join('')}</div>`;
  $$('.gcard',el).forEach(b=>b.onclick=()=>list.find(g=>g.k===b.dataset.k).run());
}
const listenBtns=()=>`<div class="listenbtns"><button class="lbtn" id="play" aria-label="Nghe">${ICON.spk}</button><button class="lbtn slow" id="slow" aria-label="Nghe chậm">Chậm</button></div>`;
function bindListen(text,auto=true){
  const p=$('#play'),s=$('#slow');
  p.onclick=()=>speak(text,false,p); s.onclick=()=>speak(text,true,s);
  if(auto)timers.push(setTimeout(()=>speak(text,false,p),250));
}
function unitSelect(onChange){
  return {html:`<label class="unitpick">Bài <select id="usel">${UNITS.map(u=>`<option value="${u.n}" ${u.n===S.unit?'selected':''}>${u.n}. ${esc(u.t)}</option>`).join('')}</select>
    <span><input type="checkbox" id="uprev" ${S.prev?'checked':''} ${S.unit===1?'disabled':''}> Gộp các bài trước</span></label>`,
    bind(){const s=$('#usel');if(s)s.onchange=()=>{S.unit=+s.value;save();onChange()};const p=$('#uprev');if(p)p.onchange=()=>{S.prev=p.checked;save();onChange()}}};
}

/* ---------- router ---------- */
const ROUTES={}, NAV=[
  ['home','Trang chủ'],['hoc','Học từ vựng'],['mua','Mưa từ vựng'],['viet','Luyện viết'],['pinyin','Pinyin'],
  ['noi','Luyện nói'],['shadow','Shadowing'],['hoithoai','Hội thoại'],['nguphap','Ngữ pháp'],['bothu','Bộ thủ'],['thi','Kiểm tra'],['lichsu','Lịch sử']];
function register(name,fn){ROUTES[name]=fn}
function route(){
  cleanup(); stopListen(); if('speechSynthesis' in W)speechSynthesis.cancel();
  let name=(location.hash||'#home').slice(1); if(!ROUTES[name])name='home';
  $$('#nav a').forEach(a=>a.classList.toggle('on',a.dataset.r===name));
  const on=$(`#nav a[data-r="${name}"]`); if(on)on.scrollIntoView({block:'nearest',inline:'nearest'});
  const root=$('#root'); root.innerHTML=''; MAIN=root;
  ROUTES[name](root);
  window.scrollTo(0,0);
}
function start(){
  $('#nav').innerHTML=NAV.map(([r,l])=>`<a href="#${r}" data-r="${r}">${l}</a>`).join('');
  renderStats();
  W.addEventListener('hashchange',route);
  route();
}

/* ---------- trang chủ ---------- */
const MODS=[
  ['hoc','学','Học từ vựng cấp 1',`${ALLWORDS.length} từ chia ${UNITS.length} bài: thẻ từ, flashcard, 3 game và 3 bài luyện nghe.`],
  ['mua','雨','Mưa từ vựng','Nghĩa tiếng Việt hoặc âm thanh rơi xuống, gõ pinyin để bắn hạ. Có đấu trùm.','Mới'],
  ['viet','写','Luyện viết chữ Hán','Xem thứ tự nét và tự viết trên ô Mễ tự cách, báo nét sai.'],
  ['pinyin','拼','Lộ trình Pinyin','Thanh điệu, thanh mẫu, vận mẫu có âm thanh và bài luyện nghe.'],
  ['noi','说','Luyện nói','Đọc to câu mẫu, máy nhận dạng giọng và chấm điểm từng chữ.'],
  ['shadow','跟','Shadowing','Nghe từng câu rồi nói đuổi theo ngay, có ngắt chờ, lặp câu, nghe chay và chấm điểm.','Mới'],
  ['hoithoai','话','Hội thoại','10 hội thoại theo tình huống, nghe từng câu và đóng vai.'],
  ['nguphap','语','Lượng từ & ngữ pháp','16 điểm ngữ pháp HSK 1, 20 lượng từ thông dụng, kèm bài tập.'],
  ['bothu','部','214 bộ thủ','Tra bộ thủ theo số nét, xem ví dụ trong từ HSK và chơi đoán nghĩa.'],
  ['thi','考','Kiểm tra tổng hợp cấp 1','Đề luyện tập nội bộ 40 câu nghe và đọc theo danh sách GF0025-2021, bấm giờ, chấm điểm, xem lại câu sai.'],
  ['lichsu','历','Lịch sử học','Lịch các ngày đã học, số phút, XP, từ mới mỗi ngày và nhật ký từng bài. Sao lưu tiến độ sang máy khác.'],
];
function ago(t){
  const m=Math.round((Date.now()-t)/60000);
  if(m<1)return 'vừa xong'; if(m<60)return m+' phút trước';
  const h=Math.round(m/60); if(h<24)return h+' giờ trước';
  const d=Math.round(h/24); return d===1?'hôm qua':d+' ngày trước';
}
function helloBlock(){
  if(!S.name) return `<form class="namebox" id="nameform"><label for="nm">Bạn tên là gì? Web sẽ chào bạn và lưu lịch sử học trên máy này.</label>
    <div><input id="nm" maxlength="30" placeholder="Ví dụ: Thu Trang" autocomplete="given-name" value="${esc(S.oldName||'')}"><button class="btn primary sm" type="submit">Lưu tên</button></div></form>`;
  const h=new Date().getHours(), hi=h<11?'Chào buổi sáng':h<14?'Chào buổi trưa':h<18?'Chào buổi chiều':'Chào buổi tối';
  const r=(S.days||{})[dayStr(new Date())], y=new Date(); y.setDate(y.getDate()-1);
  let line;
  if(r&&r.xp>0) line=`Hôm nay bạn đã học ${r.min||0} phút, được ${r.xp} XP${r.k-r.k0>0?` và thuộc thêm ${r.k-r.k0} từ`:''}.`;
  else if(S.streak>0&&S.last===dayStr(y)) line=`Học một chút hôm nay để giữ chuỗi ${S.streak} ngày nhé!`;
  else line='Hôm nay mình học gì nào?';
  const last=(S.log||[]).slice(-1)[0];
  return `<div class="hello"><p class="hi">${hi}, <b>${esc(S.name)}</b>! <button class="linkbtn" id="rename" type="button">Đổi tên</button></p>
    <p class="hl">${line}${last?` Lần trước: ${esc(last.a)} · ${ago(last.t)}. <a href="#lichsu">Xem lịch sử</a>`:''}</p></div>`;
}
function bindHello(root){
  const f=$('#nameform');
  if(f){f.onsubmit=e=>{e.preventDefault();const v=$('#nm').value.trim().slice(0,30);if(!v){$('#nm').focus();return}S.name=v;delete S.oldName;save();toast(`Chào ${v}!`);route()}}
  const rn=$('#rename'); if(rn)rn.onclick=()=>{S.oldName=S.name;S.name='';save();route();const i=$('#nm');if(i){i.focus();i.select()}};
}
/* thông tin chương trình học hiện tại (số liệu lấy từ curriculum.js, tính từ dữ liệu) */
function curBlock(){
  const C=W.App&&W.App.CURRICULUM; if(!C)return '';
  const v=C.version, s=C.stats(), R=C.REFERENCE;
  return `<section class="curcard" aria-labelledby="curttl">
    <div class="curmain"><p class="eyebrow" id="curttl">Chương trình học hiện tại</p>
      <h2>${esc(v.name)}</h2>
      <p class="curgoal">${esc(v.goal)}.</p>
      <ul class="curfacts">
        <li><b>${s.total}</b><span>thẻ học</span></li>
        <li><b>${s.matched}</b><span>khớp danh sách tham chiếu</span></li>
        <li><b>${s.supplementary}</b><span>mục bổ sung</span></li>
        <li><b>${s.units}</b><span>bài học</span></li>
      </ul></div>
    <details class="curmore"><summary>Nguồn và cách đối chiếu</summary>
      <p>${esc(v.note)}</p>
      <p>Đối chiếu ngày ${esc(R.checkedAt.split('-').reverse().join('/'))} với bộ dữ liệu <a href="${R.url}" target="_blank" rel="noopener">${esc(R.name)}</a> (${R.refTotal||R.words.length} mục, bản số hóa của bên thứ ba, không phải văn bản gốc của tiêu chuẩn): ${s.matched}/${s.total} thẻ có trong danh sách, ${s.duplicates} thẻ trùng, ${s.refMissing} mục của danh sách chưa có trên web.</p>
      <p>${s.pinyinNoted} từ được ghi pinyin theo cách đọc thực tế (biến điệu của 一, 不 và khinh thanh), khác cách ghi thanh gốc của bộ tham chiếu. Nghĩa tiếng Việt, câu mẫu và bài luyện do web biên soạn để tự học.</p>
    </details>
  </section>`;
}
register('home',root=>{
  const w=ALLWORDS[Math.floor(Date.now()/864e5)%ALLWORDS.length];
  const u=unit(), known=ALLWORDS.filter(x=>box(x)>=3).length;
  const ART=W.ART||{};
  root.innerHTML=`<section class="hero2">
    <div class="water" aria-hidden="true">你</div>
    <div class="lanterns">${ART.LANTERNS||''}</div>
    <div class="coins">${ART.COINS||''}</div>
    <div class="hero-txt">
      ${helloBlock()}
      <h1 class="display">Hán Ngữ<br>3.0</h1>
      <p class="sub">Nói được tiếng Trung với <span class="pill"><i></i>${ALLWORDS.length} từ</span></p>
      <div class="cta"><a class="btn primary bigbtn" href="#hoc">${known?`Học tiếp bài ${u.n}`:'Bắt đầu học'}</a>
        <p class="cta-note">Học miễn phí theo danh sách từ HSK 3.0 – GF0025-2021, không cần đăng ký tài khoản.</p></div>
      <div class="hstats">
        <div><small>Chưa thuộc</small><span class="old">${ALLWORDS.length-known} từ</span></div>
        <span class="badge">${Math.round(known/ALLWORDS.length*100)}%</span>
        <div><small>Đã nhớ</small><span class="now">${known} từ</span></div>
      </div>
    </div>
    <div class="hero-art">${ART.PANDA||''}</div>
  </section>
  ${curBlock()}
  <div class="home-row">
    <div class="hcard wod"><p class="eyebrow">Từ của hôm nay</p>${pic(w.h,56)}<div class="big">${w.h}</div>${pyHTML(w.p)}<div>${esc(w.m)}</div>
      <button class="btn sm" id="wsay" style="margin-top:8px">${ICON.spk} Nghe phát âm</button></div>
    <div><h2 class="eyebrow">Tất cả chuyên mục</h2>
    <div class="mods">${MODS.map(m=>`<a class="mod" href="#${m[0]}"><span class="ghz">${m[1]}</span><b>${m[2]}</b><small>${m[3]}</small>${m[4]?`<span class="tag">${m[4]}</span>`:''}</a>`).join('')}</div></div>
  </div>`;
  $('#wsay').onclick=e=>speak(w.h,false,e.currentTarget);
  bindHello(root);
});

/* ---------- hình minh họa (emoji hiển thị bằng Twemoji, lỗi mạng thì hiện emoji của máy) ---------- */
const EMOJI={}; (W.EMOJI_RAW||'').trim().split('\n').forEach(l=>{const [h,...e]=l.trim().split(/\s+/);if(h)EMOJI[h]=e.filter(Boolean)});
function twCode(e){const cps=[...e].map(c=>c.codePointAt(0).toString(16));return e.includes('‍')?cps.join('-'):cps.filter(c=>c!=='fe0f').join('-')}
function pic(h,size=64){
  const e=EMOJI[h]; if(!e||!e.length)return '';
  return `<span class="pic" style="--ps:${size}px" aria-hidden="true">${e.map(x=>`<img src="https://cdn.jsdelivr.net/gh/jdecked/twemoji@15.1.0/assets/svg/${twCode(x)}.svg" alt="${x}" loading="lazy" draggable="false" onerror="this.replaceWith(document.createTextNode(this.alt))">`).join('')}</span>`;
}

W.App={UNITS,EMOJI,pic,dayStr,knownCount,ago,logAct,KEY,route:()=>route(),ALLWORDS,ALLSENTS,S,save,$,$$,box,unit,addXP,renderStats,toast,rand,shuffle,sample,esc,toneOf,retone,baseSyl,pyHTML,pyPlain,pyKeys,
  unitWords,unitSents,distract,mastery,ICON,speak,voiceWarn,voicePicker,bindPicker,listen,stopListen,SR,scoreSpeech,bestMatch,markHTML,recogWarn,strip,
  cleanup,setKey:f=>keyHandler=f,addTimer:t=>timers.push(t),setRaf:r=>raf=r,onCleanup:f=>cleanups.push(f),
  main,setMain,showResult,runMC,menu,listenBtns,bindListen,unitSelect,register,start,mkSent};
})();
