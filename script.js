// Contact constants - replace with your real handles
const CONTACT_WHATSAPP_NUMBER = "+85512345678";
const TELEGRAM_HANDLE = "glsswrksGG";
const DISCORD_HANDLE = "Kokushibo#4764";

// Product data
const products = [
  {
    id: "atk-edge60he",
    title: "ATK EDGE 60 HE",
    short: "60% esports magnetic keyboard; aluminum CNC case; PBT dye‑sublimation keycaps",
    price: 229,
    layout: "60",
    available: true,
    img: "https://raw.githubusercontent.com/Glsswrks/keebcam/main/images/2_27ffe2b5-f717-4c2f-940c-959572442aa1.jpg",
    specs: ["60% (61 keys)","Aluminum CNC case","PBT dye‑sublimation keycaps","Hot‑swap / magnetic switches"]
  },
  {
       id: "nano68he",
        title: "Madlions Nano68 HE",
        short: "NANO68 Magnetic Switch Keyboard: Responsive switches, customizable RGB, low latency, and versatile functions for gamers",
        price: 45,
        layout: "68",
        img: "https://raw.githubusercontent.com/Glsswrks/keebcam/main/images/pink-nano-68-pro-keybord.jpg",
        specs: ["68 keys","Aluminum alloy Position Plate","Magnetic / Hall effect switches","Low latency"]
  }
];

/* ---------- Utility ---------- */
function whatsappLink(product){
  const base = `https://wa.me/${CONTACT_WHATSAPP_NUMBER.replace(/\D/g,'')}`;
  const text = encodeURIComponent(`Hi, I'm interested in ${product.title}. Is it available?`);
  return `${base}?text=${text}`;
}

/* ---------- Robust product link for GitHub Pages ---------- */
function productLink(id){
  // Example: https://glsswrks.github.io/keebcam/ -> baseDir "/keebcam/"
  const { origin, pathname } = window.location;
  const baseDir = pathname.replace(/index\.html$/, '').replace(/\/$/, ''); // strip trailing slash & index.html
  const url = `${origin}${baseDir}/products.html?id=${encodeURIComponent(id)}`;
  return url;
}

/* ---------- Safe element lookups ---------- */
const grid = document.getElementById('productGrid');
const layoutFilter = document.getElementById('layoutFilter');
const yearEl = document.getElementById('year');
const whatsappMain = document.getElementById('whatsappMain');
const telegramMain = document.getElementById('telegramMain');
const discordMain = document.getElementById('discordMain');

/* ---------- Render function (cards with price badge, clickable image/title) ---------- */
function render(productsList){
  if(!grid) return;
  grid.innerHTML = '';
  productsList.forEach(p=>{
    const card = document.createElement('div');
    card.className = 'card';

    const availClass = p.available ? 'availability available' : 'availability unavailable';
    const availText = p.available ? 'Available' : 'Unavailable';

    const href = productLink(p.id);

    card.innerHTML = `
      <span class="price-badge">$${p.price}</span>
      <a class="card-link" href="${href}" aria-label="View ${p.title}">
        <img src="${p.img}" alt="${p.title}">
      </a>
      <h4>
        <a class="card-title-link" href="${href}">${p.title}</a>
      </h4>
      <p class="muted">${p.short}</p>
      <div class="card-actions" style="align-items:center">
        <div style="margin-left:auto; display:flex; align-items:center; gap:8px">
          <span class="${availClass}">${availText}</span>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

/* ---------- Layout filter registration (safe) ---------- */
if(layoutFilter){
  layoutFilter.addEventListener('change', ()=>{
    const v = layoutFilter.value;
    if(v === 'all') render(products);
    else render(products.filter(p => p.layout === v));
  });
}

/* ---------- Optional UI enhancement: selected-label ---------- */
/*
(function setupSelectedLabel(){
  try {
    const wrapper = document.querySelector('.custom-select');
    if(!wrapper || !layoutFilter) return;

    let label = wrapper.querySelector('.selected-label');
    if(!label){
      label = document.createElement('span');
      label.className = 'selected-label';
      label.style.marginLeft = '10px';
      label.style.fontSize = '0.95rem';
      label.style.color = 'var(--muted)';
      label.style.fontWeight = '600';
      wrapper.appendChild(label);
    }

    function syncLabel(){
      const opt = layoutFilter.options[layoutFilter.selectedIndex];
      label.textContent = opt ? opt.text : '';
    }

    syncLabel();
    layoutFilter.addEventListener('change', syncLabel);
  } catch (e) {
    console.warn('selected-label setup failed', e);
  }
})();*/

/* ---------- Contact links (safe) ---------- */
if(whatsappMain) whatsappMain.href = `https://wa.me/${CONTACT_WHATSAPP_NUMBER.replace(/\D/g,'')}`;
if(telegramMain) telegramMain.href = `https://t.me/${TELEGRAM_HANDLE}`;
if(discordMain) discordMain.textContent = DISCORD_HANDLE;

/* ---------- Initial render and year ---------- */
if(grid) render(products);
if(yearEl) yearEl.textContent = new Date().getFullYear();
