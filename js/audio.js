/* ================= AudioService: phát thư viện audio tĩnh (web/audio) =================
   - Mọi lời đọc đi qua speak() trong core.js. speak() gọi AudioService trước; chỉ khi nội dung chưa có file
     (hoặc file lỗi / mất mạng) mới dùng giọng của trình duyệt (Web Speech API) làm dự phòng.
   - Tra cứu: audio/index.json (văn bản → đường dẫn), chỉ tải khi cần phát lần đầu. Không tải trước file MP3/M4A nào.
   - Một phần tử <audio> dùng chung: phát cái mới thì dừng cái cũ, không bao giờ phát chồng.
   - Không phát gì trước khi người dùng chạm / bấm phím lần đầu (không tự phát khi vừa mở trang).
   - Không lưu audio vào localStorage hay Firebase; trình duyệt tự cache file đã nghe theo HTTP. */
(function(){
const W=window, BASE='audio/';
const SILENT='data:audio/wav;base64,UklGRnQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YVAAAACAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgA==';
let index=null, loading=null, el=null, cur=null;
const failed=new Set();
let interacted=!!(navigator.userActivation&&navigator.userActivation.hasBeenActive);

/* cùng quy tắc với tools/audio/extract_texts.js: bỏ khoảng trắng và gợi ý tiếng Việt trong ngoặc */
function key(t){return String(t).replace(/\s+/g,'').replace(/[（(][^)）]*[A-Za-zÀ-ỹ][^)）]*[)）]/g,'')}

function load(){
  if(index)return Promise.resolve(index);
  if(!loading)loading=fetch(BASE+'index.json',{cache:'no-cache'})
    .then(r=>{if(!r.ok)throw new Error('index '+r.status);return r.json()})
    .then(j=>{index=j;return j})
    .catch(()=>{loading=null;return null});
  return loading;
}
function url(text,slow){
  if(!index)return null;
  const p=index.t[key(text)]; if(!p)return null;
  const i=p.lastIndexOf('/');
  const path=slow?`${p.slice(0,i)}/${index.slowDir}/${p.slice(i+1)}`:p;
  return `${BASE}${path}${index.ext}?v=${index.v}`;
}
function audioEl(){if(!el){el=new Audio();el.preload='auto'}return el}

/* iOS: phát một đoạn im lặng ngay trong lần chạm đầu tiên để các lần phát sau (kể cả tự phát câu hỏi nghe) không bị chặn */
function unlock(){
  const a=audioEl(); if(a.src)return;
  try{a.muted=true;a.src=SILENT;const p=a.play();if(p)p.then(()=>{a.pause();a.muted=false}).catch(()=>{a.muted=false})}catch(e){}
}
function onFirst(){if(interacted)return;interacted=true;unlock()}
['pointerdown','touchstart','keydown'].forEach(ev=>W.addEventListener(ev,onFirst,{capture:true,passive:true}));

function stop(){
  if(el&&!el.paused){try{el.pause()}catch(e){}}
  if(cur){const c=cur;cur=null;c.finish(true)}
}

/* Phát một nội dung. Kết quả: 'played' (đã phát hoặc bị dừng), 'blocked' (trình duyệt chặn tự phát), 'missing' (chưa có file / lỗi → dùng dự phòng) */
function play(text,{slow=false,rate=1,btn=null}={}){
  return load().then(()=>{
    const u=url(text,slow);
    if(!u||failed.has(u))return 'missing';
    stop();
    return new Promise(res=>{
      const a=audioEl(), token={}; let over=false, guard=0;
      const finish=(result)=>{
        if(over)return; over=true; clearTimeout(guard);
        a.onended=a.onerror=null;
        if(btn)btn.classList.remove('playing');
        if(cur&&cur.token===token)cur=null;
        res(result===true?'played':result);
      };
      cur={token,finish};
      if(btn)btn.classList.add('playing');
      a.onended=()=>finish(true);
      a.onerror=()=>{failed.add(u);finish('missing')};
      a.muted=false; a.src=u;
      a.defaultPlaybackRate=rate; a.playbackRate=rate;
      try{a.preservesPitch=true;a.webkitPreservesPitch=true}catch(e){}
      const p=a.play();
      if(p&&p.catch)p.catch(err=>{
        if(err&&err.name==='NotAllowedError')finish('blocked');
        else if(err&&err.name==='AbortError')finish(true);      // bị thay bằng lượt phát mới
        else{failed.add(u);finish('missing')}
      });
      guard=setTimeout(()=>finish(true),60000);
    });
  });
}

/* thống kê để kiểm tra độ bao phủ ngay trên trình duyệt: AudioService.coverage(['你好', ...]) */
function has(text){return !!(index&&index.t[key(text)])}
function coverage(texts){return load().then(()=>{const miss=texts.filter(t=>!has(t));return {total:texts.length,have:texts.length-miss.length,missing:miss}})}

W.AudioService={play,stop,load,has,coverage,key,url:(t,s)=>url(t,s),interacted:()=>interacted,
  state:()=>({src:el?el.src:'',paused:el?el.paused:true,time:el?el.currentTime:0,rate:el?el.playbackRate:1,failed:[...failed],loaded:!!index}),
  playWord:(t,o)=>play(t,o),playSentence:(t,o)=>play(t,o),playDialogue:(t,o)=>play(t,o),playSlow:(t,o)=>play(t,{...(o||{}),slow:true})};
})();
