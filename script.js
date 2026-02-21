// ==============================
// MISTER DOG - FULL FIXED SCRIPT
// ==============================

console.log("script loaded ✅");

// ===== MENU DATA =====
const menu = [
  { id: 1, name: "Misterdog Completo", price: 15.00 },
  { id: 2, name: "Misterdog Vegetariano", price: 19.00 },
  { id: 3, name: "Mister Cala-Bacon", price: 22.00 },
  { id: 4, name: "Misterdog Calabresa", price: 19.00 },
  { id: 5, name: "Misterdog Bacon", price: 19.00 },
  { id: 6, name: "Maionese Especial do Mister", price: 3.00 },

  { id: 7, name: "Água Mineral 510ml", price: 3.00 },
  { id: 8, name: "Suco de Laranja 500ml", price: 10.00 },
  { id: 9, name: "Coca-Cola 350ml", price: 7.00 },
  { id: 10, name: "Coca-Cola 1,5L", price: 12.00 },
  { id: 11, name: "Tubaína 350ml", price: 4.00 },
  { id: 12, name: "Tubaína 2L", price: 10.00 },
  { id: 13, name: "Guaraná Tubaína Zero 2L", price: 10.00 }
];

let cart = [];


// ===== DOM ELEMENTS (CART) =====
const cartItems = document.getElementById("cartItems");
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

// ===== GUARDS =====
console.log("cartItems:", cartItems);
console.log("checkoutModal:", checkoutModal);

if (!cartItems || !subtotalEl || !feeEl || !totalEl || !checkoutBtn || !clearBtn || !dealBtn) {
  console.error("Cart DOM elements missing. Check IDs: cartItems/subtotal/fee/total/checkoutBtn/clearBtn/dealBtn");
}

if (!checkoutModal || !closeCheckout || !coSubtotal || !coFee || !coTotal || !checkoutForm || !coName || !coPhone || !coNotes) {
  console.error("Checkout modal elements missing. Check modal HTML IDs: checkoutModal/closeCheckout/coSubtotal/coFee/coTotal/checkoutForm/coName/coPhone/coNotes");
}

// ===== HELPERS =====
function calcTotals() {
  const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
  const fee = subtotal * 0.1;
  const total = subtotal + fee;
  return { subtotal, fee, total };
}

function formatBRL(value) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}


// ===== CART FUNCTIONS =====
function addToCart(item) {
  cart.push(item);
  renderCart();
}

function renderCart() {
  if (!cartItems) return;

  cartItems.innerHTML = "";

  cart.forEach((item) => {
    const row = document.createElement("div");
    row.className = "row";
    row.innerHTML = `
      <span>${item.name}</span>
      <span>${formatBRL(item.price)}</span>
    `;
    cartItems.appendChild(row);
  });

  const { subtotal, fee, total } = calcTotals();

 if (subtotalEl) subtotalEl.textContent = formatBRL(subtotal);
if (feeEl) feeEl.textContent = formatBRL(fee);
if (totalEl) totalEl.textContent = formatBRL(total);


  if (checkoutBtn) checkoutBtn.disabled = cart.length === 0;
  if (clearBtn) clearBtn.disabled = cart.length === 0;

  console.log("checkout disabled?", checkoutBtn?.disabled, "cart:", cart.length);
}

function clearCart() {
  cart = [];
  renderCart();
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

// ===== ONE CLICK SYSTEM (NO DUPLICATES) =====
document.addEventListener("click", (e) => {
  // Add menu items (ONLY pills with data-id)
  const pill = e.target.closest(".pill[data-id]");
if (pill) {
  const id = Number(pill.dataset.id);
  const item = menu.find(x => x.id === id);
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

  // Close modal button
  if (e.target.closest("#closeCheckout")) {
    closeCheckoutModal();
    return;
  }

  // Click outside modal to close (backdrop)
  if (e.target.dataset && e.target.dataset.close === "true") {
    closeCheckoutModal();
    return;
  }
});


// ===== SUBMIT ORDER =====
if (checkoutForm) {
  checkoutForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (cart.length === 0) return;

    const order = {
      customer: {
        name: coName?.value.trim() || "",
        phone: coPhone?.value.trim() || "",
        notes: coNotes?.value.trim() || ""
      },
      items: [...cart],
      totals: calcTotals(),
      createdAt: new Date().toISOString()
    };

    localStorage.setItem("lastOrder", JSON.stringify(order));

    alert(`Order placed ✅\nThanks, ${order.customer.name || "friend"}! (Demo only)`);

    clearCart();
    closeCheckoutModal();
    checkoutForm.reset();
  });
}

// ===== LOGIN MODAL LOGIC =====
const loginBtn = document.getElementById("loginBtn");
const loginModal = document.getElementById("loginModal");
const closeLogin = document.getElementById("closeLogin");

// Open modal when clicking Login
loginBtn.addEventListener("click", () => {
  loginModal.classList.add("show");
  loginModal.setAttribute("aria-hidden", "false");
});

// Close when clicking Close button
closeLogin.addEventListener("click", () => {
  loginModal.classList.remove("show");
  loginModal.setAttribute("aria-hidden", "true");
});

// Close when clicking backdrop (outside the card)
loginModal.addEventListener("click", (e) => {
  if (e.target.dataset.closeLogin === "true") {
    loginModal.classList.remove("show");
    loginModal.setAttribute("aria-hidden", "true");
  }
});

// Fake login submit (demo feedback)
const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value;

  alert(`Welcome back, ${email}! (Demo login)`);

  loginModal.classList.remove("show");
  loginModal.setAttribute("aria-hidden", "true");
  loginForm.reset();
});

// ===== GOOGLE LOGIN (DEMO) =====
const googleBtn = document.getElementById("googleLogin");

if (googleBtn) {
  googleBtn.addEventListener("click", () => {
    // Simulate Google authentication
    const fakeUser = {
      name: "Google User",
      email: "user@gmail.com",
      provider: "google"
    };

    // Save session (fake)
    localStorage.setItem("user", JSON.stringify(fakeUser));

    alert("Signed in with Google (demo) 🚀");

    // Optional: close login modal if you have modal logic
    const loginModal = document.getElementById("loginModal");
    if (loginModal) {
      loginModal.classList.remove("show");
    }

    // Change UI to logged state
    updateAuthUI(fakeUser);
  });
}


// Auto-login if session exists
const savedUser = localStorage.getItem("user");
if(savedUser){
  updateAuthUI(JSON.parse(savedUser));
}

function updateAuthUI(user){
  const authBox = document.querySelector(".auth-buttons");
  if(!authBox) return;

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

