const form  = document.getElementsByTagName('form')[0];
const email = document.getElementById('mail');
const emailError = document.querySelector('#mail + span.error');

// chequeamos cada caracter escrito
email.addEventListener('input', event => {
    if (email.validity.valid) {
      emailError.innerHTML = '';
      emailError.className = 'error';
    } else {
      showError();
    }
});

// chequeamos si hay errores antes de enviar 
form.addEventListener('submit', event => {
    if (!email.validity.valid) {
      showError();
      event.preventDefault(); 
    }
});

function showError() {
    // Mensaje personalizado según el error
    if (email.validity.valueMissing) {
      emailError.textContent = "Debe introducir una dirección de correo electrónico.";
    } else if (email.validity.typeMismatch) {
      emailError.textContent = "El valor introducido debe ser una dirección de correo electrónico.";
    } else if (email.validity.tooShort) {
      emailError.textContent = `El correo electrónico debe tener al menos ${ email.minLength } caracteres; ha introducido ${ email.value.length }.`;
    }
    // Agrego class para mostrar error
    emailError.className = 'error active';
}