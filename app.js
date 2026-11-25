const WHATSAPP_PHONE = "584129424001";
const ORDERS_STORAGE_KEY = "bocaditos_mailliw_orders_state_v1";

const PAGO_MOVIL_DATA = {
  empresa: "BOCADITOS MAILLIW",
  banco: "0172 - Bancamiga",
  telefono: "04129424001",
  rif: "J208837067"
};

const BRANCHES = {
  "Tortas completas": {
    lead: "Selecciona el postre perfecto para compartir en cada ocasión especial.",
    categories: [
      {
        id: "torta-triple-chocolate",
        label: "Torta Triple Chocolate",
        selectLabel: "Opciones disponibles",
        options: [
          { id: "ttc-grande", label: "Grande — $65.00", itemName: "Torta Triple Chocolate Grande", price: 65.0 },
          { id: "ttc-mediana", label: "Mediana — $45.00", itemName: "Torta Triple Chocolate Mediana", price: 45.0 },
          { id: "ttc-pequena", label: "Pequeña — $30.00", itemName: "Torta Triple Chocolate Pequeña", price: 30.0 }
        ]
      },
      {
        id: "torta-beso-de-angel",
        label: "Torta Beso de Ángel",
        selectLabel: "Opciones disponibles",
        options: [
          { id: "tba-grande", label: "Grande — $75.00", itemName: "Torta Beso de Ángel Grande", price: 75.0 },
          { id: "tba-mediana", label: "Mediana — $55.00", itemName: "Torta Beso de Ángel Mediana", price: 55.0 },
          { id: "tba-pequena", label: "Pequeña — $35.00", itemName: "Torta Beso de Ángel Pequeña", price: 35.0 }
        ]
      },
      {
        id: "marquesa-de-piruli",
        label: "Marquesa de Pirulí",
        selectLabel: "Opciones disponibles",
        options: [
          { id: "mp-grande", label: "Grande — $60.00", itemName: "Marquesa de Pirulí Grande", price: 60.0 },
          { id: "mp-mediana", label: "Mediana — $45.00", itemName: "Marquesa de Pirulí Mediana", price: 45.0 },
          { id: "mp-pequena", label: "Pequeña — $30.00", itemName: "Marquesa de Pirulí Pequeña", price: 30.0 }
        ]
      },
      {
        id: "pie",
        label: "Pie",
        selectLabel: "Opciones disponibles",
        options: [
          { id: "pie-parchita", label: "Pie de parchita — $40.00", itemName: "Pie de parchita", price: 40.0 },
          { id: "pie-limon", label: "Pie de limón — $40.00", itemName: "Pie de limón", price: 40.0 }
        ]
      }
    ]
  },
  "Porciones": {
    lead: "",
    categories: [
      {
        id: "porciones-tortas-marquesas-pie",
        label: "Tortas, Marquesas y Pie",
        selectLabel: "Opciones disponibles",
        options: [
          { id: "porc-beso-angel", label: "Beso de ángel — $10.00", itemName: "Porción Beso de ángel", price: 10.0 },
          { id: "porc-triple-choc", label: "Torta triple chocolate — $6.00", itemName: "Porción Torta triple chocolate", price: 6.0 },
          { id: "porc-zanahoria", label: "Torta de zanahoria — $6.00", itemName: "Porción Torta de zanahoria", price: 6.0 },
          { id: "porc-piruli", label: "Marquesa de pirulín — $5.00", itemName: "Porción Marquesa de pirulín", price: 5.0 },
          { id: "porc-pie-limon", label: "Pie de limón — $3.50", itemName: "Porción Pie de limón", price: 3.5 },
          { id: "porc-pie-parchita", label: "Pie de parchita — $3.50", itemName: "Porción Pie de parchita", price: 3.5 }
        ]
      }
    ]
  },
  "New York Cookies": {
    lead: "",
    categories: [
      {
        id: "choco-chips",
        label: "Choco Chips",
        selectLabel: "Opciones disponibles",
        options: [
          { id: "cc-brownie-nutella", label: "Con brownie más Nutella — $6.00", itemName: "Choco Chips con brownie más Nutella", price: 6.0 },
          { id: "cc-brownie-caramelo", label: "Con brownie más caramelo salado — $5.50", itemName: "Choco Chips con brownie más caramelo salado", price: 5.5 },
          { id: "cc-brownie", label: "Con brownie — $5.00", itemName: "Choco Chips con brownie", price: 5.0 },
          { id: "cc-nutella", label: "Relleno con Nutella — $4.50", itemName: "Choco Chips relleno con Nutella", price: 4.5 },
          { id: "cc-maltina", label: "Relleno con Maltina — $4.50", itemName: "Choco Chips relleno con Maltina", price: 4.5 },
          { id: "cc-blanco", label: "Relleno con chocolate blanco — $3.50", itemName: "Choco Chips relleno con chocolate blanco", price: 3.5 }
        ]
      },
      {
        id: "cookie-samba",
        label: "Cookie Samba",
        selectLabel: "Opciones disponibles",
        options: [
          { id: "cs-nutella", label: "Rellena con Nutella — $5.50", itemName: "Cookie Samba rellena con Nutella", price: 5.5 },
          { id: "cs-fresas", label: "Rellena con crema de fresas — $5.00", itemName: "Cookie Samba rellena con crema de fresas", price: 5.0 }
        ]
      },
      {
        id: "chocolate-dark",
        label: "Chocolate Dark",
        selectLabel: "Opciones disponibles",
        options: [
          { id: "cd-nutella", label: "Relleno con Nutella — $5.00", itemName: "Chocolate Dark relleno con Nutella", price: 5.0 },
          { id: "cd-maltina", label: "Relleno con Maltina — $5.00", itemName: "Chocolate Dark relleno con Maltina", price: 5.0 },
          { id: "cd-blanco", label: "Relleno con chocolate blanco — $4.00", itemName: "Chocolate Dark relleno con chocolate blanco", price: 4.0 }
        ]
      }
    ]
  }
};

