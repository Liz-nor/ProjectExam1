const API_URL = "https://v2.api.noroff.dev/online-shop";
const container = document.querySelector("#container"); // Selects and HTML element with the ID container where the proucts will be displayed

async function fetchProducts() {
  // Asynchronous function to fetch products from the API, wait for the respons and insert them into the page
  try {
    const res = await fetch(API_URL); //fetches the data from the API
    const data = await res.json(); //pauses until the response is received and converts it to JSON format
    const products = data.data || []; // if data.data does not exist, use an empty array, preventing errors

    products.forEach((product) => {
      //for each product, this creates and appends a new visual card with image, title, and price
      const card = document.createElement("div"); //creating dynamic HTML elements for each product
      const image = document.createElement("img");
      const content = document.createElement("div");
      const title = document.createElement("h2");
      const price = document.createElement("p");
      const discountedPrice = document.createElement("p");
      const rating = document.createElement("p");
      const reviews = document.createElement("p");
      const anchor = document.createElement("a");

      card.className = "card"; //assigning class names for use in CSS
      card.classList.add("fill-img");
      image.className = "image";
      content.className = "content";
      title.className = "title";
      price.className = "price";
      discountedPrice.className = "discounted-price";
      // rating.className = "rating";

      image.src = product.image.url; //setting the content of each element based on the product data
      image.alt = product.image.alt;
      title.textContent = product.title;
      price.textContent = product.price;
      discountedPrice.textContent = product.discountedPrice;
      rating.textContent = product.rating;
      reviews.textContent = product.reviews;
      anchor.href = `product/index.html?id=${product.id}`;

      content.appendChild(title); //nesting elements properly and appending them to the container
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

fetchProducts(); //calling the function to execute the code and display the products
