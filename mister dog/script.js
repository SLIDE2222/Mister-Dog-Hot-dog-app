// ==============================
// MISTER DOG - FULL FIXED SCRIPT
// ==============================

console.log("script loaded ✅");

// ===== MENU DATA =====
const menu = [
  {
    id: 1,
    name: "Misterdog Completo",
    price: 15.0,
    img: "img/placeholder.jpg",
    desc: "Pão, salsicha, maionese especial, tomate com milho, tomate com cebola, batata palha, ketchup e mostarda."
  },
  {
    id: 2,
    name: "Misterdog Vegetariano",
    price: 19.0,
    img: "img/placeholder.jpg",
    desc: "Pão, salsicha de soja, maionese especial, tomate com milho, tomate com cebola, batata palha, ketchup e mostarda."
  },
  {
    id: 3,
    name: "Mister Cala-Bacon",
    price: 22.0,
    img: "img/placeholder.jpg",
    desc: "Pão, salsicha, tomate com milho, tomate com cebola, batata palha, ketchup, mostarda, bacon e calabresa."
  },
  {
    id: 4,
    name: "Misterdog Calabresa",
    price: 19.0,
    img: "img/placeholder.jpg",
    desc: "Pão, salsicha, maionese especial, tomate com cebola, batata palha, ketchup, mostarda e calabresa em fatias."
  },
  {
    id: 5,
    name: "Misterdog Bacon",
    price: 19.0,
    img: "img/placeholder.jpg",
    desc: "Pão, salsicha, maionese especial, tomate com cebola, batata palha, ketchup, mostarda e bacon em cubos."
  },
  {
    id: 6,
    name: "Maionese Especial do Mister",
    price: 3.0,
    img: "img/placeholder.jpg",
    desc: "Maionese caseira, de qualidade e sabor irresistível."
  },
  {
    id: 7,
    name: "Água Mineral 510ml",
    price: 3.0,
    img: "img/placeholder.jpg",
    desc: "Água mineral sem gás, garrafa 510ml."
  },
  {
    id: 8,
    name: "Suco de Laranja 500ml",
    price: 10.0,
    img: "img/placeholder.jpg",
    desc: "Suco de laranja, garrafa 500ml."
  },
  {
    id: 9,
    name: "Coca-Cola 350ml",
    price: 7.0,
    img: "img/placeholder.jpg",
    desc: "Coca-Cola gelada, lata 350ml."
  },
  {
    id: 10,
    name: "Coca-Cola 1,5L",
    price: 12.0,
    img: "img/placeholder.jpg",
    desc: "Coca-Cola, garrafa 1,5L."
  },
  {
    id: 11,
    name: "Tubaína 350ml",
    price: 4.0,
    img: "img/placeholder.jpg",
    desc: "Tubaína, garrafa 350ml."
  },
  {
    id: 12,
    name: "Tubaína 2L",
    price: 10.0,
    img: "img/placeholder.jpg",
    desc: "Tubaína, garrafa 2L."
  },
  {
    id: 13,
    name: "Guaraná Tubaína Zero 2L",
    price: 10.0,
    img: "img/placeholder.jpg",
    desc: "Guaraná Tubaína Zero, embalagem 2L."
  }
];

const adicionais = [
  { id: "sausage", name: "+1 Salsicha", price: 4 },
  { id: "catupiry", name: "Catupiry", price: 3 },
  { id: "cheddar", name: "Cheddar", price: 3 }
];

let cart = [];

// ===== DOM ELEMENTS (CART) =====
const cartItems = document.getElementById("cartItems");
const cartHint = document.getElementById("cartHint");
const subtotalEl = document.getElementById("subtotal");
const feeEl = document.getElementById("fee");
const totalEl = document.getElementById("total");
const checkoutBtn = document.getElementById("checkoutBtn");
const clearBtn = document.getElementById("clearBtn");
const dealBtn = document.getElementById("dealBtn");

