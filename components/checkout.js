import { loadCart } from "./cart.js";
const methodA = document.getElementById("methodA");
const methodB = document.getElementById("methodB");
const methodC = document.getElementById("methodC");
const iconA = document.querySelector(".fa-credit-card");
const iconB = document.querySelector(".fa-building-columns");
const iconC = document.querySelector(".fa-wallet");
const cDetails = document.querySelector(".c-details");

function doFun() {
  methodA.style.color = "#50c878";
  methodB.style.color = "gray";
  methodC.style.color = "gray";
  iconA.style.color = "#50c878";
  iconB.style.color = "gray";
  iconC.style.color = "gray";
  cDetails.style.display = "block";
}
function doFunA() {
  methodA.style.color = "gray";
  methodB.style.color = "#50c878";
  methodC.style.color = "gray";
  iconA.style.color = "gray";
  iconB.style.color = "#50c878";
  iconC.style.color = "gray";
  cDetails.style.display = "none";
}
function doFunB() {
  methodA.style.color = "gray";
  methodB.style.color = "gray";
  methodC.style.color = "#50c878";
  iconA.style.color = "gray";
  iconB.style.color = "gray";
  iconC.style.color = "#50c878";
  cDetails.style.display = "none";
}

// Add click event listeners
methodA.addEventListener("click", doFun);
methodB.addEventListener("click", doFunA);
methodC.addEventListener("click", doFunB);
const cNumber = document.getElementById("number");
cNumber.addEventListener("keyup", function (e) {
  let num = cNumber.value.replace(/\s/g, ""); // Remove non-digit characters
  let newValue = num.match(/.{1,4}/g).join(" ") || num;
  cNumber.value = newValue;

  if (num.length < 16) {
    cNumber.style.border = "2px solid red";
  } else {
    cNumber.style.border = "1px solid #aaa";
  }
});

const eDate = document.getElementById("eDate");
eDate.addEventListener("input", function (e) {
  let value = e.target.value.replace(/\D/g, ""); // Remove non-digit characters

  if (value.length > 2) {
    value = value.slice(0, 2) + "/" + value.slice(2, 4);
  }
  e.target.value = value;

  if (e.target.value.length < 5) {
    eDate.style.border = "2px solid red";
  } else {
    eDate.style.border = "1px solid #aaa";
  }
});

let cvv = document.getElementById("cvv");
cvv.addEventListener("input", function (e) {
  let elen = cvv.value;
  let cvvBox = document.getElementById("cvvBox");
  if (elen.lenght > 3) {
    cvvBox.style.border = "2px solid red";
  } else {
    cvvBox.style.border = "1px solid #aaa";
  }
});

const form = document.querySelector("form");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    // Clear the cart after successful checkout
    localStorage.removeItem("cart");
    window.location.href = "./success.html";
  });
}

// Display cart total
function displayOrderSummary() {
  const cart = loadCart();
  const orderDetails = document.querySelector(".right");
  if (!orderDetails) return;

  // Clear existing content except title
  orderDetails.innerHTML =
    '<div style="padding: 30px 0 0 30px;">Order Summary</div>';

  if (cart.length === 0) {
    orderDetails.innerHTML += "<div>Your cart is empty.</div>";
    return;
  }
  let total = 0;

  // Display each item in the cart
  cart.forEach((item) => {
    const subTotal = item.price * item.qty;
    total += subTotal;

    orderDetails.innerHTML += `<div style="padding: 30px 0 0 30px;">${
      item.title
    } (x${item.qty}): $${subTotal.toFixed(2)}</div>`;
  });
  orderDetails.innerHTML += `<div style="font-weight: bold; padding: 30px 0 0 30px;">Total: $${total.toFixed(
    2
  )}</div>`;
}

displayOrderSummary();