let activeTab = null;
let expandedSubcatId = null;
let cart = [];
let captureFileName = "";

const catalogGrid = document.getElementById("catalogGrid");
const categoryFilters = document.getElementById("categoryFilters");
const cartDrawer = document.getElementById("cartDrawer");
const backdrop = document.getElementById("backdrop");
const toggleCartBtn = document.getElementById("toggleCartBtn");
const closeCartBtn = document.getElementById("closeCartBtn");
const continueShoppingBtn = document.getElementById("continueShoppingBtn");
const topContinueShoppingBtn = document.getElementById("topContinueShoppingBtn");
const cartCount = document.getElementById("cartCount");
const cartItems = document.getElementById("cartItems");
const cartSubtotal = document.getElementById("cartSubtotal");
const cartPackaging = document.getElementById("cartPackaging");
const cartDelivery = document.getElementById("cartDelivery");
const cartTotal = document.getElementById("cartTotal");
const checkoutBtn = document.getElementById("checkoutBtn");
const customerNameInput = document.getElementById("customerName");
const paymentRefInput = document.getElementById("paymentRef");
const paymentCaptureInput = document.getElementById("paymentCapture");
const capturePreview = document.getElementById("capturePreview");
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

function selectSubcategory(subcatId) {
  expandedSubcatId = expandedSubcatId === subcatId ? null : subcatId;
  renderCatalog();
}

function updateSelectedOptionPrice() {
  const select = document.getElementById("branchOptionSelect");
  const priceEl = document.getElementById("branchOptionPrice");
  if (!select || !priceEl) return;

  const branch = BRANCHES[activeTab];
  const subcat = branch && branch.categories.find((c) => c.id === expandedSubcatId);
  if (!subcat) return;

  const chosen = subcat.options.find((opt) => opt.id === select.value) || subcat.options[0];
  priceEl.textContent = formatMoney(chosen.price);
}

function renderCatalog() {
  if (!activeTab) {
    catalogGrid.innerHTML = "";
    return;
  }

  const branch = BRANCHES[activeTab];
  if (!branch) return;

  const leadHtml = branch.lead ? `<p class="branch-lead">${branch.lead}</p>` : "";

  const pillsHtml = branch.categories
    .map((cat) => {
      const isActive = cat.id === expandedSubcatId;
      return `
        <button
          type="button"
          class="subcat-btn ${isActive ? "active" : ""}"
          onclick="selectSubcategory('${cat.id}')"
        >
          ${cat.label}
        </button>
      `;
    })
    .join("");

  const activeSubcat = branch.categories.find((c) => c.id === expandedSubcatId);
  let expandedHtml = "";

  if (activeSubcat) {
    const firstOpt = activeSubcat.options[0];
    const optionsHtml = activeSubcat.options
      .map((opt) => `<option value="${opt.id}">${opt.label}</option>`)
      .join("");

    expandedHtml = `
      <div class="expanded-panel">
        <div class="variant-group">
          <label for="branchOptionSelect">${activeSubcat.selectLabel}:</label>
          <select id="branchOptionSelect" class="variant-select" onchange="updateSelectedOptionPrice()">
            ${optionsHtml}
          </select>
        </div>
        <div class="branch-bottom">
          <span class="price" id="branchOptionPrice">${formatMoney(firstOpt.price)}</span>
          <button type="button" class="add-btn" onclick="addSelectedToCart()">Agregar</button>
        </div>
      </div>
    `;
  }

  catalogGrid.innerHTML = `
    <article class="branch-card">
      ${leadHtml}
      <div class="category-pills">
        ${pillsHtml}
      </div>
      ${expandedHtml}
    </article>
  `;
}

