/* Minh họa vẽ bằng SVG: gấu trúc, đèn lồng, đồng xu, logo */
(function(){
const lantern=(x,y,s,id)=>`
  <g transform="translate(${x} ${y}) scale(${s})">
    <rect x="-16" y="-50" width="32" height="10" rx="3" fill="#C9823A"/>
    <ellipse cx="0" cy="0" rx="48" ry="42" fill="url(#lg${id})"/>
    <ellipse cx="0" cy="0" rx="32" ry="42" fill="none" stroke="#B4463F" stroke-width="1.5" opacity=".55"/>
    <ellipse cx="0" cy="0" rx="14" ry="42" fill="none" stroke="#B4463F" stroke-width="1.5" opacity=".55"/>
    <path d="M-46 -8 Q0 -2 46 -8 M-46 10 Q0 16 46 10" stroke="#F6B26B" stroke-width="2" fill="none" opacity=".8"/>
    <rect x="-16" y="40" width="32" height="10" rx="3" fill="#C9823A"/>
    <circle cx="0" cy="58" r="5" fill="#E9665A"/>
    <path d="M-6 62 L-9 104 M-3 62 L-4 108 M0 62 L0 110 M3 62 L4 108 M6 62 L9 104" stroke="#F0A04B" stroke-width="2.2" stroke-linecap="round"/>
  </g>`;
const defs=`<defs>
  <radialGradient id="lg1" cx=".38" cy=".35" r=".75"><stop offset="0" stop-color="#F58A72"/><stop offset=".7" stop-color="#E25A4C"/><stop offset="1" stop-color="#B8433A"/></radialGradient>
  <radialGradient id="lg2" cx=".38" cy=".35" r=".75"><stop offset="0" stop-color="#F58A72"/><stop offset=".7" stop-color="#DD5347"/><stop offset="1" stop-color="#A93C34"/></radialGradient>
</defs>`;
const LANTERNS=`<svg viewBox="0 0 200 330" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${defs}
  <path d="M138 0 Q140 40 132 62" stroke="#E07A5F" stroke-width="2" fill="none"/>
  <path d="M70 0 Q80 90 66 152" stroke="#E07A5F" stroke-width="2" fill="none"/>
  ${lantern(130,110,1,1)}${lantern(64,200,.95,2)}
  <circle cx="160" cy="240" r="3" fill="#E9665A" opacity=".6"/></svg>`;
const coin=(y)=>`<g transform="translate(30 ${y})"><circle r="22" fill="#F5E2C4" stroke="#D9A863" stroke-width="3"/><circle r="15" fill="none" stroke="#E7C38D" stroke-width="1.5"/><rect x="-5" y="-5" width="10" height="10" fill="#C0392B" opacity=".75"/></g>`;
const COINS=`<svg viewBox="0 0 60 190" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path d="M30 0 V150" stroke="#D9A863" stroke-width="1.5"/>${coin(70)}${coin(140)}</svg>`;

const PANDA=`<svg viewBox="0 0 480 470" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Gấu trúc đang đọc sách tiếng Trung">
  <defs>
    <radialGradient id="cloudg" cx=".5" cy=".4" r=".7"><stop offset="0" stop-color="#FCE3D9"/><stop offset="1" stop-color="#FCE3D9" stop-opacity="0"/></radialGradient>
    <linearGradient id="vest" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#E5655A"/><stop offset="1" stop-color="#C94A40"/></linearGradient>
    <linearGradient id="base" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F29B8E"/><stop offset="1" stop-color="#E06456"/></linearGradient>
    <pattern id="flow" width="26" height="26" patternUnits="userSpaceOnUse"><circle cx="6" cy="6" r="2.4" fill="#F7B0A3" opacity=".7"/><circle cx="19" cy="18" r="1.8" fill="#F7B0A3" opacity=".6"/></pattern>
  </defs>
  <ellipse cx="230" cy="210" rx="230" ry="200" fill="url(#cloudg)"/>
  <g fill="#FBE4DA"><circle cx="120" cy="300" r="60"/><circle cx="180" cy="270" r="70"/><circle cx="330" cy="280" r="64"/><circle cx="390" cy="320" r="50"/></g>
  <!-- chùa -->
  <g transform="translate(395 150)">
    <rect x="-20" y="40" width="40" height="230" rx="4" fill="#5C4A45"/>
    <rect x="-13" y="70" width="26" height="40" rx="2" fill="#7A6560"/>
    <path d="M-13 82 H13 M-13 96 H13 M0 70 V110" stroke="#5C4A45" stroke-width="2"/>
    <rect x="-13" y="140" width="26" height="40" rx="2" fill="#7A6560"/>
    <path d="M-13 152 H13 M-13 166 H13 M0 140 V180" stroke="#5C4A45" stroke-width="2"/>
    <path d="M-62 40 Q-30 28 -18 6 L18 6 Q30 28 62 40 Q30 34 0 36 Q-30 34 -62 40Z" fill="#D9574B"/>
    <path d="M-40 10 Q-18 0 -10 -14 L10 -14 Q18 0 40 10Z" fill="#E9665A"/>
    <circle cx="0" cy="-22" r="7" fill="#D9574B"/>
    <path d="M0 -40 V-29" stroke="#C38B3A" stroke-width="3"/>
    <path d="M-62 40 l-6 14 M62 40 l6 14" stroke="#5C4A45" stroke-width="2"/>
  </g>
  <!-- đế mây -->
  <ellipse cx="225" cy="418" rx="200" ry="34" fill="url(#base)"/>
  <ellipse cx="225" cy="408" rx="184" ry="24" fill="#F6B3A7"/>
  <!-- lá -->
  <g fill="#86C2B3"><path d="M40 410 C30 360 60 340 90 330 C80 360 70 390 40 410Z"/><path d="M60 412 C70 380 100 370 120 372 C105 392 90 405 60 412Z" fill="#A6D3C7"/>
  <path d="M430 410 C445 365 425 335 400 325 C405 360 410 390 430 410Z"/></g>
  <!-- thân -->
  <ellipse cx="160" cy="388" rx="58" ry="34" fill="#2E2726"/>
  <ellipse cx="292" cy="388" rx="58" ry="34" fill="#2E2726"/>
  <ellipse cx="140" cy="392" rx="20" ry="16" fill="#5A4D4B"/><ellipse cx="312" cy="392" rx="20" ry="16" fill="#5A4D4B"/>
  <ellipse cx="226" cy="310" rx="108" ry="98" fill="#FFFFFF"/>
  <path d="M120 300 C122 250 150 222 186 214 L190 395 C150 392 122 360 120 300Z" fill="url(#vest)"/>
  <path d="M332 300 C330 250 302 222 266 214 L262 395 C302 392 330 360 332 300Z" fill="url(#vest)"/>
  <path d="M120 300 C122 250 150 222 186 214 L190 395 C150 392 122 360 120 300Z" fill="url(#flow)"/>
  <path d="M332 300 C330 250 302 222 266 214 L262 395 C302 392 330 360 332 300Z" fill="url(#flow)"/>
  <rect x="150" y="340" width="152" height="16" rx="6" fill="#E3A548"/>
  <path d="M160 348 H292" stroke="#C38B3A" stroke-width="2" stroke-dasharray="6 5"/>
  <!-- sách -->
  <g transform="translate(226 292) rotate(-4)">
    <path d="M-70 -30 Q-35 -40 0 -26 L0 34 Q-35 20 -70 30Z" fill="#FFF8F2" stroke="#E7C3B6" stroke-width="2"/>
    <path d="M70 -30 Q35 -40 0 -26 L0 34 Q35 20 70 30Z" fill="#FFF1E8" stroke="#E7C3B6" stroke-width="2"/>
    <text x="-36" y="10" text-anchor="middle" font-family="Noto Sans SC, PingFang SC, sans-serif" font-weight="700" font-size="30" fill="#D9574B">汉</text>
    <path d="M14 -14 H56 M14 -2 H56 M14 10 H48" stroke="#E7C3B6" stroke-width="3" stroke-linecap="round"/>
  </g>
  <!-- tay -->
  <ellipse cx="148" cy="296" rx="26" ry="44" transform="rotate(-28 148 296)" fill="#2E2726"/>
  <ellipse cx="304" cy="296" rx="26" ry="44" transform="rotate(28 304 296)" fill="#2E2726"/>
  <!-- đầu -->
  <circle cx="168" cy="110" r="30" fill="#2E2726"/><circle cx="288" cy="110" r="30" fill="#2E2726"/>
  <circle cx="168" cy="112" r="14" fill="#5A4D4B"/><circle cx="288" cy="112" r="14" fill="#5A4D4B"/>
  <ellipse cx="228" cy="172" rx="86" ry="78" fill="#FFFFFF"/>
  <ellipse cx="196" cy="172" rx="22" ry="29" transform="rotate(-28 196 172)" fill="#2E2726"/>
  <ellipse cx="260" cy="172" rx="22" ry="29" transform="rotate(28 260 172)" fill="#2E2726"/>
  <circle cx="199" cy="168" r="10" fill="#FFF"/><circle cx="257" cy="168" r="10" fill="#FFF"/>
  <circle cx="201" cy="169" r="6" fill="#2E2726"/><circle cx="255" cy="169" r="6" fill="#2E2726"/>
  <circle cx="203" cy="166" r="2.2" fill="#FFF"/><circle cx="257" cy="166" r="2.2" fill="#FFF"/>
  <ellipse cx="228" cy="200" rx="12" ry="8" fill="#2E2726"/>
  <path d="M228 207 V214 M214 214 Q221 224 228 214 Q235 224 242 214" stroke="#2E2726" stroke-width="3" fill="none" stroke-linecap="round"/>
  <ellipse cx="176" cy="205" rx="12" ry="7" fill="#F7A99C" opacity=".7"/><ellipse cx="280" cy="205" rx="12" ry="7" fill="#F7A99C" opacity=".7"/>
  <!-- chấm trang trí -->
  <circle cx="80" cy="200" r="4" fill="#E9665A" opacity=".5"/><circle cx="350" cy="96" r="3" fill="#E9665A" opacity=".5"/><circle cx="60" cy="360" r="3" fill="#E9665A" opacity=".4"/>
</svg>`;

const LOGO=`<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <circle cx="9" cy="10" r="7" fill="#2E2726"/><circle cx="31" cy="10" r="7" fill="#2E2726"/>
  <circle cx="20" cy="22" r="15" fill="#FFF" stroke="#2E2726" stroke-width="2"/>
  <ellipse cx="14" cy="21" rx="4" ry="5.5" transform="rotate(-25 14 21)" fill="#2E2726"/><ellipse cx="26" cy="21" rx="4" ry="5.5" transform="rotate(25 26 21)" fill="#2E2726"/>
  <circle cx="14.5" cy="20.5" r="1.5" fill="#FFF"/><circle cx="25.5" cy="20.5" r="1.5" fill="#FFF"/>
  <ellipse cx="20" cy="27" rx="2.6" ry="1.8" fill="#2E2726"/></svg>`;

window.ART={LANTERNS,COINS,PANDA,LOGO};
})();
