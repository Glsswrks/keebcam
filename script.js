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
    img: "https://raw.githubusercontent.com/Glsswrks/keebcam/main/images/2_27ffe2b5-f717-4c2f-940c-959572442aa1.jpg",
    specs: ["60% (61 keys)","Aluminum CNC case","PBT dye‑sublimation keycaps","Hot‑swap / magnetic switches"]
  },
  {
    id: "made68-ultra",
    title: "MADE68 Ultra",
    short: "68‑key compact; premium aluminum case; Hall‑effect / magnetic switch features",
    price: 199,
    layout: "68",
    img: "https://raw.githubusercontent.com/Glsswrks/keebcam/main/images/4ef591ca-b818-4e2b-ae0a-14b2cc81f9f3-1000x1000-peMUQzqEYVGLpdYu48cevRgENzP3G9OX3h2PuM0n.png",
    specs: ["68 keys","Aluminum alloy case","Magnetic / Hall effect switches","Premium finish"]
  }
];

/* ---------- Utility ---------- */
function whatsappLink(product){
  const base = `https://wa.me/${CONTACT_WHATSAPP_NUMBER.replace(/\D/g,'')}`;
  const text = encodeURIComponent(`Hi, I'm interested in ${product.title}. Is it available?`);
  return `${base}?text=${text}`;
}

/* ---------- Safe element lookups ---------- */
const grid = document.getElementById('productGrid');
const layoutFilter = document.getElementById('layoutFilter');
const yearEl = document.getElementById('year');
const whatsappMain = document.getElementById('whatsappMain');
const telegramMain = document.getElementById('telegramMain');
const discordMain = document.getElementById('discordMain');

/* ---------- Render function (safe) ---------- */
function render(productsList){
  if(!grid) return;
  grid.innerHTML = '';
  productsList.forEach(p=>{
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${p.img}" alt="${p.title}">
      <h4>${p.title}</h4>
      <p class="muted">${p.short}</p>
      <div class="card-actions">
        <div class="price">$${p.price}</div>
        <div style="margin-left:auto">
          <a class="btn view" href="product.html?id=${encodeURIComponent(p.id)}">View</a>
          <a class="btn" href="${whatsappLink(p)}" target="_blank" rel="noopener">Inquire</a>
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