// ===== DOM ELEMENTS (CHECKOUT MODAL) =====
const checkoutModal = document.getElementById("checkoutModal");
const closeCheckout = document.getElementById("closeCheckout");
const coSubtotal = document.getElementById("coSubtotal");
const coFee = document.getElementById("coFee");
const coTotal = document.getElementById("coTotal");
const checkoutForm = document.getElementById("checkoutForm");
const coName = document.getElementById("coName");
const coPhone = document.getElementById("coPhone");
const coNotes = document.getElementById("coNotes");

// ===== DOM ELEMENTS (PRODUCT MODAL) =====
const productModal = document.getElementById("productModal");
const productBackdrop = document.getElementById("productBackdrop");
const closeProduct = document.getElementById("closeProduct");
const productTitle = document.getElementById("productTitle");
const productDesc = document.getElementById("productDesc");
const productPrice = document.getElementById("productPrice");
const addFromModal = document.getElementById("addFromModal");
const productImg = document.getElementById("productImg");
const coNeighborhood = document.getElementById("coNeighborhood");
const addrNumber = document.getElementById("addrNumber");

let selectedProductId = null;

// ===== GUARDS (debug only) =====
console.log("cartItems:", cartItems);
console.log("checkoutModal:", checkoutModal);

if (!cartItems || !subtotalEl || !feeEl || !totalEl || !checkoutBtn || !clearBtn) {
  console.error(
    "Cart DOM elements missing. Check IDs: cartItems/subtotal/fee/total/checkoutBtn/clearBtn"
  );
}

if (!checkoutModal || !closeCheckout || !coSubtotal || !coFee || !coTotal || !checkoutForm) {
  console.error(
    "Checkout modal elements missing. Check IDs: checkoutModal/closeCheckout/coSubtotal/coFee/coTotal/checkoutForm"
  );
}

// ===== DELIVERY FEE (by neighborhood) =====
const FREE_DELIVERY_OVER = 45; // R$ 45+ free delivery

const SHOP = { lat: -23.5910, lng: -48.0530 }; // TODO: set real coords

const neighborhoodCoords = {
  "centro": { lat: -23.5910, lng: -48.0530 },
  "vila mazzei": { lat: -23.5850, lng: -48.0450 },
  "vila aparecida": { lat: -23.6000, lng: -48.0600 },
  "jardim paulista": { lat: -23.5750, lng: -48.0620 },
  "vila barcelos": { lat: -23.6100, lng: -48.0400 },
  "jardim esplanada": { lat: -23.5650, lng: -48.0500 },
  "morada do sol": { lat: -23.5550, lng: -48.0700 }
};

function haversineKm(a, b) {
  const R = 6371;
  const dLat = (b.lat - a.lat) * Math.PI / 180;
  const dLng = (b.lng - a.lng) * Math.PI / 180;
  const lat1 = a.lat * Math.PI / 180;
  const lat2 = b.lat * Math.PI / 180;

  const x =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;

  return 2 * R * Math.asin(Math.sqrt(x));
}

function deliveryFeeByNeighborhood(neighborhood, subtotal) {
  if (subtotal >= FREE_DELIVERY_OVER) return 0;

  const b = normalizeText(neighborhood);
  const customerPoint = neighborhoodCoords[b];

  if (!customerPoint) return 8; // fallback unknown bairro

  const km = haversineKm(SHOP, customerPoint);

  if (km <= 2) return 4;
  if (km <= 5) return 6;
  if (km <= 8) return 8;
  return 10;
}

function normalizeText(s) {
  return String(s || "")
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, ""); // remove accents
}



function getUserNeighborhood() {
  const userRaw = localStorage.getItem("user");
  if (!userRaw) return "";

  const user = JSON.parse(userRaw);
  const emailKey = (user.email || "").toLowerCase();
  const addressKey = `addresses_${emailKey}`;

  const addresses = JSON.parse(localStorage.getItem(addressKey) || "[]");
  if (!addresses.length) return "";

  const last = addresses[addresses.length - 1] || {};

  // accept multiple possible field names (in case you saved differently)
  return (
    last.neighborhood ||
    last.bairro ||
    last.neighbourhood ||
    ""
  );
}

