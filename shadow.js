/* ================= Shadowing: nghe từng câu rồi nói đuổi theo ================= */
(function(){
const A=window.App, {S,save,$,$$,esc,speak,ICON}=A;

/* ---------- bài đọc ngắn (tự soạn bằng từ HSK 1) ---------- */
const PASSAGES=[
  {t:'Giới thiệu bản thân',hz:'自我介绍',lines:[
    ['大家 好！','dàjiā hǎo!','Chào mọi người!'],
    ['我 叫 王 小 文。','wǒ jiào Wáng Xiǎo Wén.','Mình tên là Vương Tiểu Văn.'],
    ['我 是 越南 人， 今年 二十 岁。','wǒ shì Yuènán rén, jīnnián èrshí suì.','Mình là người Việt Nam, năm nay hai mươi tuổi.'],
    ['我 是 学生， 我 在 北京 学习 汉语。','wǒ shì xuésheng, wǒ zài Běijīng xuéxí Hànyǔ.','Mình là sinh viên, mình học tiếng Trung ở Bắc Kinh.'],
    ['我 喜欢 看 书， 也 喜欢 听 音乐。','wǒ xǐhuan kàn shū, yě xǐhuan tīng yīnyuè.','Mình thích đọc sách, cũng thích nghe nhạc.'],
    ['认识 你们 很 高兴！','rènshi nǐmen hěn gāoxìng!','Rất vui được làm quen với các bạn!']]},
  {t:'Một ngày của mình',hz:'我的一天',lines:[
    ['我 每天 早上 七 点 起床。','wǒ měitiān zǎoshang qī diǎn qǐchuáng.','Mỗi sáng mình dậy lúc bảy giờ.'],
    ['七 点 半 吃 早饭， 八 点 去 学校。','qī diǎn bàn chī zǎofàn, bā diǎn qù xuéxiào.','Bảy rưỡi ăn sáng, tám giờ đến trường.'],
    ['中午 我 和 同学 一起 吃 饭。','zhōngwǔ wǒ hé tóngxué yìqǐ chī fàn.','Buổi trưa mình ăn cơm cùng bạn học.'],
    ['下午 我 去 图书馆 看 书。','xiàwǔ wǒ qù túshūguǎn kàn shū.','Buổi chiều mình đến thư viện đọc sách.'],
    ['晚上 我 在 家 看 电视。','wǎnshang wǒ zài jiā kàn diànshì.','Buổi tối mình ở nhà xem tivi.'],
    ['十一 点 睡觉。','shíyī diǎn shuìjiào.','Mười một giờ đi ngủ.']]},
  {t:'Gia đình mình',hz:'我的家',lines:[
    ['我 家 有 五 口 人。','wǒ jiā yǒu wǔ kǒu rén.','Nhà mình có năm người.'],
    ['爸爸、 妈妈、 哥哥、 妹妹 和 我。','bàba, māma, gēge, mèimei hé wǒ.','Bố, mẹ, anh trai, em gái và mình.'],
    ['爸爸 是 医生， 妈妈 是 老师。','bàba shì yīshēng, māma shì lǎoshī.','Bố là bác sĩ, mẹ là giáo viên.'],
    ['哥哥 在 公司 工作。','gēge zài gōngsī gōngzuò.','Anh trai làm việc ở công ty.'],
    ['妹妹 很 小， 今年 六 岁。','mèimei hěn xiǎo, jīnnián liù suì.','Em gái còn nhỏ, năm nay sáu tuổi.'],
    ['我 很 爱 我 的 家。','wǒ hěn ài wǒ de jiā.','Mình rất yêu gia đình mình.']]},
  {t:'Đi mua hoa quả',hz:'去商店',lines:[
    ['今天 是 星期六， 我 和 妈妈 去 商店。','jīntiān shì xīngqīliù, wǒ hé māma qù shāngdiàn.','Hôm nay là thứ Bảy, mình cùng mẹ đi cửa hàng.'],
    ['商店 里 人 很 多。','shāngdiàn lǐ rén hěn duō.','Trong cửa hàng rất đông người.'],
    ['妈妈 想 买 一些 水果。','māma xiǎng mǎi yìxiē shuǐguǒ.','Mẹ muốn mua ít hoa quả.'],
    ['苹果 多少 钱 一 斤？','píngguǒ duōshao qián yì jīn?','Táo bao nhiêu tiền một cân?'],
    ['十 块 钱 一 斤， 很 便宜。','shí kuài qián yì jīn, hěn piányi.','Mười tệ một cân, rẻ lắm.'],
    ['我们 买 了 三 斤 苹果。','wǒmen mǎi le sān jīn píngguǒ.','Chúng mình mua ba cân táo.']]},
  {t:'Thời tiết hôm nay',hz:'天气',lines:[
    ['今天 天气 很 好。','jīntiān tiānqì hěn hǎo.','Hôm nay thời tiết rất đẹp.'],
    ['不 冷 也 不 热。','bù lěng yě bú rè.','Không lạnh cũng không nóng.'],
    ['明天 会 下 雨 吗？','míngtiān huì xià yǔ ma?','Ngày mai có mưa không?'],
    ['妈妈 说 明天 下 雨。','māma shuō míngtiān xià yǔ.','Mẹ nói ngày mai trời mưa.'],
    ['我们 今天 去 公园 玩儿 吧！','wǒmen jīntiān qù gōngyuán wánr ba!','Hôm nay chúng mình đi công viên chơi nhé!'],
    ['好 啊， 我们 坐 出租车 去。','hǎo a, wǒmen zuò chūzūchē qù.','Được đấy, chúng mình đi taxi nhé.']]},
  {t:'Ở quán ăn',hz:'在饭馆',lines:[
    ['服务员， 我们 要 两 碗 米饭。','fúwùyuán, wǒmen yào liǎng wǎn mǐfàn.','Phục vụ ơi, cho chúng tôi hai bát cơm.'],
    ['还 要 什么？','hái yào shénme?','Anh chị cần thêm gì nữa ạ?'],
    ['再 来 一 个 菜 和 一 杯 茶。','zài lái yí ge cài hé yì bēi chá.','Thêm một món và một cốc trà.'],
    ['好 的， 请 等 一下。','hǎo de, qǐng děng yíxià.','Vâng, xin chờ một chút.'],
    ['这 个 菜 很 好吃！','zhè ge cài hěn hǎochī!','Món này ngon quá!'],
    ['服务员， 多少 钱？','fúwùyuán, duōshao qián?','Phục vụ ơi, hết bao nhiêu tiền?']]},
];

/* ---------- thư viện bài: 3 nhóm ---------- */
const mk=(s,p,m,who)=>({who:who||'',...A.mkSent(s,p,m,0)});
const CATS=[
  {k:'doan',name:'Đoạn văn ngắn',items:PASSAGES.map((d,i)=>({id:'p'+i,t:d.t,hz:d.hz,lines:d.lines.map(l=>mk(...l))}))},
  {k:'hoithoai',name:'Hội thoại',items:(window.DIALOGS||[]).map((d,i)=>({id:'d'+i,t:d.t,hz:d.hz,lines:d.lines.map(([w,s,p,m])=>mk(s,p,m,w))}))},
  {k:'bai',name:'Câu mẫu theo bài',items:A.UNITS.map(u=>({id:'u'+u.n,t:`Bài ${u.n}: ${u.t}`,hz:u.hz,lines:u.sents.map(s=>({who:'',...s}))}))},
];
const find=id=>{for(const c of CATS){const x=c.items.find(i=>i.id===id);if(x)return x}return null};

const SPEEDS=[['0.6','Chậm'],['0.8','Vừa'],['1','Bình thường']];
const MODES=[['nghe','Nghe','Phát liền cả bài để làm quen.'],['nhai','Nhại theo','Sau mỗi câu web dừng lại để bạn nói đuổi theo.'],['cham','Chấm điểm','Sau mỗi câu bạn đọc vào micro, web chấm từng chữ.']];
function opt(){S.sh=Object.assign({cat:'doan',speed:'0.8',rep:1,mode:'nhai',py:true,vi:true,blind:false,best:{}},S.sh||{});return S.sh}

A.register('shadow',root=>{A.setMain(root);const o=opt();o.open?player(root,o.open):library(root)});

/* ---------- màn chọn bài ---------- */
function library(root){
  A.cleanup(); const o=opt(); o.open=''; save();
  const cat=CATS.find(c=>c.k===o.cat)||CATS[0];
  root.innerHTML=`<h2 class="sect">Shadowing</h2>
  <p class="lead">Shadowing là nghe người bản xứ nói rồi <b>nói đuổi theo ngay</b>, bắt chước cả thanh điệu lẫn nhịp câu. Cách luyện: nghe cả bài trước, rồi nhại theo từng câu, cuối cùng che chữ để nghe chay và tự chấm điểm.</p>
  <nav class="tabs" id="shcat">${CATS.map(c=>`<button class="tab ${c.k===cat.k?'on':''}" data-c="${c.k}">${c.name} <small>${c.items.length}</small></button>`).join('')}</nav>
  <div class="dlist">${cat.items.map(it=>{const b=o.best[it.id];return `<button class="gcard" data-id="${it.id}"><span class="ghz">${esc(it.hz)}</span><b>${esc(it.t)}</b><small>${it.lines.length} câu</small>${b!=null?`<em>Điểm cao nhất: ${b}</em>`:''}</button>`}).join('')}</div>`;
  $$('#shcat .tab').forEach(b=>b.onclick=()=>{o.cat=b.dataset.c;save();library(root)});
  $$('[data-id]',root).forEach(b=>b.onclick=()=>player(root,b.dataset.id));
}

/* ---------- màn luyện ---------- */
function player(root,id){
  A.cleanup(); const o=opt(); const it=find(id); if(!it){library(root);return}
  o.open=id; save();
  const L=it.lines; let cur=0, running=false, run=0;
  const scores=new Array(L.length).fill(null);
  root.innerHTML=`<p class="crumb"><button class="linkbtn" id="shback" type="button">← Chọn bài khác</button></p>
  <h2 class="sect"><span class="hz" style="color:var(--jade);margin-right:10px">${esc(it.hz)}</span>${esc(it.t)}</h2>
  ${A.voicePicker()}
  <div class="shset">
    <div class="ctrl"><span>Chế độ</span><div class="seg" id="shmode">${MODES.map(([k,l])=>`<button data-m="${k}" class="${o.mode===k?'on':''}">${l}</button>`).join('')}</div></div>
    <div class="ctrl"><span>Tốc độ</span><div class="seg" id="shspd">${SPEEDS.map(([k,l])=>`<button data-s="${k}" class="${o.speed===k?'on':''}">${l}</button>`).join('')}</div>
      <span>Mỗi câu nghe</span><div class="seg" id="shrep">${[1,2,3].map(n=>`<button data-r="${n}" class="${o.rep===n?'on':''}">${n} lần</button>`).join('')}</div></div>
    <div class="ctrl"><label><input type="checkbox" id="shpy" ${o.py?'checked':''}> Pinyin</label><label><input type="checkbox" id="shvi" ${o.vi?'checked':''}> Nghĩa</label><label><input type="checkbox" id="shbl" ${o.blind?'checked':''}> Nghe chay (che chữ Hán)</label></div>
  </div>
  <div class="note" id="shmsg">${MODES.find(m=>m[0]===o.mode)[2]} Chạm vào một câu để bắt đầu từ câu đó.</div>
  ${o.mode==='cham'?A.recogWarn():''}
  <ol class="shlines ${o.py?'':'hidepy'} ${o.vi?'':'hidevi'} ${o.blind?'blind':''}" id="shl">${L.map((l,i)=>`<li class="shl" id="sl${i}" data-i="${i}">
    <span class="shn">${l.who?esc(l.who):i+1}</span>
    <div class="shtx"><span class="hz">${l.h}</span><span class="p">${esc(l.p)}</span><span class="m">${esc(l.m)}</span><span class="shsc" id="ss${i}"></span></div>
    <span class="shact"><button class="iconbtn" data-say="${i}" aria-label="Nghe câu ${i+1}" type="button">${ICON.spk}</button>${A.SR?`<button class="iconbtn" data-rec="${i}" aria-label="Đọc câu ${i+1} để chấm" type="button">${ICON.mic}</button>`:''}</span>
    <i class="shbar"><b id="sb${i}"></b></i></li>`).join('')}</ol>
  <div class="shdock"><button class="btn sm" id="shprev" type="button" aria-label="Câu trước">⏮</button>
    <button class="btn primary" id="shgo" type="button">${ICON.play} Bắt đầu</button>
    <button class="btn sm" id="shnext" type="button" aria-label="Câu sau">⏭</button>
    <span class="shpos" id="shpos">Câu 1/${L.length}</span></div>`;
  A.bindPicker();
  $('#shback').onclick=()=>{halt();library(root)};
  const re=()=>{halt();player(root,id)};
  $$('#shmode button').forEach(b=>b.onclick=()=>{o.mode=b.dataset.m;save();re()});
  $$('#shspd button').forEach(b=>b.onclick=()=>{o.speed=b.dataset.s;save();$$('#shspd button').forEach(x=>x.classList.toggle('on',x===b))});
  $$('#shrep button').forEach(b=>b.onclick=()=>{o.rep=+b.dataset.r;save();$$('#shrep button').forEach(x=>x.classList.toggle('on',x===b))});
  const box=$('#shl');
  $('#shpy').onchange=e=>{o.py=e.target.checked;save();box.classList.toggle('hidepy',!o.py)};
  $('#shvi').onchange=e=>{o.vi=e.target.checked;save();box.classList.toggle('hidevi',!o.vi)};
  $('#shbl').onchange=e=>{o.blind=e.target.checked;save();box.classList.toggle('blind',o.blind)};

  const msg=t=>{const m=$('#shmsg');if(m)m.innerHTML=t};
  const wait=ms=>new Promise(r=>{const t=setTimeout(r,ms);A.addTimer(t)});
  const rate=()=>+o.speed;
  function mark(i){
    cur=i; $$('.shl',root).forEach((li,j)=>{li.classList.toggle('on',j===i);li.classList.toggle('done',j<i)});
    const li=$('#sl'+i); if(li)li.scrollIntoView({block:'nearest',behavior:'smooth'});
    $('#shpos').textContent=`Câu ${i+1}/${L.length}`;
  }
  /* thanh chờ: chạy từ 0 đến 100% trong ms mili giây */
  async function bar(i,ms){
    const b=$('#sb'+i); if(!b)return wait(ms);
    b.style.transition='none'; b.style.width='0'; void b.offsetWidth;
    b.style.transition=`width ${ms}ms linear`; b.style.width='100%';
    await wait(ms); b.style.transition='none'; b.style.width='0';
  }
  async function sayTimed(i){const t0=Date.now();await speak(L[i].h,rate());return Date.now()-t0}
  async function record(i){
    msg(`<b>Đến lượt bạn.</b> Đọc: <span class="hz" style="font-weight:700">${L[i].h}</span>`);
    $('#sl'+i).classList.add('rec');
    let alts=[]; try{alts=await A.listen()}catch(e){$('#sl'+i).classList.remove('rec');msg('Không dùng được micro ('+esc(e.message)+'). Hãy cho phép micro rồi thử lại.');return null}
    $('#sl'+i).classList.remove('rec');
    const r=A.bestMatch(L[i].h,alts); scores[i]=Math.max(scores[i]??0,r.score);
    const el=$('#ss'+i); el.innerHTML=`<span class="mk">${A.markHTML(r.a,r.ma)}</span> ${r.score} điểm${alts[0]?` · máy nghe: ${esc(alts[0])}`:' · máy không nghe rõ'}`;
    el.className='shsc '+(r.score>=80?'ok':r.score>=50?'mid':'bad');
    return r.score;
  }
  async function playFrom(start){
    if(running)return; running=true; const my=++run; const off=()=>my!==run; setGo();
    for(let i=start;i<L.length&&!off();i++){
      mark(i);
      for(let k=0;k<o.rep&&!off();k++){
        msg(`Đang nghe câu ${i+1}${o.rep>1?` (lần ${k+1}/${o.rep})`:''}…`);
        const dur=await sayTimed(i); if(off())break;
        if(o.mode==='nhai'){msg('<b>Nói theo ngay!</b> Bắt chước thanh điệu và nhịp câu.');await bar(i,Math.max(1500,dur*1.25+500))}
        else if(o.mode==='cham'&&A.SR){await record(i);await wait(500)}
        else await wait(o.rep>1?600:350);
      }
    }
    if(off())return; running=false; setGo();
    {mark(L.length);$('#shpos').textContent=`Xong ${L.length}/${L.length}`;finish()}
  }
  function finish(){
    const done=scores.filter(x=>x!=null);
    const avg=done.length?Math.round(done.reduce((a,b)=>a+b,0)/done.length):null;
    let txt=`Xong cả bài! `;
    if(avg!=null){const old=o.best[id];if(old==null||avg>old)o.best[id]=avg;txt+=`Điểm trung bình <b>${avg}</b>${old!=null&&avg>old?' · kỷ lục mới!':''}. `}
    txt+=o.mode==='nghe'?'Giờ chuyển sang “Nhại theo” để nói đuổi theo nhé.':o.blind?'Rất tốt, bạn đã nghe chay được cả bài.':'Thử bật “Nghe chay” để luyện khó hơn.';
    msg(txt);
    const xp=o.mode==='nghe'?2:L.length*(o.mode==='cham'?2:1)+(avg!=null?Math.round(avg/20):0);
    A.addXP(xp,'Shadowing: '+it.t,`${MODES.find(m=>m[0]===o.mode)[1]} · ${L.length} câu${avg!=null?' · '+avg+' điểm':''}`);
  }
  function halt(){run++;running=false;if('speechSynthesis' in window)speechSynthesis.cancel();A.stopListen();setGo()}
  function setGo(){const g=$('#shgo');if(g)g.innerHTML=running?'⏸ Dừng':`${ICON.play} ${cur>0&&cur<L.length?'Tiếp tục':'Bắt đầu'}`}
  A.onCleanup(()=>{run++;A.stopListen()});

  $('#shgo').onclick=()=>{if(running){halt();msg('Đã dừng. Bấm “Tiếp tục” để nghe tiếp từ câu này.')}else playFrom(cur>=L.length?0:cur)};
  const jump=async d=>{const n=Math.min(L.length-1,Math.max(0,cur+d));const was=running;halt();await wait(150);mark(n);if(was)playFrom(n)};
  $('#shprev').onclick=()=>jump(-1); $('#shnext').onclick=()=>jump(1);
  $$('.shtx',root).forEach(t=>t.onclick=async()=>{const i=+t.parentNode.dataset.i;halt();await wait(150);playFrom(i)});
  $$('[data-say]',root).forEach(b=>b.onclick=async e=>{e.stopPropagation();halt();const i=+b.dataset.say;mark(i);speak(L[i].h,rate(),b)});
  $$('[data-rec]',root).forEach(b=>b.onclick=async e=>{e.stopPropagation();halt();const i=+b.dataset.rec;mark(i);await record(i)});
  A.setKey(e=>{
    if(e.code==='Space'){e.preventDefault();$('#shgo').click()}
    else if(e.key==='ArrowRight')jump(1); else if(e.key==='ArrowLeft')jump(-1);
  });
  mark(0);
}
})();
