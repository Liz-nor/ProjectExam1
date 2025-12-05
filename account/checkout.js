import {
  updateCartCounter,
  initCartUI,
  addToCart,
  renderCart,
} from "../components/cart.js";
import "../components/navbar.js"; // --- Importing the navbar component to be used on the page

updateCartCounter();
initCartUI();

// Function to render checkout items
function renderCheckoutItems() {
  const productContainer = document.getElementById("productContainer");
  const cart = loadCart();

  if (!productContainer) return;

  if (cart.length === 0) {
    productContainer.innerHTML =
      "<p>Your cart is empty. Please add items before checking out.</p>";
    return;
  }

  let total = 0;

  // Create items display
  const itemsHTML = cart
    .map((item) => {
      const itemTotal = item.price * item.qty;
      total += itemTotal;

      return `
      <div class="checkout-item">
        <img src="${item.image || "https://via.placeholder.com/80"}" alt="${
        item.title
      }" class="checkout-item-image">
        <div class="checkout-item-details">
          <h3>${item.title}</h3>
          <p>Price: $${item.price.toFixed(2)}</p>
          <p>Quantity: ${item.qty}</p>
          <p class="checkout-item-total">Subtotal: $${itemTotal.toFixed(2)}</p>
        </div>
      </div>
    `;
    })
    .join("");

  // Build the complete checkout summary
  productContainer.innerHTML = `
    <div class="checkout-summary">
      <h2>Order Summary</h2>
      <div class="checkout-items-list">
        ${itemsHTML}
      </div>
      <div class="checkout-total">
        <h3>Total: $${total.toFixed(2)}</h3>
      </div>
    </div>
  `;
}

// Handle checkout button
function handleCheckoutSubmit() {
  const checkoutBtn = document.getElementById("check-out");

  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      const cart = loadCart();

      if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
      }

      // Get form values
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const address = document.getElementById("address").value;
      const city = document.getElementById("city").value;
      const country = document.getElementById("country").value;
      const cardName = document.getElementById("cardName").value;

      // Basic validation
      if (!name || !email || !address || !city || !country || !cardName) {
        alert("Please fill in all fields!");
        return;
      }

      // Process checkout (you can add more logic here)
      alert(
        `Order placed successfully!\nTotal: $${calculateTotal()}\nThank you, ${name}!`
      );

      // Clear cart after successful checkout
      localStorage.removeItem("cart");
      updateCartCounter();

      // Redirect to home or confirmation page
      window.location.href = "../index.html";
    });
  }
}

// Calculate total
function calculateTotal() {
  const cart = loadCart();
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0).toFixed(2);
}

// Initialize checkout page
function init() {
  renderCheckoutItems();
  handleCheckoutSubmit();
}

// Run on page load
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
