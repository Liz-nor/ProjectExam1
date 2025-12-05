// Shopping-cart page //

import { loadCart, saveCart, changeQty, removeFromCart } from "./cart.js";

function renderCart() {
  const cartContainer = document.getElementById("cartItems");
  const cart = loadCart();

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    cartContainer.textContent = "";
    updateSummary();
    return;
  }

  cartContainer.innerHTML = cart
    .map(
      (item) => `
        <div class="cart-item">
            <img class="item-image" 
                src="${item.image}" 
                alt="${item.title}" />
            <div class="item-details">
                <div class="item-name">
                <h3>${item.title}</h3></div>
                <div class="item-price">
                <p>$${(item.price || 0).toFixed(2)}</p></div>
            </div>
            <div class="item-controls">
                <div class="quantity-control">
                    <button class="quantity-btn" data-action="decrease" data-id="${
                      item.id
                    }">-</button>
                    <span class="quantity-display">${item.qty}</span>
                    <button class="quantity-btn" data-action="increase" data-id="${
                      item.id
                    }">+</button>
                </div>
                <button class="remove-btn" data-action="remove" data-id="${
                  item.id
                }">Remove</button>
            </div>
        </div>
    `
    )
    .join("");

  cartContainer.querySelectorAll("[data-action]").forEach((btn) => {
    btn.addEventListener("click", handleCartAction);
  });

  updateSummary();
}

function handleCartAction(e) {
  const action = e.target.dataset.action;
  const id = e.target.dataset.id;

  if (action === "increase") {
    changeQty(id, 1);
    renderCart();
  } else if (action === "decrease") {
    changeQty(id, -1);
    renderCart();
  } else if (action === "remove") {
    if (confirm("Remove this item from cart?")) {
      removeFromCart(id);
      renderCart();
    }
  }
}

function updateSummary() {
  const cart = loadCart();
  let total = 0;
  cart.forEach((item) => {
    const price = Number(item.price) || 0;
    const qty = Number(item.qty) || 1;
    total += price * qty;
  });
  document.getElementById("total").textContent = `$${total.toFixed(2)}`;

  const checkoutBtn = document.getElementById("checkoutBtn");
  if (checkoutBtn) {
    checkoutBtn.disabled = cart.length === 0;
  }
}

function handleCheckout() {
  const cart = loadCart();
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  window.location.href = "./account/checkout.html";
}

function handleContinueShopping(e) {
  e.preventDefault();

  window.location.href = "./index.html";
}

function init() {
  renderCart();

  const checkoutBtn = document.getElementById("checkoutBtn");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", handleCheckout);
  }

  const continueShoppingBtn = document.getElementById("continueShoppingBtn");
  if (continueShoppingBtn) {
    continueShoppingBtn.addEventListener("click", handleContinueShopping);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
