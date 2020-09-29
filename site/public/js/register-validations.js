window.addEventListener('load', function(){
    let errors = {};

    let registerForm = document.getElementById('registerForm');
    let firstName = document.getElementById('firstname');
    let lastName = document.getElementById('lastname');
    let email = document.getElementById('email');
    let password = document.getElementById('password');

    let validateFisrtName = function() {
        let feedback = '';

        if(validator.isEmpty(firstName.value, {ignore_whitespace:true })){
            feedback = 'El nombre es obligatorio';
        } else if (!validator.isLength(firstName.value, { min: 3 })) {
            feedback = 'El nombre debe tener al menos 3 caracteres';    
        }

        handleFeedback(firstName, feedback);

    }

    let validateLastName = function() {
        let feedback = '';

        if(validator.isEmpty(lastName.value, {ignore_whitespace:true })) {
            feedback = 'El apellido es obligatorio';
        } else if(!validator.isLength(lastName.value, { min: 3 }))  {
            feedback = 'El apellido debe tener al menos 3 caracteres';
        }

        handleFeedback(lastName, feedback);

    }

    let validateEmail = function() {
        let feedback = '';
   
        if(validator.isEmpty(email.value, {ignore_whitespace:true })) {
            feedback = 'El correo electrónico es obligatorio';
        } else if(!validator.isEmail(email.value)) {
            feedback = 'El email debe incluir @';
        }

        handleFeedback(email, feedback);
    }

    let validatePassword = function(){
        let feedback = '';

        if(validator.isEmpty(password.value)){
            feedback = 'La contraseña es obligatoria';
        }else if(!validator.isLength(password.value, { min: 8 }))  {
            feedback = 'La contraseña debe tener al menos 8 caracteres';
        }

        handleFeedback(password, feedback);
    }

    //Modularizar la funcion para mostrar feedback 
    let handleFeedback = function (element, feedback){
        let feedbackElement = element.nextElementSibling;

        if(feedback != ''){
            element.classList.add('error');
            feedbackElement.classList.add('error');
            errors[element.name] = feedback; //[element. nombre del input]

        }else{
            element.classList.remove('error');
            feedbackElement.classList.remove('error');
            delete errors[element.name];
        }

        feedbackElement.innerText = feedback;
        console.log(errors);
    }

    let validateRegister = function(e) {
        validateFisrtName();
        validateLastName();
        validateEmail();
        validatePassword();

        if(object.keys(errors).length) { //objeto con arrays de propiedades
            e.preventDefault();
        }
    }

    //Agregando listeners

    firstName.addEventListener('blur', validateFisrtName);
    lastName.addEventListener('blur', validateLastName);
    email.addEventListener('blur', validateEmail);
    password.addEventListener('blur', validatePassword);
    registerForm.addEventListener('submit', validateRegister);

})