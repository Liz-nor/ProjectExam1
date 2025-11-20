function createAccount(email, password) {
  if (!email || !password) {
    return "Fill in all fields.";
  }

  if (localStorage.getItem(email)) {
    return "Account already exists.";
  }

  localStorage.setItem(email, password);
  return "Account created.";
}

function login(email, password) {
  if (!email || !password) {
    return "Fill in all fields.";
  }

  const storedPassword = localStorage.getItem(email);

  if (!storedPassword) {
    return "Account does not exist.";
  }

  if (!storedPassword !== password) {
    return "Incorrect password.";
  }

  return "Login successful.";
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form");
  const name_input = document.getElementById("name-input");
  const email_input = document.getElementById("email-input");
  const password_input = document.getElementById("password-input");
  const confirm_password_input = document.getElementById(
    "confirm-password-input"
  );
  const error_message = document.getElementById("error-messages");

  form.addEventListener("submit", (e) => {
    let errors = [];

    if (name_input) {
      // If we have a name input then we are in the signup
      errors = getSignupFormErrors(
        name_input.value,
        email_input.value,
        password_input.value,
        confirm_password_input.value
      );
    } else {
      errors = getLoginFormErrors(email_input.value, password_input.value);
      // If we dont have a name input we are in the login
    }

    if (errors.length > 0) {
      // If there are any errors
      e.preventDefault();
      error_message.innerText = errors.join(".  ");
      return;
    }
    if (name_input) {
      const result = createAccount(email_input.value, password_input.value);
      alert(result);
    } else {
      const result = login(email_input.value, password_input.value);
      alert(result);
    }
  });

  function getSignupFormErrors(name, email, password, confirmPassword) {
    let errors = [];

    if (name === "" || name == null) {
      errors.push("Name is required");
      name_input.parentElement.classList.add("incorrect");
    }
    if (email === "" || email == null) {
      errors.push("Email is required");
      email_input.parentElement.classList.add("incorrect");
    }
    if (password === "" || password == null) {
      errors.push("Password is required");
      password_input.parentElement.classList.add("incorrect");
    }
    if (password && password.length < 8) {
      errors.push("Password must have at least 8 characters");
      password_input.parentElement.classList.add("incorrect");
    }
    if (password !== confirmPassword) {
      errors.push("Password does not match confirmed password");
      password_input.parentElement.classList.add("incorrect");
      confirm_password_input.parentElement.classList.add("incorrect");
    }
    return errors;
  }

  function getLoginFormErrors(email, password) {
    let errors = [];

    if (email === "" || email == null) {
      errors.push("Email is required");
      email_input.parentElement.classList.add("incorrect");
    }
    if (password === "" || password == null) {
      errors.push("Password is required");
      password_input.parentElement.classList.add("incorrect");
    }
    return errors;
  }

  const allInputs = [
    name_input,
    email_input,
    password_input,
    confirm_password_input,
  ].filter((input) => input != null);

  allInputs.forEach((input) => {
    input.addEventListener("input", () => {
      if (input.parentElement.classList.contains("incorrect")) {
        input.parentElement.classList.remove("incorrect");
        error_message.innerText = "";
      }
    });
  });
});
