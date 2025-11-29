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

// --- If shoes, makes you choose a size
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
async function fetchSimilarProducts(currentProduct) {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    const allProducts = data?.data || [];
    // --- Filter through products that shares the same tags with the product in focus
    const similarProducts = allProducts
      .filter((product) => {
        // Excluding the product already in focus
        if (product.id === currentProduct.id) return false;
        if (!product.tags || !currentProduct.tags) return false;
        return product.tags.some((tag) =>
          currentProduct.tags.some(
            (currentTag) => currentTag.toLowerCase() === tag.toLowerCase()
          )
        );
      })
      .slice(0, 3);
    return similarProducts;
  } catch (error) {
    console.error("Error fetching similar products:", error);
    return [];
  }
}
function renderSimilarProducts(products) {
  const sidebar = document.querySelector(".product-layout__sidebar--left");
  if (!sidebar) return;
  sidebar.innerHTML = `<h2>Similar Products</h2>`;
  sidebar.style.height = "auto";
  if (products.length === 0) {
    sidebar.innerHTML += `<p>No similar products found.</p>`;
    return;
  }
  const listContainer = document.createElement("ul");
  listContainer.className = "similar-product-list";

  products.forEach((product) => {
    const li = document.createElement("li");
    li.className = "similar-product-item";

    const link = document.createElement("a");
    link.href = `product.html?id=${product.id}`;

    const img = document.createElement("img");
    img.src = product.image?.url || "";
    img.alt = product.title || "Product";
    img.className = "similar-product-image";

    const title = document.createElement("p");
    title.textContent = product.title || "Untitled";
    title.className = "similar-product.title";

    link.appendChild(img);
    link.appendChild(title);
    li.appendChild(link);
    listContainer.appendChild(li);
  });
  sidebar.appendChild(listContainer);
}
async function fetchAndCreateProducts() {
  // --- Main function to fetch and display product details
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
    backButton.href = "../index.html";

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
      const reviewContainer = document.createElement("div");
      reviewContainer.className = "reviewsContainer";

      const reviewsTitle = document.createElement("h3");
      reviewsTitle.textContent = `Reviews (${product.reviews.length})`;
      reviewContainer.appendChild(reviewsTitle);

      product.reviews.forEach((review) => {
        const reviewItem = document.createElement("div");
        reviewItem.className = "review-item";

        const rating = document.createElement("span");
        rating.className = "review-rating";
        rating.textContent = `⭐ ${review.rating}/5`;

        const description = document.createElement("p");
        description.className = "review-description";
        description.textContent = review.description;

        reviewItem.appendChild(rating);
        reviewItem.appendChild(description);
        reviewContainer.appendChild(reviewItem);
      });
      productDiv.appendChild(reviewContainer);
    }
    // --- Add to Cart
    const addToCartBtn = document.createElement("button");
    addToCartBtn.className = "addToCartBtn";
    addToCartBtn.textContent = "Add To Cart";
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    if (isLoggedIn) {
      addToCartBtn.addEventListener("click", (event) => {
        event.preventDefault();
        addToCart(product);
        updateCartCounter();
        renderCart();
        showModal("Product added to cart!");
      });
      productDiv.appendChild(addToCartBtn);
    } else {
      const loginPromt = document.createElement("button");
      loginPromt.className = "addToCartBtn";
      loginPromt.textContent = "Log in to purchase";
      loginPromt.addEventListener("click", () => {
        window.location.href = "/account/login.html";
      });
      productDiv.appendChild(loginPromt);
    }

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

    const similarProducts = await fetchSimilarProducts(product);
    renderSimilarProducts(similarProducts);
  } catch (err) {
    container.textContent = "Something went wrong loading the product.";
    console.error(err);
  }
}

fetchAndCreateProducts();
updateCartCounter();
initCartUI();
