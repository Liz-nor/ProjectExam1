import {
  addToCart,
  renderCart,
  updateCartCounter,
  initCartUI,
} from "./components/cart.js";
import "./components/navbar.js"; // --- Importing the navbar component to be used on the page
const API_URL = "https://v2.api.noroff.dev/online-shop";
const container = document.querySelector("#container"); // --- Selects and HTML element with the ID container where the proucts will be displayed

async function fetchProducts() {
  // --- Asynchronous function to fetch products from the API, wait for the respons and insert them into the page
  try {
    const res = await fetch(API_URL); // --- Fetches the data from the API
    const data = await res.json(); // --- Pauses until the response is received and converts it to JSON format
    const products = data.data || [];

    products.forEach((product) => {
      // --- For each product, this creates and appends a new visual card with image, title, price etc
      const card = document.createElement("div"); // --- Creating dynamic HTML elements for each product
      const image = document.createElement("img");
      const content = document.createElement("div");
      const title = document.createElement("h2");
      const price = document.createElement("p");
      const discountedPrice = document.createElement("p");
      const rating = document.createElement("p");
      const reviews = document.createElement("p");
      const anchor = document.createElement("a");

      
      card.className = "card"; //assigning class names for use in CSS
      image.className = "image";
      content.className = "content";
      title.className = "title";
      price.className = "price";
      discountedPrice.className = "discounted-price";
      

      image.src = product.image.url; // --- Setting the content of each element based on the product data
      image.alt = product.image.alt;
      title.textContent = product.title;
      title.style.color = "black";
      price.style.color = "black";
      discountedPrice.style.color = "black";
      price.textContent = product.price;
      discountedPrice.textContent = product.discountedPrice;
      

      const hasDiscount =
        typeof product.discountedPrice === "number" &&
        typeof product.price === "number" &&
        product.discountedPrice < product.price;

      if (hasDiscount) {
        price.textContent = "On sale!";
        price.textContent = `$${product.price.toFixed(2)}`;
        price.style.textDecoration = "line-through";
        price.style.textDecorationColor = "red";
        discountedPrice.textContent = `$${product.discountedPrice.toFixed(2)}`;
      } else {
        price.textContent = `$${product.price.toFixed(2)}`;
        price.style.textDecoration = "none";
        discountedPrice.textContent = "";
      }
      reviews.textContent = product.reviews;
      anchor.href = `product/product.html?id=${product.id}`;
      anchor.style.textDecoration = "none";

      // const button = document.createElement("button");
      // button.className = "add-to-cart";
      // button.textContent = "Add to Cart";
      // button.addEventListener("click", (event) => {
      //   event.preventDefault();
      //   addToCart(product);
      //   updateCartCounter();
      //   renderCart();
      // });

      content.appendChild(title); // --- Nesting elements properly and appending them to the container
      content.appendChild(price);
      content.appendChild(discountedPrice);
      card.appendChild(image);
      card.appendChild(content);
      card.appendChild(rating);
      anchor.appendChild(card);
      container.appendChild(anchor);
    });
  } catch (error) {
    console.error("Failed to fetch and create products", error);
  }
}

fetchProducts(); // --- Calling the function to execute the code and display the products
updateCartCounter();
initCartUI();
