/* ================= Bảng điều khiển học tập (trang chủ) · lộ trình · điểm yếu =================
   Mọi số liệu được TÍNH từ dữ liệu học thật (S.review, S.days, S.done, S.stats, S.speak, S.wrote, S.exams…).
   Ghi nhận lỗi: các bài trắc nghiệm gọi A.track(cfg, round, chọn, đúng/sai) để lưu bộ đếm phẳng trong S.stats
   (dạng "khóa": số), gộp được giữa các máy bằng cách lấy giá trị lớn nhất. */
(function(){
const A=window.App, {S,save,$,$$,esc,UNITS,ALLWORDS,toneOf}=A;
const R=()=>A.srs;

/* ---------- ghi nhận kết quả từng câu ---------- */
function bump(k,n=1){if(!S.stats||typeof S.stats!=='object')S.stats={};S.stats[k]=(S.stats[k]||0)+n}
const st=k=>(S.stats||{})[k]||0;
function track(cfg,r,k,ok){
  const now=Date.now(), key=cfg&&cfg.key;
  /* tỷ lệ sai theo bài */
  const U=(r.word&&r.word.U)||(r.sent&&r.sent.U)||(key&&['ptone','ppair','pword','rad','gq','mq'].includes(key)?0:S.unit);
  if(U){bump(`u:${U}:a`);if(!ok)bump(`u:${U}:w`)}
  /* thanh điệu: so từng âm tiết giữa đáp án đúng và đáp án đã chọn */
  if(key==='ptone'&&r.options){
    const right=r.options.find(o=>o.ok); if(right&&right.tone){bump(`ta:${right.tone}`); if(!ok&&k>=0&&r.options[k].tone){bump(`tw:${right.tone}`);bump(`tc:${right.tone}>${r.options[k].tone}`)}}
  }
  if((key==='tone'||key==='pword')&&r.options){
    const right=r.options.find(o=>o.ok), pick=k>=0?r.options[k]:null;
    if(right&&right.p){
      const a=right.p.split(' '), b=pick&&pick.p?pick.p.split(' '):[];
      a.forEach((s,j)=>{const t=toneOf(s); if(!t)return; bump(`ta:${t}`);
        if(!ok&&b[j]){const u=toneOf(b[j]); if(u&&u!==t){bump(`tw:${t}`);bump(`tc:${t}>${u}`)}}});
    }
  }
  /* cặp âm dễ nhầm */
  if(key==='ppair'&&r.pair){bump(`pa:${r.pair}`);if(!ok)bump(`pw:${r.pair}`)}
  /* câu nghe / xếp câu */
  if((key==='lsent'||key==='order')&&r.sent){const h=r.sent.h;bump(`sa:${h}`);if(ok)S.stats[`slr:${h}`]=now;else{bump(`sw:${h}`);S.stats[`slw:${h}`]=now}}
}
A.track=track;

/* ---------- mở thẳng một bài luyện từ nút gợi ý ---------- */
let autorun=null;
A.takeAutorun=area=>{if(autorun&&autorun.area===area){const k=autorun.k;autorun=null;return k}return null};
function go(step){
  if(step.prep)step.prep();
  if(step.auto)autorun={area:step.auto[0],k:step.auto[1]};
  save();
  const h='#'+step.route;
  if(location.hash===h)A.route(); else location.hash=step.route;
}

/* ---------- tiến độ ---------- */
const wordsOf=n=>UNITS[n-1].words;
function introduced(ws){return ws.filter(w=>R().status(w.h)!=='new').length}
function unitSteps(n){
  const u=UNITS[n-1], ws=u.words, intro=introduced(ws), d=k=>(S.done||{})[`${k}-${n}`]>0;
  const spoke=u.sents.some(s=>(S.speak||{})[s.h]!=null);
  const steps=[
    {k:'vocab',t:`Học từ mới bài ${n} bằng flashcard`,detail:`${intro}/${ws.length} từ đã học`,done:intro===ws.length,
      route:'hoc',prep:()=>{S.unit=n;S.tab='flash';S.fscope='unit';S.prev=false}},
    /* chỉ bài có điểm ngữ pháp (js/grammar.js); xong khi đã làm bài tập ngữ pháp của bài (S.done['gram-n']) */
    ...(A.gram&&A.gram.forUnit(n).length?[{k:'gram',t:`Ngữ pháp bài ${n}`,detail:A.gram.forUnit(n).map(x=>x.g.t).join(' · '),done:d('gram'),
      route:'hoc',prep:()=>{S.unit=n;S.tab='gram';S.prev=false}}]:[]),
    {k:'lword',t:`Nghe từ bài ${n}`,detail:'Nghe rồi chọn chữ Hán đúng',done:d('lword'),route:'hoc',prep:()=>{S.unit=n;S.tab='listen';S.prev=false},auto:['listen','lword']},
    {k:'lsent',t:`Nghe hiểu câu mẫu bài ${n}`,detail:`${u.sents.length} câu mẫu`,done:d('lsent'),route:'hoc',prep:()=>{S.unit=n;S.tab='listen';S.prev=false},auto:['listen','lsent']},
    {k:'lorder',t:`Ghép từ thành câu bài ${n}`,detail:'Nghe và xếp câu đúng thứ tự',done:d('lorder'),route:'hoc',prep:()=>{S.unit=n;S.tab='listen';S.prev=false},auto:['listen','lorder']},
    {k:'speak',t:`Đọc to câu mẫu bài ${n}`,detail:'Nghe mẫu rồi đọc lại',done:spoke||!A.SR,optional:!A.SR,route:'noi',prep:()=>{S.unit=n;S.spMode='sent';S.prev=false}},
    {k:'quiz',t:`Kiểm tra ngắn bài ${n}`,detail:'Thử thách tốc độ 10 câu',done:d('speed'),route:'hoc',prep:()=>{S.unit=n;S.tab='game';S.prev=false},auto:['game','speed']},
  ];
  const skip=S.skipSteps||{};
  steps.forEach(s=>{s.id=`u${n}-${s.k}`;if(skip[s.id])s.done=true,s.skipped=true});
  return steps;
}
const unitDone=n=>unitSteps(n).every(s=>s.done);
function pinyinSteps(){
  const v=S.pyDone||{}, acc=(a,w)=>{const x=st(a);return {n:x,ok:x>=10&&(x-st(w))/x>=0.7,pct:x?Math.round((x-st(w))/x*100):0}};
  const ta=[1,2,3,4].reduce((s,t)=>s+st(`ta:${t}`),0), tw=[1,2,3,4].reduce((s,t)=>s+st(`tw:${t}`),0);
  const toneOk=ta>=10&&(ta-tw)/ta>=0.7;
  let pa=0,pw=0; for(const [k,x] of Object.entries(S.stats||{})){if(k.startsWith('pa:'))pa+=x;if(k.startsWith('pw:'))pw+=x}
  const pairOk=pa>=10&&(pa-pw)/pa>=0.7;
  const wordAcc=(S.done||{}); const pwordDone=Object.keys(wordAcc).some(k=>k.startsWith('pword-'));
  const steps=[
    {k:'tone',t:'Nhận biết 4 thanh điệu',detail:v.tone?(ta?`Đúng ${Math.round((ta-tw)/ta*100)}% trên ${ta} lượt nghe thanh`:'Đã xem, hãy làm bài nghe đoán thanh'):'Nghe mẫu 4 thanh và quy tắc biến điệu',done:!!v.tone&&toneOk,
      route:'pinyin',prep:()=>{S.pyTab=v.tone?'prac':'tone'},auto:v.tone?['pinyin','ptone']:null},
    {k:'ini',t:'Học thanh mẫu',detail:'23 phụ âm đầu, có âm thanh mẫu',done:!!v.ini,route:'pinyin',prep:()=>{S.pyTab='ini'}},
    {k:'fin',t:'Học vận mẫu',detail:'36 vần, quy tắc viết yi, wu, yu',done:!!v.fin,route:'pinyin',prep:()=>{S.pyTab='fin'}},
    {k:'ghep',t:'Ghép âm: nghe chọn pinyin',detail:'Nghe chữ rồi chọn cách ghi pinyin đúng',done:pwordDone,route:'pinyin',prep:()=>{S.pyTab='prac'},auto:['pinyin','pword']},
    {k:'pair',t:'Phân biệt cặp âm dễ nhầm',detail:pa?`Đúng ${Math.round((pa-pw)/pa*100)}% trên ${pa} lượt`:'zh/z, ch/c, sh/s, j/q…',done:pairOk,route:'pinyin',prep:()=>{S.pyTab='prac'},auto:['pinyin','ppair']},
  ];
  const skip=S.skipSteps||{};
  steps.forEach(s=>{s.id=`py-${s.k}`;if(skip[s.id])s.done=true,s.skipped=true});
  return steps;
}
const pinyinDone=()=>S.track==='pinyin'||pinyinSteps().every(s=>s.done);

/* ---------- bước học tiếp theo ---------- */
function nextStep(){
  if(!S.track)return null;
  if(S.track==='zero'&&!pinyinDone()){const s=pinyinSteps().find(x=>!x.done);return {...s,phase:'Phát âm và pinyin'}}
  const due=R().counts().dueTotal;
  if(due>0)return {id:'review',k:'review',t:`Ôn ${due} từ đến hạn`,detail:'Ôn trước rồi mới học bài mới để không quên từ cũ',phase:'Ôn tập',route:'hoc',prep:()=>{S.tab='flash';S.fscope='all'},noskip:true};
  const cur=Math.min(Math.max(1,S.unit||1),UNITS.length);
  let n=cur; if(unitDone(cur)){const nx=UNITS.find(u=>u.n>cur&&!unitDone(u.n))||UNITS.find(u=>!unitDone(u.n)); n=nx?nx.n:0}
  if(!n)return {id:'exam',k:'exam',t:'Làm bài kiểm tra tổng hợp cấp 1',detail:'Bạn đã đi hết các bài, hãy kiểm tra lại toàn bộ',phase:'Ôn tập và kiểm tra',route:'thi',noskip:true};
  const s=unitSteps(n).find(x=>!x.done);
  if(s.k==='vocab'&&R().newLeft()===0)return {id:'newdone',k:'newdone',t:'Đã học đủ từ mới hôm nay',detail:`Bạn đặt ${R().newPerDay()} từ mới/ngày. Có thể luyện nghe bài ${n} hoặc học thêm từ mới.`,phase:`Bài ${n}`,route:'hoc',prep:()=>{S.unit=n;S.tab='listen'},noskip:true,alt:true};
  return {...s,phase:`Bài ${n}: ${UNITS[n-1].t}`};
}

/* ---------- số liệu ---------- */
function overview(){
  const c=R().counts(), total=ALLWORDS.length;
  const learning=c.learning+c['learning-due']+c.review+c.due+c.overdue;
  const minutes=Object.values(S.days||{}).reduce((a,d)=>a+(d.min||0),0);
  const intro=total-c.new;
  return {streak:S.streak||0,minutes,learning,mastered:c.mastered,intro,total,pct:Math.round(intro/total*100),unitsDone:UNITS.filter(u=>unitDone(u.n)).length,units:UNITS.length};
}
function fmtMin(m){if(m<60)return `${m} phút`;const h=Math.floor(m/60);return `${h} giờ${m%60?` ${m%60} phút`:''}`}
function weakSentences(){
  return Object.keys(S.stats||{}).filter(k=>k.startsWith('slw:')).map(k=>k.slice(4))
    .filter(h=>st('slw:'+h)>st('slr:'+h)).map(h=>A.ALLSENTS.find(s=>s.h===h)).filter(Boolean)
    .sort((a,b)=>st('slw:'+b.h)-st('slw:'+a.h));
}
function toneConfusions(){
  return Object.keys(S.stats||{}).filter(k=>k.startsWith('tc:')).map(k=>{const [a,b]=k.slice(3).split('>');return {a:+a,b:+b,n:st(k)}}).sort((x,y)=>y.n-x.n);
}
function pairWeak(){
  return Object.keys(S.stats||{}).filter(k=>k.startsWith('pa:')).map(k=>{const p=k.slice(3),a=st(k),w=st('pw:'+p);return {p,a,w,r:a?w/a:0}}).filter(x=>x.w>0).sort((x,y)=>y.r-x.r||y.w-x.w);
}
function unitWeak(){
  return UNITS.map(u=>{const a=st(`u:${u.n}:a`),w=st(`u:${u.n}:w`);return {u,a,w,r:a?w/a:0}}).filter(x=>x.a>=8&&x.w>0).sort((x,y)=>y.r-x.r);
}
/* bài đang học: bài đang chọn, hoặc bài kế tiếp chưa xong nếu bài đang chọn đã hoàn thành */
function activeUnit(){const cur=Math.min(Math.max(1,S.unit||1),UNITS.length);if(!unitDone(cur))return cur;const nx=UNITS.find(u=>u.n>cur&&!unitDone(u.n))||UNITS.find(u=>!unitDone(u.n));return nx?nx.n:cur}
function today(){
  const c=R().counts(), cur=activeUnit();
  const newAvail=UNITS.filter(u=>u.n<=cur).flatMap(u=>u.words).filter(w=>R().status(w.h)==='new').length;
  const newSuggest=Math.min(R().newLeft(),newAvail);
  const u=UNITS[cur-1], listenUnit=(S.done||{})[`lsent-${cur}`]>0?0:u.sents.length;
  const ws=weakSentences().length;
  /* hoạt động ngắn: chọn theo điểm yếu thật, nếu chưa có thì gợi ý Mưa từ vựng */
  const tc=toneConfusions()[0], pw=pairWeak()[0];
  let act;
  if(tc&&tc.n>=2)act={t:'Bắt thanh điệu',d:`Bạn hay nghe thanh ${tc.a} thành thanh ${tc.b}`,route:'pinyin',prep:()=>{S.pyTab='prac'},auto:['pinyin','ptone']};
  else if(pw&&pw.w>=2)act={t:'Phân biệt cặp âm',d:`Cặp ${pw.p} sai ${pw.w}/${pw.a} lần`,route:'pinyin',prep:()=>{S.pyTab='prac'},auto:['pinyin','ppair']};
  else act={t:'Mưa từ vựng 3 phút',d:'Gõ pinyin để ôn nhanh từ đã học',route:'mua'};
  return {due:c.dueTotal,overdue:c.overdue,newSuggest,listen:listenUnit+ws,listenUnit,ws,cur,act};
}

/* ---------- giao diện ---------- */
function ctaBlock(){
  if(!S.track) return `<div class="entry"><p class="entry-q">Bạn bắt đầu từ đâu?</p>
    <div class="entry-opts"><button class="btn primary" data-track="zero" type="button">Tôi chưa biết tiếng Trung</button>
    <button class="btn" data-track="pinyin" type="button">Tôi đã biết pinyin, muốn học từ vựng</button></div>
    <p class="cta-note">Chọn để web gợi ý bài học tiếp theo. Đổi lại được bất cứ lúc nào ở phần Lộ trình.</p></div>`;
  const s=nextStep();
  if(!s)return '';
  return `<div class="cta nextcta"><p class="eyebrow">${esc(s.phase||'Bước tiếp theo')}</p>
    <button class="btn primary bigbtn" id="dgo" type="button">Bắt đầu bài học tiếp theo</button>
    <p class="nexttitle"><b>${esc(s.t)}</b><span>${esc(s.detail||'')}</span></p>
    ${s.noskip?'':`<button class="linkbtn" id="dskip" type="button">Bỏ qua bước này, tôi đã biết</button>`}</div>`;
}
function todayBlock(){
  if(!S.track)return '';                       // chưa chọn điểm xuất phát: để người học chọn trước
  if(S.track==='zero'&&!pinyinDone())return pinyinTodayBlock();
  const t=today();
  const card=(id,n,label,sub,btn)=>`<div class="tdcard" ${id?`data-go="${id}"`:''}><b>${n}</b><span>${label}</span><small>${sub}</small>${btn?`<em>${btn} →</em>`:''}</div>`;
  return `<section class="dsec"><h2 class="eyebrow">Việc cần làm hôm nay</h2><div class="tdgrid">
    ${card('due',t.due,'từ cần ôn',t.overdue?`${t.overdue} từ quá hạn`:'đến hạn hôm nay',t.due?'Ôn ngay':'')}
    ${card('new',t.newSuggest,'từ mới nên học',`còn ${R().newLeft()}/${R().newPerDay()} lượt hôm nay`,t.newSuggest?'Học từ mới':'')}
    ${card('listen',t.listen,'câu cần luyện nghe',t.ws?`${t.ws} câu nghe sai gần đây`:t.listenUnit?`câu mẫu bài ${t.cur} chưa luyện`:'đã luyện câu mẫu bài này',t.listen?'Luyện nghe':'')}
    <div class="tdcard act" data-go="act"><b class="hz">练</b><span>${esc(t.act.t)}</span><small>${esc(t.act.d)}</small><em>Luyện →</em></div>
  </div>${sessionPlan(t)}</section>`;
}
/* người mới, chưa xong phần phát âm: chỉ gợi ý các bước pinyin, chưa đẩy từ mới hay luyện nghe câu */
function pinyinTodayBlock(){
  const left=pinyinSteps().map((x,i)=>({...x,i})).filter(x=>!x.done).slice(0,3);
  return `<section class="dsec"><h2 class="eyebrow">Việc cần làm hôm nay</h2><div class="tdgrid">
    ${left.map((x,j)=>`<div class="tdcard" data-py="${x.i}"><b>${j+1}</b><span>${esc(x.t)}</span><small>${esc(x.detail||'')}</small><em>${j?'Luyện':'Bắt đầu'} →</em></div>`).join('')}
  </div><p class="meta">Học xong phần phát âm, web sẽ gợi ý từ mới và bài nghe của Bài 1. Đã biết pinyin? Bấm “Đổi lựa chọn” trong Lộ trình học.</p></section>`;
}
/* đã có dữ liệu học chưa (để không hiện một loạt ô số 0 cho người mới) */
function hasData(){
  return Object.keys(S.review||{}).length>0||Object.keys(S.stats||{}).length>0||(S.exams||[]).length>0||Object.keys(S.speak||{}).length>0||Object.keys(S.wrote||{}).length>0;
}
function sessionPlan(t){
  const len=S.sessionMin||15, k=len/15;
  const rows=[
    t.due?[`Ôn ${t.due} từ đến hạn`,Math.round(6*k)]:null,
    t.newSuggest?[`Học ${Math.min(t.newSuggest,Math.round(10*k))} từ mới`,Math.round(6*k)]:null,
    [`Nghe từ / câu bài ${t.cur}`,Math.round(3*k)],
    [`Luyện nói hoặc ngữ pháp`,Math.round(4*k)],
  ].filter(Boolean);
  return `<details class="plan"><summary>Gợi ý buổi học ${len} phút</summary>
    <div class="ctrl" style="margin:8px 0"><span>Thời lượng</span><div class="seg" id="dlen">${[10,15,20].map(m=>`<button data-m="${m}" class="${m===len?'on':''}">${m} phút</button>`).join('')}</div></div>
    <ol>${rows.map(r=>`<li><span>${esc(r[0])}</span><small>~${r[1]} phút</small></li>`).join('')}</ol>
    <p class="meta">Chỉ là gợi ý, bạn có thể học theo thứ tự khác.</p></details>`;
}
function overviewBlock(){
  if(!hasData())return '';
  const o=overview();
  return `<section class="dsec"><h2 class="eyebrow">Tổng quan tiến độ</h2><div class="kpis dk">
    <div class="kpi"><small>Chuỗi ngày học</small><b>${o.streak}<em> ngày</em></b><span>Tổng thời gian ${fmtMin(o.minutes)}</span></div>
    <div class="kpi"><small>Đang học</small><b>${o.learning}<em> từ</em></b><span>Đã bắt đầu học, chưa nhớ dài hạn</span></div>
    <div class="kpi"><small>Nhớ dài hạn</small><b>${o.mastered}<em> từ</em></b><span>Khoảng ôn từ 21 ngày</span></div>
    <div class="kpi"><small>Tiến độ chương trình</small><b>${o.pct}<em>%</em></b><span>${o.intro}/${o.total} từ đã học · ${o.unitsDone}/${o.units} bài hoàn thành</span><i class="kbar"><b style="width:${o.pct}%"></b></i></div>
  </div></section>`;
}
function pathBlock(){
  if(!S.track)return '';
  const o=overview(), py=pinyinSteps(), pyN=py.filter(s=>s.done).length;
  const d=S.done||{}, cnt=p=>UNITS.filter(u=>d[`${p}-${u.n}`]>0).length;
  const gram=Object.keys(d).filter(k=>/^(gq|mq|oq|gram)-/.test(k)).length;
  const spoke=Object.keys(S.speak||{}).length, wrote=Object.keys(S.wrote||{}).length;
  const chars=new Set(ALLWORDS.flatMap(w=>[...w.h])).size;
  /* điểm quy về thang 100 (đề mô phỏng HSK chấm trên 200) */
  const ex=(S.exams||[]), best=ex.length?Math.max(...ex.map(e=>Math.round(e.s*100/(e.max||100)))):null;
  const stages=[
    {n:1,t:'Phát âm và pinyin',d:S.track==='pinyin'?'Bạn đã chọn bỏ qua (đã biết pinyin)':`${pyN}/${py.length} bước`,p:S.track==='pinyin'?100:pyN/py.length*100,go:'pinyin'},
    {n:2,t:'Từ vựng cơ bản',d:`${o.intro}/${o.total} từ đã học · ${o.mastered} nhớ dài hạn`,p:o.intro/o.total*100,go:'flash'},
    {n:3,t:'Ghép từ thành câu',d:`${cnt('lorder')}/${UNITS.length} bài đã xếp câu`,p:cnt('lorder')/UNITS.length*100,go:'order'},
    {n:4,t:'Ngữ pháp nền tảng',d:gram?`${gram} lượt bài tập ngữ pháp, lượng từ`:'Chưa làm bài tập',p:Math.min(100,gram/10*100),go:'nguphap'},
    {n:5,t:'Nghe và nói',d:`${cnt('lsent')}/${UNITS.length} bài nghe câu · ${spoke} câu/từ đã đọc`,p:(cnt('lsent')/UNITS.length*50)+Math.min(50,spoke/A.ALLSENTS.length*50),go:'listen'},
    {n:6,t:'Đọc và viết',d:`${wrote}/${chars} chữ đã luyện viết`,p:wrote/chars*100,go:'viet'},
    {n:7,t:'Ôn tập và kiểm tra',d:ex.length?`${ex.length} lần kiểm tra · cao nhất ${best}/100 điểm (quy đổi)`:'Chưa làm bài kiểm tra tổng hợp',p:best!=null?best:0,go:'thi'},
  ];
  return `<section class="dsec"><h2 class="eyebrow">Lộ trình học</h2>
    <ol class="path">${stages.map(s=>`<li><button class="pstep" data-path="${s.go}" type="button"><span class="pn">${s.n}</span><span class="pt"><b>${s.t}</b><small>${esc(s.d)}</small><i class="kbar"><b style="width:${Math.round(Math.max(0,Math.min(100,s.p)))}%"></b></i></span></button></li>`).join('')}</ol>
    <p class="meta">Đang theo: <b>${S.track==='pinyin'?'Đã biết pinyin, học từ vựng':S.track==='zero'?'Bắt đầu từ con số 0':'chưa chọn'}</b> · <button class="linkbtn" id="dtrack" type="button">Đổi lựa chọn</button>. Không cần học hết 214 bộ thủ trước khi học từ vựng.</p></section>`;
}
function weakBlock(){
  const ww=R().weakWords(5), tc=toneConfusions().slice(0,3), pw=pairWeak().slice(0,3), ws=weakSentences().slice(0,3), uw=unitWeak().slice(0,3);
  const empty='<p class="meta">Chưa đủ dữ liệu. Làm thêm bài luyện để web biết bạn yếu ở đâu.</p>';
  if(!ww.length&&!tc.length&&!pw.length&&!ws.length&&!uw.length)return hasData()?`<section class="dsec"><h2 class="eyebrow">Điểm cần cải thiện</h2><p class="note">Chưa đủ dữ liệu. Khi bạn ôn flashcard, nghe đoán thanh, phân biệt cặp âm và làm bài nghe, web sẽ chỉ ra từ hay quên, thanh điệu hay nhầm, cặp âm, câu nghe sai và bài sai nhiều để bạn luyện lại.</p></section>`:'';
  /* chỉ hiện những mục đã có dữ liệu */
  const box=(title,body,btn,id)=>body===empty?'':`<div class="wcardx"><h3>${title}</h3>${body}${btn?`<button class="btn sm" data-weak="${id}" type="button">${btn}</button>`:''}</div>`;
  return `<section class="dsec"><h2 class="eyebrow">Điểm cần cải thiện</h2><div class="wgridx">
    ${box('Từ hay quên',ww.length?`<ul>${ww.map(w=>{const c=S.review[w.h];return `<li><span class="hz">${w.h}</span> ${esc(A.pyPlain(w.p))} · ${esc(w.m)} <small>quên ${c.lapses||0}, sai ${c.flagged||0}</small></li>`}).join('')}</ul>`:empty,ww.length?'Ôn các từ này':'','words')}
    ${box('Thanh điệu hay nhầm',tc.length?`<ul>${tc.map(x=>`<li>Thanh ${x.a} → nhầm thành thanh ${x.b} <small>${x.n} lần</small></li>`).join('')}</ul>`:empty,tc.length?'Luyện nghe thanh':'','tone')}
    ${box('Cặp âm dễ nhầm',pw.length?`<ul>${pw.map(x=>`<li><b>${esc(x.p)}</b> <small>sai ${x.w}/${x.a}</small></li>`).join('')}</ul>`:empty,pw.length?'Luyện cặp âm':'','pair')}
    ${box('Câu nghe chưa đúng',ws.length?`<ul>${ws.map(s=>`<li><span class="hz">${s.h}</span><br><small>${esc(s.m)}</small></li>`).join('')}</ul>`:empty,ws.length?'Luyện nghe câu':'','sent')}
    ${box('Bài sai nhiều',uw.length?`<ul>${uw.map(x=>`<li>Bài ${x.u.n}: ${esc(x.u.t)} <small>sai ${Math.round(x.r*100)}% (${x.w}/${x.a})</small></li>`).join('')}</ul>`:empty,uw.length?`Ôn bài ${uw[0].u.n}`:'','unit')}
  </div></section>`;
}

/* ---------- gắn sự kiện ---------- */
function bind(root){
  $$('[data-track]',root).forEach(b=>b.onclick=()=>{S.track=b.dataset.track;save();A.route()});
  const g=$('#dgo'); if(g)g.onclick=()=>{const s=nextStep();if(s)go(s)};
  const sk=$('#dskip'); if(sk)sk.onclick=()=>{const s=nextStep();if(!s||!s.id)return;S.skipSteps=Object.assign({},S.skipSteps,{[s.id]:1});save();A.toast('Đã bỏ qua bước này');A.route()};
  const tr=$('#dtrack'); if(tr)tr.onclick=()=>{S.track='';save();A.route();window.scrollTo(0,0)};
  const t=today();
  const goMap={
    due:{route:'hoc',prep:()=>{S.tab='flash';S.fscope='all'}},
    new:{route:'hoc',prep:()=>{S.unit=t.cur;S.tab='flash';S.fscope='unit';S.prev=false}},
    listen:{route:'hoc',prep:()=>{if(!t.ws)S.unit=t.cur;S.tab='listen';S.prev=false},auto:['listen','lsent']},
    act:t.act,
  };
  $$('[data-py]',root).forEach(c=>{const st=pinyinSteps()[+c.dataset.py];c.tabIndex=0;c.setAttribute('role','button');const f=()=>{if(st)go(st)};c.onclick=f;c.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();f()}}});
  $$('[data-go]',root).forEach(c=>{c.tabIndex=0;c.setAttribute('role','button');const f=()=>go(goMap[c.dataset.go]);c.onclick=f;c.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();f()}}});
  $$('#dlen button',root).forEach(b=>b.onclick=()=>{S.sessionMin=+b.dataset.m;save();A.route()});
  const pathMap={pinyin:{route:'pinyin'},flash:{route:'hoc',prep:()=>{S.tab='flash'}},order:{route:'hoc',prep:()=>{S.tab='listen'},auto:['listen','lorder']},
    nguphap:{route:'nguphap'},listen:{route:'hoc',prep:()=>{S.tab='listen'}},viet:{route:'viet'},thi:{route:'thi'}};
  $$('[data-path]',root).forEach(b=>b.onclick=()=>go(pathMap[b.dataset.path]));
  const uw=unitWeak()[0];
  const weakMap={words:{route:'hoc',prep:()=>{S.tab='flash';S.fscope='weak'}},tone:{route:'pinyin',prep:()=>{S.pyTab='prac'},auto:['pinyin','ptone']},
    pair:{route:'pinyin',prep:()=>{S.pyTab='prac'},auto:['pinyin','ppair']},sent:{route:'hoc',prep:()=>{S.tab='listen'},auto:['listen','lsent']},
    unit:uw?{route:'hoc',prep:()=>{S.unit=uw.u.n;S.tab='game';S.prev=false}}:null};
  $$('[data-weak]',root).forEach(b=>b.onclick=()=>{const m=weakMap[b.dataset.weak.trim()];if(m)go(m)});
}

/* lần đầu: coi các bài đã có điểm (S.best) là đã hoàn thành, để không gợi ý lại */
if(!S.done||typeof S.done!=='object'){S.done={};for(const [k,v] of Object.entries(S.best||{}))if(v>0)S.done[k]=1;save()}

A.dash={ctaBlock,todayBlock,overviewBlock,pathBlock,weakBlock,bind,nextStep,today,overview,unitSteps,pinyinSteps,unitDone,track};
})();
