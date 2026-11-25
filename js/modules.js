/* ================= Mưa từ vựng · Luyện viết · Pinyin · Luyện nói ================= */
(function(){
const A=window.App, {UNITS,ALLWORDS,S,save,$,$$,box,unit,esc,pyHTML,pyPlain,pyKeys,toneOf,shuffle,sample,rand,ICON,speak}=A;

/* =================================================================
   MƯA TỪ VỰNG
   ================================================================= */
A.register('mua',root=>{A.setMain(root);rainSetup(root)});
function rainSetup(root){
  A.cleanup();
  const us=A.unitSelect(()=>rainSetup(root));
  const mode=S.rainMode||'mean';
  root.innerHTML=`<h2 class="sect">Mưa từ vựng</h2>
  <p class="lead">Nghĩa tiếng Việt (hoặc âm thanh) rơi từ trên xuống. Gõ pinyin rồi nhấn Enter để bắn hạ trước khi chạm đất. Gõ thêm số thanh điệu 1–4 để được nhân đôi điểm.</p>
  ${us.html}
  <div class="ctrl"><span>Chế độ</span><div class="seg" id="rmode"><button data-m="mean" class="${mode==='mean'?'on':''}">Mưa nghĩa tiếng Việt</button><button data-m="audio" class="${mode==='audio'?'on':''}">Mưa âm thanh</button></div></div>
  <div class="tgrid" style="margin-bottom:18px">
    <div class="tcard"><b>Cách gõ</b><p>Gõ không dấu: <b>nihao</b> cho 你好. Chữ ü gõ là <b>v</b> (女 = nv). Không cần dấu cách.</p></div>
    <div class="tcard"><b>Nhân đôi điểm</b><p>Thêm số thanh sau mỗi âm tiết: <b>ni3hao3</b>. Thanh nhẹ để trống. Gõ số sai thì không tính.</p></div>
    <div class="tcard"><b>Đấu trùm</b><p>Hết mỗi cấp xuất hiện một viên trùm màu vàng, phải bắn 2 lần và gõ đúng thanh điệu.</p></div>
    <div class="tcard"><b>Bám đuổi từ yếu</b><p>Từ bạn để rơi sẽ quay lại thường xuyên hơn (viền nét đứt) cho tới khi nhớ.</p></div>
  </div>
  <div class="row l"><button class="btn primary" id="rstart">${ICON.play} Bắt đầu chơi</button><span class="meta">Kỷ lục bài ${S.unit}: ${S.best['rain-'+S.unit]||'chưa có'}</span></div>
  ${mode==='audio'?A.voiceWarn():''}`;
  us.bind();
  $$('#rmode button').forEach(b=>b.onclick=()=>{S.rainMode=b.dataset.m;save();rainSetup(root)});
  $('#rstart').onclick=()=>rainPlay(root);
}
function rainPlay(root){
  A.cleanup();
  const audio=(S.rainMode||'mean')==='audio';
  const pool=A.unitWords().map(w=>({...w,...pyKeys(w.p)})).filter(w=>w.base);
  root.innerHTML=`<div class="play" style="max-width:820px">
    <div class="phead"><button class="back" id="pback">← Thoát</button><div class="ptitle">Mưa từ vựng · ${audio?'âm thanh':'nghĩa'}</div>
      <div class="pstats"><span>Cấp <b id="rl">1</b></span><span>Điểm <b id="rs">0</b></span><span class="combo" id="rc"></span><span class="hearts" id="rh"></span></div></div>
    <div class="rainbox" id="rbox"><div class="ground"></div></div>
    <form class="rainbar" id="rform" autocomplete="off"><input id="rin" placeholder="Gõ pinyin rồi Enter, ví dụ ni3hao3" autocapitalize="off" autocorrect="off" spellcheck="false" enterkeyhint="send">
      <button class="btn primary" type="submit">Bắn</button>${audio?`<button class="btn" type="button" id="rre">${ICON.spk} Nghe lại</button>`:''}</form>
  </div>`;
  const boxEl=$('#rbox'), inp=$('#rin');
  let drops=[], score=0, combo=0, lives=5, level=1, hits=0, levelHits=0, weak=[], missed=[], hitList=[], last=performance.now(), spawnT=0, over=false, bossOut=false, lastSpoken=null;
  const H=()=>boxEl.clientHeight, Wd=()=>boxEl.clientWidth;
  const fallTime=()=>Math.max(4.5,(audio?13:11)*Math.pow(.92,level-1));
  const spawnGap=()=>Math.max(audio?2.6:1.1,(audio?4:2.4)*Math.pow(.93,level-1));
  const maxDrops=()=>audio?2:Math.min(6,3+Math.floor(level/2));
  function hud(){
    $('#rl').textContent=level; $('#rs').textContent=score; $('#rc').textContent=combo>1?`x${combo} combo`:'';
    $('#rh').innerHTML='♥'.repeat(lives)+`<span class="off">${'♥'.repeat(5-lives)}</span>`;
  }
  function pickWord(){
    const onScreen=new Set(drops.map(d=>d.w.h));
    const cand=(weak.length&&Math.random()<.35?weak:pool).filter(w=>!onScreen.has(w.h));
    return (cand.length?cand:pool)[rand((cand.length?cand:pool).length)];
  }
  function spawn(boss=false){
    const w=pickWord(), el=document.createElement('div');
    const isWeak=weak.some(x=>x.h===w.h);
    el.className='drop'+(audio?' audio':'')+(boss?' boss':'')+(isWeak?' weak':'');
    const label=audio?`♪ Nghe`:esc(w.m);
    el.innerHTML=label+(boss?'<span class="hp">♛ 2</span>':'');
    boxEl.appendChild(el);
    const ew=el.offsetWidth, x=Math.max(ew/2+8,Math.min(Wd()-ew/2-8, ew/2+8+Math.random()*(Wd()-ew-16)));
    el.style.left=x+'px';
    const d={w,el,x,y:-40,v:(H()+40)/fallTime()*(boss?.6:1),boss,hp:boss?2:1};
    if(audio){el.onclick=()=>{speak(w.h);inp.focus()};speak(w.h);lastSpoken=w}
    drops.push(d);
  }
  function pop(d,txt){
    const p=document.createElement('div'); p.className='pop';
    p.style.left=d.x+'px'; p.style.top=Math.max(30,d.y+16)+'px';
    p.innerHTML=`<span class="hz">${d.w.h}</span>${esc(pyPlain(d.w.p))}<br><small>${txt}</small>`;
    boxEl.appendChild(p); A.addTimer(setTimeout(()=>p.remove(),900));
  }
  function remove(d){d.el.remove();drops=drops.filter(x=>x!==d)}
  function levelUp(){
    level++; levelHits=0;
    const l=document.createElement('div'); l.className='levelup'; l.textContent=`Cấp ${level}!`; boxEl.appendChild(l);
    A.addTimer(setTimeout(()=>l.remove(),1400));
    if(!bossOut){bossOut=true;A.addTimer(setTimeout(()=>{if(!over)spawn(true)},900))}
  }
  function shoot(raw){
    const typed=raw.toLowerCase().replace(/ü/g,'v').replace(/[^a-z0-9]/g,'');
    if(!typed)return;
    const hasNum=/[1-5]/.test(typed), base=typed.replace(/[0-9]/g,''), numT=typed.replace(/[05]/g,'');
    const cands=drops.filter(d=>d.w.base===base).sort((a,b)=>b.y-a.y);
    if(!cands.length){wrong();return}
    const d=cands[0];
    if(hasNum&&numT!==d.w.num){wrong(`Sai thanh điệu: ${pyPlain(d.w.p)}`);return}
    if(d.boss&&!hasNum){wrong('Trùm cần gõ kèm số thanh điệu');return}
    d.hp--;
    if(d.hp>0){d.el.querySelector('.hp').textContent='♛ '+d.hp;d.el.classList.add('shake');A.addTimer(setTimeout(()=>d.el.classList.remove('shake'),350));score+=10;hud();return}
    combo++; hits++; levelHits++;
    let g=10*(hasNum?2:1)*(d.boss?3:1)+Math.min(combo-1,10)*2;
    score+=g; pop(d,`+${g}${hasNum?' x2':''}`); remove(d);
    if(d.boss)bossOut=false;
    hitList.push(d.w);
    const wi=weak.findIndex(x=>x.h===d.w.h); if(wi>=0&&Math.random()<.6)weak.splice(wi,1);
    S.box[d.w.h]=Math.max(box(d.w),Math.min(3,box(d.w)+1));
    if(!audio)speak(d.w.h);
    if(levelHits>=10)levelUp();
    hud();
  }
  function wrong(msg){combo=0;inp.classList.remove('bad');void inp.offsetWidth;inp.classList.add('bad');if(msg)A.toast(msg);hud()}
  function miss(d){
    remove(d); lives--; combo=0; if(d.boss)bossOut=false;
    if(!weak.some(x=>x.h===d.w.h))weak.push(d.w); missed.push(d.w);
    S.box[d.w.h]=0; if(A.srs)A.srs.flag(d.w.h);
    A.toast(`${d.w.h} · ${pyPlain(d.w.p)} · ${d.w.m}`);
    hud(); if(lives<=0)end();
  }
  function end(){
    over=true; save();
    const uniqMiss=[...new Map(missed.map(w=>[w.h,w])).values()];
    const extra=uniqMiss.length?`<div class="slist" style="width:100%;text-align:left;margin-bottom:14px">${uniqMiss.slice(0,8).map(w=>`<div class="srow" style="grid-template-columns:auto 1fr"><span class="hz">${w.h}</span><span>${pyHTML(w.p)} · ${esc(w.m)}</span></div>`).join('')}</div><p class="gloss" style="margin-bottom:8px">Những từ bạn để rơi, hãy ôn lại nhé.</p>`:'';
    A.showResult({title:'Mưa từ vựng',score,correct:hits,total:hits+missed.length,xp:score/8+5,replay:()=>rainPlay(root),back:()=>rainSetup(root),backLabel:'Đổi bài / chế độ',bestKey:'rain-'+S.unit,extra});
  }
  function loop(now){
    if(over)return;
    const dt=Math.min(.05,(now-last)/1000); last=now;
    spawnT-=dt;
    if(spawnT<=0&&drops.filter(d=>!d.boss).length<maxDrops()){spawn();spawnT=spawnGap()}
    const limit=H()-36;
    for(const d of [...drops]){d.y+=d.v*dt;d.el.style.transform=`translate(-50%,${d.y}px)`;if(d.y>limit)miss(d)}
    if(!over)A.setRaf(requestAnimationFrame(loop));
  }
  $('#rform').onsubmit=e=>{e.preventDefault();shoot(inp.value);inp.value='';inp.focus()};
  if(audio)$('#rre').onclick=()=>{const d=drops.slice().sort((a,b)=>b.y-a.y)[0];if(d)speak(d.w.h);inp.focus()};
  $('#pback').onclick=()=>{over=true;rainSetup(root)};
  A.onCleanup(()=>{over=true});
  hud(); inp.focus(); spawnT=.4; A.setRaf(requestAnimationFrame(loop));
}

/* =================================================================
   LUYỆN VIẾT CHỮ HÁN (Hanzi Writer)
   ================================================================= */
const isHan=c=>/[一-鿿]/.test(c);
function charPinyin(c){
  const single=ALLWORDS.find(w=>w.h===c); if(single)return single.p;
  for(const w of ALLWORDS){const chars=[...w.h], syl=w.p.split(' ');if(chars.length===syl.length){const i=chars.indexOf(c);if(i>=0)return syl[i]}}
  return '';
}
A.charPinyin=charPinyin;
A.register('viet',root=>{A.setMain(root);writeView(root)});
function writeView(root,pick){
  A.cleanup();
  const us=A.unitSelect(()=>writeView(root));
  const chars=[...new Set(A.unitWords().flatMap(w=>[...w.h]).filter(isHan))];
  const cur=pick&&chars.includes(pick)?pick:chars[0];
  root.innerHTML=`<h2 class="sect">Luyện viết chữ Hán</h2>
  <p class="lead">Chọn một chữ, xem cách viết từng nét rồi tự viết lên ô Mễ tự cách. Viết sai nét, máy sẽ báo và gợi ý nét đúng.</p>
  ${us.html}
  <div class="wlayout">
    <div style="min-width:0"><p class="eyebrow">${chars.length} chữ trong bài · chấm xanh là chữ đã viết đúng</p>
      <div class="charlist" id="clist">${chars.map(c=>`<button class="chip ${c===cur?'on':''} ${S.wrote[c]?'done':''}" data-c="${c}">${c}</button>`).join('')}</div>
      <div class="sec"><h3>Từ có chữ này</h3><div class="slist" id="cwords"></div></div>
      <div class="sec"><h3>Quy tắc viết cơ bản</h3><div class="gp"><ul>
        <li>Ngang trước, sổ sau: 十</li><li>Phẩy trước, mác sau: 人 八</li><li>Trên trước, dưới sau: 三</li>
        <li>Trái trước, phải sau: 你</li><li>Ngoài trước, trong sau: 月 同</li><li>Vào nhà trước, đóng cửa sau: 国 回</li><li>Giữa trước, hai bên sau: 小 水</li></ul></div></div>
    </div>
    <div class="pad">
      <div class="winfo"><div id="wpy"></div><div class="meta" id="wmn"></div></div>
      <div class="mizi"><svg class="grid" viewBox="0 0 100 100" preserveAspectRatio="none"><line x1="0" y1="0" x2="100" y2="100"/><line x1="100" y1="0" x2="0" y2="100"/><line x1="50" y1="0" x2="50" y2="100"/><line x1="0" y1="50" x2="100" y2="50"/></svg><div id="hw"></div></div>
      <div class="wmsg" id="wmsg">Chạm “Xem cách viết” để bắt đầu</div>
      <div class="row"><button class="btn sm" id="wanim">Xem cách viết</button><button class="btn sm primary" id="wtrace">Viết theo mẫu</button><button class="btn sm" id="wfree">Tự viết</button><button class="btn sm" id="wsay">${ICON.spk}</button></div>
    </div>
  </div>`;
  us.bind();
  $('#clist').onclick=e=>{const b=e.target.closest('.chip');if(b)writeView(root,b.dataset.c)};
  if(!cur){$('#wmsg').textContent='Bài này không có chữ Hán.';return}
  const py=charPinyin(cur);
  $('#wpy').innerHTML=`<span class="hz" style="font-size:22px;font-weight:700">${cur}</span> ${py?pyHTML(py):''}`;
  const ws=ALLWORDS.filter(w=>w.h.includes(cur)).slice(0,8);
  $('#wmn').textContent=(ALLWORDS.find(w=>w.h===cur)||{}).m||'';
  $('#cwords').innerHTML=ws.map(w=>`<div class="srow" style="grid-template-columns:auto minmax(0,1fr)"><button class="say" data-h="${w.h}" aria-label="Nghe">${ICON.spk}</button><span class="hz">${w.h}</span><span class="sp">${esc(pyPlain(w.p))} · ${esc(w.m)}</span></div>`).join('');
  $$('#cwords .say').forEach(b=>b.onclick=()=>speak(b.dataset.h,false,b));
  $('#wsay').onclick=()=>speak(cur);
  if(!window.HanziWriter){$('#wmsg').textContent='Không tải được bộ vẽ nét chữ. Hãy kiểm tra kết nối mạng rồi tải lại trang.';return}
  const css=getComputedStyle(document.documentElement), v=n=>css.getPropertyValue(n).trim();
  const size=Math.min(276,$('.mizi').clientWidth-4);
  const writer=HanziWriter.create('hw',cur,{width:size,height:size,padding:14,showOutline:true,showCharacter:false,
    strokeColor:v('--ink'),outlineColor:v('--line'),drawingColor:v('--jade'),highlightColor:v('--gold'),radicalColor:v('--jade'),
    strokeAnimationSpeed:1,delayBetweenStrokes:220,drawingWidth:22,
    onLoadCharDataError:()=>{$('#wmsg').textContent='Không tải được dữ liệu nét của chữ này (cần kết nối mạng).'}});
  writer.showCharacter();
  const quiz=outline=>{
    writer.cancelQuiz&&writer.cancelQuiz();
    outline?writer.showOutline():writer.hideOutline(); writer.hideCharacter();
    let strokes=0;
    $('#wmsg').textContent=outline?'Viết theo nét mờ, từng nét một.':'Tự viết không có nét mờ. Sai 3 lần sẽ có gợi ý.';
    writer.quiz({showHintAfterMisses:outline?2:3,
      onMistake:s=>{$('#wmsg').innerHTML=`<b style="color:var(--cinnabar)">Nét ${s.strokeNum+1} chưa đúng</b>, thử lại nhé.`},
      onCorrectStroke:s=>{strokes=s.strokeNum+1;$('#wmsg').textContent=`Đúng nét ${strokes}, còn ${s.strokesRemaining} nét.`},
      onComplete:sum=>{
        const m=sum.totalMistakes;
        $('#wmsg').innerHTML=`<b style="color:var(--ok)">Hoàn thành!</b> ${m?`Sai ${m} lần.`:'Không sai nét nào.'}`;
        speak(cur);
        if(!S.wrote[cur]){S.wrote[cur]=true;save();A.addXP(outline?3:6,"Luyện viết",`Viết đúng chữ ${cur}`);const c=$(`.chip[data-c="${cur}"]`);if(c)c.classList.add('done')}
      }});
  };
  $('#wanim').onclick=()=>{writer.cancelQuiz&&writer.cancelQuiz();writer.showOutline();$('#wmsg').textContent='Quan sát thứ tự các nét…';writer.animateCharacter({onComplete:()=>{$('#wmsg').textContent='Giờ bạn thử “Viết theo mẫu”.'}})};
  $('#wtrace').onclick=()=>quiz(true);
  $('#wfree').onclick=()=>quiz(false);
  A.onCleanup(()=>{try{writer.cancelQuiz()}catch(e){}});
}

/* =================================================================
   LỘ TRÌNH PINYIN
   ================================================================= */
const P=window.PINYIN;
A.register('pinyin',root=>{pinyinView(root,S.pyTab||'tone')});
function pinyinView(root,tab){
  A.cleanup(); S.pyTab=tab; if(tab!=='prac'){if(!S.pyDone||typeof S.pyDone!=='object')S.pyDone={};S.pyDone[tab]=1} save();
  root.innerHTML=`<h2 class="sect">Lộ trình Pinyin</h2>
  <p class="lead">Pinyin là cách ghi âm tiếng Trung bằng chữ Latin, gồm thanh mẫu (phụ âm đầu), vận mẫu (vần) và thanh điệu. Học theo thứ tự từ trái sang phải, chạm vào ô nào để nghe ví dụ.</p>
  ${A.voicePicker()}
  <nav class="tabs" id="ptabs">${[['tone','1. Thanh điệu'],['ini','2. Thanh mẫu'],['fin','3. Vận mẫu'],['prac','4. Luyện nghe']].map(([k,l])=>`<button class="tab ${k===tab?'on':''}" data-t="${k}">${l}</button>`).join('')}</nav>
  <div id="pmain"></div>`;
  $('#ptabs').onclick=e=>{const b=e.target.closest('.tab');if(b)pinyinView(root,b.dataset.t)}; A.bindPicker();
  const M=$('#pmain'); A.setMain(M);
  if(tab==='tone'){
    M.innerHTML=`<div class="tgrid">${P.tones.map(t=>`<div class="tcard"><span class="tm t${t.t}">${t.mark}</span><b>${t.name} <span class="meta">${t.shape}</span></b><p>${t.tip}</p>
      <div class="exs">${t.ex.map(e=>`<button class="btn sm" data-h="${e[0]}"><span class="hz">${e[0]}</span> ${e[1]}</button>`).join('')}</div></div>`).join('')}</div>
      <div class="sec"><h3>Nghe 4 thanh trên cùng một âm</h3><div class="slist">${P.sets.map(s=>`<div class="srow" style="grid-template-columns:repeat(4,minmax(0,1fr))">${s.map(([h,p])=>`<button class="btn sm" data-h="${h}"><span class="hz">${h}</span> <span class="t${toneOf(p)}" style="font-weight:700">${p}</span></button>`).join('')}</div>`).join('')}</div></div>
      <div class="sec"><h3>Quy tắc biến điệu</h3><div class="gp"><ul>
        <li>Hai thanh 3 đi liền: thanh 3 đầu đọc thành thanh 2. <span class="hz">你好</span> nǐ hǎo → ní hǎo.</li>
        <li><span class="hz">不</span> bù đứng trước thanh 4 đọc thành bú: <span class="hz">不是</span> bú shì.</li>
        <li><span class="hz">一</span> yī trước thanh 4 đọc yí (<span class="hz">一个</span> yí ge), trước thanh 1, 2, 3 đọc yì (<span class="hz">一起</span> yìqǐ).</li>
        <li>Dấu thanh đặt trên nguyên âm chính theo thứ tự a → o → e → i, u, ü. Với iu và ui, dấu đặt trên chữ sau: liù, guì.</li></ul></div></div>
      <div class="row l" style="margin-top:12px"><button class="btn sm" data-gospm="tone" type="button">Luyện nói 4 thanh</button><button class="btn sm" data-gospm="sandhi" type="button">Luyện nói biến điệu (thanh 3, 不, 一)</button></div>`;
  } else if(tab==='ini'||tab==='fin'){
    const groups=tab==='ini'?P.initials:P.finals;
    M.innerHTML=groups.map(g=>`<div class="pygroup"><h3>${g.g}</h3><div class="pygrid">${g.items.map(([l,h,p,tip])=>`<button class="pycell" data-h="${h}"><b>${l}</b><span class="ex"><span class="hz">${h}</span> ${p}</span><small>${tip}</small></button>`).join('')}</div></div>`).join('')
      +(tab==='fin'?`<div class="gp"><p><b>Lưu ý cách viết:</b> i, u, ü đứng đầu âm tiết viết thành yi, wu, yu. Sau j, q, x thì ü viết thành u (ju, qu, xu) nhưng vẫn đọc là ü. Khi gõ phím, ü thay bằng v.</p></div>`:'');
  } else {
    A.menu(M,[
      {k:'ptone',hz:'声调',name:'Nghe đoán thanh điệu',d:'Nghe một âm và chọn đúng thanh 1, 2, 3 hay 4.',run:pTone},
      {k:'ppair',hz:'辨音',name:'Phân biệt âm dễ nhầm',d:'zh/z, ch/c, sh/s, j/q, b/p… nghe và chọn đúng pinyin.',run:pPair},
      {k:'pword',hz:'拼读',name:'Nghe chọn pinyin',d:'Nghe chữ HSK 1 và chọn cách ghi pinyin đúng trong 4 đáp án.',run:pWord}
    ]);
    M.insertAdjacentHTML('beforeend',`<div class="row l" style="margin-top:14px"><button class="btn sm" data-gospm="pair" type="button">Luyện nói cặp âm dễ nhầm</button><button class="btn sm" data-gospm="tone" type="button">Luyện nói 4 thanh</button></div>`);
  }
  $$('[data-gospm]',M).forEach(b=>b.onclick=()=>{S.spMode=b.dataset.gospm;save();location.hash='noi'});
  $$('[data-h]',M).forEach(b=>b.onclick=()=>speak(b.dataset.h,false,b));
  const back=()=>pinyinView(root,'prac');
  if(tab==='prac'&&A.takeAutorun){const ar=A.takeAutorun('pinyin');if(ar){const f={ptone:pTone,ppair:pPair,pword:pWord}[ar];if(f)return f()}}
  function pTone(){
    const rounds=Array.from({length:10},()=>{const set=P.sets[rand(P.sets.length)], k=rand(4), [h,p]=set[k];
      return {prompt:`<div class="q">Âm này mang thanh mấy?</div>${A.listenBtns()}`, cols:'tonebtns',
        options:set.map(([hh,pp],j)=>({ok:j===k,tone:j+1,html:`<b class="t${j+1}">${pp}</b><small>Thanh ${j+1}</small>`})),
        onShow:()=>A.bindListen(h), reveal:`<span class="hz" style="font-weight:700">${h}</span> ${p}`}});
    A.runMC({key:'ptone',title:'Nghe đoán thanh điệu',rounds,replay:pTone,back});
  }
  function pPair(){
    const rounds=sample(P.contrasts,10).map(pair=>{const k=rand(2),[h,p]=pair[k];
      return {pair:pair.map(x=>x[1]).join(' / '),prompt:`<div class="q">Bạn nghe thấy âm nào?</div>${A.listenBtns()}`,
        options:pair.map(([hh,pp],j)=>({ok:j===k,html:`<b class="py" style="font-size:24px">${pp}</b>`})),
        onShow:()=>A.bindListen(h), reveal:`<span class="hz" style="font-weight:700">${h}</span> ${p} · cặp: ${pair.map(x=>x[1]).join(' / ')}`}});
    A.runMC({key:'ppair',title:'Phân biệt âm dễ nhầm',rounds,replay:pPair,back});
  }
  function pWord(){
    const singles=ALLWORDS.filter(w=>[...w.h].length===1&&!w.p.includes(' ')&&toneOf(w.p));
    const uniq=[...new Map(singles.map(w=>[w.h,w])).values()];
    const rounds=sample(uniq,10).map(w=>{
      const tones=A.toneOptions(w).map(o=>o.p);
      const others=shuffle(uniq.filter(x=>x.p!==w.p)).slice(0,2).map(x=>x.p);
      const opts=shuffle([...new Set([w.p,...tones.filter(p=>p!==w.p).slice(0,1),...others])].slice(0,4));
      return {word:w,prompt:`<div class="q">Nghe và chọn pinyin đúng</div>${A.listenBtns()}`,
        options:opts.map(p=>({ok:p===w.p,p,html:pyHTML(p)})), onShow:()=>A.bindListen(w.h),
        reveal:`<span class="hz" style="font-weight:700">${w.h}</span> ${w.p} · ${esc(w.m)}`};
    });
    A.runMC({key:'pword',title:'Nghe chọn pinyin',rounds,replay:pWord,back});
  }
}

/* =================================================================
   LUYỆN NÓI (nhận dạng giọng nói)
   ================================================================= */
/* ================= Luyện nói & luyện phát âm =================
   - Câu mẫu / Từ vựng: nghe mẫu → bấm micro đọc → xem độ khớp nhận diện văn bản (tham khảo), từ nào nhận diện được.
   - Thanh điệu / Cặp âm / Biến điệu: nghe mẫu → ghi âm giọng mình → nghe lại xen kẽ với mẫu để tự so (không chấm điểm). */
const SANDHI=[
  {g:'Hai thanh 3 đi liền',rule:'Thanh 3 đứng trước thanh 3 đọc thành thanh 2.',items:[
    ['你好','nǐ hǎo','ní hǎo','xin chào'],['很好','hěn hǎo','hén hǎo','rất tốt'],['可以','kě yǐ','ké yǐ','có thể'],
    ['水果','shuǐ guǒ','shuí guǒ','hoa quả'],['我也','wǒ yě','wó yě','tôi cũng'],['很冷','hěn lěng','hén lěng','rất lạnh']]},
  {g:'Biến điệu của 不',rule:'不 (bù) đứng trước thanh 4 đọc thành bú; trước thanh 1, 2, 3 vẫn đọc bù.',items:[
    ['不是','bù shì','bú shì','không phải'],['不对','bù duì','bú duì','không đúng'],['不去','bù qù','bú qù','không đi'],
    ['不好','bù hǎo','bù hǎo','không tốt'],['不来','bù lái','bù lái','không đến'],['不喝','bù hē','bù hē','không uống']]},
  {g:'Biến điệu của 一',rule:'一 (yī) trước thanh 4 đọc yí; trước thanh 1, 2, 3 đọc yì; đứng một mình, cuối từ hoặc chỉ số thứ tự đọc yī.',items:[
    ['一个','yī gè','yí ge','một cái'],['一下','yī xià','yí xià','một chút'],['一样','yī yàng','yí yàng','giống nhau'],
    ['一天','yī tiān','yì tiān','một ngày'],['一年','yī nián','yì nián','một năm'],['一起','yī qǐ','yì qǐ','cùng nhau'],
    ['十一','shí yī','shí yī','mười một'],['第一','dì yī','dì yī','thứ nhất']]},
];
const SP_MODES=[['sent','Câu mẫu'],['word','Từ vựng'],['tone','Thanh 1–4'],['pair','Cặp âm dễ nhầm'],['sandhi','Biến điệu']];
A.register('noi',root=>{A.setMain(root);speakView(root)});
function speakView(root){
  A.cleanup(); A.onCleanup(()=>{A.stopListen();A.speech.cleanupRec()});
  const mode=SP_MODES.some(m=>m[0]===S.spMode)?S.spMode:'sent';
  const pron=['tone','pair','sandhi'].includes(mode);
  root.innerHTML=`<h2 class="sect">Luyện nói</h2>
  <p class="lead">${pron?'Nghe mẫu, bấm <b>Ghi âm</b> và đọc theo, rồi bấm <b>So sánh</b> để nghe mẫu và giọng bạn liền nhau. Phần này không chấm điểm: tai bạn là người so sánh tốt nhất.':'Nghe mẫu, bấm nút micro và đọc to. Web hiện câu trình duyệt nhận diện được và những từ chưa nhận diện được để bạn biết cần nghe lại từ nào.'}</p>
  <div class="ctrl"><div class="seg" id="spm">${SP_MODES.map(([k,l])=>`<button data-m="${k}" class="${mode===k?'on':''}">${l}</button>`).join('')}</div></div>
  <div id="spbody"></div>`;
  $$('#spm button').forEach(b=>b.onclick=()=>{S.spMode=b.dataset.m;save();speakView(root)});
  const body=$('#spbody');
  if(A.speech.consentNeeded()){body.innerHTML=A.speech.consentHTML();A.speech.bindConsent(()=>speakView(root));return}
  if(pron)pronView(body,mode); else readView(body,mode,root);
}

/* ---------- đọc câu / từ: độ khớp nhận diện ---------- */
function readView(body,mode,root){
  const us=A.unitSelect(()=>speakView(root));
  const items=mode==='sent'?A.unitSents().map(s=>({h:s.h,p:s.p,m:s.m,tokens:s.tokens})):A.unitWords().map(w=>({h:w.h,p:pyPlain(w.p),m:w.m,tokens:[w.h]}));
  const done=items.filter(it=>S.speak[it.h]!=null).length;
  body.innerHTML=`${A.SR?'':`<div class="note warn">${A.speech.errorHelp('unsupported')}</div>`}
  ${us.html}
  <p class="meta">Đã luyện <b>${done}</b>/${items.length} ${mode==='sent'?'câu':'từ'} trong phạm vi này.</p>
  ${A.speech.DISCLAIMER}
  <div class="slist speaklist">${items.map((it,i)=>`<div class="srow" id="sr${i}">
    <button class="say" data-i="${i}" aria-label="Nghe mẫu">${ICON.spk}</button>
    <span class="hz target">${esc(it.h)}</span>
    <button class="mic big" data-i="${i}" aria-label="Bấm để nói" ${A.SR?'':'disabled'}>${ICON.mic}<span>Nói</span></button>
    <span class="sp">${esc(it.p)} · ${esc(it.m)}</span>
    <div class="sres" id="rs${i}" aria-live="polite">${S.speak[it.h]!=null?`<span class="meta">Đã luyện · độ khớp nhận diện cao nhất ${S.speak[it.h]}% (tham khảo)</span>`:''}</div></div>`).join('')}</div>`;
  us.bind();
  $$('.say',body).forEach(b=>b.onclick=()=>speak(items[b.dataset.i].h,false,b));
  $$('.mic',body).forEach(b=>b.onclick=()=>recordItem(items[+b.dataset.i],+b.dataset.i,b));
}
async function recordItem(it,i,btn){
  const out=$('#rs'+i);
  if(!A.SR){out.innerHTML=`<div class="note warn">${A.speech.errorHelp('unsupported')}</div>`;return}
  if(btn.classList.contains('rec')){A.stopListen();return}
  $$('.mic').forEach(m=>{m.classList.remove('rec');const s=m.querySelector('span');if(s)s.textContent='Nói'});
  btn.classList.add('rec'); const lab=btn.querySelector('span'); if(lab)lab.textContent='Dừng';
  out.innerHTML='<span class="listening">● Đang nghe… hãy đọc to. Bấm <b>Dừng</b> khi đọc xong.</span>';
  try{
    const alts=await A.listen();
    out.innerHTML=A.speech.feedbackHTML(it.h,it.tokens,alts)+`<div class="row l" style="margin-top:6px"><button class="btn sm" data-again="${i}" type="button">${ICON.spk} Nghe lại mẫu</button></div>`;
    const ag=out.querySelector('[data-again]'); if(ag)ag.onclick=()=>speak(it.h,true,ag);
    if(alts.length){
      const r=A.bestMatch(it.h,alts);
      const old=S.speak[it.h]; if(old==null||r.score>old)S.speak[it.h]=r.score;
      save();
      A.speech.credit('read',it.h,'Luyện nói',`Nghe mẫu và đọc lại: ${it.h}`);
    }
  }catch(e){
    out.innerHTML=`<div class="note warn">${A.speech.errorHelp(e.message)}</div>`;
  }finally{
    btn.classList.remove('rec'); if(lab)lab.textContent='Nói';
  }
}
A.recordItem=recordItem;

/* ---------- luyện phát âm: ghi âm và tự so sánh ---------- */
function pronItems(mode){
  if(mode==='tone')return P.sets.map((set,i)=>({key:'t'+i,title:`Bộ ${i+1}`,parts:set.map(([h,p])=>({h,show:p})),say:set.map(x=>x[0]).join('，')}));
  if(mode==='pair')return P.contrasts.map((pair,i)=>({key:'p'+i,title:pair.map(x=>x[1]).join(' / '),parts:pair.map(([h,p])=>({h,show:p})),say:pair.map(x=>x[0]).join('，')}));
  return SANDHI.flatMap((g,gi)=>g.items.map(([h,w,r,m],j)=>({key:`s${gi}-${j}`,group:gi,title:h,parts:[{h,show:w===r?w:`${w} → đọc ${r}`}],m,say:h})));
}
function pronView(body,mode){
  const items=pronItems(mode);
  const intro=mode==='tone'?'Mỗi bộ gồm một âm với 4 thanh. Nghe từng âm, rồi đọc cả 4 thanh theo thứ tự.'
    :mode==='pair'?'Mỗi cặp chỉ khác một âm. Nghe kỹ sự khác nhau, đọc cả hai rồi so với mẫu.'
    :'Pinyin trong sách ghi thanh gốc, nhưng khi nói thì thanh thay đổi theo quy tắc. Đọc theo cách đọc thực tế (sau dấu →).';
  const groups=mode==='sandhi'?SANDHI.map((g,gi)=>`<div class="pygroup"><h3>${esc(g.g)}</h3><p class="meta">${esc(g.rule)}</p><div class="prlist">${items.filter(x=>x.group===gi).map(row).join('')}</div></div>`).join('')
    :`<div class="prlist">${items.map(row).join('')}</div>`;
  function row(it){return `<div class="prow" data-k="${it.key}">
    <div class="prtx">${it.parts.map(p=>`<button class="prpart" data-h="${esc(p.h)}" type="button"><span class="hz">${esc(p.h)}</span><span class="py">${esc(p.show)}</span></button>`).join('')}${it.m?`<span class="meta">${esc(it.m)}</span>`:''}</div>
    <div class="practs"><button class="btn sm" data-act="model" type="button">${ICON.spk} Nghe mẫu</button>
      <button class="btn sm recb" data-act="rec" type="button" ${A.speech.CAN_REC?'':'disabled'}>${ICON.mic} Ghi âm</button>
      <button class="btn sm" data-act="cmp" type="button" disabled>So sánh</button></div>
    <div class="prst meta" aria-live="polite"></div></div>`}
  body.innerHTML=`<p class="meta">${intro}</p>
    ${A.speech.CAN_REC?'':`<div class="note warn">Trình duyệt này không ghi âm được. Bạn vẫn có thể nghe mẫu và đọc theo.</div>`}
    <p class="meta sdisc">Bản ghi chỉ nằm trong trang này để bạn tự nghe lại, không được lưu hay gửi đi. Web không có công nghệ phân tích cao độ nên không chấm thanh điệu ở phần này.</p>
    ${groups}`;
  const recs={};
  $$('.prpart',body).forEach(b=>b.onclick=()=>speak(b.dataset.h,true,b));
  $$('.prow',body).forEach(r=>{
    const it=items.find(x=>x.key===r.dataset.k), st=r.querySelector('.prst'), rb=r.querySelector('[data-act="rec"]'), cb=r.querySelector('[data-act="cmp"]');
    r.querySelector('[data-act="model"]').onclick=e=>speak(it.say,true,e.currentTarget);
    rb.onclick=async()=>{
      if(A.speech.recording()){
        const u=await A.speech.recStop(); rb.innerHTML=`${ICON.mic} Ghi lại`; rb.classList.remove('on');
        if(u){recs[it.key]=u; cb.disabled=false; st.textContent='Đã ghi. Bấm "So sánh" để nghe mẫu rồi giọng bạn.';
          A.speech.credit('pron',it.key,'Luyện phát âm',`${{tone:'Thanh điệu',pair:'Cặp âm',sandhi:'Biến điệu'}[mode]}: ${it.title}`)}
        return;
      }
      $$('.recb.on',body).forEach(x=>x.click());
      try{await A.speech.recStart(); rb.innerHTML='■ Dừng ghi'; rb.classList.add('on'); st.innerHTML='<span class="listening">● Đang ghi âm… đọc theo mẫu rồi bấm Dừng ghi.</span>'}
      catch(e){st.innerHTML=`<span style="color:var(--cinnabar)">${A.speech.errorHelp(e.name||e.code||e.message)}</span>`}
    };
    cb.onclick=async()=>{cb.disabled=true;st.textContent='Mẫu…';await speak(it.say,true);st.textContent='Giọng bạn…';await A.speech.playUrl(recs[it.key]);st.textContent='Nghe lại nhiều lần và chú ý chỗ khác nhau về thanh điệu.';cb.disabled=false};
  });
}
})();
