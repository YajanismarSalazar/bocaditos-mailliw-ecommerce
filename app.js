const WHATSAPP_PHONE = "584129424001";
const ORDERS_STORAGE_KEY = "bocaditos_mailliw_orders_state_v1";

const PAGO_MOVIL_DATA = {
  empresa: "BOCADITOS MAILLIW",
  banco: "0172 - Bancamiga",
  telefono: "04129424001",
  rif: "J208837067"
};

const PRODUCTS = [
  {
    id: 1,
    name: "Torta Triple Chocolate",
    category: "Tortas y Marquesas",
    stock: 8,
    description: "Bizcocho húmedo de cacao con relleno y cobertura de chocolate real.",
    optionLabel: "Selecciona el tamaño",
    options: [
      { id: "tc-24", label: "Completa (24 cm)", price: 60.0 },
      { id: "tc-16", label: "Mediana (16 cm)", price: 30.0 }
    ]
  },
  {
    id: 2,
    name: "Marquesa de Almendras",
    category: "Tortas y Marquesas",
    stock: 10,
    description: "Capas suaves de galleta, crema artesanal y almendras seleccionadas.",
    optionLabel: "Presentación",
    options: [
      { id: "ma-24", label: "Completa (24 cm)", price: 60.0 }
    ]
  },
  {
    id: 3,
    name: "Torta Beso de Ángel",
    category: "Tortas y Marquesas",
    stock: 6,
    description: "Combinación suave y cremosa con acabado artesanal.",
    optionLabel: "Presentación",
    options: [
      { id: "ba-24", label: "Completa (24 cm)", price: 60.0 }
    ]
  },
  {
    id: 4,
    name: "Pies Completos (24 cm)",
    category: "Tortas y Marquesas",
    stock: 8,
    description: "Base crujiente artesanal con relleno cítrico cremoso.",
    optionLabel: "Selecciona el sabor",
    options: [
      { id: "pie-parchita-24", label: "Pie de Parchita (24 cm)", price: 40.0 },
      { id: "pie-limon-24", label: "Pie de Limón (24 cm)", price: 40.0 }
    ]
  },
  {
    id: 5,
    name: "New York Cookies",
    category: "New York Cookies",
    stock: 30,
    description: "Galleta gruesa dorada por fuera y suave por dentro con centro relleno.",
    optionLabel: "Selecciona el relleno",
    options: [
      { id: "nyc-nutella", label: "Rellena de Nutella", price: 4.5 },
      { id: "nyc-blanco", label: "Rellena de Chocolate Blanco", price: 4.5 },
      { id: "nyc-ovomaltina", label: "Rellena de Ovomaltina", price: 4.5 },
      { id: "nyc-samba", label: "Rellena de Samba", price: 4.5 }
    ]
  },
  {
    id: 6,
    name: "Porciones Individuales",
    category: "Porciones",
    stock: 25,
    description: "Disfruta nuestros postres artesanales en porción individual.",
    optionLabel: "Selecciona tu porción",
    options: [
      { id: "porc-triple-choc", label: "Porción Torta Triple Chocolate", price: 6.0 },
      { id: "porc-marquesa", label: "Porción Marquesa de Almendras", price: 5.0 },
      { id: "porc-beso-angel", label: "Porción Torta Beso de Ángel", price: 10.0 },
      { id: "porc-pie-limon", label: "Porción Pie de Limón", price: 3.5 },
      { id: "porc-pie-parchita", label: "Porción Pie de Parchita", price: 3.5 },
      { id: "porc-zanahoria", label: "Porción Torta de Zanahoria", price: 6.0 }
    ]
  }
];