function addSelectedToCart() {
  const branch = BRANCHES[activeTab];
  const subcat = branch && branch.categories.find((c) => c.id === expandedSubcatId);
  const select = document.getElementById("branchOptionSelect");
  if (!subcat || !select) return;

  const option = subcat.options.find((opt) => opt.id === select.value) || subcat.options[0];
  const existing = cart.find((item) => item.id === option.id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      id: option.id,
      name: option.itemName,
      price: option.price,
      quantity: 1
    });
  }

  orderReceipt.classList.add("hidden");
  renderCart();
  openCart();
}

function updateQuantity(itemId, delta) {
  const index = cart.findIndex((item) => item.id === itemId);
  if (index === -1) return;

  const nextQty = cart[index].quantity + delta;
  if (nextQty <= 0) {
    cart.splice(index, 1);
  } else {
    cart[index].quantity = nextQty;
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
            <button class="qty-btn" onclick="updateQuantity('${item.id}', -1)">-</button>
            <span>${item.quantity}</span>
            <button class="qty-btn" onclick="updateQuantity('${item.id}', 1)">+</button>
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
  captureName,
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
    `• *Comprobante:* ${paymentRef}\n` +
    `• *Capture:* ${captureName}\n` +
    `_(Adjunta aquí en WhatsApp la imagen del capture)_`
  );
}

function buildWhatsAppOrderUrl(message) {
  return `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${encodeURIComponent(message)}`;
}

function clearConfidentialFields() {
  customerNameInput.value = "";
  deliveryAddressInput.value = "";
  paymentRefInput.value = "";
  paymentCaptureInput.value = "";
  captureFileName = "";
  capturePreview.src = "";
  capturePreview.classList.add("hidden");
}

function handleCheckout() {
  if (cart.length === 0) {
    alert("Agrega al menos un postre antes de confirmar el pedido.");
    return;
  }

  const customer = customerNameInput.value.trim();
  if (!customer) {
    alert("Por favor, escribe el nombre del cliente antes de confirmar el pedido.");
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
    alert("Por favor, ingresa el número de comprobante.");
    paymentRefInput.focus();
    return;
  }

  if (!paymentCaptureInput.files || paymentCaptureInput.files.length === 0) {
    alert("Por favor, carga el capture de pago.");
    paymentCaptureInput.focus();
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
    captureName: captureFileName || paymentCaptureInput.files[0].name,
    lines,
    subtotal,
    packaging,
    total
  });

  const whatsappUrl = buildWhatsAppOrderUrl(orderSummary);
  window.open(whatsappUrl, "_blank", "noopener,noreferrer");

  cart = [];
  clearConfidentialFields();
  renderCart();

  orderReceipt.textContent =
    "Tu pedido está listo y fue enviado a WhatsApp. En breves minutos será contactado.";
  orderReceipt.classList.remove("hidden");
}

function openCart() {
  orderReceipt.classList.add("hidden");
  cartDrawer.classList.remove("hidden");
  backdrop.classList.remove("hidden");
}

function closeCart() {
  cartDrawer.classList.add("hidden");
  backdrop.classList.add("hidden");
  orderReceipt.classList.add("hidden");
}

categoryFilters.addEventListener("click", (e) => {
  const btn = e.target.closest(".filter-btn");
  if (!btn) return;

  const clickedCat = btn.dataset.category;
  if (activeTab === clickedCat) {
    activeTab = null;
    expandedSubcatId = null;
    btn.classList.remove("active");
  } else {
    document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    activeTab = clickedCat;
    expandedSubcatId = null;
  }
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

paymentCaptureInput.addEventListener("change", () => {
  const file = paymentCaptureInput.files && paymentCaptureInput.files[0];
  if (!file) {
    captureFileName = "";
    capturePreview.src = "";
    capturePreview.classList.add("hidden");
    return;
  }

  captureFileName = file.name;
  const reader = new FileReader();
  reader.onload = (ev) => {
    capturePreview.src = ev.target.result;
    capturePreview.classList.remove("hidden");
  };
  reader.readAsDataURL(file);
});

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
continueShoppingBtn.addEventListener("click", closeCart);
topContinueShoppingBtn.addEventListener("click", closeCart);
backdrop.addEventListener("click", closeCart);
checkoutBtn.addEventListener("click", handleCheckout);

renderCatalog();
renderCart();