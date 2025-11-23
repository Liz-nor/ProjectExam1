import {
  updateCartCounter,
  initCartUI,
  addToCart,
  renderCart,
} from "../components/cart.js";
import "../components/navbar.js"; // --- Importing the navbar component to be used on the page

const API_URL = "https://v2.api.noroff.dev/online-shop"; // --- Base API URL
const container = document.querySelector("#container"); // --- Container to hold the product details
const sizeSelect = document.getElementById("sizeSelect");

// --- If shoes, makes you choose a size ---
function areShoes(product) {
  if (!product.tags) return false;

  const shoeTags = ["shoes"];

  return product.tags.some((tag) => shoeTags.includes(tag.toLowerCase()));
}
async function handleShareClick(shareUrl, product) {
  if (navigator.share) {
    try {
      await navigator.share({
        title: product.title || "Check out this product",
        text: "Have a look at this product",
        url: shareUrl,
      });
      return;
    } catch (error) {
      console.error("Share cancelled or failed", error);
    }
  }
  if (navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(shareUrl);
      alert("Link copied to clipboard!");
      return;
    } catch (error) {
      console.log("Clipboard copy failed", error);
    }
  }
  prompt("Copy this link:", shareUrl);
}
async function fetchAndCreateProducts() {
  // --- Main function to fetch and display product details ---
  const params = new URLSearchParams(window.location.search); // --- Get query parameters from the URL
  const id = params.get("id"); // --- Extract the product ID
  console.log(id);
  if (!id) {
    container.textContent = "No product ID provided in the URL.";
    return;
  }

  try {
    // --- Attempt to fetch product details ---
    const response = await fetch(`${API_URL}/${id}`);
    const data = await response.json();
    const product = data?.data;

    if (!product) {
      // --- Handle case where product is not found ---
      container.textContent = "Could not load product.";
      return;
    }

    console.log("Tags", product.tags);

    if (areShoes(product)) {
      sizeSelect.style.display = "block";
    } else {
      sizeSelect.style.display = "none";
    }

    // --- Elements ---
    const productDiv = document.createElement("div");
    const image = document.createElement("img");
    const title = document.createElement("h2");
    const price = document.createElement("p");
    const discounted = document.createElement("p");
    const description = document.createElement("p");
    const rating = document.createElement("p");
    const reviews = document.createElement("p");
    const backButton = document.createElement("a");

    // --- Classes ---
    productDiv.className = "product-details";
    image.className = "product-image";
    title.className = "product-title";
    price.className = "product-price";
    discounted.className = "discounted-price";
    rating.className = "ratings";
    reviews.className = "reviews";
    description.className = "product-description";
    backButton.className = "back-button";

    backButton.textContent = "Back to products";
    backButton.href = "/index.html";

    // --- Share button ---
    const shareButton = document.createElement("button");
    shareButton.type = "button";
    shareButton.className = "product-share";
    const tooltip = document.createElement("span");
    tooltip.textContent = "Share this product";
    tooltip.className = "tooltip-text";
    shareButton.setAttribute("aria-label", "Share this product");
    shareButton.innerHTML = `<i class="fa-solid fa-share-from-square"></i>`;

    shareButton.addEventListener("mouseenter", () => {
      tooltip.style.opacity = "1";
    });
    shareButton.addEventListener("mouseleave", () => {
      tooltip.style.opacity = "0";
    });
    // --- Content ---
    image.src = product.image?.url || "";
    image.alt = product.image?.alt || product.title || "Product image";
    title.textContent = product.title ?? "Untitled product";
    description.textContent = product.description ?? "";

    // ---Share URL ---
    const shareUrl = `${window.location.origin}${
      window.location.pathname
    }?id=${encodeURIComponent(product.id)}`;

    shareButton.addEventListener("click", () => {
      handleShareClick(shareUrl, product);
    });

    // --- Price logic (cross out original when discounted) ---
    const hasDiscount =
      typeof product.discountedPrice === "number" &&
      typeof product.price === "number" &&
      product.discountedPrice < product.price;

    if (hasDiscount) {
      price.textContent = `$${product.price.toFixed(2)}`;
      price.style.textDecoration = "line-through"; // --- cross-out original price
      price.style.textDecorationColor = "red";
      discounted.textContent = `$${product.discountedPrice.toFixed(2)}`;
    } else {
      price.textContent = `$${Number(product.price || 0).toFixed(2)}`;
      price.style.textDecoration = "none";
      discounted.textContent = ""; // --- nothing to show
    }

    // --- Rating ---
    rating.textContent =
      typeof product.rating === "number"
        ? `Rating: ${product.rating}`
        : "Rating: N/A";

    // --- Reviews ---
    if (Array.isArray(product.reviews) && product.reviews.length > 0) {
      const reviewCount = product.reviews.length;
      const reviewList = product.reviews
        .map((r) => `⭐ ${r.rating}/5  ${r.description}`)
        .join("\n");
      reviews.textContent = `Reviews (${reviewCount}):\n- ${reviewList}`;
    } else if (
      typeof product.reviews === "string" &&
      product.reviews.trim() !== ""
    ) {
      reviews.textContent = `Reviews: ${product.reviews}`;
    } else {
      reviews.textContent = "No reviews available... yet";
    }
    // --- Add to Cart ---
    // const addToCartBtn = document.createElement("button");
    // addToCartBtn.className = "addToCartBtn";
    // addToCartBtn.textContent = "Add To Cart";
    // addToCartBtn.addEventListener("click", (event) => {
    //   event.preventDefault();
    //   addToCart(product);
    //   updateCartCounter();
    //   renderCart();
    // });

    // --- Compose ---
    productDiv.appendChild(image);
    productDiv.appendChild(title);
    productDiv.appendChild(shareButton);
    productDiv.appendChild(price);
    if (hasDiscount) productDiv.appendChild(discounted);
    productDiv.appendChild(description);
    productDiv.appendChild(rating);
    productDiv.appendChild(reviews);
    productDiv.appendChild(backButton);
    shareButton.appendChild(tooltip);

    container.appendChild(productDiv);
  } catch (err) {
    container.textContent = "Something went wrong loading the product.";
    console.error(err);
  }
}

fetchAndCreateProducts();
updateCartCounter();
initCartUI();