let selectedCategory = "Todos";
let cart = [];

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
const cartDelivery = document.getElementById("cartDelivery");
const cartTotal = document.getElementById("cartTotal");
const checkoutBtn = document.getElementById("checkoutBtn");
const customerNameInput = document.getElementById("customerName");
const paymentRefInput = document.getElementById("paymentRef");
const deliveryModeSelect = document.getElementById("deliveryMode");
const deliveryZoneWrap = document.getElementById("deliveryZoneWrap");
const deliveryZoneSelect = document.getElementById("deliveryZone");
const deliveryAddressInput = document.getElementById("deliveryAddress");
const copyPaymentBtn = document.getElementById("copyPaymentBtn");
const orderReceipt = document.getElementById("orderReceipt");
const kpiOrders = document.getElementById("kpiOrders");

function getTodayKey() {
  return new Date().toISOString().slice(0, 10);
}

function loadDailyOrdersCount() {
  try {
    const raw = localStorage.getItem(ORDERS_STORAGE_KEY);
    if (!raw) return 0;
    const parsed = JSON.parse(raw);
    if (parsed.date === getTodayKey() && typeof parsed.count === "number") {
      return parsed.count;
    }
  } catch (e) {}
  return 0;
}

function saveDailyOrdersCount(count) {
  try {
    localStorage.setItem(
      ORDERS_STORAGE_KEY,
      JSON.stringify({ date: getTodayKey(), count })
    );
  } catch (e) {}
}

let dailyOrdersCount = loadDailyOrdersCount();
if (kpiOrders) {
  kpiOrders.textContent = dailyOrdersCount;
}

function formatMoney(amount) {
  return `$${amount.toFixed(2)}`;
}

function handleCardOptionChange(productId) {
  const product = PRODUCTS.find((p) => p.id === productId);
  const select = document.getElementById(`select-product-${productId}`);
  const priceEl = document.getElementById(`price-product-${productId}`);
  if (!product || !select || !priceEl) return;

  const chosen = product.options.find((opt) => opt.id === select.value) || product.options[0];
  priceEl.textContent = formatMoney(chosen.price);
}

function renderCatalog() {
  const filtered =
    selectedCategory === "Todos"
      ? PRODUCTS
      : PRODUCTS.filter((item) => item.category === selectedCategory);

  catalogGrid.innerHTML = filtered
    .map((product) => {
      const defaultOpt = product.options[0];
      const optionsHtml = product.options
        .map(
          (opt) =>
            `<option value="${opt.id}">${opt.label} — ${formatMoney(opt.price)}</option>`
        )
        .join("");

      return `
        <article class="card">
          <div>
            <span class="card-tag">${product.category}</span>
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <div class="variant-group">
              <label for="select-product-${product.id}">${product.optionLabel}:</label>
              <select id="select-product-${product.id}" class="variant-select" onchange="handleCardOptionChange(${product.id})">
                ${optionsHtml}
              </select>
            </div>
            <div class="card-meta">Disponibilidad hoy: ${product.stock} unidades</div>
          </div>
          <div class="card-bottom">
            <span class="price" id="price-product-${product.id}">${formatMoney(defaultOpt.price)}</span>
            <button class="add-btn" onclick="addToCart(${product.id})">Agregar</button>
          </div>
        </article>
      `;
    })
    .join("");
}

function addToCart(productId) {
  const product = PRODUCTS.find((p) => p.id === productId);
  if (!product) return;

  const select = document.getElementById(`select-product-${productId}`);
  const optionId = select ? select.value : product.options[0].id;
  const option = product.options.find((opt) => opt.id === optionId) || product.options[0];

  const totalUnitsForProduct = cart
    .filter((item) => item.productId === productId)
    .reduce((acc, item) => acc + item.quantity, 0);

  if (totalUnitsForProduct >= product.stock) {
    alert("Has alcanzado la disponibilidad máxima para este producto.");
    return;
  }

  const cartKey = `${productId}:${option.id}`;
  const existing = cart.find((item) => item.cartKey === cartKey);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      cartKey,
      productId,
      optionId: option.id,
      name: `${product.name} (${option.label})`,
      price: option.price,
      quantity: 1
    });
  }

  orderReceipt.classList.add("hidden");
  renderCart();
  openCart();
}

