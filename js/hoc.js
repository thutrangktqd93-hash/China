/* ================= Học từ vựng theo bài: thẻ từ, flashcard, game, luyện nghe ================= */
(function(){
const A=window.App, {UNITS,ALLSENTS,S,save,$,$$,box,unit,esc,pyHTML,pyPlain,toneOf,retone,shuffle,sample,rand,distract,mastery,ICON,speak}=A;
let root, HM;

A.register('hoc',r=>{root=r; build();});

function build(){
  root.innerHTML=`<div class="layout">
    <aside><h3 class="eyebrow">22 bài · HSK 1</h3><div class="llist" id="ulist"></div>
      <label class="prevt"><input type="checkbox" id="prev"> Ôn cả từ của các bài trước</label></aside>
    <section style="min-width:0"><div class="lhead" id="lhead"></div>
      <nav class="tabs" id="tabs">
        <button class="tab" data-tab="vocab">Từ vựng</button><button class="tab" data-tab="flash">Flashcard</button>
        <button class="tab" data-tab="game">Trò chơi</button><button class="tab" data-tab="listen">Luyện nghe</button>
      </nav><div id="hmain"></div></section></div>`;
  HM=$('#hmain'); A.setMain(HM);
  $('#ulist').onclick=e=>{const b=e.target.closest('.li');if(!b)return;S.unit=+b.dataset.u;save();A.cleanup();renderUnits();renderTab();b.scrollIntoView({block:'nearest',inline:'nearest'})};
  $('#prev').onchange=e=>{S.prev=e.target.checked;save();renderTab()};
  $('#tabs').onclick=e=>{const b=e.target.closest('.tab');if(!b)return;S.tab=b.dataset.tab;save();A.cleanup();if('speechSynthesis' in window)speechSynthesis.cancel();renderTab()};
  renderUnits(); renderTab();
  const on=$('#ulist .li.on'); if(on)on.scrollIntoView({block:'nearest',inline:'nearest'});
}
function renderUnits(){
  $('#ulist').innerHTML=UNITS.map(u=>`<button class="li ${u.n===S.unit?'on':''}" data-u="${u.n}">
    <span class="n">${String(u.n).padStart(2,'0')}</span><span class="t">${esc(u.t)}</span>
    <span class="v">${u.words.length} từ<span class="mini"><i style="width:${mastery(u)}%"></i></span></span></button>`).join('');
  const u=unit(), pct=mastery(u);
  $('#lhead').innerHTML=`<div><div class="lnum">Bài ${u.n} / ${UNITS.length}</div><h1><span class="hz">${u.hz}</span>${esc(u.t)}</h1></div>
    <div class="meta">${u.words.length} từ · ${u.sents.length} câu mẫu · đã thuộc ${pct}%</div><div class="pbar"><i style="width:${pct}%"></i></div>`;
  $('#prev').checked=S.prev; $('#prev').disabled=S.unit===1;
  A.renderStats();
}
function renderTab(){
  A.setMain(HM);
  $$('.tab',root).forEach(t=>t.classList.toggle('on',t.dataset.tab===S.tab));
  ({vocab:renderVocab,flash:startFlash,game:renderGames,listen:renderListen}[S.tab]||renderVocab)();
}
const toTab=t=>()=>{S.tab=t;save();A.cleanup();if('speechSynthesis' in window)speechSynthesis.cancel();renderTab()};

/* ---------- thẻ từ ---------- */
function renderVocab(){
  const u=unit();
  HM.innerHTML=`<div class="legend"><span>Màu thanh điệu:</span><b class="t1">ā thanh 1</b><b class="t2">á thanh 2</b><b class="t3">ǎ thanh 3</b><b class="t4">à thanh 4</b><b class="t0">a thanh nhẹ</b><span>· Chạm vào thẻ để nghe</span></div>
  <div class="wgrid">${u.words.map((w,i)=>`<button class="wcard" data-i="${i}"><span class="hz">${w.h}</span>${pyHTML(w.p)}<span class="mn">${esc(w.m)}</span>
    <span class="dots" title="Mức ghi nhớ">${[1,2,3,4].map(k=>`<i class="${box(w)>=k?'f':''}"></i>`).join('')}</span></button>`).join('')}</div>
  <div class="sec"><h3>Câu mẫu</h3><div class="slist">${u.sents.map((s,i)=>`<div class="srow"><button class="say" data-s="${i}" aria-label="Nghe câu">${ICON.spk}</button>
    <span class="hz">${s.h}</span><span class="sp">${esc(s.p)}</span><span class="sm">${esc(s.m)}</span></div>`).join('')}</div></div>
  <div class="row" style="margin-top:24px"><button class="btn primary" id="gof">Học bằng flashcard</button><button class="btn" id="gog">Chơi game ôn từ</button><a class="btn" href="#viet">Luyện viết bài này</a></div>`;
  $$('.wcard',HM).forEach(b=>b.onclick=()=>speak(u.words[b.dataset.i].h));
  $$('[data-s]',HM).forEach(b=>b.onclick=()=>speak(u.sents[b.dataset.s].h,false,b));
  $('#gof').onclick=toTab('flash'); $('#gog').onclick=toTab('game');
}

/* ---------- flashcard (Leitner 0–5) ---------- */
function startFlash(){
  A.cleanup();
  const deck=shuffle([...A.unitWords()]).sort((a,b)=>box(a)-box(b));
  let q=deck.map(w=>({w,retry:0})), known=0, seen=0, flipped=false;
  const total=deck.length;
  function face(){
    if(!q.length)return finish();
    const {w}=q[0]; flipped=false;
    const hv=S.fmode==='hv';
    const front=hv?`<div class="big">${w.h}</div>`:`<div class="vbig">${esc(w.m)}</div>`;
    const back=`<div class="big" style="font-size:58px">${w.h}</div>${pyHTML(w.p)}<div class="vbig" style="font-size:20px;font-weight:500">${esc(w.m)}</div>`;
    HM.innerHTML=`<div class="flash">
      <div class="frow"><div class="seg"><button data-fm="hv" class="${hv?'on':''}">Hán → Việt</button><button data-fm="vh" class="${hv?'':'on'}">Việt → Hán</button></div>
      <span class="fprog">Đã xong ${seen}/${total} · còn ${q.length} thẻ</span></div>
      <div class="fcard" id="fcard"><div class="fin">
        <div class="face front"><span class="boxtag">Bài ${w.U} · mức ${box(w)}/5</span><button class="say" id="fsay" aria-label="Nghe">${ICON.spk}</button>${front}<span class="hint">Chạm hoặc nhấn Space để lật</span></div>
        <div class="face back"><span class="boxtag">Mặt sau</span><button class="say" id="fsay2" aria-label="Nghe">${ICON.spk}</button>${back}</div>
      </div></div>
      <div class="factions"><button class="btn bad" id="fno">Chưa nhớ <kbd>1</kbd></button><button class="btn flipbtn" id="fflip">Lật thẻ <kbd>Space</kbd></button><button class="btn ok" id="fyes">Đã nhớ <kbd>2</kbd></button></div>
    </div>`;
    const card=$('#fcard');
    const flip=()=>{flipped=!flipped;card.classList.toggle('flip',flipped);if(flipped)speak(w.h)};
    card.onclick=e=>{if(!e.target.closest('.say'))flip()};
    $('#fsay').onclick=$('#fsay2').onclick=e=>{e.stopPropagation();speak(w.h)};
    $('#fflip').onclick=flip; $('#fyes').onclick=()=>rate(true); $('#fno').onclick=()=>rate(false);
    $$('[data-fm]',HM).forEach(b=>b.onclick=()=>{S.fmode=b.dataset.fm;save();face()});
    A.setKey(e=>{if(e.code==='Space'){e.preventDefault();flip()}else if(e.key==='1')rate(false);else if(e.key==='2')rate(true)});
    if(hv) speak(w.h);
  }
  function rate(ok){
    const it=q.shift(), w=it.w;
    if(ok){S.box[w.h]=Math.min(5,box(w)+1); if(!it.retry)known++; seen++}
    else{S.box[w.h]=0; if(it.retry<2){it.retry++;q.splice(Math.min(q.length,3),0,it)}else seen++}
    save(); renderUnits(); face();
  }
  function finish(){
    A.showResult({title:'Hoàn thành bộ thẻ',score:null,correct:known,total,xp:known*2+5,replay:startFlash,back:toTab('vocab'),backLabel:'Xem lại từ vựng'});
  }
  face();
}

/* ---------- trò chơi ---------- */
const GAMES=[
  {k:'match',hz:'配对',name:'Ghép cặp',d:'Nối chữ Hán với nghĩa tiếng Việt. Càng nhanh, càng ít lần sai thì điểm càng cao.',run:gMatch},
  {k:'speed',hz:'抢答',name:'Thử thách tốc độ',d:'10 câu, mỗi câu 8 giây, 3 mạng. Trả lời đúng liên tiếp để nhân combo.',run:gSpeed},
  {k:'tone',hz:'声调',name:'Bắt thanh điệu',d:'Chọn cách viết pinyin đúng thanh điệu, luyện phân biệt mā má mǎ mà.',run:gTone},
];
function poolNote(){return `<p class="note">Từ dùng: <b>${S.prev&&S.unit>1?`bài 1 đến bài ${S.unit}`:`bài ${S.unit}`}</b> (${A.unitWords().length} từ). Bật “Ôn cả từ của các bài trước” ở cột bên trái để trộn từ cũ. Muốn chơi kiểu gõ pinyin, thử <a href="#mua">Mưa từ vựng</a>.</p>`}
function renderGames(){A.menu(HM,GAMES,poolNote())}
const backGames=toTab('game'), backListen=toTab('listen');

function gMatch(){
  A.cleanup();
  const words=sample(A.unitWords(),6);
  const tiles=shuffle(words.flatMap((w,i)=>[{id:i,kind:'h',text:w.h},{id:i,kind:'m',text:w.m}]));
  let sel=null,done=0,wrong=0; const t0=Date.now();
  HM.innerHTML=`<div class="play" style="max-width:720px">
    <div class="phead"><button class="back" id="pback">← Thoát</button><div class="ptitle">Ghép cặp</div><div class="pstats"><span>Thời gian <b id="mt">0</b>s</span><span>Sai <b id="mw">0</b></span><span>Còn <b id="ml">${words.length}</b> cặp</span></div></div>
    <div class="mgrid">${tiles.map((t,k)=>`<button class="tile ${t.kind}" data-k="${k}">${esc(t.text)}</button>`).join('')}</div></div>`;
  $('#pback').onclick=backGames;
  A.addTimer(setInterval(()=>{const el=$('#mt');if(el)el.textContent=Math.floor((Date.now()-t0)/1000)},250));
  $$('.tile',HM).forEach(b=>b.onclick=()=>{
    const t=tiles[b.dataset.k];
    if(sel===b){b.classList.remove('sel');sel=null;return}
    if(t.kind==='h')speak(t.text);
    if(!sel){sel=b;b.classList.add('sel');return}
    const s=tiles[sel.dataset.k];
    if(s.kind!==t.kind&&s.id===t.id){
      [sel,b].forEach(x=>{x.classList.remove('sel');x.classList.add('done')});
      speak(words[t.id].h); sel=null; done++; $('#ml').textContent=words.length-done;
      if(done===words.length){const secs=Math.round((Date.now()-t0)/1000);
        A.addTimer(setTimeout(()=>A.showResult({title:'Ghép cặp',score:Math.max(20,120-secs*2-wrong*6),correct:words.length,total:words.length+wrong,
          xp:15+Math.max(0,10-wrong*2),replay:gMatch,back:backGames,backLabel:'Chọn trò khác',bestKey:'match-'+S.unit}),450))}
    }else if(s.kind===t.kind){sel.classList.remove('sel');sel=b;b.classList.add('sel')}
    else{wrong++;$('#mw').textContent=wrong;const a=sel;[a,b].forEach(x=>x.classList.add('bad','shake'));
      A.addTimer(setTimeout(()=>[a,b].forEach(x=>x.classList.remove('bad','shake','sel')),450));sel=null}
  });
}
function gSpeed(){
  const pool=A.unitWords();
  const rounds=sample(pool,Math.min(10,pool.length)).map((w,k)=>{
    const ds=distract(w,3,'m',pool), hv=k%2===0;
    const opts=shuffle([{w,ok:true},...ds.map(d=>({w:d,ok:false}))]);
    return {word:w,
      prompt:hv?`<div class="q">Nghĩa của từ này là gì?</div><div class="big">${w.h}</div>`:`<div class="q">Chữ Hán nào mang nghĩa</div><div class="vbig">${esc(w.m)}</div>`,
      options:opts.map(o=>({ok:o.ok,html:hv?esc(o.w.m):`<span class="hz">${o.w.h}</span>`})),
      reveal:`<span class="hz" style="font-weight:700">${w.h}</span> ${pyPlain(w.p)} · ${esc(w.m)}`, after:()=>speak(w.h)};
  });
  A.runMC({key:'speed',title:'Thử thách tốc độ',rounds,timed:8,lives:3,replay:gSpeed,back:backGames,backLabel:'Chọn trò khác'});
}
function toneOptions(w){
  const syl=w.p.split(' '), set=new Set([w.p]); let guard=0;
  while(set.size<4&&guard++<80){
    const s=[...syl], idx=s.map((x,j)=>toneOf(x)?j:-1).filter(j=>j>=0); if(!idx.length)break;
    const j=idx[rand(idx.length)], cur=toneOf(s[j]); let t; do{t=1+rand(4)}while(t===cur);
    s[j]=retone(s[j],t); set.add(s.join(' '));
  }
  return shuffle([...set].map((p,k)=>({p,ok:k===0})));
}
A.toneOptions=toneOptions;
function gTone(){
  const pool=A.unitWords().filter(w=>w.p.split(' ').some(toneOf));
  const rounds=sample(pool,Math.min(8,pool.length)).map(w=>({word:w,
    prompt:`<div class="q">Pinyin đúng của</div><div class="big">${w.h}</div><div class="q">${esc(w.m)}</div>`,
    options:toneOptions(w).map(o=>({ok:o.ok,html:pyHTML(o.p)})), reveal:`Nghe lại: <b>${pyPlain(w.p)}</b>`, after:()=>speak(w.h)}));
  A.runMC({key:'tone',title:'Bắt thanh điệu',rounds,replay:gTone,back:backGames,backLabel:'Chọn trò khác'});
}

/* ---------- luyện nghe ---------- */
const LISTEN=[
  {k:'lword',hz:'听字',name:'Nghe chọn chữ',d:'Nghe một từ rồi chọn chữ Hán đúng trong 4 đáp án.',run:lWord},
  {k:'lsent',hz:'听句',name:'Nghe hiểu câu',d:'Nghe câu tiếng Trung, chọn nghĩa tiếng Việt phù hợp.',run:lSent},
  {k:'lorder',hz:'排序',name:'Nghe và xếp câu',d:'Nghe câu rồi sắp xếp các từ theo đúng thứ tự.',run:lOrder},
];
function renderListen(){
  const rates=[[0.6,'Chậm'],[0.85,'Vừa'],[1,'Nhanh']];
  A.menu(HM,LISTEN,`${A.voiceWarn()}<div class="ctrl"><span>Tốc độ đọc</span><div class="seg" id="rate">${rates.map(([v,l])=>`<button data-r="${v}" class="${S.rate===v?'on':''}">${l}</button>`).join('')}</div>
    <button class="btn sm" id="test">${ICON.spk} Thử giọng</button></div>`);
  $$('[data-r]',HM).forEach(b=>b.onclick=()=>{S.rate=+b.dataset.r;save();renderListen();speak('你好')});
  $('#test').onclick=()=>speak('你好，我学习汉语。');
}
function lWord(){
  const pool=A.unitWords();
  const rounds=sample(pool,Math.min(10,pool.length)).map(w=>{
    const ds=distract(w,3,'h',pool);
    return {word:w,prompt:`<div class="q">Nghe và chọn chữ đúng</div>${A.listenBtns()}`,
      options:shuffle([{w,ok:true},...ds.map(d=>({w:d,ok:false}))]).map(o=>({ok:o.ok,html:`<span class="hz">${o.w.h}</span>`})),
      onShow:()=>A.bindListen(w.h), reveal:`<span class="hz" style="font-weight:700">${w.h}</span> ${pyPlain(w.p)} · ${esc(w.m)}`};
  });
  A.runMC({key:'lword',title:'Nghe chọn chữ',rounds,replay:lWord,back:backListen});
}
function lSent(){
  const own=A.unitSents(), all=ALLSENTS;
  const base=[...shuffle([...unit().sents]),...shuffle(own.filter(s=>s.U!==S.unit))].slice(0,6);
  const rounds=base.map(s=>{
    const ds=shuffle(all.filter(x=>x.m!==s.m)).slice(0,3);
    return {prompt:`<div class="q">Câu bạn vừa nghe có nghĩa là gì?</div>${A.listenBtns()}`, cols:'one',
      options:shuffle([{s,ok:true},...ds.map(d=>({s:d,ok:false}))]).map(o=>({ok:o.ok,html:esc(o.s.m)})),
      onShow:()=>A.bindListen(s.h), reveal:`<span class="hz" style="font-weight:700">${s.h}</span> <span style="color:var(--muted)">${esc(s.p)}</span>`};
  });
  A.runMC({key:'lsent',title:'Nghe hiểu câu',rounds,replay:lSent,back:backListen});
}
function orderGame(R,title,{back,replay,bestKey,listenMode=true}){
  A.cleanup(); let i=0,correct=0,score=0; const M=A.main();
  function show(){
    A.cleanup(); const s=R[i]; let picked=[];
    let bank=shuffle(s.tokens.map((t,k)=>({t,k})));
    if(bank.length>1&&bank.every((b,k)=>b.k===k))bank.reverse();
    M.innerHTML=`<div class="play">
      <div class="phead"><button class="back" id="pback">← Thoát</button><div class="ptitle">${title}</div><div class="pstats"><span>Câu <b>${i+1}</b>/${R.length}</span><span>Điểm <b>${score}</b></span></div></div>
      <div class="prompt">${listenMode?`<div class="q">Nghe câu, rồi xếp các từ cho đúng thứ tự</div>${A.listenBtns()}`:`<div class="q">Xếp các từ thành câu có nghĩa</div><div class="vbig">${esc(s.m)}</div>`}</div>
      <div class="answer" id="ans"></div>
      <div class="bank" id="bank">${bank.map((b,j)=>`<button class="tok" data-j="${j}">${b.t}</button>`).join('')}</div>
      <div class="fb" id="fb"><div class="msg" style="color:var(--muted)">Chạm vào từ trong ô trên để bỏ ra.</div><button class="btn primary" id="check" disabled>Kiểm tra <kbd>↵</kbd></button></div></div>`;
    $('#pback').onclick=back; if(listenMode)A.bindListen(s.h);
    const ans=$('#ans'),chk=$('#check'); let checked=false;
    const draw=()=>{ans.innerHTML=picked.map((j,n)=>`<button class="tok" data-n="${n}">${bank[j].t}</button>`).join('');
      $$('#bank .tok',M).forEach(b=>b.classList.toggle('used',picked.includes(+b.dataset.j)));
      chk.disabled=picked.length!==bank.length;
      $$('.tok',ans).forEach(b=>b.onclick=()=>{if(checked)return;picked.splice(+b.dataset.n,1);draw()})};
    $$('#bank .tok',M).forEach(b=>b.onclick=()=>{if(checked||picked.includes(+b.dataset.j))return;picked.push(+b.dataset.j);draw()});
    const check=()=>{
      if(checked){i++; if(i>=R.length)return A.showResult({title,score,correct,total:R.length,xp:score/4+3,replay,back,backLabel:'Chọn bài khác',bestKey}); return show()}
      if(picked.length!==bank.length)return;
      checked=true; const ok=picked.map(j=>bank[j].t).join('')===s.tokens.join('');
      if(ok){correct++;score+=20}
      ans.classList.add(ok?'ok':'bad'); if(!ok)ans.classList.add('shake');
      $('#fb').innerHTML=`<div class="msg">${ok?'<b class="ok">Chính xác!</b>':'<b class="bad">Chưa đúng.</b> Đáp án:'} <span class="hz" style="font-weight:700">${s.h}</span><br><span style="color:var(--muted)">${esc(s.p)} · ${esc(s.m)}</span></div>
        <button class="btn primary" id="check">${i===R.length-1?'Xem kết quả':'Tiếp tục'} <kbd>↵</kbd></button>`;
      $('#check').onclick=check; speak(s.h);
    };
    chk.onclick=check; A.setKey(e=>{if(e.key==='Enter')check()});
  }
  show();
}
A.orderGame=orderGame;
function lOrder(){
  const earlier=A.unitSents().filter(s=>s.U!==S.unit&&s.tokens.length>1);
  const R=[...shuffle(unit().sents.filter(s=>s.tokens.length>1)),...shuffle(earlier)].slice(0,5);
  orderGame(R,'Nghe và xếp câu',{back:backListen,replay:lOrder,bestKey:'lorder-'+S.unit});
}
})();
