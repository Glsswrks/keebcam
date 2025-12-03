// Contact constants
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
    id: "made68-ultra",
    title: "MADE68 Ultra",
    short: "68‑key compact; premium aluminum case; Hall‑effect / magnetic switch features",
    price: 199,
    layout: "68",
    available: false,
    img: "https://raw.githubusercontent.com/Glsswrks/keebcam/main/images/4ef591ca-b818-4e2b-ae0a-14b2cc81f9f3-1000x1000-peMUQzqEYVGLpdYu48cevRgENzP3G9OX3h2PuM0n.png",
    specs: ["68 keys","Aluminum alloy case","Magnetic / Hall effect switches","Premium finish"]
  }
];

// Utility
function whatsappLink(product){
  const base = `https://wa.me/${CONTACT_WHATSAPP_NUMBER.replace(/\D/g,'')}`;
  const text = encodeURIComponent(`Hi, I'm interested in ${product.title}. Is it available?`);
  return `${base}?text=${text}`;
}

// Robust product link for GitHub Pages
function productLink(id){
  const { origin, pathname } = window.location;
  const baseDir = pathname.replace(/index\.html$/, '').replace(/\/$/, '');
  return `${origin}${baseDir}/products.html?id=${encodeURIComponent(id)}`;
}

// Safe element lookups
const grid = document.getElementById('productGrid');
const yearEl = document.getElementById('year');
const whatsappMain = document.getElementById('whatsappMain');
const telegramMain = document.getElementById('telegramMain');
const discordMain = document.getElementById('discordMain');

// Render function (image area + body with footer)
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
      <div class="card-image">
        <a class="card-link" href="${href}" aria-label="View ${p.title}">
          <img src="${p.img}" alt="${p.title}">
        </a>
        <span class="price-badge">$${p.price}</span>
      </div>

      <div class="card-body">
        <h4 class="card-title">
          <a class="card-title-link" href="${href}">${p.title}</a>
        </h4>
        <p class="muted card-desc">${p.short}</p>

        <div class="card-footer">
          <div class="specs-inline muted">${p.layout} • ${p.specs[0] || ''}</div>
          <div class="availability-wrap">
            <span class="${availClass}">${availText}</span>
          </div>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

// Contact links
if(whatsappMain) whatsappMain.href = `https://wa.me/${CONTACT_WHATSAPP_NUMBER.replace(/\D/g,'')}`;
if(telegramMain) telegramMain.href = `https://t.me/${TELEGRAM_HANDLE}`;
if(discordMain) discordMain.textContent = DISCORD_HANDLE;

// Init
if(grid) render(products);
if(yearEl) yearEl.textContent = new Date().getFullYear();