function updateQuantity(cartKey, delta) {
  const index = cart.findIndex((item) => item.cartKey === cartKey);
  if (index === -1) return;

  const item = cart[index];
  const product = PRODUCTS.find((p) => p.id === item.productId);
  const nextQty = item.quantity + delta;

  if (nextQty <= 0) {
    cart.splice(index, 1);
  } else {
    const otherUnits = cart
      .filter((c) => c.productId === item.productId && c.cartKey !== cartKey)
      .reduce((acc, c) => acc + c.quantity, 0);

    if (otherUnits + nextQty <= product.stock) {
      item.quantity = nextQty;
    } else {
      alert("No hay más unidades disponibles de este producto.");
      return;
    }
  }

  renderCart();
}

function getDeliveryInfo() {
  const mode = deliveryModeSelect.value;
  if (mode === "pickup") {
    return {
      mode: "Pick up (Retiro en tienda)",
      zone: "Tienda",
      fee: 0,
      address: ""
    };
  }

  const selectedOpt = deliveryZoneSelect.options[deliveryZoneSelect.selectedIndex];
  const zone = selectedOpt.value;
  const fee = parseFloat(selectedOpt.dataset.fee || "0");
  const address = deliveryAddressInput.value.trim();

  return {
    mode: `Delivery (${zone})`,
    zone,
    fee,
    address
  };
}

function renderCart() {
  const totalUnits = cart.reduce((acc, item) => acc + item.quantity, 0);
  cartCount.textContent = totalUnits;

  const deliveryInfo = getDeliveryInfo();

  if (cart.length === 0) {
    cartItems.innerHTML = `<p class="empty-msg">Tu carrito está vacío. Agrega un postre para comenzar.</p>`;
    cartSubtotal.textContent = formatMoney(0);
    cartPackaging.textContent = formatMoney(0);
    cartDelivery.textContent = formatMoney(deliveryInfo.fee);
    cartTotal.textContent = formatMoney(deliveryInfo.fee);
    return;
  }

  let subtotal = 0;

  cartItems.innerHTML = cart
    .map((item) => {
      const lineTotal = item.price * item.quantity;
      subtotal += lineTotal;

      return `
        <div class="cart-item">
          <div>
            <strong>${item.name}</strong>
            <div class="muted">${formatMoney(item.price)} c/u · Total: ${formatMoney(lineTotal)}</div>
          </div>
          <div class="qty-controls">
            <button class="qty-btn" onclick="updateQuantity('${item.cartKey}', -1)">-</button>
            <span>${item.quantity}</span>
            <button class="qty-btn" onclick="updateQuantity('${item.cartKey}', 1)">+</button>
          </div>
        </div>
      `;
    })
    .join("");

  const packaging = subtotal * 0.05;
  const total = subtotal + packaging + deliveryInfo.fee;

  cartSubtotal.textContent = formatMoney(subtotal);
  cartPackaging.textContent = formatMoney(packaging);
  cartDelivery.textContent = formatMoney(deliveryInfo.fee);
  cartTotal.textContent = formatMoney(total);
}

function buildOrderSummary({
  orderNumber,
  customer,
  now,
  deliveryInfo,
  paymentRef,
  lines,
  subtotal,
  packaging,
  total
}) {
  const deliveryLine =
    deliveryInfo.fee > 0
      ? `• *Entrega:* ${deliveryInfo.mode} — ${formatMoney(deliveryInfo.fee)}\n• *Dirección:* ${deliveryInfo.address}\n`
      : `• *Entrega:* ${deliveryInfo.mode}\n`;

  return (
    `*NUEVO PEDIDO PAGADO #${orderNumber} — BOCADITOS MAILLIW*\n` +
    `• *Cliente:* ${customer}\n` +
    `• *Fecha:* ${now}\n` +
    deliveryLine +
    `-------------------------\n` +
    `*Detalle del pedido:*\n` +
    `${lines}\n` +
    `-------------------------\n` +
    `• *Subtotal:* ${formatMoney(subtotal)}\n` +
    `• *Empaque (5%):* ${formatMoney(packaging)}\n` +
    `• *Delivery:* ${formatMoney(deliveryInfo.fee)}\n` +
    `• *TOTAL PAGADO:* ${formatMoney(total)}\n` +
    `-------------------------\n` +
    `*Datos del Pago Móvil:*\n` +
    `• *Banco destino:* ${PAGO_MOVIL_DATA.banco}\n` +
    `• *N° de Referencia:* ${paymentRef}\n` +
    `_(Adjunto capture del comprobante a continuación)_`
  );
}

