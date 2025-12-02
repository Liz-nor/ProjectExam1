const ALLOWED_DOMAIN = "@stud.noroff.no";

function updateNavAuthState() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const userEmail = localStorage.getItem("userEmail");
  // --- Check if user is logged in with a valid domain
  const isValidUser =
    isLoggedIn &&
    userEmail &&
    userEmail.toLowerCase().endsWith(ALLOWED_DOMAIN.toLowerCase());

  const loggedOutEls = document.querySelectorAll(".auth-logged-out");
  const loggedInEls = document.querySelectorAll(".auth-logged-in");

  if (isValidUser) {
    loggedOutEls.forEach((el) => (el.style.display = "none"));
    loggedInEls.forEach((el) => (el.style.display = ""));
  } else {
    loggedOutEls.forEach((el) => (el.style.display = ""));
    loggedInEls.forEach((el) => (el.style.display = "none"));
  }
}

document.addEventListener("DOMContentLoaded", () => {
  updateNavAuthState();

  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("userEmail");
      updateNavAuthState();
      window.location.href = "../index.html";
    });
  }
});
