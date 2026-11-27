/* ================= Gắn điểm ngữ pháp (window.GRAMMAR) vào bài học =================
   Mỗi điểm ngữ pháp thuộc bài SỚM NHẤT mà mọi từ trong công thức và ví dụ đều đã được dạy (bài đó hoặc bài trước).
   Tính tự động từ dữ liệu, không ghi tay số bài:
   - Câu ví dụ trong data-extra.js viết liền, không cách từ. Một câu được coi là "học được ở bài N" nếu tách được
     toàn bộ thành các từ có trong bài 1..N (quy hoạch động, không phụ thuộc cách tách tham lam).
   - Chữ không thuộc từ nào trong danh sách 506 từ được ghi lại là "từ ngoài danh sách" để báo, không làm đổi số bài.
   - Câu bài tập không dùng để xếp bài; câu nào cần từ của bài sau thì ghi lại để báo. */
(function(){
const A=window.App, G=window.GRAMMAR||[], UNITS=A.UNITS, LAST=UNITS.length;
/* bài một từ được dạy = bài sớm nhất có từ đó trong danh sách từ vựng HOẶC trong câu mẫu.
   Lý do: ngữ pháp cần được giải thích ở chỗ người học gặp từ lần đầu. Hiện các hư từ 是 吗 的 有 了 在 đã nằm ở bài 1–3
   và ví dụ ngữ pháp chỉ dùng từ của bài 1–3, nên các điểm ngữ pháp cơ bản rơi vào bài 1–3.
   STRICT=true: chỉ tính danh sách từ vựng. */
const STRICT=false;
const WU=new Map(), VU=new Map();
UNITS.forEach(u=>u.words.forEach(w=>{if(!VU.has(w.h)||VU.get(w.h)>u.n)VU.set(w.h,u.n)}));
VU.forEach((n,h)=>WU.set(h,n));
if(!STRICT)UNITS.forEach(u=>u.sents.forEach(s=>s.tokens.forEach(t=>{if(WU.has(t)&&WU.get(t)>u.n)WU.set(t,u.n)})));
const MAXLEN=Math.max(...[...WU.keys()].map(k=>[...k].length));
const runs=s=>String(s).match(/[㐀-鿿]+/g)||[];

/* tách một đoạn chữ Hán bằng từ của bài 1..N, ít chữ lạ nhất; trả về {miss, parts:[{w,u}|{w,u:null}]} */
function segRun(run,N){
  const c=[...run], n=c.length, best=new Array(n+1).fill(null); best[0]={miss:0,parts:[]};
  for(let i=0;i<n;i++){const b=best[i]; if(!b)continue;
    const put=(j,p,m)=>{const cand={miss:b.miss+m,parts:[...b.parts,p]}; const o=best[j];
      if(!o||cand.miss<o.miss||(cand.miss===o.miss&&cand.parts.length<o.parts.length))best[j]=cand};
    put(i+1,{w:c[i],u:null},1);
    for(let L=1;L<=Math.min(MAXLEN,n-i);L++){const w=c.slice(i,i+L).join(''),u=WU.get(w); if(u!=null&&u<=N)put(i+L,{w,u},0)}
  }
  return best[n];
}
/* bài sớm nhất học được câu s; kèm từ quyết định số bài và các chữ ngoài danh sách */
function sentUnit(s){
  const rs=runs(s); if(!rs.length)return {unit:1,words:[],unknown:[]};
  const full=rs.map(r=>segRun(r,LAST)), floor=full.reduce((a,x)=>a+x.miss,0);
  let N=1; for(;N<LAST;N++){if(rs.reduce((a,r)=>a+segRun(r,N).miss,0)===floor)break}
  const parts=rs.flatMap(r=>segRun(r,N).parts);
  const unknown=[]; let cur=''; parts.forEach(p=>{if(p.u==null)cur+=p.w;else if(cur){unknown.push(cur);cur=''}}); if(cur)unknown.push(cur);
  return {unit:N,words:parts.filter(p=>p.u!=null),unknown};
}
const qFull=q=>q[0].includes('___')?q[0].replace('___',q[1][0]):q[1][0];

const LIST=G.map((g,i)=>{
  const fRuns=runs(g.f).map(r=>sentUnit(r)), ex=g.ex.map(([h])=>({h,...sentUnit(h)}));
  const unit=Math.max(1,...fRuns.map(x=>x.unit),...ex.map(x=>x.unit));
  /* từ làm số bài lớn nhất (để biết vì sao điểm ngữ pháp nằm ở bài đó) */
  const all=[...fRuns.flatMap(x=>x.words),...ex.flatMap(x=>x.words)], top=all.filter(w=>w.u===unit).map(w=>w.w);
  const qs=g.q.map(q=>{const full=qFull(q),r=sentUnit(full),opt=q[1].map(o=>({o,...sentUnit(o)}));
    return {s:q[0],full,unit:r.unit,unknown:r.unknown,later:r.words.filter(w=>w.u>unit).map(w=>`${w.w} (bài ${w.u})`),
      optLater:opt.filter(o=>o.unit>unit||o.unknown.length).map(o=>o.unknown.length?`${o.o} (ngoài danh sách)`:`${o.o} (bài ${o.unit})`)}});
  return {i,g,unit,by:[...new Set(top)],
    exUnknown:ex.filter(x=>x.unknown.length).map(x=>({h:x.h,unknown:x.unknown})),
    fUnknown:fRuns.flatMap(x=>x.unknown),
    qIssues:qs.filter(q=>q.later.length||q.unknown.length||q.optLater.length)};
});
const forUnit=n=>LIST.filter(x=>x.unit===n);
/* thẻ một điểm ngữ pháp (dùng chung cho tab Ngữ pháp trong bài và mục #nguphap) */
function card(x,{num,unitLink}={}){
  const {esc,ICON}=A, g=x.g;
  return `<div class="gp"><h3>${num!=null?num+'. ':''}${esc(g.t)}${unitLink?` <a class="gunit" href="#hoc" data-gu="${x.unit}">học ở Bài ${x.unit}</a>`:''}</h3><span class="f">${esc(g.f)}</span><p>${esc(g.d)}</p>
    <ul>${g.ex.map(([h,m])=>`<li><button class="btn sm" data-h="${esc(h)}" style="padding:2px 8px;margin-right:6px" aria-label="Nghe câu">${ICON.spk}</button><span class="hz">${esc(h)}</span> — ${esc(m)}</li>`).join('')}</ul></div>`;
}
/* câu bài tập điền từ, cùng cách hiển thị với bài tập ở mục #nguphap */
function rounds(items){
  const {esc,shuffle,speak}=A;
  return items.map(({g,q})=>{const [s,opts,m]=q;const full=s.includes('___');
    return {prompt:`<div class="q">${esc(g.t)}</div><div class="mid">${esc(s.replace('___','＿＿'))}</div><div class="q">${esc(m)}</div>`, cols:full?'':'one',
      options:shuffle(opts.map((o,k)=>({ok:k===0,html:`<span class="hz" style="font-size:${full?26:20}px">${esc(o)}</span>`}))),
      reveal:`Công thức: ${esc(g.f)}`, after:()=>{if(full)speak(s.replace('___',opts[0]))}}});
}
/* bấm "học ở Bài N": mở tab Ngữ pháp của bài đó */
document.addEventListener('click',e=>{const a=e.target.closest('[data-gu]');if(!a)return;e.preventDefault();
  const S=A.S;S.unit=+a.dataset.gu;S.tab='gram';S.prev=false;A.save();if(location.hash==='#hoc')A.route();else location.hash='hoc'});

A.gram={list:LIST,forUnit,unitOf:i=>LIST[i]&&LIST[i].unit,sentUnit,wordUnit:h=>WU.get(h),vocabUnit:h=>VU.get(h),STRICT,card,rounds};
})();