function buildWhatsAppOrderUrl(message) {
  return `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${encodeURIComponent(message)}`;
}

function handleCheckout() {
  if (cart.length === 0) {
    alert("Agrega al menos un postre antes de enviar tu comanda.");
    return;
  }

  const customer = customerNameInput.value.trim();
  if (!customer) {
    alert("Por favor, escribe tu nombre antes de confirmar el pedido.");
    customerNameInput.focus();
    return;
  }

  const deliveryInfo = getDeliveryInfo();
  if (deliveryInfo.fee > 0 && !deliveryInfo.address) {
    alert("Por favor, indica la dirección exacta para el delivery.");
    deliveryAddressInput.focus();
    return;
  }

  const paymentRef = paymentRefInput.value.trim();
  if (!paymentRef) {
    alert("Por favor, ingresa el número de referencia del Pago Móvil realizado.");
    paymentRefInput.focus();
    return;
  }

  const now = new Date().toLocaleString("es-VE");
  let subtotal = 0;

  const lines = cart
    .map((item) => {
      const lineTotal = item.price * item.quantity;
      subtotal += lineTotal;
      return `• ${item.quantity}x ${item.name} (${formatMoney(lineTotal)})`;
    })
    .join("\n");

  const packaging = subtotal * 0.05;
  const total = subtotal + packaging + deliveryInfo.fee;

  dailyOrdersCount += 1;
  saveDailyOrdersCount(dailyOrdersCount);
  kpiOrders.textContent = dailyOrdersCount;

  const orderSummary = buildOrderSummary({
    orderNumber: dailyOrdersCount,
    customer,
    now,
    deliveryInfo,
    paymentRef,
    lines,
    subtotal,
    packaging,
    total
  });

  const plainReceipt = orderSummary.replace(/\*/g, "").replace(/_/g, "");
  orderReceipt.textContent = plainReceipt;
  orderReceipt.classList.remove("hidden");

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(plainReceipt).catch(() => {});
  }

  const whatsappUrl = buildWhatsAppOrderUrl(orderSummary);
  window.open(whatsappUrl, "_blank", "noopener,noreferrer");

  cart = [];
  paymentRefInput.value = "";
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

deliveryModeSelect.addEventListener("change", () => {
  if (deliveryModeSelect.value === "delivery") {
    deliveryZoneWrap.classList.remove("hidden");
  } else {
    deliveryZoneWrap.classList.add("hidden");
  }
  renderCart();
});

deliveryZoneSelect.addEventListener("change", renderCart);

copyPaymentBtn.addEventListener("click", () => {
  const textToCopy = `${PAGO_MOVIL_DATA.empresa}\n${PAGO_MOVIL_DATA.banco}\n${PAGO_MOVIL_DATA.telefono}\n${PAGO_MOVIL_DATA.rif}`;
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(textToCopy).then(() => {
      copyPaymentBtn.textContent = "¡Copiado!";
      setTimeout(() => {
        copyPaymentBtn.textContent = "Copiar datos";
      }, 2000);
    }).catch(() => {});
  }
});

toggleCartBtn.addEventListener("click", openCart);
closeCartBtn.addEventListener("click", closeCart);
backdrop.addEventListener("click", closeCart);
checkoutBtn.addEventListener("click", handleCheckout);

renderCatalog();
renderCart();