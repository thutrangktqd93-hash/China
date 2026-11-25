/* ================= Giọng nói dùng chung: phản hồi nhận diện, quyền micro, ghi âm tự nghe lại =================
   NGUYÊN TẮC: web chỉ so khớp CHỮ mà trình duyệt nhận diện được với câu cần đọc. Đây KHÔNG phải chấm phát âm:
   kết quả phụ thuộc trình duyệt, micro, tiếng ồn và không đánh giá được đầy đủ thanh điệu.
   Ghi âm "tự nghe lại" chỉ giữ trong bộ nhớ của trang, không lưu và không gửi đi đâu; rời trang là mất. */
(function(){
const A=window.App, {S,save,$,esc,dayStr}=A;

/* ---------- đồng ý dùng micro (một lần) ---------- */
const IS_CHROME=/Chrome|CriOS|Edg/i.test(navigator.userAgent);
function consentNeeded(){return !S.micOk}
function consentHTML(){
  return `<div class="note micnote" id="micconsent"><b>Trước khi dùng micro</b><br>
    Phần nhận diện giọng nói do <b>trình duyệt</b> xử lý: ${IS_CHROME?'Chrome/Edge gửi âm thanh tới máy chủ nhận dạng của Google/Microsoft':'Safari dùng dịch vụ nhận dạng của Apple (có thể xử lý trên máy hoặc gửi tới máy chủ của Apple)'} để chuyển thành chữ.
    Web này không lưu bản ghi và không gửi giọng nói của bạn đi nơi nào khác. Chức năng "Ghi âm để tự nghe lại" chỉ giữ âm thanh trong trang, rời trang là mất.
    <div class="row l" style="margin-top:8px"><button class="btn primary sm" id="micyes" type="button">Đồng ý, dùng micro</button></div></div>`;
}
function bindConsent(onOk){const b=$('#micyes');if(b)b.onclick=()=>{S.micOk=1;save();const n=$('#micconsent');if(n)n.remove();if(onOk)onOk()}}

/* ---------- lỗi micro / trình duyệt ---------- */
function errorHelp(code){
  const ua=navigator.userAgent, ios=/iPhone|iPad|iPod/.test(ua)||(/Macintosh/.test(ua)&&navigator.maxTouchPoints>1);
  const allow=ios?'Trên iPhone/iPad: Cài đặt → Safari → Micro → chọn "Hỏi" hoặc "Cho phép", rồi tải lại trang.'
    :IS_CHROME?'Bấm biểu tượng bên trái thanh địa chỉ → Micro → Cho phép, rồi tải lại trang. Trên Mac cũng cần bật trong Cài đặt hệ thống → Quyền riêng tư & Bảo mật → Micro → bật cho trình duyệt.'
    :'Trong Safari: menu Safari → Cài đặt cho trang web này → Micro → Cho phép. Trên Mac cũng cần bật trong Cài đặt hệ thống → Quyền riêng tư & Bảo mật → Micro.';
  const M={
    'not-allowed':`Chưa được phép dùng micro. ${allow}`,
    'service-not-allowed':`Trình duyệt đang chặn dịch vụ nhận dạng giọng nói. ${allow}`,
    'no-speech':'Không nghe thấy tiếng nói. Hãy đọc to, rõ và gần micro hơn rồi thử lại.',
    'audio-capture':'Không tìm thấy micro. Hãy kiểm tra micro hoặc tai nghe đã cắm và được chọn trong cài đặt âm thanh.',
    'network':'Dịch vụ nhận dạng cần mạng Internet. Hãy kiểm tra kết nối rồi thử lại.',
    'aborted':'Đã dừng nghe.',
    'unsupported':'Trình duyệt này chưa hỗ trợ nhận dạng giọng nói. Hãy dùng Chrome/Edge trên máy tính hoặc Android, hoặc Safari trên iPhone/Mac. Bạn vẫn dùng được "Ghi âm để tự nghe lại".',
    'NotAllowedError':`Chưa được phép dùng micro. ${allow}`,
    'NotFoundError':'Không tìm thấy micro trên thiết bị này.'
  };
  return M[code]||`Không dùng được micro (${esc(code||'lỗi')}). Hãy thử lại.`;
}

/* ---------- phản hồi sau một lần đọc ----------
   tokens: các từ của câu (để báo từ nào nhận diện được). Một từ tính là "nhận diện được" khi mọi chữ của từ đó
   đều xuất hiện đúng thứ tự trong chữ máy nghe được. */
const PUNCT=/[\s，。？！、：,.?!:；;“”"'…·]/g;
function wordMarks(target,tokens,r){
  const toks=(tokens&&tokens.length?tokens:[target]).map(t=>t.replace(PUNCT,'')).filter(Boolean);
  let pos=0; return toks.map(t=>{const n=[...t].length, ok=r.ma.slice(pos,pos+n).every(Boolean); pos+=n; return {t,ok}});
}
function feedbackHTML(target,tokens,alts){
  if(!alts||!alts.length)return `<div class="sfb empty"><b>Máy chưa nhận diện được câu nào.</b> Hãy nghe lại mẫu, rồi đọc to và rõ hơn.</div>`;
  const r=A.bestMatch(target,alts), wm=wordMarks(target,tokens,r), miss=wm.filter(x=>!x.ok);
  return `<div class="sfb">
    <div class="sfrow"><span class="sfl">Câu cần đọc</span><span class="hz sfw">${wm.map(x=>`<span class="${x.ok?'wok':'wno'}">${esc(x.t)}</span>`).join(' ')}</span></div>
    <div class="sfrow"><span class="sfl">Máy nhận diện được</span><span class="hz heard">${A.markHTML(r.b,r.mb)||'(trống)'}</span></div>
    <div class="sfrow"><span class="sfl">Độ khớp nhận diện văn bản <i>(tham khảo)</i></span><b class="sfp">${r.score}%</b></div>
    ${miss.length?`<p class="sfmiss">Chưa nhận diện được: ${miss.map(x=>`<span class="hz">${esc(x.t)}</span>`).join(', ')}. Hãy nghe lại audio mẫu và chú ý thanh điệu của những từ này.</p>`:'<p class="sfmiss ok">Máy nhận diện được đủ các từ. Vẫn nên nghe lại mẫu để so thanh điệu.</p>'}
  </div>`;
}
const DISCLAIMER=`<p class="meta sdisc">Kết quả là <b>độ khớp nhận diện văn bản</b>: web so chữ mà trình duyệt nghe được với câu cần đọc. Nó phụ thuộc trình duyệt, micro, môi trường và <b>không phản ánh chính xác thanh điệu hay chất lượng phát âm</b>. Máy nhận sai không có nghĩa chắc chắn bạn đọc sai.</p>`;

/* ---------- XP theo hoàn thành (không theo độ khớp) ----------
   Mỗi mục được +2 XP cho lượt luyện đầu tiên trong ngày (nghe mẫu và đọc lại / ghi âm), tối đa 40 XP/ngày. */
function credit(kind,key,label,detail){
  const d=dayStr(new Date());
  if(!S.spDay||S.spDay.d!==d)S.spDay={d,k:{},xp:0};
  const id=kind+':'+key;
  if(S.spDay.k[id]||S.spDay.xp>=40)return false;
  S.spDay.k[id]=1; S.spDay.xp+=2; A.addXP(2,label,detail); return true;
}

/* ---------- ghi âm tự nghe lại (chỉ trong bộ nhớ trang) ---------- */
const CAN_REC=!!(navigator.mediaDevices&&navigator.mediaDevices.getUserMedia&&window.MediaRecorder);
let rec=null, stream=null, chunks=[], urls=[];
async function recStart(){
  if(!CAN_REC)throw Object.assign(new Error('unsupported'),{code:'unsupported'});
  stream=await navigator.mediaDevices.getUserMedia({audio:true});
  chunks=[]; rec=new MediaRecorder(stream);
  rec.ondataavailable=e=>{if(e.data&&e.data.size)chunks.push(e.data)};
  rec.start();
}
function recStop(){
  return new Promise(res=>{
    if(!rec||rec.state==='inactive'){release();return res(null)}
    rec.onstop=()=>{const blob=new Blob(chunks,{type:rec.mimeType||'audio/webm'});release();const u=URL.createObjectURL(blob);urls.push(u);res(u)};
    rec.stop();
  });
}
function release(){if(stream){stream.getTracks().forEach(t=>t.stop());stream=null}rec=null}
const recording=()=>!!(rec&&rec.state==='recording');
function playUrl(u){return new Promise(res=>{if(!u)return res();const a=new Audio(u);a.onended=a.onerror=()=>res();a.play().catch(()=>res())})}
function cleanupRec(){try{if(rec&&rec.state!=='inactive')rec.stop()}catch(e){}release();urls.forEach(u=>URL.revokeObjectURL(u));urls=[]}

A.speech={consentNeeded,consentHTML,bindConsent,errorHelp,feedbackHTML,wordMarks,DISCLAIMER,credit,CAN_REC,recStart,recStop,recording,playUrl,cleanupRec};
})();
