/* ================= Ôn tập cách quãng (SRS) =================
   Dữ liệu: S.review[chữ Hán] = {state, interval, ease, repetitions, lapses, lastReviewedAt, dueAt, lastRating, totalReviews}
   - state: new (chưa học) · learning (đang học / học lại) · review (đang ôn) · mastered (khoảng ôn ≥ 21 ngày)
   - Thời gian dùng mốc mili giây (Date.now()). Khoảng ôn tính theo NGÀY LỊCH của máy: thẻ hẹn "3 ngày"
     đến hạn từ 0 giờ của ngày thứ 3 theo giờ địa phương, nên không lệch khi qua đêm hay đổi múi giờ mùa hè.
   Thuật toán: biến thể SM-2 có bước học 10 phút.
   - Thẻ mới / đang học: Again 10 phút · Hard 1 ngày · Good 3 ngày · Easy 4 ngày.
     Nếu thẻ vừa bị Again hoặc vừa ôn trong 20 phút trước, khoảng ôn bị giới hạn 1 ngày (Easy 2 ngày),
     để không "lên cấp" chỉ vì lặp lại cùng thẻ nhiều lần trong một buổi.
   - Thẻ đang ôn: Again → học lại (lapses+1, ease−0.2) · Hard ×1.2 (ease−0.15) · Good ×ease · Easy ×ease×1.3 (ease+0.15).
   - Ôn sớm (chưa đến hạn): Hard/Good/Easy không đổi lịch, chỉ ghi nhận lượt ôn; Again vẫn đưa về học lại.
   S.box (0–5) vẫn giữ cho các mô-đun cũ; mỗi lần đánh giá sẽ cập nhật S.box theo trạng thái SRS. */
