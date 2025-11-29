const CART_KEY = "cart";
const cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];
const container = document.querySelector("#checkout-container");

if (cart.length === 0) {
  container.textContent = "Your cart is empty.";
} else {
  let total = 0;

  const itemsWrapper = document.createElement("div");
  itemsWrapper.className = "checkout-items";

  cart.forEach((item) => {
    total += item.price * item.qty;

    const div = document.createElement("div");
    div.className = "checkout-item";
    div.innerHTML = `
      <h3>${item.title}</h3>
      <p>Qty: ${item.qty}</p>
      <p>Subtotal: $${(item.price * item.qty).toFixed(2)}</p>
    `;

    itemsWrapper.appendChild(div);
  });

  container.appendChild(itemsWrapper);

  const totalDiv = document.createElement("p");
  totalDiv.textContent = `Total: $${total.toFixed(2)}`;
  container.appendChild(totalDiv);
}

const placeOrderBtn = document.getElementById("check-out");
const modal = document.getElementById("orderModal");
const closeModalBtn = document.getElementById("closeModal");

if (placeOrderBtn) {
  placeOrderBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    placeOrderBtn.disabled = true;

    const originalText = placeOrderBtn.textContent;

    placeOrderBtn.innerHTML = `<span class="button-spinner"></span> Processing...`;

    await new Promise((resolve) => setTimeout(resolve, 2000));
    localStorage.removeItem("cart");
    placeOrderBtn.textContent = originalText;
    placeOrderBtn.disabled = false;

    modal.classList.remove("hidden");
  });
}

if (closeModalBtn) {
  closeModalBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
    window.location.href = "index.html";
  });
}
