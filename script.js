// script.js
document.addEventListener('DOMContentLoaded', () => {
  const products = [
    {
      id: 'kb-analog-1',
      title: 'Apex Analog 65',
      price: 199,
      img: 'assets/keyboard-1.jpg',
      desc: '65% analog keyboard with hot-swap sockets and gasket mount.',
      specs: ['Analog input', 'Hot-swap', 'Gasket mount', 'PBT keycaps']
    },
    {
      id: 'kb-analog-2',
      title: 'Apex Analog 75',
      price: 229,
      img: 'assets/keyboard-2.jpg',
      desc: '75% layout with rotary encoder and per-key RGB.',
      specs: ['Per-key RGB', 'Rotary encoder', 'Hot-swap', 'USB-C']
    },
    {
      id: 'kb-analog-3',
      title: 'Apex Pro TKL',
      price: 249,
      img: 'assets/keyboard-3.jpg',
      desc: 'Tenkeyless pro model with aluminum top plate.',
      specs: ['Aluminum top plate', 'Hot-swap', 'Analog sensing', 'Firmware']
    }
  ];

  const productGrid = document.getElementById('productGrid');
  const modal = document.getElementById('productModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalSpecs = document.getElementById('modalSpecs');
  const modalImage = document.getElementById('modalImage');
  const modalPrice = document.getElementById('modalPrice');
  const addToCartBtn = document.getElementById('addToCart');
  const cartCount = document.getElementById('cartCount');
  const cartBtn = document.getElementById('cartBtn');
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.querySelector('.main-nav');

  // Render product cards
  products.forEach(p => {
    const card = document.createElement('article');
    card.className = 'product-card';
    card.innerHTML = `
      <div class="product-thumb"><img src="${p.img}" alt="${p.title}"></div>
      <div>
        <div class="product-meta">
          <div class="product-title">${p.title}</div>
          <div class="product-price">$${p.price}</div>
        </div>
        <p class="product-desc" style="color:var(--muted);margin:8px 0">${p.desc}</p>
        <div class="product-actions">
          <button class="btn btn-outline view-btn" data-id="${p.id}">View</button>
          <button class="btn btn-primary add-btn" data-id="${p.id}">Add to cart</button>
        </div>
      </div>
    `;
    productGrid.appendChild(card);
  });

  // Open modal
  productGrid.addEventListener('click', (e) => {
    const view = e.target.closest('.view-btn');
    const add = e.target.closest('.add-btn');
    if (view) {
      const id = view.dataset.id;
      openProductModal(id);
    } else if (add) {
      const id = add.dataset.id;
      addToCart(id);
    }
  });

  function openProductModal(id) {
    const p = products.find(x => x.id === id);
    if (!p) return;
    modalTitle.textContent = p.title;
    modalDesc.textContent = p.desc;
    modalImage.src = p.img;
    modalPrice.textContent = `$${p.price}`;
    modalSpecs.innerHTML = '';
    p.specs.forEach(s => {
      const li = document.createElement('li');
      li.textContent = s;
      modalSpecs.appendChild(li);
    });
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  // Close modal
  document.getElementById('modalClose').addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  function closeModal() {
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Cart logic (simple)
  let cart = [];
  function addToCart(id) {
    const p = products.find(x => x.id === id);
    if (!p) return;
    cart.push(p);
    cartCount.textContent = cart.length;
    // small feedback
    cartBtn.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.08)' }, { transform: 'scale(1)' }], { duration: 220 });
  }

  // Header menu toggle for small screens
  menuToggle.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!expanded));
    mainNav.style.display = expanded ? 'none' : 'block';
  });

  // Footer year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Add to cart from modal
  addToCartBtn.addEventListener('click', () => {
    const title = modalTitle.textContent;
    const p = products.find(x => x.title === title);
    if (p) addToCart(p.id);
    closeModal();
  });

  // Keyboard accessibility: close modal on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') closeModal();
  });
});