/* ================= Ghi âm người thật cho phần Pinyin =================
   File: audio/pinyin/<pinyin có số thanh>.mp3 (ü viết là v: nv3 = nǚ). Nguồn: audio-cmn (github.com/hugolpz/audio-cmn),
   giọng đọc Chen Wang, giấy phép CC-BY-SA. Chỉ có các âm tiết phần Pinyin và bài "Nghe chọn pinyin" dùng (271 file).
   playSyllable(pinyin, btn, {h, slow}):
   - có file thì phát file; không có file (vd. thanh nhẹ ma5) hoặc phát lỗi thì quay về speak(h) như cũ;
   - file đã nghe được lưu vào Cache Storage của trình duyệt, nên khi mất mạng vẫn phát được;
   - một phần tử <audio> dùng chung, phát cái mới thì dừng cái cũ.
   Không thay speak(): các phần khác của web vẫn dùng giọng trình duyệt. */
(function(){
const A=window.App, W=window, DIR='audio/pinyin/', CACHE='hanngu-pinyin-audio-v1';
const HAVE=new Set(`
a1 ai4 an1 ang2 ao4 ba1 ba2 ba3 ba4 bai2 bai3 ban1 ban4 bang1 bang4 bao1 bei1 bei3 ben3 bi3 bie2 bing4 bo1 bu4
cai4 cha2 cha4 chang2 chang4 che1 chi1 chu1 chuan1 chuan2 chuang2 ci4 cong2 cuo4 da3 da4 dao4 de2 deng3 di4
dian3 dian4 dong1 dong4 dou1 du2 dui4 duo1 e2 e4 en1 er4 fan4 fang4 fei1 fei2 fei3 fei4 fen1 feng1 fo2 gan4
gao1 ge1 ge4 gei3 gen1 guan1 gui4 guo2 guo4 hai2 hao3 hao4 he1 he2 hei1 hen3 hou4 hua1 hua4 huai4 hui2 hui4
ji1 ji3 ji4 jia1 jia2 jia3 jia4 jian1 jian4 jiao1 jiao4 jie3 jin4 jiu3 jiu4 kai1 kan4 kao3 ke1 ke3 ke4 kou3
kuai4 lai2 lao3 le4 lei4 leng3 li3 li4 liang3 ling2 liu4 lou2 lu4 ma1 ma2 ma3 ma4 mai3 man4 mang2 mao2 mei2
mei4 men2 mo1 na2 na3 na4 nai3 nan2 ne4 neng2 ni3 nian2 nin2 nu3 nv3 o2 ou1 pa1 pao3 piao4 po1 qi1 qi2 qi3 qi4
qian2 qing3 qiu2 qu4 re4 ren2 ri4 rou4 san1 shan1 shang4 shao3 shei2 shi1 shi2 shi3 shi4 shou3 shu1 shu2 shu3
shu4 shui3 shui4 shuo1 si1 si4 song4 sui4 ta1 ta4 tai4 tang1 tang2 tang3 tang4 te4 tian1 ting1 tong1 tong2
tong3 tong4 wa1 wai4 wan1 wan3 wang2 wang4 wei4 wen2 wen4 weng1 wo3 wu1 wu2 wu3 wu4 xi1 xi3 xia4 xian1 xiang3
xiao3 xiao4 xie3 xin1 xing1 xing2 xue2 ya1 yan1 yan2 yan3 yan4 yang2 yao4 ye1 ye3 ye4 yi1 yi2 yi3 yi4 yin1
ying1 yong4 you3 you4 yu2 yu3 yuan2 yuan3 yue4 yun2 zai4 zao3 zhan4 zhao3 zhe4 zhen1 zheng1 zheng4 zhi1 zhong1
zhong4 zhu4 zi1 zi3 zi4 zou3 zui4 zuo3 zuo4`.trim().split(/\s+/));

/* pinyin có dấu → có số thanh: mǎ → ma3, nǚ → nv3, ma (thanh nhẹ) → ma5 */
const MARK={}; Object.entries({a:'āáǎà',e:'ēéěè',i:'īíǐì',o:'ōóǒò',u:'ūúǔù',v:'ǖǘǚǜ'}).forEach(([b,s])=>[...s].forEach((c,i)=>MARK[c]=[b,i+1]));
function pyNum(p){
  p=String(p).trim().toLowerCase(); if(/[1-5]$/.test(p))return p.replace(/ü/g,'v');
  let t=0,o=''; for(const c of p){if(MARK[c]){o+=MARK[c][0];t=MARK[c][1]}else o+=c==='ü'?'v':c}
  return o+(t||5);
}
const has=p=>HAVE.has(pyNum(p));

let el=null, cur=null;
function audio(){if(!el){el=new Audio();el.preload='auto'}return el}
/* iPhone/iPad: phần tử audio phải được "mở khóa" trong một lần chạm, sau đó mới phát được từ code (bài nghe tự phát) */
const SILENT='data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAIA+AAACABAAZGF0YQAAAAA=';
let unlocked=false;
function unlock(){if(unlocked)return;unlocked=true;try{const a=audio();a.muted=true;a.src=SILENT;const p=a.play();if(p)p.then(()=>{if(a.src===SILENT)a.pause();a.muted=false}).catch(()=>{a.muted=false})}catch(e){}}
['pointerdown','touchend','keydown'].forEach(ev=>W.addEventListener(ev,unlock,{capture:true,passive:true}));

/* lấy file: ưu tiên bản đã lưu (chạy được khi mất mạng), chưa có thì tải và lưu lại */
const blobs=new Map();
async function source(name){
  if(blobs.has(name))return blobs.get(name);
  const url=DIR+name+'.mp3';
  let res=null;
  try{if('caches' in W){const c=await caches.open(CACHE);res=await c.match(url);if(!res){const r=await fetch(url);if(!r.ok)throw new Error(r.status);await c.put(url,r.clone());res=r}}}catch(e){res=null}
  if(!res){try{const r=await fetch(url);if(r.ok)res=r}catch(e){}}
  if(!res)return null;
  const u=URL.createObjectURL(await res.blob()); blobs.set(name,u); return u;
}
function stop(){if(el&&!el.paused)try{el.pause()}catch(e){}; if(cur){const c=cur;cur=null;c()}}

function playSyllable(p,btn,{h,slow}={}){
  const name=pyNum(p), fallback=()=>A.speak(h||p,!!slow,btn);
  if(!HAVE.has(name))return fallback();
  if('speechSynthesis' in W)speechSynthesis.cancel();
  stop();
  return new Promise(resolve=>{
    let over=false; const tok={};
    const end=(useFallback)=>{if(over)return;over=true;if(btn)btn.classList.remove('playing');if(cur===tok.f)cur=null;
      if(useFallback)fallback().then(resolve);else resolve()};
    tok.f=()=>end(false); cur=tok.f;
    if(btn)btn.classList.add('playing');
    source(name).then(u=>{
      if(over)return; if(!u)return end(true);
      const a=audio(); a.onended=()=>end(false); a.onerror=()=>end(true);
      a.muted=false; a.src=u; a.playbackRate=slow?0.75:1; try{a.preservesPitch=true;a.webkitPreservesPitch=true}catch(e){}
      const pr=a.play(); if(pr&&pr.catch)pr.catch(err=>{if(err&&err.name==='AbortError')end(false);else end(true)});
      setTimeout(()=>end(false),8000);
    });
  });
}

/* nút Nghe / Nghe chậm của bài luyện nghe phần Pinyin (giống A.bindListen nhưng phát ghi âm) */
function bindListenPy(h,p,auto=true){
  const pl=A.$('#play'),sl=A.$('#slow');
  pl.onclick=()=>playSyllable(p,pl,{h}); sl.onclick=()=>playSyllable(p,sl,{h,slow:true});
  if(auto)A.addTimer(setTimeout(()=>playSyllable(p,pl,{h}),250));
}
A.playSyllable=playSyllable; A.pyNum=pyNum; A.hasSyllable=has; A.bindListenPy=bindListenPy; A.stopSyllable=stop;
})();
