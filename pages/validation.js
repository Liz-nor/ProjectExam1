const form = document.getElementById('form')
const name_input = document.getElementById('name-input')
const email_input = document.getElementById('email-input')
const password_input = document.getElementById('password-input')
const confirm_password_input = document.getElementById('confirm-password-input')

form.addEventListener('submit', (e) => {

    let error =  []

    if (name_input) {
        // If we have a name input then we are in the signup
        error = getSignupFormErrors(name_input.value, email_input.value, password_input.value, confirm_password_input.value)
    }    
    else {
        error = getLoginFormErrors(email_input.value, password_input.value)
        // If we dont have a name input we are in the login
    }

    if(error.lenght > 0) {
        // If there are any errors
        e.preventDefault();
    }
})

function getSignupFormErrors(name, email, password, confirmPassword) {
    let error = []

    if(name === '' || name == null) {
        error.push('Name is required')
        name_input.parentElement.classList.add('incorrect')
    }
    if(email === '' || email == null) {
        error.push('Email is required')
        email_input.parentElement.classList.add('incorrect')
    }
    if(password === '' || password == null) {
        error.push('Password is required')
        password_input.parentElement.classList.add('incorrect')
    }

    return error;
}