(function(){
const A=window.App, {S,save,ALLWORDS,UNITS,dayStr}=A;
const SCHEMA=2, MIN=60000, DAY=86400000, STEP=10*MIN, RECENT=20*MIN, MASTER_DAYS=21, MAX_DAYS=365, ROUND=n=>Math.round(n*100)/100;
const INIT={hard:1,good:3,easy:4};
const RATINGS=['again','hard','good','easy'];
const WORDSET=new Set(ALLWORDS.map(w=>w.h));

const blank=()=>({state:'new',interval:0,ease:2.5,repetitions:0,lapses:0,lastReviewedAt:null,dueAt:null,lastRating:null,totalReviews:0});
const card=h=>(S.review&&S.review[h])||blank();
function startOfDay(t){const d=new Date(t);d.setHours(0,0,0,0);return d.getTime()}
function dueInDays(t,days){const d=new Date(t);d.setHours(0,0,0,0);d.setDate(d.getDate()+days);return d.getTime()}

/* ---------- lịch ôn (hàm thuần, không sửa dữ liệu) ---------- */
function schedule(c0,rating,t){
  const c={...c0};
  if(!RATINGS.includes(rating))return c;
  const recent=c.lastReviewedAt!=null&&t-c.lastReviewedAt<RECENT;
  if(rating==='again'){
    if(c.state==='review'||c.state==='mastered'){c.lapses++;c.ease=Math.max(1.3,ROUND(c.ease-0.2))}
    c.state='learning'; c.repetitions=0; c.interval=0; c.dueAt=t+STEP;
  }else if(c.state==='new'||c.state==='learning'){
    let d=INIT[rating];
    if(recent||c.lastRating==='again')d=Math.min(d,rating==='easy'?2:1);
    if(rating==='easy')c.ease=ROUND(c.ease+0.15);
    if(rating==='hard')c.ease=Math.max(1.3,ROUND(c.ease-0.15));
    c.state='review'; c.repetitions=1; c.interval=d; c.dueAt=dueInDays(t,d);
  }else if(c.dueAt!=null&&t<c.dueAt){
    /* ôn sớm: giữ nguyên lịch */
  }else{
    const prev=Math.max(1,c.interval); let d;
    if(rating==='hard'){d=Math.max(prev+1,Math.round(prev*1.2));c.ease=Math.max(1.3,ROUND(c.ease-0.15))}
    else if(rating==='good'){d=Math.max(prev+1,Math.round(prev*c.ease))}
    else{d=Math.max(prev+2,Math.round(prev*c.ease*1.3));c.ease=ROUND(c.ease+0.15)}
    d=Math.min(d,MAX_DAYS);
    c.interval=d; c.repetitions++; c.dueAt=dueInDays(t,d); c.state=d>=MASTER_DAYS?'mastered':'review';
  }
  c.lastReviewedAt=t; c.lastRating=rating; c.totalReviews=(c.totalReviews||0)+1;
  return c;
}

/* ---------- trạng thái hiện tại của một từ ---------- */
function status(h,t=Date.now()){
  const c=S.review&&S.review[h];
  if(!c||c.state==='new')return 'new';
  if(c.dueAt==null||c.dueAt<=t){
    if(c.state==='learning')return 'learning-due';
    return c.dueAt!=null&&c.dueAt<startOfDay(t)?'overdue':'due';
  }
  return c.state==='learning'?'learning':c.state==='mastered'?'mastered':'review';
}
const isDue=s=>s==='overdue'||s==='due'||s==='learning-due';
const STATUS_TEXT={new:'Từ mới',learning:'Đang học','learning-due':'Học lại',due:'Đến hạn ôn',overdue:'Quá hạn ôn',review:'Đang ôn',mastered:'Nhớ dài hạn'};
function overdueDays(h,t=Date.now()){const c=S.review[h];return c&&c.dueAt?Math.round((startOfDay(t)-startOfDay(c.dueAt))/DAY):0}

/* S.box cho các mô-đun cũ: đã thuộc (≥3) khi khoảng ôn ≥ 7 ngày */
function boxFrom(c){
  if(c.state==='new')return 0;
  if(c.state==='learning')return 1;
  if(c.state==='mastered')return 5;
  return c.interval>=7?3:2;
}

/* ---------- số từ mới đã học hôm nay ---------- */
function today(){const d=dayStr(new Date());if(!S.srsDay||S.srsDay.d!==d)S.srsDay={d,n:0};return S.srsDay}
function newPerDay(){const n=+((S.srsCfg||{}).newPerDay);return Number.isFinite(n)?Math.max(0,Math.min(50,Math.round(n))):10}
function newLeft(extra=0){return Math.max(0,newPerDay()+extra-today().n)}

/* ---------- ghi một lần đánh giá ---------- */
let lastRate={h:'',t:0};
function rate(h,rating){
  if(!WORDSET.has(h)||!RATINGS.includes(rating))return null;
  const t=Date.now();
  if(lastRate.h===h&&t-lastRate.t<1200)return null;          // chống bấm đúp
  lastRate={h,t};
  if(!S.review)S.review={};
  const before=card(h), wasNew=before.state==='new';
  const c=schedule(before,rating,t);
  S.review[h]=c; S.box[h]=boxFrom(c);
  if(wasNew)today().n++;
  save();
  return c;
}

/* Bài kiểm tra / trò chơi trả lời SAI một từ đã học: đưa từ đó vào hàng ôn ngay (không tính là một lần ôn,
   không tăng hay giảm khoảng ôn). Trả lời đúng không làm thay đổi lịch. Từ chưa học thì bỏ qua. */
function flag(h){
  const c=S.review&&S.review[h]; if(!c||c.state==='new')return false;
  const t=Date.now();
  if(c.dueAt==null||c.dueAt>t){c.dueAt=t;c.flagged=(c.flagged||0)+1;return true}
  return false;
}

/* ---------- nhãn thời gian trên nút ---------- */
function fmtWait(c,t){
  if(c.interval===0){const m=Math.max(1,Math.round((c.dueAt-t)/MIN));return m<60?`${m} phút`:`${Math.round(m/60)} giờ`}
  const d=c.interval;
  if(d<30)return `${d} ngày`;
  if(d<365)return `${(d/30).toFixed(1).replace(/\.0$/,'').replace('.',',')} tháng`;
  return `${(d/365).toFixed(1).replace(/\.0$/,'').replace('.',',')} năm`;
}
function preview(h,t=Date.now()){
  const c0=card(h), out={};
  for(const r of RATINGS){
    const c=schedule(c0,r,t);
    out[r]=(c0.state==='review'||c0.state==='mastered')&&r!=='again'&&c0.dueAt!=null&&t<c0.dueAt?'giữ lịch':fmtWait(c,t);
  }
  return out;
}

/* ---------- hàng đợi ----------
   scope 'unit': từ của bài đang chọn (hoặc bài 1 → bài hiện tại nếu bật "Ôn cả từ của các bài trước").
   scope 'all' : ôn mọi từ đến hạn; từ mới chỉ lấy từ bài 1 → bài hiện tại, không lấy bài chưa học.
   Thứ tự: quá hạn (lâu nhất trước) → đến hạn → học lại → từ mới (theo thứ tự trong bài). */
function weakWords(limit=20){
  return ALLWORDS.filter(w=>{const c=S.review[w.h];return c&&((c.lapses||0)+(c.flagged||0))>0})
    .sort((a,b)=>{const x=S.review[a.h],y=S.review[b.h];return ((y.lapses||0)+(y.flagged||0))-((x.lapses||0)+(x.flagged||0))}).slice(0,limit);
}
function scopeWords(scope){
  if(scope==='all')return ALLWORDS;
  if(scope==='weak')return weakWords();
  return A.unitWords();
}
function newPool(scope){
  const units=scope==='all'?UNITS.filter(u=>u.n<=S.unit):UNITS.filter(u=>S.prev?u.n<=S.unit:u.n===S.unit);
  return units.flatMap(u=>u.words).filter(w=>status(w.h)==='new');
}
function queue(scope,opt={}){
  const t=Date.now(), words=scopeWords(scope);
  if(scope==='weak'){const ws=weakWords();return {items:ws.map(w=>({w,kind:status(w.h,t)})),dueCount:ws.length,newCount:0,newLeft:newLeft(opt.extraNew||0),weak:true}}
  const tagged=words.map(w=>({w,s:status(w.h,t),due:(S.review[w.h]||{}).dueAt||0}));
  const order={overdue:0,due:1,'learning-due':2};
  const dueList=tagged.filter(x=>isDue(x.s)).sort((a,b)=>order[a.s]-order[b.s]||a.due-b.due).map(x=>({w:x.w,kind:x.s}));
  const left=newLeft(opt.extraNew||0);
  const fresh=newPool(scope).slice(0,left).map(w=>({w,kind:'new'}));
  return {items:[...dueList,...fresh],dueCount:dueList.length,newCount:fresh.length,newLeft:left};
}
function counts(words=ALLWORDS,t=Date.now()){
  const o={new:0,learning:0,'learning-due':0,due:0,overdue:0,review:0,mastered:0};
  for(const w of words)o[status(w.h,t)]++;
  o.dueTotal=o.due+o.overdue+o['learning-due'];
  return o;
}
/* số từ đến hạn trong N ngày tới (để báo "lần ôn tiếp theo") */
function upcoming(days=1,t=Date.now()){
  const end=dueInDays(t,days+1);
  return Object.values(S.review||{}).filter(c=>c.state!=='new'&&c.dueAt!=null&&c.dueAt>t&&c.dueAt<end).length;
}

/* ---------- chuyển dữ liệu cũ (chạy nhiều lần vẫn an toàn) ----------
   Từ có S.box > 0 nhưng chưa có lịch ôn: tạo mục "learning" đến hạn ngay để được đánh giá lại.
   Không coi box cao là đã nhớ dài hạn; S.box giữ nguyên cho đến khi từ được đánh giá lại. */
function migrate(){
  let changed=false;
  if(!S.review||typeof S.review!=='object'||Array.isArray(S.review)){S.review={};changed=true}
  if(!S.srsCfg||typeof S.srsCfg!=='object'){S.srsCfg={newPerDay:10};changed=true}
  if((S.schemaVersion||1)<SCHEMA){
    const t=Date.now();
    for(const [h,b] of Object.entries(S.box||{})){
      if(+b>0&&WORDSET.has(h)&&!S.review[h]){S.review[h]={...blank(),state:'learning',dueAt:t,migratedFromBox:+b};changed=true}
    }
    S.schemaVersion=SCHEMA; changed=true;
  }
  if(changed)save();
  return changed;
}
migrate();

A.srs={SCHEMA,RATINGS,STATUS_TEXT,schedule,status,isDue,overdueDays,rate,flag,preview,queue,counts,upcoming,weakWords,newPerDay,newLeft,today,migrate,boxFrom,card,dueInDays};
})();
