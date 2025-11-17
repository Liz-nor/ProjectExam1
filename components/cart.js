// --- Shopping cart ---

const CART_KEY = "cart"; // --- Key used in localStorage
// --- Reads saved cart from browser
export function loadCart() {
  try {
    // --- Try/catch to prevent page from crashing
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
}

export function saveCart(cart) {
  // --- Converts cart array to json, stores in localStorage
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function getCartCount(cart) {
  // --- Count the number of items in cart
  return cart.reduce((sum, item) => sum + item.qty, 0);
}

export function addToCart(product) {
  // --- Main function to add an item
  let cart = loadCart();
  const idx = cart.findIndex((i) => i.id === product.id);

  if (idx >= 0) {
    cart[idx].qty += 1;
  } else {
    cart.push({
      id: product.id,
      title: product.title,
      price: Number(product.price) || 0,
      image: product.image?.url || "",
      qty: 1,
    });
  }

  saveCart(cart);
  updateCartCounter();
}

export function removeFromCart(id) {
  // --- Removing an item
  let cart = loadCart();
  const idx = cart.findIndex((i) => i.id === id);
  if (idx >= 0) {
    cart.splice(idx, 1);
    saveCart(cart);
    renderCart();
    updateCartCounter();
  }
}

export function changeQty(id, delta) {
  // --- Change quantity
  let cart = loadCart();
  const idx = cart.findIndex((i) => i.id === id);
  if (idx >= 0) {
    cart[idx].qty += delta;
    if (cart[idx].qty <= 0) {
      cart.splice(idx, 1);
    }
    saveCart(cart);
    renderCart();
    updateCartCounter();
  }
}

export function updateCartCounter() {
  // --- Update the counter
  const badge = document.querySelector(".cart-icon span");
  if (!badge) return;
  const cart = loadCart();
  badge.textContent = String(getCartCount(cart));
}

export function renderCart() {
  // --- Build the cart UI
  const cartItemsEl = document.getElementById("cart-items");
  const cartTotalEl = document.getElementById("cart-total");
  if (!cartItemsEl || !cartTotalEl) return;

  let cart = loadCart();
  cartItemsEl.innerHTML = "";
  if (cart.length === 0) {
    cartItemsEl.innerHTML = "<p>Your cart is empty.</p>";
    cartTotalEl.textContent = "";
    return;
  }

  let total = 0;
  cart.forEach((item) => {
    // --- Loop through the cart
    total += item.price * item.qty;

    const row = document.createElement("div");
    row.className = "cart-row";

    const img = document.createElement("img");
    img.src = item.image;
    img.alt = item.title;

    const title = document.createElement("div");
    title.textContent = item.title;

    const price = document.createElement("div");
    price.textContent = `$${item.price.toFixed(2)}`;

    const qty = document.createElement("div");
    qty.className = "qty";

    const minusBtn = document.createElement("button");
    minusBtn.textContent = "-";
    minusBtn.addEventListener("click", () => changeQty(item.id, -1));

    const qtyText = document.createElement("span");
    qtyText.textContent = item.qty;

    const plusBtn = document.createElement("button");
    plusBtn.textContent = "+";
    plusBtn.addEventListener("click", () => changeQty(item.id, +1));

    qty.appendChild(minusBtn);
    qty.appendChild(qtyText);
    qty.appendChild(plusBtn);

    const remove = document.createElement("button");
    remove.textContent = "Remove";
    remove.setAttribute("data-remove-id", item.id);

    row.appendChild(img);
    row.appendChild(title);
    row.appendChild(price);
    row.appendChild(qty);
    row.appendChild(remove);

    cartItemsEl.appendChild(row);
  });

  cartTotalEl.textContent = `Total: $${total.toFixed(2)}`; // --- Update total price
}

export function initCartUI() {
  const cartPanel = document.getElementById("cart");
  const cartItemsEl = document.getElementById("cart-items");
  const cartIcon = document.querySelector(".cart-icon");
  const clearBtn = document.getElementById("clear-cart");
  const closeBtn = document.getElementById("close-cart");
  const checkoutBtn = document.getElementById("go-to-checkout");

  if (cartIcon) {
    cartIcon.addEventListener("click", () => {
      cartPanel.classList.remove("hidden");
      renderCart();
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      cartPanel.classList.add("hidden");
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      localStorage.removeItem("cart");
      renderCart();
      updateCartCounter();
    });
  }

  if (cartItemsEl) {
    cartItemsEl.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-remove-id]");
      if (!btn) return;
      removeFromCart(btn.getAttribute("data-remove-id"));
    });
  }

  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      window.location.href = "checkout.html";
    });
  }
}
