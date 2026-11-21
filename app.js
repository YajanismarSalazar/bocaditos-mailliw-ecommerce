const WHATSAPP_PHONE = "584129424001"; // Pon tu número con código de país (58), sin '+' ni espacios ni guiones

const PRODUCTS = [
  {
    id: 1,
    name: "Torta Triple Chocolate",
    category: "Tortas y Marquesas",
    price: 24.0,
    stock: 8,
    description: "Bizcocho húmedo de cacao con relleno y cobertura de chocolate real."
  },
  {
    id: 2,
    name: "Marquesa Clásica de Chocolate",
    category: "Tortas y Marquesas",
    price: 16.5,
    stock: 12,
    description: "Capas suaves de galleta y crema cremosa de chocolate con acabado artesanal."
  },
  {
    id: 3,
    name: "New York Cookie Rellena",
    category: "Galletas y Porciones",
    price: 4.5,
    stock: 25,
    description: "Galleta gruesa dorada por fuera y suave por dentro con chispas de chocolate."
  },
  {
    id: 4,
    name: "Porción Tiramisú Artesanal",
    category: "Galletas y Porciones",
    price: 5.5,
    stock: 15,
    description: "Clásico postre italiano con toque de café, cacao espolvoreado y crema suave."
  },
  {
    id: 5,
    name: "Pie de Parchita (Maracuyá)",
    category: "Pies y Especiales",
    price: 18.0,
    stock: 6,
    description: "Base crujiente con relleno cítrico balanceado y cobertura cremosa."
  },
  {
    id: 6,
    name: "Torta de Zanahoria Especial",
    category: "Pies y Especiales",
    price: 19.0,
    stock: 10,
    description: "Esponjosa con especias suaves, nueces y cubierta cremosa."
  }
];

let selectedCategory = "Todos";
let cart = [];
let dailyOrdersCount = 12;

const catalogGrid = document.getElementById("catalogGrid");
const categoryFilters = document.getElementById("categoryFilters");
const cartDrawer = document.getElementById("cartDrawer");
const backdrop = document.getElementById("backdrop");
const toggleCartBtn = document.getElementById("toggleCartBtn");
const closeCartBtn = document.getElementById("closeCartBtn");
const cartCount = document.getElementById("cartCount");
const cartItems = document.getElementById("cartItems");
const cartSubtotal = document.getElementById("cartSubtotal");
const cartPackaging = document.getElementById("cartPackaging");
const cartTotal = document.getElementById("cartTotal");
const checkoutBtn = document.getElementById("checkoutBtn");
const customerNameInput = document.getElementById("customerName");
const orderReceipt = document.getElementById("orderReceipt");
const kpiOrders = document.getElementById("kpiOrders");

function setCheckoutButtonLabel() {
  if (checkoutBtn) {
    checkoutBtn.textContent = "CONFIRMAR PEDIDO";
  }
}

function formatMoney(amount) {
  return `$${amount.toFixed(2)}`;
}

function renderCatalog() {
  const filtered =
    selectedCategory === "Todos"
      ? PRODUCTS
      : PRODUCTS.filter((item) => item.category === selectedCategory);

  catalogGrid.innerHTML = filtered
    .map(
      (product) => `
      <article class="card">
        <div>
          <span class="card-tag">${product.category}</span>
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <div class="card-meta">Disponibilidad: ${product.stock} unidades</div>
        </div>
        <div class="card-bottom">
          <span class="price">${formatMoney(product.price)}</span>
          <button class="add-btn" onclick="addToCart(${product.id})">Agregar</button>
        </div>
      </article>
    `
    )
    .join("");
}

function addToCart(productId) {
  const product = PRODUCTS.find((p) => p.id === productId);
  if (!product) return;

  const existing = cart.find((item) => item.productId === productId);
  if (existing) {
    if (existing.quantity < product.stock) {
      existing.quantity += 1;
    } else {
      alert("Has alcanzado la disponibilidad máxima para este postre.");
      return;
    }
  } else {
    cart.push({ productId, quantity: 1 });
  }

  orderReceipt.classList.add("hidden");
  renderCart();
  openCart();
}

function updateQuantity(productId, delta) {
  const index = cart.findIndex((item) => item.productId === productId);
  if (index === -1) return;

  const product = PRODUCTS.find((p) => p.id === productId);
  const nextQty = cart[index].quantity + delta;

  if (nextQty <= 0) {
    cart.splice(index, 1);
  } else if (nextQty <= product.stock) {
    cart[index].quantity = nextQty;
  } else {
    alert("No hay más unidades disponibles de este producto.");
    return;
  }

  renderCart();
}

