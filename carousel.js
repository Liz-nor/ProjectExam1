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

const imgHandbag = document.getElementById('imgHandbag')
const imgHeadphones = document.getElementById('imgHeadphones')
const imgBoots = document.getElementById('imgBoots')
const imgPerfume = document.getElementById('imgPerfume')

imgBoots.addEventListener('click', (event) => { // Add click event listener to the image
  const id = event.target.dataset.id; // Get the id of the clicked image
  console.log('clicked image ID;', id); // Log the id to the console
})
imgHandbag.addEventListener('click', (event) => { 
  const id = event.target.dataset.id; 
  console.log('clicked image ID;', id); 
})
imgHeadphones.addEventListener('click', (event) => { 
  const id = event.target.dataset.id; 
  console.log('clicked image ID;', id); 
})
imgPerfume.addEventListener('click', (event) => { 
  const id = event.target.dataset.id; 
  if (!id) return;  
  window.location.href = `/product/product.html?=${id}`; // Navigate to product page with the id as a query parameter
});

fetch("https://v2.api.noroff.dev/online-shop")
.then(res => {
  return res.json();
})
.then(data => {
  console.log(data);
  data.data.forEach(product => {
    const carouselItemHtml = `<li>${product.id}</li>`;

    
  });
})
.catch(error => 
  console.log(error));

document.querySelector(".next").addEventListener("click", nextSlide); 
document.querySelector(".prev").addEventListener("click", prevSlide);

showSlide(slideIndex);

