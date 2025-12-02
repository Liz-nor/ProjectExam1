document.addEventListener("DOMContentLoaded", () => {
  const footerContainer = document.getElementById("footer");

  if (!footerContainer) return;

  footerContainer.innerHTML = `
    <footer class="footer">
    <div class="footer-section info-section">
    <h2 class="footer-title">Lènoir Lane</h2>
    <p>
        Lènoir Lane is a newly established luxury brand dedicated to crafting
        high-end products that blend timeless design with modern sophistication.
    </p>
    </div>
    <div class="footer-section about-us-section">
    <h2 class="footer-title">About Us</h2>
    <ul class="footer-links">
        <li><a href="">Find Us</a></li>
        <li><a href="">Shipping</a></li>
        <li class="auth-logged-in"><a href="../account/login.html">Login</a></li>
        <li class="auth-logged-in"><a href="../account/register.html">Register</a></li>
    </ul>
    </div>
    <div class="footer-section">
    <h2 class="footer-title">Follow Us</h2>
    <img
        class="partner-icons"
        src="../assets/facebook-svgrepo-com.svg"
        alt="Facebook logo"
    />
    <img
        class="partner-icons"
        src="../assets/tiktok-logo-logo-svgrepo-com.svg"
        alt="Tiktok logo"
    />
    <img
        class="partner-icons"
        src="../assets/instagram-1-svgrepo-com.svg"
        alt="Instagram logo"
    />
    </div>
    <div class="footer-section">
    <h2 class="footer-title">Our Partners</h2>
    <img
        class="partner-icons"
        src="../assets/mastercard-old-svgrepo-com.svg"
        alt="Mastercard logo"
    />
    <img
        class="partner-icons"
        src="../assets/klarna-logo-svgrepo-com.svg"
        alt="Klarna logo"
    />
    <img class="partner-icons" src="../assets/visa-svgrepo-com.svg" alt="Visa logo" />
    <img class="partner-icons" src="../assets/Posten_idfMm1ADA9_0.png" alt="Norwegian post office logo" />
    </div>
</footer>`;

  footerContainer.querySelectorAll(".footer-title").forEach((title) => {
    title.addEventListener("click", () => {
      title.parentElement.classList.toggle("open");
    });
  });
});
