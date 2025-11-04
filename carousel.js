//Image Carousel

const slides = document.querySelectorAll(".slides img"); // Select all images within the slides container
let slideIndex = 0; // Initialize the starting slide index
let intervalId = null; // Variable to hold the interval ID for automatic sliding

initializeSlider();
document.addEventListener("DOMContentLoaded", initializeSlider); // Ensure the slider initializes after the DOM is fully loaded
function initializeSlider() {
  if (slides.length > 0) {
    slides[slideIndex].classList.add("displaySlide"); // Show the first slide
    intervalId = setInterval(nextSlide, 5000); // Change slide every 5 seconds
  }
}
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
  clearInterval(intervalId); // Clear the existing interval
  slideIndex--;
  showSlide(slideIndex);
}
function nextSlide() {
  slideIndex++;
  showSlide(slideIndex);
}

document.querySelector(".next").addEventListener("click", nextSlide); 
document.querySelector(".prev").addEventListener("click", prevSlide);

showSlide(slideIndex);