// ===== HELPERS =====
function calcTotals() {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const neighborhood = getCheckoutNeighborhood(); // ✅ use typed first
  const fee = deliveryFeeByNeighborhood(neighborhood, subtotal);

  console.log("📦 Bairro used:", neighborhood || "(none)", "| Fee:", fee, "| Subtotal:", subtotal);

  const total = subtotal + fee;
  return { subtotal, fee, total, neighborhoodUsed: neighborhood };
}

function extrasKey(extras) {
  // stable signature: bacon|calabresa|maionese ...
  return (extras || [])
    .map(e => e.id)
    .filter(Boolean)
    .sort()
    .join("|");
}

function sameCartItem(a, b) {
  return a.id === b.id && extrasKey(a.extras) === extrasKey(b.extras);
}

function formatBRL(value) {
  return Number(value || 0).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

const menuGrid = document.getElementById("menuGrid");

function renderMenu() {
  if (!menuGrid) return;

  menuGrid.innerHTML = "";

  menu.forEach((item) => {
    const card = document.createElement("div");
    card.className = "card";

card.innerHTML = `
  <img
    src="${item.img || "img/placeholder.jpg"}"
    alt="${item.name}"
    class="food-img"
    data-open-product="${item.id}"
    onerror="this.src='img/placeholder.jpg'"
  >

  <div class="card-top">
    <h3>${item.name}</h3>
    <span class="tag">MENU</span>
  </div>

  <p class="muted">Delicious. Probably.</p>

  <div class="price">
    <span class="money">${formatBRL(item.price)}</span>
    <button class="pill" data-id="${item.id}" type="button">Adicionar</button>

    ${item.id <= 5 ? `
      <button class="pill ghost" data-adicionais="${item.id}" type="button">
        + Adicionais
      </button>
    ` : ""}
  </div>
`;

    menuGrid.appendChild(card);
  });
}

function getCheckoutNeighborhood() {
  // 1) What user is typing right now (modal)
  const typed = coNeighborhood?.value?.trim();
  if (typed) return typed;

  // 2) Fallback to saved profile address
  const saved = getUserNeighborhood();
  if (saved) return saved;

  // 3) Nothing available
  return "";
}

// ===== CART FUNCTIONS =====
function addToCart(product) {
  // product.extras may be undefined or []
  const idx = cart.findIndex((x) => sameCartItem(x, product));

  if (idx >= 0) {
    cart[idx].quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  renderCart();
}

function removeOneFromCart(id) {
  const item = cart.find((x) => x.id === id);
  if (!item) return;

  item.quantity -= 1;

  // If quantity hits 0, remove the item completely
  if (item.quantity <= 0) {
    cart = cart.filter((x) => x.id !== id);
  }

  renderCart();
}

function updateTotals() {
  const { subtotal, fee, total } = calcTotals();

  if (subtotalEl) subtotalEl.textContent = formatBRL(subtotal);
  if (feeEl) feeEl.textContent = formatBRL(fee);
  if (totalEl) totalEl.textContent = formatBRL(total);

  const isEmpty = cart.length === 0;
  if (checkoutBtn) checkoutBtn.disabled = isEmpty;
  if (clearBtn) clearBtn.disabled = isEmpty;

  if (cartHint) {
    cartHint.textContent = isEmpty
  ? "Seu carrinho está vazio 🌭"
  : "";
  }
}

function renderCart() {
  if (!cartItems) return;

  cartItems.innerHTML = "";

  cart.forEach((item) => {
    const row = document.createElement("div");
    row.className = "cart-row";
 row.innerHTML = `
  <div class="cart-left">

    <div class="qty-control">
      <button class="qty-btn" data-action="minus" data-id="${item.id}" data-extras="${extrasKey(item.extras)}" type="button">−</button>

<button class="qty-btn" data-action="plus" data-id="${item.id}" data-extras="${extrasKey(item.extras)}" type="button">+</button>
    </div>

   <span class="cart-title">
  ${item.name}

  ${
    item.extras && item.extras.length
      ? `
      <div class="cart-extras">
        ${item.extras.map(e => `<small>+ ${e.name}</small>`).join("")}
      </div>
      `
      : ""
  }
</span>

  </div>

  <span>${formatBRL(item.price * item.quantity)}</span>
`;
    cartItems.appendChild(row);
  });

  updateTotals();
}

function clearCart() {
  cart = [];
  renderCart();
}

function openProductModal(item, mode = "product") {
  if (!productModal) return;

  selectedProductId = item.id;

  // Always show image + title
  if (productTitle) productTitle.textContent = item.name;
  if (productImg) {
    productImg.style.display = "block";
    productImg.src = item.img || "img/placeholder.jpg";
    productImg.alt = item.name;
  }

  // Description
  if (productDesc) productDesc.innerHTML = `<p>${item.desc || "Delicious. Probably."}</p>`;

  // Extras section (only hotdogs)
  const allowExtras = item.id <= 5;

  if (allowExtras) {
  const extrasHTML = `
  <div class="extras-box">
    <p class="extras-title"><strong>Adicionais</strong></p>

    <div class="extras-list">
      ${adicionais.map(a => `
        <label class="extra-item">
          <input class="extra-check" type="checkbox" value="${a.id}">
          <span class="extra-name">${a.name}</span>
          <span class="extra-price">+${formatBRL(a.price)}</span>
        </label>
      `).join("")}
    </div>
  </div>
`;
    productDesc.innerHTML += extrasHTML;
  }

  // Price update (base at first)
  if (productPrice) productPrice.textContent = formatBRL(item.price);

  // Button label
  if (addFromModal) addFromModal.textContent = "Adicionar 🌭";

  // Show modal
  productModal.classList.add("show");
  productModal.setAttribute("aria-hidden", "false");

  // If opened from “+ adicionais” you can scroll to extras area (optional)
  if (mode === "extras") {
    setTimeout(() => {
      productModal.querySelector(".extras-box")?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 50);
  }
}


// ===== CHECKOUT MODAL FUNCTIONS =====
function openCheckout() {
  console.log("openCheckout ✅");

  if (cart.length === 0) return;

  if (!checkoutModal || !coSubtotal || !coFee || !coTotal) {
    console.error("Cannot open checkout: modal totals elements are missing.");
    return;
  }

  const { subtotal, fee, total } = calcTotals();
  coSubtotal.textContent = formatBRL(subtotal);
  coFee.textContent = formatBRL(fee);
  coTotal.textContent = formatBRL(total);

  checkoutModal.classList.add("show");
  checkoutModal.setAttribute("aria-hidden", "false");
}

function closeCheckoutModal() {
  if (!checkoutModal) return;
  checkoutModal.classList.remove("show");
  checkoutModal.setAttribute("aria-hidden", "true");
}

// ===== ONE CLICK SYSTEM (EVENT DELEGATION) =====
document.addEventListener("click", (e) => {
    // Remove one item from cart (minus button)
const minusBtn = e.target.closest('.qty-btn[data-action="minus"]');
if (minusBtn) {
  const id = Number(minusBtn.dataset.id);
  const ex = minusBtn.dataset.extras || "";

  const idx = cart.findIndex(x => x.id === id && extrasKey(x.extras) === ex);
  if (idx < 0) return;

  cart[idx].quantity -= 1;
  if (cart[idx].quantity <= 0) cart.splice(idx, 1);

  renderCart();
  return;
}

const plusBtn = e.target.closest('.qty-btn[data-action="plus"]');
if (plusBtn) {
  const id = Number(plusBtn.dataset.id);
  const ex = plusBtn.dataset.extras || "";

  const idx = cart.findIndex(x => x.id === id && extrasKey(x.extras) === ex);
  if (idx < 0) return;

  cart[idx].quantity += 1;

  renderCart();
  return;
}

    // Open product modal when clicking the image
const img = e.target.closest('[data-open-product]');
if (img) {
  const id = Number(img.dataset.openProduct);
  const item = menu.find(x => x.id === id);
  if (!item) return;

  openProductModal(item, "product");
  return;
}

const addExtraBtn = e.target.closest('[data-adicionais]');
if (addExtraBtn) {
  const id = Number(addExtraBtn.dataset.adicionais);
  const item = menu.find(x => x.id === id);
  if (!item) return;

  if (id > 5) return; // drinks no extras

  openProductModal(item, "extras");
  return;
}

  // Close product modal button
  if (e.target.closest("#closeProduct")) {
    if (!productModal) return;
    productModal.classList.remove("show");
    productModal.setAttribute("aria-hidden", "true");
    selectedProductId = null;
    return;
  }

  // Click outside product modal to close (backdrop)
  if (e.target && e.target.id === "productBackdrop") {
    if (!productModal) return;
    productModal.classList.remove("show");
    productModal.setAttribute("aria-hidden", "true");
    selectedProductId = null;
    return;
  }

  // Add to cart from product modal
if (e.target.closest("#addFromModal")) {
  const item = menu.find(x => x.id === selectedProductId);
  if (!item) return;

  const checked = [...productModal.querySelectorAll("input[type='checkbox']:checked")];
  const selectedExtras = checked
    .map(input => adicionais.find(a => a.id === input.value))
    .filter(Boolean);

  const extrasTotal = selectedExtras.reduce((sum, a) => sum + a.price, 0);

  const productWithExtras = {
    ...item,
    price: item.price + extrasTotal,
    extras: selectedExtras
  };

  addToCart(productWithExtras);

  productModal.classList.remove("show");
  productModal.setAttribute("aria-hidden", "true");
  selectedProductId = null;
  return;
}

  // Add menu items (ONLY pills with data-id)
  const pill = e.target.closest(".pill[data-id]");
  if (pill) {
    const id = Number(pill.dataset.id);
    const item = menu.find((x) => x.id === id);
    if (item) addToCart(item);
    return;
  }


  // Random deal
  if (e.target.closest("#dealBtn")) {
    const randomItem = menu[Math.floor(Math.random() * menu.length)];
    addToCart(randomItem);
    return;
  }

  // Clear cart
  if (e.target.closest("#clearBtn")) {
    clearCart();
    return;
  }

  // Checkout open
  if (e.target.closest("#checkoutBtn")) {
    console.log("CHECKOUT CLICKED ✅", { cartLen: cart.length });
    openCheckout();
    return;
  }

  // Close checkout modal button
  if (e.target.closest("#closeCheckout")) {
    closeCheckoutModal();
    return;
  }

  // Click outside checkout modal to close (backdrop)
  if (e.target.dataset && e.target.dataset.close === "true") {
    closeCheckoutModal();
    return;
  }
});

// ===== SUBMIT ORDER =====
if (checkoutForm) {
  checkoutForm.addEventListener("submit", (e) => {
    e.preventDefault();

  if (e.target.matches('#productModal input[type="checkbox"]')) {
  updateModalPrice();
  return;
}

    if (cart.length === 0) return;

    // ✅ 1) AUTH CHECK FIRST (before any alerts/validation)
    const savedUser = localStorage.getItem("user");
    if (!savedUser) {
      // optionally save draft here, but you don’t even have address fields in the modal
      window.location.href = "./signup.html";
      return;
    }

    // ✅ 2) THEN validate neighborhood (fee calc)
    const neighborhood = getCheckoutNeighborhood();
    if (!neighborhood) {
      alert("Fill your neighborhood (bairro) so we can calculate delivery fee.");
      return;
    }


    const order = {
      customer: {
        name: coName?.value.trim() || "",
        phone: coPhone?.value.trim() || "",
        notes: coNotes?.value.trim() || ""
      },

      // 🔒 HARDLOCKED CITY
      address: {
        city: "Itapetininga",
        state: "SP",
        neighborhood // ✅ store it since you use it for fee
      },

      items: [...cart],
      totals: calcTotals(),
      createdAt: new Date().toISOString(),
      orderId: `MD-${Date.now()}`
    };

    closeCheckoutModal();

    localStorage.setItem("lastOrder", JSON.stringify(order));

    cart = [];
    renderCart();

    window.location.href = "./order.html";
  });
}

function updateModalPrice() {
  const item = menu.find(x => x.id === selectedProductId);
  if (!item) return;

  const checked = [...productModal.querySelectorAll("input[type='checkbox']:checked")];
  const selectedExtras = checked
    .map(input => adicionais.find(a => a.id === input.value))
    .filter(Boolean);

  const extrasTotal = selectedExtras.reduce((sum, a) => sum + a.price, 0);

  if (productPrice) productPrice.textContent = formatBRL(item.price + extrasTotal);
}

// ===== LOGIN MODAL LOGIC (GUARDED) =====
const loginBtn = document.getElementById("loginBtn");
const loginModal = document.getElementById("loginModal");
const closeLogin = document.getElementById("closeLogin");
const loginForm = document.getElementById("loginForm");

if (loginBtn && loginModal && closeLogin) {
  loginBtn.addEventListener("click", () => {
    loginModal.classList.add("show");
    loginModal.setAttribute("aria-hidden", "false");
  });

  closeLogin.addEventListener("click", () => {
    loginModal.classList.remove("show");
    loginModal.setAttribute("aria-hidden", "true");
  });

  loginModal.addEventListener("click", (e) => {
    if (e.target.dataset.closeLogin === "true") {
      loginModal.classList.remove("show");
      loginModal.setAttribute("aria-hidden", "true");
    }
  });
}

if (loginForm && loginModal) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const emailEl = document.getElementById("loginEmail");
    const email = emailEl ? emailEl.value : "";

    alert(`Welcome back, ${email}! (Demo login)`);

    loginModal.classList.remove("show");
    loginModal.setAttribute("aria-hidden", "true");
    loginForm.reset();
  });
}

