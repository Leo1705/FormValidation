const forms = document.querySelectorAll('#create-account-form');

forms.forEach((form) => {
    const ul = form.querySelector("ul");
    const usernameInput = ul.querySelector('#username');
    const emailInput = ul.querySelector('#email');
    const passwordInput = ul.querySelector('#password');
    const confirmPasswordInput = ul.querySelector('#confirm-password');

    form.addEventListener('submit', (event) => {
        event.preventDefault(); 
        validateForm(usernameInput, emailInput, passwordInput, confirmPasswordInput, form);

        if (isFormValid(form)) {
            window.alert("Form was submitted!");
        } else {
            console.log('Form is not valid');
        }
    });
});

function isFormValid(form) {
    const inputContainers = form.querySelectorAll('.input-group');
    let result = true;
    inputContainers.forEach((container) => {
        if (container.classList.contains('error')) {
            result = false;
        }
    });
    return result;
}

function validateForm(usernameInput, emailInput, passwordInput, confirmPasswordInput, form) {
    // Validate username
    if (usernameInput.value.trim() == '') {
        setError(usernameInput, 'Name cannot be empty');
    } else if (usernameInput.value.trim().length < 5 || usernameInput.value.trim().length > 15) {
        setError(usernameInput, 'Name must be between 5 and 15 characters');
    } else {
        setSuccess(usernameInput);
    }

    // Validate email
    if (emailInput.value.trim() == '') {
        setError(emailInput, 'Provide an email address');
    } else if (isEmailValid(emailInput.value)) {
        setSuccess(emailInput);
    } else {
        setError(emailInput, 'Provide a valid email address');
    }

    // Validate password
    if (passwordInput.value.trim() == '') {
        setError(passwordInput, 'Password cannot be empty');
    } else if (passwordInput.value.trim().length < 6 || passwordInput.value.trim().length > 20) {
        setError(passwordInput, 'Password must be between 6 and 20 characters');
    } else {
        setSuccess(passwordInput);
    }

    // Validate confirm password
    if (confirmPasswordInput.value.trim() == '') {
        setError(confirmPasswordInput, 'Password confirmation cannot be empty');
    } else if (confirmPasswordInput.value !== passwordInput.value) {
        setError(confirmPasswordInput, 'Passwords do not match');
    } else {
        setSuccess(confirmPasswordInput);
    }
}

function setError(element, errorMessage) {
    const parent = element.parentElement;
    if (parent.classList.contains('success')) {
        parent.classList.remove('success');
    }
    parent.classList.add('error');
    const paragraph = parent.querySelector('p');
    paragraph.textContent = errorMessage;
}

function setSuccess(element) {
    const parent = element.parentElement;
    if (parent.classList.contains('error')) {
        parent.classList.remove('error');
    }
    parent.classList.add('success');
}

function isEmailValid(email) {
    const reg = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return reg.test(email);
}
