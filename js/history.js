/* ================= Lịch sử học · Sao lưu & khôi phục ================= */
(function(){
const A=window.App, {S,save,$,$$,esc,dayStr,knownCount,ago,ALLWORDS,KEY}=A;

A.register('lichsu',root=>{
  A.setMain(root);
  let msg=''; try{const r=sessionStorage.getItem('hn30-restored');if(r){sessionStorage.removeItem('hn30-restored');msg=`<div class="note" style="border-color:var(--ok);background:var(--ok-soft)">Đã khôi phục tiến độ${r!=='1'?` của ${esc(r)}`:''} từ file sao lưu.</div>`}}catch(e){}
  histView(root,msg);
});

function weekStart(d){const x=new Date(d);const wd=(x.getDay()+6)%7;x.setDate(x.getDate()-wd);x.setHours(0,0,0,0);return x}
function sumDays(from,to){
  let xp=0,min=0,words=0,days=0;
  for(const [k,r] of Object.entries(S.days||{})){const d=new Date(k+'T00:00:00');if(d>=from&&d<=to){xp+=r.xp||0;min+=r.min||0;words+=Math.max(0,(r.k||0)-(r.k0||0));if((r.xp||0)>0||(r.min||0)>0)days++}}
  return {xp,min,words,days};
}
function level(r){const x=r?(r.xp||0):0;return x<=0?0:x<20?1:x<50?2:x<100?3:4}

function heatmap(){
  const WEEKS=20, today=new Date(); today.setHours(0,0,0,0);
  const start=weekStart(today); start.setDate(start.getDate()-(WEEKS-1)*7);
  const cells=[], months=[]; let lastM=-1;
  for(let w=0;w<WEEKS;w++){
    const col=[];
    for(let d=0;d<7;d++){
      const day=new Date(start); day.setDate(start.getDate()+w*7+d);
      if(d===0&&day.getMonth()!==lastM){months.push({w,label:'Th'+(day.getMonth()+1)});lastM=day.getMonth()}
      const k=dayStr(day), r=(S.days||{})[k], future=day>today;
      col.push(future?'<i class="hm-cell fut"></i>':`<i class="hm-cell l${level(r)}" title="${day.toLocaleDateString('vi-VN')}: ${r?`${r.xp||0} XP · ${r.min||0} phút`:'chưa học'}"></i>`);
    }
    cells.push(`<div class="hm-col">${col.join('')}</div>`);
  }
  return `<div class="hm-wrap"><div class="hm-months" style="--weeks:${WEEKS}">${months.map(m=>`<span style="grid-column:${m.w+1}">${m.label}</span>`).join('')}</div>
    <div class="hm"><div class="hm-days"><span>T2</span><span></span><span>T4</span><span></span><span>T6</span><span></span><span>CN</span></div>${cells.join('')}</div>
    <div class="hm-legend">Ít <i class="hm-cell l0"></i><i class="hm-cell l1"></i><i class="hm-cell l2"></i><i class="hm-cell l3"></i><i class="hm-cell l4"></i> Nhiều</div></div>`;
}

function logList(){
  const log=(S.log||[]).slice().reverse().slice(0,60);
  if(!log.length) return `<p class="note">Chưa có hoạt động nào. Học flashcard, chơi game hoặc làm bài nghe, mỗi lần hoàn thành sẽ được ghi vào đây.</p>`;
  let html='', cur='';
  for(const e of log){
    const d=new Date(e.t), k=d.toLocaleDateString('vi-VN',{weekday:'long',day:'numeric',month:'numeric',year:'numeric'});
    if(k!==cur){if(cur)html+='</div>';html+=`<h4 class="lg-day">${k}</h4><div class="slist">`;cur=k}
    html+=`<div class="srow lg-row"><span class="lg-time">${d.toLocaleTimeString('vi-VN',{hour:'2-digit',minute:'2-digit'})}</span><span><b>${esc(e.a)}</b>${e.d?`<br><span class="sp">${esc(e.d)}</span>`:''}</span><span class="lg-xp">+${e.x} XP</span></div>`;
  }
  return html+'</div>';
}

function histView(root,msg){
  const today=new Date(); today.setHours(0,0,0,0);
  const wk=sumDays(weekStart(today),new Date()), all=sumDays(new Date(0),new Date());
  const tr=(S.days||{})[dayStr(new Date())]||{xp:0,min:0,k:0,k0:0};
  root.innerHTML=`<h2 class="sect">Lịch sử học${S.name?` của ${esc(S.name)}`:''}</h2>
  <p class="lead">Mọi hoạt động được lưu tự động trên trình duyệt này. Muốn chuyển sang máy khác hoặc giữ phòng khi mất dữ liệu, hãy tải file sao lưu ở cuối trang.</p>
  ${msg||''}
  <div class="kpis">
    <div class="kpi"><small>Hôm nay</small><b>${tr.min||0}<em> phút</em></b><span>${tr.xp||0} XP · ${Math.max(0,(tr.k||0)-(tr.k0||0))} từ mới</span></div>
    <div class="kpi"><small>Tuần này</small><b>${wk.min}<em> phút</em></b><span>${wk.xp} XP · ${wk.words} từ mới · ${wk.days}/7 ngày</span></div>
    <div class="kpi"><small>Chuỗi ngày học</small><b>${S.streak}<em> ngày</em></b><span>Tổng ${all.days} ngày đã học</span></div>
    <div class="kpi"><small>Nhớ dài hạn</small><b>${knownCount()}<em> / ${ALLWORDS.length} từ</em></b><span>Tổng ${S.xp} XP · ${all.min} phút</span></div>
  </div>
  <div class="sec"><h3>Lịch học 20 tuần gần đây</h3>${heatmap()}</div>
  <div class="sec"><h3>Nhật ký hoạt động</h3>${logList()}</div>
  <div class="sec"><h3>Đồng bộ giữa máy tính và điện thoại</h3>${A.syncPanel?A.syncPanel():""}</div>
  <div class="sec"><h3>Sao lưu & khôi phục</h3>
    <div class="gp backup">
      <p>File sao lưu chứa toàn bộ tiến độ: tên, XP, mức nhớ từng từ, kỷ lục, lịch sử thi và nhật ký. Mở web trên máy khác rồi chọn “Khôi phục từ file” để tiếp tục học.</p>
      <div class="row l"><button class="btn primary" id="bk">Tải file sao lưu</button>
        <label class="btn" for="rs">Khôi phục từ file</label><input type="file" id="rs" accept=".json,application/json" hidden></div>
      <div id="rsconfirm"></div>
      <p class="meta" style="margin-top:14px">Xóa toàn bộ tiến độ trên máy này: <button class="linkbtn danger" id="wipe" type="button">Xóa tiến độ</button></p>
      <div id="wipeconfirm"></div>
    </div></div>`;
  $('#bk').onclick=backup; if(A.bindSync)A.bindSync();
  $('#rs').onchange=e=>restorePick(root,e.target.files[0]);
  $('#wipe').onclick=()=>{
    $('#wipeconfirm').innerHTML=`<div class="note warn">Toàn bộ XP, từ đã thuộc và lịch sử trên máy này (và bản đồng bộ trên mạng nếu bạn đang đăng nhập) sẽ bị xóa và không lấy lại được (trừ khi bạn có file sao lưu). <div class="row l" style="margin-top:8px"><button class="btn bad" id="wipeyes">Xóa hết</button><button class="btn" id="wipeno">Giữ lại</button></div></div>`;
    $('#wipeno').onclick=()=>$('#wipeconfirm').innerHTML='';
    $('#wipeyes').onclick=async()=>{try{if(A.syncWipe)await A.syncWipe()}catch(e){} try{localStorage.removeItem(KEY)}catch(e){} location.hash='home'; location.reload()};
  };
}

function backup(){
  const data={app:'hanngu30',version:2,exportedAt:new Date().toISOString(),state:S};
  const blob=new Blob([JSON.stringify(data,null,1)],{type:'application/json'});
  const a=document.createElement('a');
  const nm=(S.name||'ban').normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/đ/gi,'d').replace(/[^a-z0-9]+/gi,'-').toLowerCase();
  a.href=URL.createObjectURL(blob); a.download=`hanngu30-${nm}-${dayStr(new Date())}.json`;
  document.body.appendChild(a); a.click(); a.remove(); setTimeout(()=>URL.revokeObjectURL(a.href),2000);
  A.toast('Đã tạo file sao lưu');
}
function restorePick(root,file){
  if(!file)return;
  const box=$('#rsconfirm');
  file.text().then(txt=>{
    let data; try{data=JSON.parse(txt)}catch(e){box.innerHTML='<div class="note warn">File này không đọc được. Hãy chọn đúng file .json đã tải từ nút “Tải file sao lưu”.</div>';return}
    const st=data&&data.app==='hanngu30'&&data.state;
    if(!st||typeof st!=='object'||typeof st.xp!=='number'||typeof st.box!=='object'){box.innerHTML='<div class="note warn">Đây không phải file sao lưu của Hán Ngữ 3.0.</div>';return}
    const known=ALLWORDS.filter(w=>(st.box[w.h]||0)>=3).length;
    box.innerHTML=`<div class="note"><b>File sao lưu${st.name?` của ${esc(st.name)}`:''}</b>, tạo lúc ${esc(new Date(data.exportedAt).toLocaleString('vi-VN'))}: ${st.xp} XP, đã thuộc ${known} từ, ${(st.log||[]).length} hoạt động.
      Tiến độ hiện tại trên máy này sẽ được thay bằng nội dung file.
      <div class="row l" style="margin-top:8px"><button class="btn primary" id="rsyes">Khôi phục</button><button class="btn" id="rsno">Hủy</button></div></div>`;
    $('#rsno').onclick=()=>{box.innerHTML='';$('#rs').value=''};
    $('#rsyes').onclick=()=>{
      try{localStorage.setItem(KEY,JSON.stringify(st));sessionStorage.setItem('hn30-restored',st.name||'1')}
      catch(e){box.innerHTML='<div class="note warn">Trình duyệt chặn lưu dữ liệu (có thể đang ở tab ẩn danh), nên chưa khôi phục được.</div>';return}
      location.hash='lichsu'; location.reload();
    };
  });
}
})();