// ===== GOOGLE LOGIN (DEMO) =====
const googleBtn = document.getElementById("googleLogin");

if (googleBtn) {
  googleBtn.addEventListener("click", () => {
    const fakeUser = {
      name: "Google User",
      email: "user@gmail.com",
      provider: "google"
    };

    localStorage.setItem("user", JSON.stringify(fakeUser));
    alert("Signed in with Google (demo) 🚀");

    const lm = document.getElementById("loginModal");
    if (lm) lm.classList.remove("show");

    updateAuthUI(fakeUser);
  });
}

// Auto-login if session exists
const savedUser = localStorage.getItem("user");
if (savedUser) {
  updateAuthUI(JSON.parse(savedUser));
}

function updateAuthUI(user) {
  const authBox = document.querySelector(".auth-buttons");
  if (!authBox) return;

  authBox.innerHTML = `
    <a class="auth-btn login" href="./profile.html">Hi, ${user.name.split(" ")[0]} 👋</a>
    <button class="auth-btn signup" id="logoutBtn" type="button">Logout</button>
  `;

  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("user");
      window.location.assign("./index.html");
    });
  }
}

// ===== LIVE DELIVERY FEE UPDATE (WHEN TYPING NEIGHBORHOOD) =====


if (coNeighborhood) {
  coNeighborhood.addEventListener("input", () => {
    console.log("Typing neighborhood:", coNeighborhood.value);

    // Recalculate totals instantly
    const { subtotal, fee, total } = calcTotals();

    // Update checkout modal totals
    if (coSubtotal) coSubtotal.textContent = formatBRL(subtotal);
    if (coFee) coFee.textContent = formatBRL(fee);
    if (coTotal) coTotal.textContent = formatBRL(total);
  });
}

// ===== INIT =====
renderMenu();
renderCart();

