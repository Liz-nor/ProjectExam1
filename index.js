import {
  addToCart,
  renderCart,
  updateCartCounter,
  initCartUI,
} from "./components/cart.js";
import "./components/navbar.js";

const API_URL = "https://v2.api.noroff.dev/online-shop";

// 👉 Use the product grid container for the cards
const container = document.querySelector("#container");

// --- PAGINATION STATE ---
let allProducts = [];
let currentPage = 1;
const recordsPerPage = 12;

// --- REVIEW MESSAGE HANDLER ---
function extraReviewMessages(products) {
  const messages = [];

  products.forEach((product) => {
    if (Array.isArray(product.reviews)) {
      product.reviews.forEach((review) => {
        if (review.description && review.description.trim() !== "") {
          messages.push(`"${review.description.trim()}" - ${product.title}`);
        }
      });
    } else if (
      typeof product.reviews === "string" &&
      product.reviews.trim() !== ""
    ) {
      messages.push(`"${product.reviews.trim()}" - ${product.title}`);
    }
  });

  if (messages.length === 0) {
    messages.push("⭐ No reviews yet - be the first!");
  }

  return messages;
}

function initReviewLoop(messages) {
  const box = document.getElementById("reviewLoop");
  if (!box) return;

  let index = 0;

  function showNext() {
    box.style.opacity = 0;

    setTimeout(() => {
      box.textContent = messages[index];
      box.style.opacity = 1;

      index = (index + 1) % messages.length;
    }, 600);
  }

  showNext();
  setInterval(showNext, 3000);
}

// --- RENDER ONE PAGE OF PRODUCTS ---
function displayPage(page) {
  if (!container) return;

  const startIndex = (page - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;
  const pageProducts = allProducts.slice(startIndex, endIndex);

  // Clear previous content
  container.innerHTML = "";

  pageProducts.forEach((product) => {
    const card = document.createElement("article");
    const image = document.createElement("img");
    const content = document.createElement("div");
    const title = document.createElement("h2");
    const price = document.createElement("p");
    const discountedPrice = document.createElement("p");
    const rating = document.createElement("p");
    const reviews = document.createElement("p");
    const anchor = document.createElement("a");

    card.className = "product-card";
    image.className = "product-card__image";
    content.className = "product-card__content";
    title.className = "product-card__title";
    price.className = "product-card__price";
    discountedPrice.className = "product-card__discount";

    image.src = product.image.url;
    image.alt = product.image.alt || product.title;
    title.textContent = product.title;
    title.style.color = "black";
    price.style.color = "black";
    discountedPrice.style.color = "black";

    const hasDiscount =
      typeof product.discountedPrice === "number" &&
      typeof product.price === "number" &&
      product.discountedPrice < product.price;

    if (hasDiscount) {
      price.textContent = `$${product.price.toFixed(2)}`;
      price.style.textDecoration = "line-through";
      price.style.textDecorationColor = "red";
      discountedPrice.textContent = `$${product.discountedPrice.toFixed(2)}`;
    } else {
      price.textContent = `$${product.price.toFixed(2)}`;
      price.style.textDecoration = "none";
      discountedPrice.textContent = "";
    }

    reviews.textContent = ""; // or product.reviews if you want raw
    anchor.href = `product/product.html?id=${product.id}`;
    anchor.style.textDecoration = "none";

    // Add to cart button
    // const button = document.createElement("button");
    // button.className = "add-to-cart";
    // button.textContent = "Add to Cart";
    // button.addEventListener("click", (event) => {
    //   event.preventDefault();
    //   addToCart(product);
    //   updateCartCounter();
    //   renderCart();
    // });

    content.appendChild(title);
    content.appendChild(price);
    content.appendChild(discountedPrice);
    card.appendChild(image);
    card.appendChild(content);
    card.appendChild(rating);
    // card.appendChild(button); // if you re-enable it
    anchor.appendChild(card);
    container.appendChild(anchor);
  });

  // Update page number + button states
  const totalPages = Math.ceil(allProducts.length / recordsPerPage);
  const pageNumberSpan = document.getElementById("page-number");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  if (pageNumberSpan) {
    pageNumberSpan.textContent = `Page ${page} of ${totalPages || 1}`;
  }

  if (prevBtn) prevBtn.disabled = page <= 1;
  if (nextBtn) nextBtn.disabled = page >= totalPages;
}

// --- BUTTON HANDLERS ---
function nextPage() {
  const totalPages = Math.ceil(allProducts.length / recordsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    displayPage(currentPage);
  }
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    displayPage(currentPage);
  }
}

// --- FETCH PRODUCTS ONCE ---
async function fetchProducts() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    allProducts = data.data || [];

    // Init review loop once using ALL products
    const reviewMessages = extraReviewMessages(allProducts);
    initReviewLoop(reviewMessages);

    // Show first page
    displayPage(currentPage);
  } catch (error) {
    console.error("Failed to fetch and create products", error);
    if (container) {
      container.textContent = "Failed to load products.";
    }
  }
}

// Hook up pagination buttons
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

if (prevBtn && nextBtn) {
  prevBtn.addEventListener("click", prevPage);
  nextBtn.addEventListener("click", nextPage);
} else {
  console.warn("Pagination buttons not found");
}

fetchProducts();
updateCartCounter();
initCartUI();
