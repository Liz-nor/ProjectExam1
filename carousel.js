// --- Image Carousel

const slides = document.querySelectorAll(".slides img"); // --- Select all images within the slides container
let slideIndex = 0; // --- Initialize the starting slide index
let intervalId = null; // --- Variable to hold the interval ID for automatic sliding

initializeSlider();
document.addEventListener("DOMContentLoaded", initializeSlider); // --- Ensure the slider initializes after the DOM is fully loaded
function initializeSlider() {
  if (slides.length > 0) {
    slides[slideIndex].classList.add("displaySlide"); // --- Show the first slide
    intervalId = setInterval(nextSlide, 5000); // --- Change slide every 5 seconds
  }
}

function getActiveProductId() {
  const img = slides[slideIndex];
  return img.dataset.id;
}
document.addEventListener("DOMContentLoaded", () => {
  const inspectBtn = document.querySelector(".inspectBtn");
  if (!inspectBtn) return;

  inspectBtn.addEventListener("click", () => {
    const productId = getActiveProductId();
    window.location.href = `./product/product.html?id=${productId}`;
  });
});

function showSlide(index) {
  if (index >= slides.length) {
    slideIndex = 0;
  } else if (index < 0) {
    slideIndex = slides.length - 1;
  }
  slides.forEach((slide) => {
    slide.classList.remove("displaySlide");
  });
  slides[slideIndex].classList.add("displaySlide");
}
function prevSlide() {
  clearInterval(intervalId); // --- Clear the existing interval
  slideIndex--;
  showSlide(slideIndex);
  intervalId = setInterval(nextSlide, 5000);
}
function nextSlide() {
  clearInterval(intervalId);
  slideIndex++;
  showSlide(slideIndex);
  intervalId = setInterval(nextSlide, 5000);
}

const carousel = document.getElementById("carousel");

fetch("https://v2.api.noroff.dev/online-shop")
  .then((res) => res.json())
  .then((data) => {
    data.data.forEach((product) => {
      console.log(product.tags);
      console.log(...product.tags);
      console.log(product.is, product.tags);
    });
  });

if (carousel) {
  carousel.addEventListener("mouseenter", () => {
    clearInterval(intervalId);
  });

  carousel.addEventListener("mouseleave", () => {
    clearInterval(intervalId);
    intervalId = setInterval(nextSlide, 5000);
  });
  const nextBtn = document.querySelector(".next");
  const prevBtn = document.querySelector(".prev");

  if (nextBtn) {
    nextBtn.addEventListener("click", nextSlide);
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", prevSlide);
  }
}
