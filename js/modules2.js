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
  <p class="lead">Đề luyện tập nội bộ 40 câu, mỗi lần làm sẽ ra đề mới từ ${A.ALLWORDS.length} từ của danh sách cấp 1 (GF0025-2021). Làm trong 30 phút, nộp bài để xem điểm và giải thích câu sai. <b>Đây không phải đề thi HSK chính thức</b> và không theo cấu trúc đề thi HSK mới.</p>
  ${A.voicePicker()}
  <div class="tgrid" style="margin-bottom:18px">
    <div class="tcard"><b>Phần 1 · Nghe (20 câu)</b><p>Câu 1–10: nghe từ, chọn chữ Hán đúng.<br>Câu 11–20: nghe câu, chọn nghĩa đúng.</p></div>
    <div class="tcard"><b>Phần 2 · Đọc (20 câu)</b><p>Câu 21–30: chọn nghĩa của từ.<br>Câu 31–35: chọn pinyin đúng.<br>Câu 36–40: chọn từ điền vào chỗ trống.</p></div>
    <div class="tcard"><b>Chấm điểm</b><p>Mỗi câu 2,5 điểm, tổng 100. Đạt từ 60 điểm.</p></div>
  </div>
  <div class="row l"><button class="btn primary" id="estart">Bắt đầu làm bài</button></div>
  ${hist.length?`<div class="sec"><h3>Lịch sử làm bài</h3><div class="hist">${hist.map(h=>`<div><span>${esc(h.d)}</span><span>Nghe ${h.l}/20 · Đọc ${h.r}/20</span><b style="color:${h.s>=60?'var(--ok)':'var(--cinnabar)'}">${h.s} điểm</b></div>`).join('')}</div></div>`:''}`;
  $('#estart').onclick=()=>examRun(root); A.bindPicker();
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
  root.innerHTML=`<div class="exhead"><b>Kiểm tra tổng hợp cấp 1</b><span class="meta" id="eprog">Đã làm 0/40</span><span class="clock" id="eclock">30:00</span><button class="btn primary sm" id="esub">Nộp bài</button></div>
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
    if(done)return; done=true; A.cleanup(); A.stopSpeak();
    let l=0,r=0;
    Q.forEach((q,i)=>{const ok=ans[i]>=0&&q.opts[ans[i]].ok; if(ok){q.part==='l'?l++:r++} else if(q.word&&ans[i]>=0&&A.srs)A.srs.flag(q.word);
      const it=$('#q'+i); it.classList.add(ok?'right':'wrong');
      $$(`.opt[data-q="${i}"]`,root).forEach((b,k)=>{b.disabled=true;if(q.opts[k].ok)b.classList.add('ok');else if(k===ans[i])b.classList.add('bad')});
      $('#x'+i).innerHTML=`${ok?'<b style="color:var(--ok)">Đúng</b>':ans[i]<0?'<b style="color:var(--cinnabar)">Bỏ trống</b>':'<b style="color:var(--cinnabar)">Sai</b>'} · ${esc(q.exp)}`;
    });
    const s=Math.round((l+r)*2.5);
    S.exams=(S.exams||[]).concat({d:new Date().toLocaleString('vi-VN',{dateStyle:'short',timeStyle:'short'}),l,r,s}).slice(-30); save();
    A.addXP(10+(l+r),"Kiểm tra tổng hợp cấp 1",`${s} điểm · Nghe ${l}/20 · Đọc ${r}/20`);
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
  $('#dplay').onclick=()=>{if(running){stop=true;A.stopSpeak();A.stopListen();running=false;hl(-1);msg('Đã dừng.')}else playAll()};
  async function rolePlay(r){
    if(running){stop=true;A.stopSpeak();A.stopListen();await new Promise(x=>setTimeout(x,200))}
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
    M.innerHTML=`<div class="gpoints">${window.GRAMMAR.map((g,i)=>`<div class="gp"><h3>${i+1}. ${esc(g.t)}</h3><span class="f">${esc(g.f)}</span><p>${esc(g.d)}</p>
      <ul>${g.ex.map(([h,m])=>`<li><button class="btn sm" data-h="${esc(h)}" style="padding:2px 8px;margin-right:6px">${ICON.spk}</button><span class="hz">${esc(h)}</span> — ${esc(m)}</li>`).join('')}</ul></div>`).join('')}</div>`;
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
