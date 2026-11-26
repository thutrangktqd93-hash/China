/* ================= Kiểm tra tổng hợp · Bộ thủ · Hội thoại · Ngữ pháp ================= */
(function(){
const A=window.App, {UNITS,ALLWORDS,ALLSENTS,S,save,$,$$,box,esc,pyHTML,pyPlain,toneOf,shuffle,sample,rand,distract,ICON,speak}=A;

/* =================================================================
   KIỂM TRA TỔNG HỢP CẤP 1 – GF0025-2021 (đề luyện tập nội bộ sinh ngẫu nhiên, không phải đề thi chính thức)
   ================================================================= */
A.register('thi',root=>{A.setMain(root);examHome(root)});
function examHome(root){
  A.cleanup();
  const hist=(S.exams||[]).slice(-8).reverse();
  root.innerHTML=`<h2 class="sect">Kiểm tra tổng hợp cấp 1 – GF0025-2021</h2>
  <p class="lead">Đề luyện tập nội bộ, mỗi lần làm sẽ ra đề mới từ ${A.ALLWORDS.length} từ của danh sách cấp 1 (GF0025-2021). <b>Đây không phải đề thi HSK chính thức.</b> Có hai chế độ: đề mô phỏng theo dạng câu của đề HSK 1 mới, và kiểm tra nhanh từ vựng.</p>
  ${A.voicePicker()}
  <div class="exmodes">
    <div class="tcard exmode"><span class="pill">Mô phỏng dạng HSK</span><b>Đề mô phỏng dạng HSK 1 (mới)</b>
      <p>40 câu, ${HSK_MIN} phút, theo 8 dạng câu của đề HSK 1 mới do 汉考国际 công bố (áp dụng từ 07/2026).</p>
      <p><b>Nghe (20 câu):</b> chọn 1 trong 3 hình · nghe câu hỏi, chọn câu trả lời · nghe hội thoại, chọn hình · nghe một đoạn và câu hỏi, chọn đáp án. Mỗi câu nghe tối đa 2 lần.</p>
      <p><b>Đọc (20 câu):</b> nối câu với hình · nối câu hỏi với câu trả lời · chọn từ điền vào chỗ trống · đọc câu và trả lời câu hỏi ★.</p>
      <p><b>Chấm điểm:</b> mỗi câu 5 điểm, Nghe 100 + Đọc 100 = 200, đạt từ 120. Đề mới chưa công bố thang điểm nên tạm dùng thang của đề HSK 1 cũ.</p>
      <div class="row l"><button class="btn primary" id="hstart">Làm đề mô phỏng</button></div></div>
    <div class="tcard exmode"><span class="pill">Từ vựng</span><b>Kiểm tra nhanh từ vựng</b>
      <p>40 câu trắc nghiệm, 30 phút.</p>
      <p><b>Nghe (20 câu):</b> câu 1–10 nghe từ, chọn chữ Hán đúng · câu 11–20 nghe câu, chọn nghĩa đúng.</p>
      <p><b>Đọc (20 câu):</b> câu 21–30 chọn nghĩa của từ · câu 31–35 chọn pinyin đúng · câu 36–40 chọn từ điền vào chỗ trống.</p>
      <p><b>Chấm điểm:</b> mỗi câu 2,5 điểm, tổng 100. Đạt từ 60 điểm.</p>
      <div class="row l"><button class="btn" id="estart">Kiểm tra nhanh</button></div></div>
  </div>
  ${hist.length?`<div class="sec"><h3>Lịch sử làm bài</h3><div class="hist">${hist.map(h=>{const hk=h.mode==='hsk',max=h.max||100,pass=h.pass||(hk?HSK_PASS:60);
    return `<div><span>${esc(h.d)} · ${hk?'Mô phỏng HSK':'Kiểm tra nhanh'}</span><span>Nghe ${h.l}/20 · Đọc ${h.r}/20</span><b style="color:${h.s>=pass?'var(--ok)':'var(--cinnabar)'}">${h.s}/${max} điểm</b></div>`}).join('')}</div></div>`:''}`;
  $('#estart').onclick=()=>examRun(root); $('#hstart').onclick=()=>hskRun(root); A.bindPicker();
}
function buildExam(){
  const Q=[], words=ALLWORDS, used=new Set();
  const pickW=f=>{const c=shuffle(words.filter(w=>!used.has(w.h)&&(!f||f(w))));const w=c[0];used.add(w.h);return w};
  for(let i=0;i<10;i++){const w=pickW();Q.push({part:'l',type:'Nghe từ, chọn chữ Hán đúng',word:w.h,audio:w.h,
    opts:shuffle([w,...distract(w,3,'h',words)]).map(x=>({html:`<span class="hz">${x.h}</span>`,ok:x.h===w.h})),exp:`${w.h} · ${pyPlain(w.p)} · ${w.m}`})}
  sample(ALLSENTS,10).forEach(s=>{Q.push({part:'l',type:'Nghe câu, chọn nghĩa đúng',audio:s.h,one:true,
    opts:shuffle([s,...shuffle(ALLSENTS.filter(x=>x.m!==s.m)).slice(0,3)]).map(x=>({html:esc(x.m),ok:x===s})),exp:`${s.h} · ${s.p}`})});
  for(let i=0;i<10;i++){const w=pickW();Q.push({part:'r',type:'Chọn nghĩa của từ',word:w.h,q:`<span class="hz">${w.h}</span>`,
    opts:shuffle([w,...distract(w,3,'m',words)]).map(x=>({html:esc(x.m),ok:x.h===w.h})),exp:`${w.h} · ${pyPlain(w.p)} · ${w.m}`})}
  for(let i=0;i<5;i++){const w=pickW(x=>x.p.split(' ').some(toneOf));Q.push({part:'r',type:'Chọn pinyin đúng',word:w.h,q:`<span class="hz">${w.h}</span> <span class="meta">(${esc(w.m)})</span>`,
    opts:A.toneOptions(w).map(o=>({html:pyHTML(o.p),ok:o.ok})),exp:`${w.h} · ${pyPlain(w.p)}`})}
  const lookup=new Map(words.map(w=>[w.h,w]));
  const blanks=shuffle(ALLSENTS.filter(s=>s.tokens.some(t=>lookup.has(t)&&t.length>=1))).slice(0,5);
  blanks.forEach(s=>{
    const cand=s.tokens.map((t,i)=>[t,i]).filter(([t])=>lookup.has(t)&&!['的','了','吗','呢','吧'].includes(t));
    const [t,idx]=cand.length?cand[rand(cand.length)]:[s.tokens[0],0]; const w=lookup.get(t)||{h:t,m:''};
    const same=shuffle(words.filter(x=>x.h!==t&&[...x.h].length===[...t].length)).slice(0,3);
    const shown=s.tokens.map((x,i)=>i===idx?'＿＿':x).join('');
    Q.push({part:'r',type:'Chọn từ điền vào chỗ trống',q:`<span class="hz">${shown}</span><br><span class="meta">${esc(s.m)}</span>`,
      opts:shuffle([w,...same]).map(x=>({html:`<span class="hz">${x.h}</span>`,ok:x.h===t})),exp:`${s.h} · ${s.p}`});
  });
  return Q;
}
function examRun(root){
  A.cleanup();
  const Q=buildExam(), ans=new Array(Q.length).fill(-1), dur=30*60; let left=dur, done=false;
  const qhtml=(q,i)=>`<div class="qitem" id="q${i}"><span class="qnum">Câu ${i+1} · ${q.type}</span>
    ${q.audio?`<div class="row l"><button class="btn sm" data-a="${i}">${ICON.spk} Nghe</button><button class="btn sm" data-as="${i}">Nghe chậm</button></div>`:''}
    ${q.q?`<div class="qtext">${q.q}</div>`:''}
    <div class="opts ${q.one?'one':''}">${q.opts.map((o,k)=>`<button class="opt" data-q="${i}" data-k="${k}"><kbd>${'ABCD'[k]}</kbd><span>${o.html}</span></button>`).join('')}</div>
    <div class="qexp" id="x${i}"></div></div>`;
  root.innerHTML=`<div class="exhead"><b>Kiểm tra nhanh từ vựng</b><span class="meta" id="eprog">Đã làm 0/40</span><span class="clock" id="eclock">30:00</span><button class="btn primary sm" id="esub">Nộp bài</button></div>
    <h3 class="eyebrow" style="margin-top:14px">Phần 1 · Nghe</h3><div class="qlist">${Q.map((q,i)=>q.part==='l'?qhtml(q,i):'').join('')}</div>
    <h3 class="eyebrow" style="margin-top:24px">Phần 2 · Đọc</h3><div class="qlist">${Q.map((q,i)=>q.part==='r'?qhtml(q,i):'').join('')}</div>
    <div class="row" style="margin-top:20px"><button class="btn primary" id="esub2">Nộp bài</button></div><div id="eres"></div>`;
  $$('[data-a]',root).forEach(b=>b.onclick=()=>speak(Q[b.dataset.a].audio,false,b));
  $$('[data-as]',root).forEach(b=>b.onclick=()=>speak(Q[b.dataset.as].audio,true,b));
  $$('.opt',root).forEach(b=>b.onclick=()=>{if(done)return;const i=+b.dataset.q;ans[i]=+b.dataset.k;
    $$(`.opt[data-q="${i}"]`,root).forEach(x=>x.classList.toggle('sel',x===b));
    $('#eprog').textContent=`Đã làm ${ans.filter(a=>a>=0).length}/40`});
  const clock=$('#eclock');
  A.addTimer(setInterval(()=>{if(done)return;left--;clock.textContent=`${String(Math.floor(left/60)).padStart(2,'0')}:${String(left%60).padStart(2,'0')}`;clock.classList.toggle('low',left<300);if(left<=0)submit(true)},1000));
  let confirmT=0;
  const trySubmit=e=>{const blank=ans.filter(a=>a<0).length;
    if(blank&&Date.now()-confirmT>4000){confirmT=Date.now();e.currentTarget.textContent=`Còn ${blank} câu trống, bấm lần nữa để nộp`;return}
    submit(false)};
  $('#esub').onclick=trySubmit; $('#esub2').onclick=trySubmit;
  function submit(timeout){
    if(done)return; done=true; A.cleanup(); speechSynthesis&&speechSynthesis.cancel();
    let l=0,r=0;
    Q.forEach((q,i)=>{const ok=ans[i]>=0&&q.opts[ans[i]].ok; if(ok){q.part==='l'?l++:r++} else if(q.word&&ans[i]>=0&&A.srs)A.srs.flag(q.word);
      const it=$('#q'+i); it.classList.add(ok?'right':'wrong');
      $$(`.opt[data-q="${i}"]`,root).forEach((b,k)=>{b.disabled=true;if(q.opts[k].ok)b.classList.add('ok');else if(k===ans[i])b.classList.add('bad')});
      $('#x'+i).innerHTML=`${ok?'<b style="color:var(--ok)">Đúng</b>':ans[i]<0?'<b style="color:var(--cinnabar)">Bỏ trống</b>':'<b style="color:var(--cinnabar)">Sai</b>'} · ${esc(q.exp)}`;
    });
    const s=Math.round((l+r)*2.5);
    S.exams=(S.exams||[]).concat({d:new Date().toLocaleString('vi-VN',{dateStyle:'short',timeStyle:'short'}),l,r,s,mode:'quick',max:100,pass:60}).slice(-30); save();
    A.addXP(10+(l+r),"Kiểm tra nhanh từ vựng",`${s} điểm · Nghe ${l}/20 · Đọc ${r}/20`);
    const pass=s>=60;
    $('#eres').innerHTML=`<div class="result" style="margin-top:24px"><div class="seal ${pass?'':'long'}">${pass?'合格':'加油'}</div>
      <h2>${s} / 100 điểm</h2><p class="gloss">${timeout?'Hết giờ, bài đã được nộp. ':''}${pass?'Đạt yêu cầu':'Chưa đạt, cố lên nhé'}</p>
      <div class="rstats"><div><b>${l}/20</b><small>Nghe</small></div><div><b>${r}/20</b><small>Đọc</small></div></div>
      <div class="row"><button class="btn primary" id="eagain">Làm đề mới</button><button class="btn" id="ehome">Xem lịch sử</button></div></div>`;
    $('#esub').disabled=true; $('#esub2').hidden=true;
    $('#eagain').onclick=()=>examRun(root); $('#ehome').onclick=()=>examHome(root);
    window.scrollTo({top:0});
    A.toast(`Bạn được ${s} điểm. Kéo xuống để xem câu sai.`);
  }
}

/* =================================================================
   ĐỀ MÔ PHỎNG DẠNG HSK 1 MỚI
   Theo "新版HSK（1-6级）考试结构与样题示例" (汉考国际, công bố 12/2025, áp dụng 07/2026), phần cấp 1:
   Nghe 20 câu (~12 phút): P1 nghe cụm từ chọn 1/3 hình · P2 nghe câu hỏi chọn câu trả lời (3 lựa chọn chữ)
     · P3 nghe hội thoại nối với hình A–F · P4 nghe đoạn nói + câu hỏi, chọn 1/3.
   Đọc 20 câu (20 phút): P1 câu nối với hình A–F · P2 nối câu hỏi với câu trả lời A–F
     · P3 chọn từ điền chỗ trống (6 từ A–F) · P4 đọc câu + câu hỏi ★, chọn 1/3.
   Đề mới chưa công bố thang điểm: tạm dùng thang đề HSK 1 cũ (Nghe 100 + Đọc 100, đạt 120/200).
   ================================================================= */
const HSK_MAX=200, HSK_PASS=120, HSK_MIN=32, LET='ABCDEF';
const WMAP=new Map(ALLWORDS.map(w=>[w.h,w]));
const words=s=>s.split(' ').map(h=>WMAP.get(h)).filter(Boolean);
const share=(a,b)=>[...a].some(c=>b.includes(c));
/* từ cụ thể có hình rõ nghĩa; mỗi hình chỉ thuộc một từ, bỏ các cặp hình dễ nhầm (书/本子, 汽车/打车, 飞机/机场…) */
const PICT=(()=>{const seen=new Set();return words('爷爷 奶奶 老师 学生 医生 工人 米饭 菜 肉 鸡蛋 面包 面条儿 包子 水果 水 茶 牛奶 学校 书 书包 门 床 衣服 钱 钱包 手机 电话 电脑 电视 洗手间 房子 汽车 火车 飞机 地图 商店 医院 电影 球 唱歌 睡觉 笑 跑 看 听 下雨 风 树 山 花 冷 热 生日 洗 买 中国')
  .filter(w=>{const e=(A.EMOJI[w.h]||[]).join('');if(!e||seen.has(e))return false;seen.add(e);return true})})();
/* động từ có hình chỉ dùng cho nghe phần 1; các phần nối hình chỉ dùng danh từ / hiện tượng làm hình */
const VERBISH=new Set(['看','听','买','洗','笑','跑']);
const PSET=new Set(PICT.filter(w=>!VERBISH.has(w.h)).map(w=>w.h)), PKEY=PICT.filter(w=>PSET.has(w.h));
/* nhóm từ cho câu hỏi "说话人…" (nghe P4, đọc P4) */
const CATS=[
  {k:'place',q:'说话人说到了哪个地方？',qp:'Shuōhuàrén shuō dào le nǎ ge dìfang?',qv:'Người nói nhắc đến nơi nào?',w:words('学校 医院 商店 商场 书店 饭店 电影院 图书馆 机场 车站 北京 中国 洗手间')},
  {k:'time',q:'说话人说的是什么时候？',qp:'Shuōhuàrén shuō de shì shénme shíhou?',qv:'Người nói nói về lúc nào?',w:words('今天 明天 昨天 早上 上午 中午 下午 晚上 今年 明年 去年')},
  {k:'who',q:'说话人说到了谁？',qp:'Shuōhuàrén shuō dào le shéi?',qv:'Người nói nhắc đến ai?',w:words('爸爸 妈妈 哥哥 姐姐 弟弟 妹妹 爷爷 奶奶 老师 医生 学生 朋友 同学 儿子 女儿')},
  {k:'thing',q:'说话人说到了什么东西？',qp:'Shuōhuàrén shuō dào le shénme dōngxi?',qv:'Người nói nhắc đến vật gì?',w:words('米饭 菜 肉 鸡蛋 面包 面条儿 包子 水果 茶 牛奶 手机 电脑 电视 衣服 书包 钱包 杯子 本子')}];
/* từ điền chỗ trống: chia theo vai trò trong câu; 6 từ của một bộ đề thuộc 6 nhóm khác nhau để mỗi chỗ trống chỉ có một từ hợp */
const FILL=[
  /* danh từ chỉ nơi chốn, người, đồ vật gộp một nhóm: nhiều chỗ trống nhận cả ba */
  ['noun','学校 医院 商店 北京 中国 饭店 书店 机场 车站 图书馆 老师 医生 学生 朋友 爸爸 妈妈 哥哥 姐姐 同学 米饭 茶 水 牛奶 水果 面包 菜 书 手机 电脑 电视 衣服 钱'],['verb','去 来 回 吃 喝 看 听 买 学习 写 读 坐 住'],
  ['adj','好 大 小 冷 热 忙 贵 多'],['measure','个 本 杯 块 岁 口'],['time','今天 明天 昨天 上午 下午 晚上'],
  ['number','一 二 三 四 五 六 七 八 九 十 两'],['qword','几 多少 怎么']].map(([k,s])=>({k,w:words(s)}));
const NUMSLOT=new Set(['点','岁','月','号','个','口','块','本','杯','次','分','年','天','页']);
const PRON=new Set(['我','你','他','她','您','我们','你们','他们','她们']);
const FILLCAT=new Map(FILL.flatMap(c=>c.w.map(w=>[w.h,c.k])));
/* chỗ trống đứng sau / trước các từ này thì nhiều loại từ cùng hợp, nên bỏ */
const OPEN_PREV=new Set(['是','的','有','买','这','那','要','喜欢','爱','和','也','都','很','叫','在','给','了','好','大','小','新']), OPEN_NEXT=new Set(['和','、','的','也','都']);

const tok=h=>h.replace(/[。？！，、：；]/g,' ').trim().split(/\s+/).filter(Boolean);
/* tách câu nhiều vế thành từng câu (theo 。？！) kèm pinyin nếu số vế khớp */
function segs(raw,p){
  const hs=raw.trim().match(/[^。？！]+[。？！]?/g)||[], ps=(p||'').trim().match(/[^.?!]+[.?!]?/g)||[];
  return hs.map((h,i)=>({h:h.replace(/\s+/g,''),tokens:tok(h),p:hs.length===ps.length?ps[i].trim():''}));
}
function qfam(h){if(/什么时候|几点|哪天|星期几|几月|几号/.test(h))return 'time';if(/哪儿|哪里/.test(h))return 'place';if(/谁/.test(h))return 'who';if(/几|多少|多大/.test(h))return 'num';if(/还是/.test(h))return 'choice';if(/什么/.test(h))return 'what';if(/哪/.test(h))return 'which';return 'state'}
const ln=(who,x)=>{const [s,p,m]=x.split('|');return {who,raw:s,h:s.replace(/\s+/g,''),tokens:tok(s),p:p.trim(),m:m.trim()}};
const DLGS=[...(window.DIALOGS||[]).map(d=>d.lines.map(([who,s,p,m])=>({who,raw:s,h:s.replace(/\s+/g,''),tokens:tok(s),p,m}))),
  ...(window.EXAM_DLG||[]).map(([a,b])=>[ln('A',a),ln('B',b)])];
/* cặp hỏi – đáp lấy từ các bài hội thoại: câu hỏi cuối lượt của người này, vế đầu lượt của người kia */
const QA=(()=>{const out=[],seen=new Set();
  DLGS.forEach(L=>L.forEach((l,i)=>{const n=L[i+1];if(!n||n.who===l.who)return;
    const qs=segs(l.raw,l.p),q=qs[qs.length-1];if(!q||!/？$/.test(q.h)||q.h.length<4||/^(你|您)呢？$/.test(q.h))return;
    const a=segs(n.raw,n.p)[0];if(!a||/？$/.test(a.h)||seen.has(q.h))return;seen.add(q.h);
    out.push({q,a,fam:qfam(q.h),m:l.m+' → '+n.m})}));
  (window.EXAM_QA||[]).forEach(([x,y])=>{const q=ln('A',x),a=ln('B',y);if(seen.has(q.h))return;seen.add(q.h);out.push({q,a,fam:qfam(q.h),m:q.m+' → '+a.m})});
  return out})();
/* câu trả lời nhiễu không được hợp với câu hỏi: "他是谁？" ↔ "他是医生", câu hỏi có/không ↔ câu trả lời giờ giấc, "茶还是水？" ↔ "我想喝牛奶" */
const WHO_W=new Set(CATS.find(c=>c.k==='who').w.map(w=>w.h).concat(['工人']));
const personAns=a=>/是/.test(a.h)&&a.tokens.some(t=>WHO_W.has(t));
const clash=(x,y)=>x.fam===y.fam||x.a.h===y.a.h||(x.fam==='who'&&personAns(y.a))||(y.fam==='who'&&personAns(x.a))
  ||(x.fam==='what'&&/工作|做什么/.test(x.q.h)&&personAns(y.a))||(y.fam==='what'&&/工作|做什么/.test(y.q.h)&&personAns(x.a))
  ||([x.fam,y.fam].includes('state')&&[x.fam,y.fam].includes('time'))||([x.fam,y.fam].includes('choice')&&[x.fam,y.fam].includes('what'));
const pictIn=t=>[...new Set(t.filter(x=>PSET.has(x)))];
/* hội thoại 2 lượt và câu đơn có đúng một từ có hình */
const DPAIRS=DLGS.flatMap(L=>L.slice(0,-1).map((l,i)=>[l,L[i+1]]).filter(([a,b])=>a.who!==b.who))
  .map(([a,b])=>({a,b,h:a.h+b.h,key:pictIn([...a.tokens,...b.tokens])})).filter(x=>x.key.length===1).map(x=>({...x,key:x.key[0]}));
const SENTS=[...ALLSENTS.map(s=>({h:s.h,tokens:s.tokens,p:s.p,m:s.m})),...DLGS.flat().map(l=>({h:l.h,tokens:l.tokens,p:l.p,m:l.m})),
  ...(window.EXAM_SENT||[]).map(x=>{const l=ln('',x);return {h:l.h,tokens:l.tokens,p:l.p,m:l.m}})]
  .filter((s,i,a)=>a.findIndex(x=>x.h===s.h)===i);
const SPIC=SENTS.map(s=>({...s,key:pictIn(s.tokens)})).filter(s=>s.key.length===1).map(s=>({...s,key:s.key[0]}));
/* câu trần thuật đứng được một mình (bỏ câu trả lời cụt như "没有，…", "在前边…") */
const STATE=SENTS.filter(s=>!/？/.test(s.h)&&!/^(没有|不|是|对|好|有|在|嗯|那|去过)/.test(s.h)).flatMap(s=>CATS.map(c=>{const hit=[...new Set(s.tokens.filter(t=>c.w.some(w=>w.h===t)))];return hit.length===1?{s,c,key:WMAP.get(hit[0])}:null}).filter(Boolean));

function pickDis(ans,pool,n,bad){const out=[];
  for(const x of shuffle([...pool])){if(out.length>=n)break;
    if(x.h===ans.h||x.m===ans.m||share(x.h,ans.h)||out.some(o=>o.h===x.h||o.m===x.m||share(o.h,x.h))||(bad&&bad(x)))continue;out.push(x)}
  return out}
/* chọn 5 mục + 1 hình thừa sao cho hình của mục khác không dính chữ nào với nội dung của mục đang xét */
function bankPart(pool,used,avoid){
  for(let t=0;t<300;t++){
    const items=[],keys=[];
    for(const it of shuffle(pool.filter(x=>!used.has(x.h)&&!avoid.has(x.key)))){
      if(items.length>=5)break;
      if(keys.includes(it.key)||keys.some(k=>share(k,it.h))||items.some(o=>share(it.key,o.h)))continue;
      items.push(it);keys.push(it.key)}
    if(items.length<5)continue;
    const ex=shuffle([...PKEY]);
    const extra=ex.find(w=>!keys.includes(w.h)&&!avoid.has(w.h)&&!keys.some(k=>share(k,w.h))&&!items.some(o=>share(w.h,o.h)))
      ||ex.find(w=>!keys.includes(w.h)&&!keys.some(k=>share(k,w.h))&&!items.some(o=>share(w.h,o.h)));
    if(!extra)continue;
    items.forEach(o=>used.add(o.h));
    return {items,bank:shuffle([...keys.map(k=>WMAP.get(k)),extra])};
  }
  return null;
}
const hopt=s=>({h:s.h,p:s.p||''});
function buildHsk(){
  const Q=[],used=new Set(),usedW=new Set();
  const push=(sec,part,type,o)=>Q.push({sec,part,type,...o});
  /* Nghe P1: nghe một từ, chọn 1 trong 3 hình */
  shuffle([...PICT]).slice(0,5).forEach(w=>{usedW.add(w.h);
    push('l',1,'Nghe, chọn hình đúng',{audio:w.h,word:w.h,kind:'pic3',opts:shuffle([w,...pickDis(w,PICT,2)]).map(x=>({pic:x.h,ok:x.h===w.h})),
      exp:`${w.h} · ${pyPlain(w.p)} · ${w.m}`})});
  /* Nghe P2: nghe câu hỏi, chọn câu trả lời (3 lựa chọn, câu trả lời nhiễu thuộc loại câu hỏi khác) */
  shuffle(QA).slice(0,5).forEach(x=>{used.add(x.q.h);
    const ds=[];for(const y of shuffle(QA)){if(ds.length>=2)break;if(!clash(x,y)&&!ds.some(d=>d.fam===y.fam||d.a.h===y.a.h))ds.push(y)}
    push('l',2,'Nghe câu hỏi, chọn câu trả lời',{audio:x.q.h,kind:'txt',opts:shuffle([{...hopt(x.a),ok:true},...ds.map(d=>({...hopt(d.a),ok:false}))]),
      exp:`${x.q.h} ${x.q.p} → ${x.a.h} ${x.a.p}`})});
  /* Nghe P3: nghe hội thoại, chọn hình A–F */
  const p3=bankPart(DPAIRS,used,usedW);
  if(p3){p3.items.forEach(x=>{used.add(x.a.h);used.add(x.b.h);usedW.add(x.key);
    push('l',3,'Nghe hội thoại, chọn hình',{audio:x.a.h+' '+x.b.h,word:x.key,kind:'bank',bank:p3.bank,txt:x.h,opts:p3.bank.map(w=>({pic:w.h,ok:w.h===x.key})),
      exp:`${x.a.who}: ${x.a.h} ${x.a.p} (${x.a.m}) · ${x.b.who}: ${x.b.h} ${x.b.p} (${x.b.m})`})})}
  /* Nghe P4: nghe một đoạn + câu hỏi, chọn 1 trong 3 */
  const state=shuffle(STATE), p4=[];
  for(const x of state){if(p4.length>=5)break;if(used.has(x.s.h)||p4.filter(z=>z.c.k===x.c.k).length>=2)continue;p4.push(x);used.add(x.s.h)}
  p4.forEach(x=>{const ds=pickDis(x.key,x.c.w,2,w=>x.s.tokens.includes(w.h)||x.s.h.includes(w.h));
    push('l',4,'Nghe một đoạn và câu hỏi, chọn đáp án',{audio:`${x.s.h} 问：${x.c.q}`,word:x.key.h,kind:'txt',stem:x,
      opts:shuffle([x.key,...ds]).map(w=>({h:w.h,p:w.p,ok:w.h===x.key.h})),exp:`${x.s.h} ${x.s.p} (${x.s.m}) · 问：${x.c.q} → ${x.key.h} (${x.key.m})`})});
  /* Đọc P1: câu nối với hình A–F */
  const r1=bankPart(SPIC,used,new Set());
  if(r1){r1.items.forEach(x=>{used.add(x.h);
    push('r',1,'Đọc câu, chọn hình',{q:x,word:x.key,kind:'bank',bank:r1.bank,txt:x.h,opts:r1.bank.map(w=>({pic:w.h,ok:w.h===x.key})),exp:`${x.h} · ${x.m}`})})}
  /* Đọc P2: nối câu hỏi với câu trả lời A–F (6 cặp thuộc 6 loại câu hỏi khác nhau) */
  for(let t=0;t<200;t++){const pick=[];
    for(const x of shuffle(QA.filter(x=>!used.has(x.q.h)))){if(pick.length>=6)break;if(!pick.some(o=>clash(o,x)))pick.push(x)}
    if(pick.length<6)continue;
    const bank=shuffle(pick.map(x=>x.a));
    pick.slice(0,5).forEach(x=>{used.add(x.q.h);
      push('r',2,'Nối câu hỏi với câu trả lời',{q:x.q,kind:'bankt',bank,opts:bank.map(a=>({h:a.h,p:a.p,ok:a===x.a})),exp:`${x.q.h} → ${x.a.h} · ${x.m}`})});
    break}
  /* Đọc P3: chọn từ điền vào chỗ trống, 6 từ A–F thuộc 6 nhóm khác nhau */
  for(let t=0;t<300;t++){
    const items=[],cats=new Set();
    for(const s of shuffle(ALLSENTS.filter(s=>!used.has(s.h)))){
      if(items.length>=5)break;
      const cand=s.tokens.map((x,i)=>[x,i]).filter(([x,i])=>FILLCAT.has(x)&&!cats.has(FILLCAT.get(x))&&s.tokens.filter(y=>y===x).length===1
        &&i>0&&!OPEN_PREV.has(s.tokens[i-1])&&!OPEN_NEXT.has(s.tokens[i+1])
        /* ngay sau đại từ, cả danh từ lẫn từ chỉ thời gian đều đặt được (我爸爸是… / 我晚上是…) */
        &&!(PRON.has(s.tokens[i-1])&&['noun','time'].includes(FILLCAT.get(x)))
        /* trước 点/岁/个…, sau 星期: số và từ để hỏi (七 / 几) đều đặt được */
        &&!(['number','qword'].includes(FILLCAT.get(x))&&(NUMSLOT.has(s.tokens[i+1])||s.tokens[i-1]==='星期')));
      if(!cand.length)continue;
      const [x,i]=cand[rand(cand.length)];
      if(items.some(o=>o.s.h.includes(x)||s.h.includes(o.w.h)))continue;
      items.push({s,w:WMAP.get(x),i});cats.add(FILLCAT.get(x))}
    if(items.length<5)continue;
    const extraCat=FILL.filter(c=>!cats.has(c.k));
    const extra=shuffle(extraCat.flatMap(c=>c.w)).find(w=>!items.some(o=>o.s.h.includes(w.h)||share(w.h,o.w.h)));
    if(!extra)continue;
    const bank=shuffle([...items.map(o=>o.w),extra]);
    items.forEach(o=>{used.add(o.s.h);
      /* giữ dấu câu: tìm vị trí từng từ trong câu gốc rồi thay từ thứ i */
      let cur=0,at=0;o.s.tokens.forEach((x,k)=>{const p=o.s.h.indexOf(x,cur);if(k===o.i)at=p;cur=p+x.length});
      const shown=o.s.h.slice(0,at)+'（　）'+o.s.h.slice(at+o.w.h.length);
      push('r',3,'Chọn từ điền vào chỗ trống',{q:{h:shown,p:''},word:o.w.h,kind:'bankw',bank,blank:o,opts:bank.map(w=>({h:w.h,p:w.p,ok:w.h===o.w.h})),exp:`${o.s.h} · ${o.s.p} · ${o.s.m}`})});
    break}
  /* Đọc P4: đọc câu + câu hỏi ★, chọn 1 trong 3 */
  const r4=[];
  for(const x of shuffle(STATE)){if(r4.length>=5)break;if(used.has(x.s.h)||r4.filter(z=>z.c.k===x.c.k).length>=2)continue;r4.push(x);used.add(x.s.h)}
  r4.forEach(x=>{const ds=pickDis(x.key,x.c.w,2,w=>x.s.tokens.includes(w.h)||x.s.h.includes(w.h));
    push('r',4,'Đọc câu, trả lời câu hỏi',{q:{h:x.s.h,p:x.s.p},star:x.c,word:x.key.h,kind:'txt',stem:x,
      opts:shuffle([x.key,...ds]).map(w=>({h:w.h,p:w.p,ok:w.h===x.key.h})),exp:`${x.s.m} · ★ ${x.c.qv} → ${x.key.h} (${x.key.m})`})});
  return Q;
}
/* kiểm tra một đề: đủ 40 câu, mỗi câu đúng một đáp án, không trùng đáp án, hình đủ, hình nhiễu không dính với nội dung */
function checkHsk(Q){
  const err=[],cnt={};
  Q.forEach((q,i)=>{const id=`${q.sec==='l'?'Nghe':'Đọc'} P${q.part} câu ${i+1}`;cnt[q.sec+q.part]=(cnt[q.sec+q.part]||0)+1;
    const ok=q.opts.filter(o=>o.ok).length; if(ok!==1)err.push(`${id}: ${ok} đáp án đúng`);
    const keys=q.opts.map(o=>o.pic||o.h); if(new Set(keys).size!==keys.length)err.push(`${id}: đáp án trùng nhau`);
    q.opts.forEach(o=>{if(o.pic&&!(A.EMOJI[o.pic]||[]).length)err.push(`${id}: thiếu hình ${o.pic}`)});
    if(q.opts.some(o=>o.pic)){const em=q.opts.map(o=>(A.EMOJI[o.pic]||[]).join(''));if(new Set(em).size!==em.length)err.push(`${id}: hai hình giống nhau`)}
    if(q.opts.length!==(q.kind==='pic3'||q.kind==='txt'?3:6))err.push(`${id}: số lựa chọn sai (${q.opts.length})`);
    if(q.kind==='bank')q.opts.forEach(o=>{if(!o.ok&&share(o.pic,q.txt))err.push(`${id}: hình nhiễu ${o.pic} dính chữ với nội dung`)});
    if(q.stem){if(!q.stem.s.tokens.includes(q.stem.key.h))err.push(`${id}: đáp án không có trong câu`);q.opts.forEach(o=>{if(!o.ok&&q.stem.s.h.includes(o.h))err.push(`${id}: đáp án nhiễu ${o.h} có trong câu`)})}
    if(q.kind==='bankw')q.opts.forEach(o=>{if(!o.ok&&q.blank.s.h.includes(o.h))err.push(`${id}: từ nhiễu ${o.h} có sẵn trong câu`)});
  });
  for(const k of ['l1','l2','l3','l4','r1','r2','r3','r4'])if(cnt[k]!==5)err.push(`Phần ${k}: có ${cnt[k]||0} câu, cần 5`);
  /* trong một phần nối A–F, mỗi đáp án chỉ dùng cho một câu */
  ['l3','r1','r2','r3'].forEach(k=>{const qs=Q.filter(q=>q.sec+q.part===k),a=qs.map(q=>q.opts.findIndex(o=>o.ok));if(new Set(a).size!==a.length)err.push(`Phần ${k}: hai câu cùng một đáp án`)});
  return err;
}
A.hskBuild=buildHsk; A.hskCheck=checkHsk; A.hskPools={QA,DPAIRS,SPIC,STATE,PICT};

const PNAME={l1:'Nghe · Phần 1',l2:'Nghe · Phần 2',l3:'Nghe · Phần 3',l4:'Nghe · Phần 4',r1:'Đọc · Phần 1',r2:'Đọc · Phần 2',r3:'Đọc · Phần 3',r4:'Đọc · Phần 4'};
const PDESC={l1:'Nghe, chọn hình đúng (A, B hoặc C).',l2:'Nghe câu hỏi, chọn câu trả lời đúng.',l3:'Nghe hội thoại, chọn hình phù hợp trong các hình A–F.',l4:'Nghe một đoạn và câu hỏi, chọn đáp án đúng.',
  r1:'Đọc câu, chọn hình phù hợp trong các hình A–F.',r2:'Chọn câu trả lời phù hợp (A–F) cho mỗi câu hỏi.',r3:'Chọn từ (A–F) điền vào chỗ trống.',r4:'Đọc câu, trả lời câu hỏi ★.'};
function hskRun(root){
  A.cleanup();
  let Q=buildHsk(),tries=0; while(checkHsk(Q).length&&tries++<20)Q=buildHsk();
  const ans=new Array(Q.length).fill(-1),plays=new Array(Q.length).fill(2),dur=HSK_MIN*60; let left=dur,done=false;
  const txt=o=>`<span class="htx"><span class="hz">${esc(o.h)}</span>${o.p?`<small>${esc(o.p)}</small>`:''}</span>`;
  const bankHTML=q=>q.kind==='bank'?`<div class="pbank">${q.bank.map((w,k)=>`<div class="pb"><kbd>${LET[k]}</kbd>${A.pic(w.h,52)}</div>`).join('')}</div>`
    :`<div class="tbank">${q.bank.map((w,k)=>`<div class="tb"><kbd>${LET[k]}</kbd>${txt(w)}</div>`).join('')}</div>`;
  const qhtml=(q,i)=>{const bank=q.kind!=='pic3'&&q.kind!=='txt';
    return `<div class="qitem" id="q${i}"><span class="qnum">Câu ${i+1}</span>
    ${q.audio?`<div class="row l"><button class="btn sm" data-play="${i}">${ICON.spk} Nghe <span>(còn 2 lần)</span></button></div>`:''}
    ${q.q?`<div class="qtext hq">${txt(q.q)}</div>`:''}
    ${q.star?`<div class="qtext hq star">★ ${txt({h:q.star.q,p:q.star.qp})}</div>`:''}
    <div class="opts ${q.kind==='pic3'?'pics':bank?'letters':'one'}">${q.opts.map((o,k)=>`<button class="opt" data-q="${i}" data-k="${k}" aria-label="${LET[k]}"><kbd>${LET[k]}</kbd>${bank?'':`<span>${o.pic?A.pic(o.pic,64):txt(o)}</span>`}</button>`).join('')}</div>
    <div class="qexp" id="x${i}"></div></div>`};
  const parts=['l1','l2','l3','l4','r1','r2','r3','r4'];
  root.innerHTML=`<div class="exhead"><b>Đề mô phỏng dạng HSK 1</b><span class="meta" id="eprog">Đã làm 0/40</span><span class="clock" id="eclock">${HSK_MIN}:00</span><button class="btn primary sm" id="esub">Nộp bài</button></div>
    <p class="meta" style="margin:6px 0 0">Đề luyện tập nội bộ mô phỏng dạng câu của đề HSK 1 mới, không phải đề thi chính thức.</p>
    ${parts.map((k,pi)=>{const qs=Q.map((q,i)=>[q,i]).filter(([q])=>q.sec+q.part===k);if(!qs.length)return '';
      return `${pi===0?'<h3 class="sect2">一、听力 · Nghe</h3>':pi===4?'<h3 class="sect2">二、阅读 · Đọc</h3>':''}
      <div class="hpart"><h4 class="eyebrow">${PNAME[k]} (câu ${qs[0][1]+1}–${qs[qs.length-1][1]+1})</h4><p class="meta">${PDESC[k]}</p>
      ${qs[0][0].bank?bankHTML(qs[0][0]):''}<div class="qlist">${qs.map(([q,i])=>qhtml(q,i)).join('')}</div></div>`}).join('')}
    <div class="row" style="margin-top:20px"><button class="btn primary" id="esub2">Nộp bài</button></div><div id="eres"></div>`;
  window.scrollTo(0,0);
  $$('[data-play]',root).forEach(b=>b.onclick=()=>{const i=+b.dataset.play;if(done||plays[i]<=0)return;plays[i]--;
    b.querySelector('span').textContent=plays[i]?`(còn ${plays[i]} lần)`:'(hết lượt nghe)';speak(Q[i].audio,false,b);if(!plays[i])b.disabled=true});
  $$('.opt',root).forEach(b=>b.onclick=()=>{if(done)return;const i=+b.dataset.q;ans[i]=+b.dataset.k;
    $$(`.opt[data-q="${i}"]`,root).forEach(x=>x.classList.toggle('sel',x===b));
    $('#eprog').textContent=`Đã làm ${ans.filter(a=>a>=0).length}/40`});
  const clock=$('#eclock');
  A.addTimer(setInterval(()=>{if(done)return;left--;clock.textContent=`${String(Math.floor(left/60)).padStart(2,'0')}:${String(left%60).padStart(2,'0')}`;clock.classList.toggle('low',left<300);if(left<=0)submit(true)},1000));
  let confirmT=0;
  const trySubmit=e=>{const blank=ans.filter(a=>a<0).length;
    if(blank&&Date.now()-confirmT>4000){confirmT=Date.now();e.currentTarget.textContent=`Còn ${blank} câu trống, bấm lần nữa để nộp`;return}
    submit(false)};
  $('#esub').onclick=trySubmit; $('#esub2').onclick=trySubmit;
  function submit(timeout){
    if(done)return; done=true; A.cleanup(); A.stopSpeak?A.stopSpeak():('speechSynthesis' in window&&speechSynthesis.cancel());
    const pc={};let l=0,r=0;
    Q.forEach((q,i)=>{const k=q.sec+q.part,ok=ans[i]>=0&&q.opts[ans[i]].ok;pc[k]=(pc[k]||0)+(ok?1:0);
      if(ok){q.sec==='l'?l++:r++} else if(q.word&&ans[i]>=0&&A.srs)A.srs.flag(q.word);
      $('#q'+i).classList.add(ok?'right':'wrong');
      $$(`.opt[data-q="${i}"]`,root).forEach((b,k)=>{b.disabled=true;if(q.opts[k].ok)b.classList.add('ok');else if(k===ans[i])b.classList.add('bad')});
      $$(`[data-play="${i}"]`,root).forEach(b=>{b.disabled=false;b.querySelector('span').textContent='(nghe lại)';b.onclick=()=>speak(q.audio,false,b)});
      $('#x'+i).innerHTML=`${ok?'<b style="color:var(--ok)">Đúng</b>':ans[i]<0?'<b style="color:var(--cinnabar)">Bỏ trống</b>':'<b style="color:var(--cinnabar)">Sai</b>'} · Đáp án ${LET[q.opts.findIndex(o=>o.ok)]} · ${esc(q.exp)}`;
    });
    const s=(l+r)*5,pass=s>=HSK_PASS;
    S.exams=(S.exams||[]).concat({d:new Date().toLocaleString('vi-VN',{dateStyle:'short',timeStyle:'short'}),l,r,s,mode:'hsk',max:HSK_MAX,pass:HSK_PASS,parts:parts.map(k=>pc[k]||0)}).slice(-30); save();
    A.addXP(10+(l+r),'Đề mô phỏng dạng HSK 1',`${s}/${HSK_MAX} điểm · Nghe ${l*5}/100 · Đọc ${r*5}/100`);
    $('#eres').innerHTML=`<div class="result" style="margin-top:24px"><div class="seal ${pass?'':'long'}">${pass?'合格':'加油'}</div>
      <h2>${s} / ${HSK_MAX} điểm</h2><p class="gloss">${timeout?'Hết giờ, bài đã được nộp. ':''}${pass?'Đạt (từ 120 điểm)':'Chưa đạt (cần 120 điểm), cố lên nhé'}</p>
      <div class="rstats"><div><b>${l*5}/100</b><small>Nghe</small></div><div><b>${r*5}/100</b><small>Đọc</small></div></div>
      <div class="hsk-parts">${parts.map(k=>`<div><span>${PNAME[k]}</span><b>${(pc[k]||0)*5}/25</b></div>`).join('')}</div>
      <p class="meta">Thang điểm tạm theo đề HSK 1 cũ (đề mới chưa công bố thang điểm). Đây là đề luyện tập, không phải đề thi chính thức.</p>
      <div class="row"><button class="btn primary" id="eagain">Làm đề mới</button><button class="btn" id="ehome">Xem lịch sử</button></div></div>`;
    $('#esub').disabled=true; $('#esub2').hidden=true;
    $('#eagain').onclick=()=>hskRun(root); $('#ehome').onclick=()=>examHome(root);
    $('#eres').scrollIntoView({block:'start'});
    A.toast(`Bạn được ${s}/${HSK_MAX} điểm. Kéo xuống để xem từng câu.`);
  }
}

/* =================================================================
   214 BỘ THỦ
   ================================================================= */
const RADS=window.RADICALS_RAW.trim().split('\n').map((l,i)=>{const [c,n,m,s]=l.split('|');const v=c.split(' ');return {no:i+1,c:v[0],vars:v,name:n,mean:m,st:+s}});
const ALIAS={'亻':'人','氵':'水','扌':'手','忄':'心','讠':'言','钅':'金','饣':'食','纟':'糸','艹':'艸','辶':'辵','刂':'刀','灬':'火','礻':'示','衤':'衣','犭':'犬','攵':'攴','王':'玉','阝':'阜','爫':'爪','⺮':'竹','罒':'网','乚':'乙','户':'戶','见':'見','贝':'貝','车':'車','门':'門','页':'頁','风':'風','飞':'飛','马':'馬','鱼':'魚','鸟':'鳥','长':'長','齿':'齒','龙':'龍','龟':'龜','韦':'韋','麦':'麥','黄':'黃','齐':'齊','⺌':'小','⺈':'刀','𠂉':'人','龰':'足','⺊':'卜','亠':'亠'};
const CHAR_RAD={}; (window.CHAR_RAD||'').split(' ').forEach(x=>{const a=[...x];if(a.length>=2)CHAR_RAD[a[0]]=a.slice(1).join('')});
function radOf(r){return RADS.find(x=>x.vars.includes(r))||RADS.find(x=>x.vars.includes(ALIAS[r]))}
function radExamples(rad){
  return Object.entries(CHAR_RAD).filter(([c,r])=>radOf(r)===rad).map(([c])=>ALLWORDS.find(w=>w.h===c)).filter(Boolean);
}
A.register('bothu',root=>{A.setMain(root);radView(root,0,'')});
function radView(root,st,q,sel){
  A.cleanup();
  const list=RADS.filter(r=>(!st||r.st===st)&&(!q||(r.name+' '+r.mean).toLowerCase().includes(q.toLowerCase())||r.vars.includes(q)));
  const cur=sel?RADS.find(r=>r.no===sel):null;
  const strokes=[...new Set(RADS.map(r=>r.st))];
  root.innerHTML=`<h2 class="sect">214 bộ thủ</h2>
  <p class="lead">Bộ thủ là thành phần gợi nghĩa của chữ Hán. Nhận ra bộ thủ giúp đoán nghĩa và nhớ chữ nhanh hơn, ví dụ chữ có bộ 氵 thường liên quan đến nước: 洗 rửa, 汉 sông Hán.</p>
  <div class="ctrl"><input id="rq" placeholder="Tìm theo tên hoặc nghĩa, ví dụ: thủy, nước" value="${esc(q)}" style="font:inherit;padding:8px 12px;border:1px solid var(--line);border-radius:10px;background:var(--surface);color:var(--ink);min-width:0;flex:1;max-width:340px">
    <button class="btn sm primary" id="rgame">Chơi đoán nghĩa bộ thủ</button></div>
  <div class="ctrl"><span>Số nét</span><div class="seg" id="rst"><button data-s="0" class="${!st?'on':''}">Tất cả</button>${strokes.map(s=>`<button data-s="${s}" class="${st===s?'on':''}">${s}</button>`).join('')}</div></div>
  ${cur?radDetail(cur):''}
  <p class="eyebrow">${list.length} bộ thủ</p>
  <div class="rgrid">${list.map(r=>`<button class="rcell" data-n="${r.no}"><span class="no">#${r.no} · ${r.st} nét</span><span class="hz">${r.vars.join(' ')}</span><b>${esc(r.name)}</b><small>${esc(r.mean)}</small></button>`).join('')}</div>`;
  $('#rq').oninput=e=>{const v=e.target.value;clearTimeout(radView._t);radView._t=setTimeout(()=>{radView(root,st,v,sel);const i=$('#rq');i.focus();i.setSelectionRange(v.length,v.length)},250)};
  $$('#rst button').forEach(b=>b.onclick=()=>radView(root,+b.dataset.s,q,sel));
  $$('.rcell',root).forEach(b=>b.onclick=()=>{radView(root,st,q,+b.dataset.n);window.scrollTo({top:0,behavior:'smooth'})});
  const rs=$('#rsay'); if(rs)rs.onclick=()=>speak(cur.c,false,rs);
  $$('.exw [data-h]',root).forEach(b=>b.onclick=()=>speak(b.dataset.h));
  $('#rgame').onclick=()=>radGame(root);
}
function radDetail(r){
  const ex=radExamples(r);
  return `<div class="rdetail"><span class="hz">${r.vars.join(' ')}</span>
    <div><b style="font-size:18px">Bộ ${esc(r.name)}</b> <span class="meta">· #${r.no} · ${r.st} nét</span> <button class="btn sm" id="rsay">${ICON.spk}</button></div>
    <div>Nghĩa: <b>${esc(r.mean)}</b></div>
    <div class="exw">${ex.length?ex.slice(0,12).map(w=>`<span data-h="${w.h}" style="cursor:pointer"><b class="hz">${w.h}</b> ${pyPlain(w.p)} · ${esc(w.m)}</span>`).join(''):'<span class="meta">Chưa có chữ HSK 1 dùng bộ này làm bộ chính</span>'}</div></div>`;
}
function radGame(root){
  const common=RADS.filter(r=>radExamples(r).length||r.st<=4);
  const rounds=sample(common,10).map(r=>{const ds=shuffle(RADS.filter(x=>x.mean!==r.mean)).slice(0,3);const ex=radExamples(r).slice(0,3);
    return {prompt:`<div class="q">Bộ thủ này có nghĩa là gì?</div><div class="big">${r.vars.join(' ')}</div>`,
      options:shuffle([r,...ds]).map(x=>({ok:x===r,html:`${esc(x.mean)} <span class="meta">(${esc(x.name)})</span>`})),
      reveal:`Bộ ${esc(r.name)} · ${esc(r.mean)}${ex.length?' · ví dụ: '+ex.map(w=>w.h).join(' '):''}`}});
  A.runMC({key:'rad',title:'Đoán nghĩa bộ thủ',rounds,replay:()=>radGame(root),back:()=>radView(root,0,'')});
}

/* =================================================================
   HỘI THOẠI
   ================================================================= */
const DLG=window.DIALOGS.map(d=>({...d,lines:d.lines.map(([who,s,p,m])=>({who,...A.mkSent(s,p,m,0)}))}));
A.register('hoithoai',root=>{A.setMain(root);dlgView(root,S.dlg||0)});
function dlgView(root,idx){
  A.cleanup(); S.dlg=idx; save();
  const d=DLG[idx]; let role=null, running=false;
  root.innerHTML=`<h2 class="sect">Hội thoại</h2>
  <p class="lead">Chọn một tình huống, nghe cả đoạn rồi đóng vai một người. Đến lượt bạn, đọc câu của mình vào micro; web hiện chữ trình duyệt nhận diện được và độ khớp nhận diện văn bản (chỉ để tham khảo, không phải điểm phát âm).</p>
  ${A.voicePicker()}
  <div class="dlist">${DLG.map((x,i)=>`<button class="gcard" data-d="${i}" style="${i===idx?'border-color:var(--jade);background:var(--jade-soft)':''}"><span class="ghz">${x.hz}</span><b>${i+1}. ${esc(x.t)}</b><small>${x.lines.length} câu</small></button>`).join('')}</div>
  <div class="ctrl"><button class="btn primary sm" id="dplay">${ICON.play} Nghe cả bài</button><button class="btn sm" id="droleA">Đóng vai A</button><button class="btn sm" id="droleB">Đóng vai B</button><button class="btn sm" id="dorder">Luyện xếp câu</button>
    <label><input type="checkbox" id="dpy"> Ẩn pinyin</label><label><input type="checkbox" id="dvi"> Ẩn nghĩa</label></div>
  <div class="note" id="dmsg">Chạm vào từng câu để nghe riêng câu đó.</div>
  <div class="bubbles" id="bubs">${d.lines.map((l,i)=>`<div class="bub ${l.who}" id="b${i}"><span class="who">${l.who}</span><div class="body" data-i="${i}"><span class="hz">${l.h}</span><span class="p">${esc(l.p)}</span><span class="m">${esc(l.m)}</span><span class="sc" id="sc${i}"></span></div></div>`).join('')}</div>`;
  $$('[data-d]',root).forEach(b=>b.onclick=()=>dlgView(root,+b.dataset.d)); A.bindPicker();
  const bubs=$('#bubs');
  $('#dpy').onchange=e=>bubs.classList.toggle('hidepy',e.target.checked);
  $('#dvi').onchange=e=>bubs.classList.toggle('hidevi',e.target.checked);
  $$('.body',root).forEach(b=>b.onclick=()=>{if(!running)speak(d.lines[b.dataset.i].h)});
  const msg=t=>$('#dmsg').innerHTML=t;
  let stop=false; A.onCleanup(()=>{stop=true;A.stopListen()});
  const hl=i=>$$('.bub',root).forEach((b,j)=>b.classList.toggle('on',j===i));
  async function playAll(){
    if(running)return; running=true; stop=false; msg('Đang phát… chạm “Nghe cả bài” lần nữa để dừng.');
    for(let i=0;i<d.lines.length&&!stop;i++){hl(i);$('#b'+i).scrollIntoView({block:'nearest'});await speak(d.lines[i].h);await new Promise(r=>setTimeout(r,350))}
    hl(-1); running=false; if(!stop)msg('Xong. Thử đóng vai A hoặc B nhé.');
  }
  $('#dplay').onclick=()=>{if(running){stop=true;speechSynthesis.cancel();A.stopListen();running=false;hl(-1);msg('Đã dừng.')}else playAll()};
  async function rolePlay(r){
    if(running){stop=true;speechSynthesis.cancel();A.stopListen();await new Promise(x=>setTimeout(x,200))}
    if(!A.SR){msg(A.speech.errorHelp('unsupported'));return}
    if(A.speech.consentNeeded()){msg(A.speech.consentHTML());A.speech.bindConsent(()=>rolePlay(r));return}
    role=r; running=true; stop=false; const scores=[];
    $$('.bub',root).forEach(b=>b.classList.toggle('mine',b.classList.contains(r)));
    for(let i=0;i<d.lines.length&&!stop;i++){
      const l=d.lines[i]; hl(i); $('#b'+i).scrollIntoView({block:'nearest'});
      if(l.who!==r){msg(`Người ${l.who} đang nói…`);await speak(l.h);await new Promise(x=>setTimeout(x,300));continue}
      msg(`<b>Đến lượt bạn.</b> Hãy đọc: <span class="hz" style="font-weight:700">${l.h}</span>`);
      let alts=[]; try{alts=await A.listen()}catch(e){msg(A.speech.errorHelp(e.message));break}
      const res=A.bestMatch(l.h,alts); scores.push(res.score);
      $('#sc'+i).textContent=alts.length?`Máy nhận diện: ${alts[0]} · khớp ${res.score}% (tham khảo)`:'Máy chưa nhận diện được, hãy nghe lại mẫu';
      $('#sc'+i).style.color='var(--muted)';
    }
    hl(-1); running=false;
    if(scores.length&&!stop){const avg=Math.round(scores.reduce((a,b)=>a+b,0)/scores.length);msg(`Hoàn thành vai ${r}. Độ khớp nhận diện trung bình ${avg}% (tham khảo). Hãy nghe lại những câu máy chưa nhận diện đủ.`);A.addXP(5+scores.length,"Hội thoại: "+d.t,`Đóng vai ${r} · ${scores.length} câu`)}
  }
  $('#droleA').onclick=()=>rolePlay('A'); $('#droleB').onclick=()=>rolePlay('B');
  $('#dorder').onclick=()=>{const R=d.lines.filter(l=>l.tokens.length>1);A.orderGame(shuffle([...R]).slice(0,5),'Xếp câu · '+d.t,{back:()=>dlgView(root,idx),replay:()=>$('#dorder')&&dlgView(root,idx),bestKey:null,listenMode:true})};
}

/* =================================================================
   NGỮ PHÁP & LƯỢNG TỪ
   ================================================================= */
A.register('nguphap',root=>{gramView(root,S.gTab||'g')});
function gramView(root,tab){
  A.cleanup(); S.gTab=tab; save();
  root.innerHTML=`<h2 class="sect">Lượng từ & ngữ pháp</h2>
  <p class="lead">Các điểm ngữ pháp cơ bản của HSK 1 và những lượng từ hay gặp nhất. Mỗi phần đều có bài tập ngắn.</p>
  <nav class="tabs" id="gtabs">${[['g','Ngữ pháp'],['m','Lượng từ'],['q','Bài tập']].map(([k,l])=>`<button class="tab ${k===tab?'on':''}" data-t="${k}">${l}</button>`).join('')}</nav><div id="gmain"></div>`;
  $('#gtabs').onclick=e=>{const b=e.target.closest('.tab');if(b)gramView(root,b.dataset.t)};
  const M=$('#gmain'); A.setMain(M);
  if(tab==='g'){
    /* "học ở Bài N": bài được gán tự động trong js/grammar.js, bấm để mở tab Ngữ pháp của bài đó */
    M.innerHTML=`<div class="gpoints">${A.gram.list.map(x=>A.gram.card(x,{num:x.i+1,unitLink:true})).join('')}</div>`;
  } else if(tab==='m'){
    M.innerHTML=`<div class="tscroll"><table class="mtable"><thead><tr><th>Lượng từ</th><th>Dùng cho</th><th>Ví dụ</th></tr></thead><tbody>
      ${window.MEASURE.map(([h,p,u,ex])=>`<tr><td><button class="btn sm" data-h="${h}"><span class="hz" style="font-size:20px">${h}</span> ${p}</button></td><td>${esc(u)}</td><td><span class="hz" style="font-size:17px;font-weight:700;cursor:pointer" data-h="${esc(ex.replace(/ · /g,'，'))}">${esc(ex)}</span></td></tr>`).join('')}
    </tbody></table></div>
    <div class="gp" style="margin-top:14px"><p><b>Công thức:</b> Số từ + Lượng từ + Danh từ, ví dụ <span class="hz">三本书</span> (ba quyển sách). Với số 2 dùng <span class="hz">两</span>: <span class="hz">两个人</span>, không nói 二个人. Với <span class="hz">这 / 那 / 哪</span> cũng cần lượng từ: <span class="hz">这个</span>, <span class="hz">那本书</span>.</p></div>`;
  } else {
    A.menu(M,[
      {k:'gq',hz:'语法',name:'Bài tập ngữ pháp',d:'Chọn từ đúng điền vào chỗ trống, 12 câu từ các điểm ngữ pháp HSK 1.',run:gQuiz},
      {k:'mq',hz:'量词',name:'Chọn lượng từ',d:'Điền lượng từ phù hợp cho cụm danh từ, 10 câu.',run:mQuiz},
      {k:'oq',hz:'造句',name:'Sắp xếp câu',d:'Xếp các từ thành câu đúng trật tự, nhìn nghĩa tiếng Việt.',run:oQuiz}
    ]);
  }
  $$('[data-h]',M).forEach(b=>b.onclick=()=>speak(b.dataset.h,false,b.classList.contains('btn')?b:null));
  const back=()=>gramView(root,'q');
  function gQuiz(){
    const all=window.GRAMMAR.flatMap(g=>g.q.map(q=>({g,q})));
    const rounds=sample(all,12).map(({g,q})=>{const [s,opts,m]=q;const full=s.includes('___');
      return {prompt:`<div class="q">${esc(g.t)}</div><div class="mid">${esc(s.replace('___','＿＿'))}</div><div class="q">${esc(m)}</div>`, cols:full?'':'one',
        options:shuffle(opts.map((o,k)=>({ok:k===0,html:`<span class="hz" style="font-size:${full?26:20}px">${esc(o)}</span>`}))),
        reveal:`Công thức: ${esc(g.f)}`, after:ok=>{if(full)speak(s.replace('___',opts[0]))}}});
    A.runMC({key:'gq',title:'Bài tập ngữ pháp',rounds,replay:gQuiz,back});
  }
  function mQuiz(){
    const M2=window.MEASURE, items=[];
    M2.forEach(([h,p,u,ex])=>ex.split(' · ').forEach(e=>{if(e.includes(h))items.push({h,e})}));
    const rounds=sample(items,10).map(it=>{const ds=shuffle(M2.filter(x=>x[0]!==it.h&&!it.e.includes(x[0]))).slice(0,3).map(x=>x[0]);
      return {prompt:`<div class="q">Chọn lượng từ phù hợp</div><div class="mid">${esc(it.e.replace(it.h,'＿'))}</div>`,
        options:shuffle([it.h,...ds]).map(x=>({ok:x===it.h,html:`<span class="hz">${x}</span>`})),
        reveal:`<span class="hz" style="font-weight:700">${esc(it.e)}</span>`, after:()=>speak(it.e)}});
    A.runMC({key:'mq',title:'Chọn lượng từ',rounds,replay:mQuiz,back});
  }
  function oQuiz(){
    const R=shuffle(ALLSENTS.filter(s=>s.tokens.length>=3&&s.tokens.length<=6)).slice(0,6);
    A.orderGame(R,'Sắp xếp câu',{back,replay:oQuiz,bestKey:'oq-'+S.unit,listenMode:false});
  }
}
})();