function renderCart() {
  const totalUnits = cart.reduce((acc, item) => acc + item.quantity, 0);
  cartCount.textContent = totalUnits;

  if (cart.length === 0) {
    cartItems.innerHTML = `<p class="empty-msg">Tu carrito está vacío. Agrega un postre para comenzar.</p>`;
    cartSubtotal.textContent = formatMoney(0);
    cartPackaging.textContent = formatMoney(0);
    cartTotal.textContent = formatMoney(0);
    return;
  }

  let subtotal = 0;

  cartItems.innerHTML = cart
    .map((item) => {
      const product = PRODUCTS.find((p) => p.id === item.productId);
      const lineTotal = product.price * item.quantity;
      subtotal += lineTotal;

      return `
        <div class="cart-item">
          <div>
            <strong>${product.name}</strong>
            <div class="muted">${formatMoney(product.price)} c/u · Total: ${formatMoney(lineTotal)}</div>
          </div>
          <div class="qty-controls">
            <button class="qty-btn" onclick="updateQuantity(${product.id}, -1)">-</button>
            <span>${item.quantity}</span>
            <button class="qty-btn" onclick="updateQuantity(${product.id}, 1)">+</button>
          </div>
        </div>
      `;
    })
    .join("");

  const packaging = subtotal * 0.05;
  const total = subtotal + packaging;

  cartSubtotal.textContent = formatMoney(subtotal);
  cartPackaging.textContent = formatMoney(packaging);
  cartTotal.textContent = formatMoney(total);
}

function buildOrderSummary({ orderNumber, customer, now, lines, subtotal, packaging, total }) {
  return (
    `*NUEVO PEDIDO #${orderNumber} — BOCADITOS MAILLIW*\n` +
    `• *Cliente:* ${customer}\n` +
    `• *Fecha:* ${now}\n` +
    `-------------------------\n` +
    `*Detalle del pedido:*\n` +
    `${lines}\n` +
    `-------------------------\n` +
    `• *Subtotal:* ${formatMoney(subtotal)}\n` +
    `• *Empaque (5%):* ${formatMoney(packaging)}\n` +
    `• *TOTAL A PAGAR:* ${formatMoney(total)}`
  );
}

function buildWhatsAppOrderUrl(message) {
  return `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${encodeURIComponent(message)}`;
}

function handleCheckout() {
  if (cart.length === 0) {
    alert("Agrega al menos un postre antes de confirmar el pedido.");
    return;
  }

  const customer = customerNameInput.value.trim() || "Cliente Invitado";
  const now = new Date().toLocaleString("es-VE");
  let subtotal = 0;

  const lines = cart
    .map((item) => {
      const product = PRODUCTS.find((p) => p.id === item.productId);
      const lineTotal = product.price * item.quantity;
      subtotal += lineTotal;
      return `• ${item.quantity}x ${product.name} (${formatMoney(lineTotal)})`;
    })
    .join("\n");

  const packaging = subtotal * 0.05;
  const total = subtotal + packaging;

  dailyOrdersCount += 1;
  kpiOrders.textContent = dailyOrdersCount;

  const orderSummary = buildOrderSummary({
    orderNumber: dailyOrdersCount,
    customer,
    now,
    lines,
    subtotal,
    packaging,
    total
  });

  const plainReceipt = orderSummary.replace(/\*/g, "");
  orderReceipt.textContent = plainReceipt;
  orderReceipt.classList.remove("hidden");

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(plainReceipt).catch(() => {});
  }

  const whatsappUrl = buildWhatsAppOrderUrl(orderSummary);
  window.open(whatsappUrl, "_blank", "noopener,noreferrer");

  cart = [];
  renderCart();
}

function openCart() {
  cartDrawer.classList.remove("hidden");
  backdrop.classList.remove("hidden");
}

function closeCart() {
  cartDrawer.classList.add("hidden");
  backdrop.classList.add("hidden");
}

categoryFilters.addEventListener("click", (e) => {
  const btn = e.target.closest(".filter-btn");
  if (!btn) return;

  document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
  selectedCategory = btn.dataset.category;
  renderCatalog();
});

toggleCartBtn.addEventListener("click", openCart);
closeCartBtn.addEventListener("click", closeCart);
backdrop.addEventListener("click", closeCart);
checkoutBtn.addEventListener("click", handleCheckout);

setCheckoutButtonLabel();
renderCatalog();
renderCart();