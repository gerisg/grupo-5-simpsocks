window.addEventListener('load', function(){
    let errors = {};

    let registerForm = document.getElementById('registerForm');
    let firstName = document.getElementById('firstname');
    let lastName = document.getElementById('lastname');
    let email = document.getElementById('email');
    let password = document.getElementById('password');

    let validateFisrtName = function() {
        let feedback = '';
        // let feedbackElement = firstName.nextElementSibling;

        if(validator.isEmpty(firstName.value, {ignore_whitespace:true })){
            feedback = 'El nombre es obligatorio';
        } else if (!validator.isLength(firstName.value, { min: 3 })) {
            feedback = 'El nombre debe tener al menos 3 caracteres';    
        }

        handleFeedback(firstName, feedback);
        // if(feedback != '') {
        //     firstName.classList.add('error');
        //     feedbackElement.classList.add('error');
        //     errors.firstName = feedback;
        // }else {
        //     firstName.classList.remove('error');
        //     feedbackElement.classList.remove('error');
        //     delete errors.firstName; 
        // }

        // feedbackElement.innerHTML = feedback;
        // console.log(errors);
    }

    let validateLastName = function() {
        let feedback = '';
        // let feedbackElement = lastName.nextElementSibling;

        if(validator.isEmpty(lastName.value, {ignore_whitespace:true })) {
            feedback = 'El apellido es obligatorio';
        } else if(!validator.isLength(firstName.value, { min: 3 }))  {
            feedback = 'El apellido debe tener al menos 3 caracteres';
        }

        handleFeedback(lastName, feedback);

        // if(feedback != '') {
        //     lastName.classList.add('error');
        //     feedbackElement.classList.add('error');
        //     errors.lastName = feedback;
        // } else {
        //     lastName.classList.remove('error');
        //     feedbackElement.classList.remove('error');
        //     delete errors.lastName;
        // }

        // feedbackElement.innerText = feedback;
        // console.log(errors);
    }

    let validateEmail = function() {
        let feedback = '';
        // let feedbackElement = email.nextElementSibling;

        if(validator.isEmpty(email.value, {ignore_whitespace:true })) {
            feedback = 'El correo electrónico es obligatorio';
        } else if(!validator.isEmail(email.value)) {
            feedback = 'El email debe incluir @';
        }

        handleFeedback(email, feedback);

        // if(feedback != '') {
        //     email.classList.add('error');
        //     feedbackElement.classList.add('error');
        //     errors.email = feedback;
        // } else {
        //     email.classList.remove('error');
        //     feedbackElement.classList.remove('error');
        //     delete errors.mail;
        // }

        // feedbackElement.innerText = feedback;
        // console.log(errors);
    }

    let validatePassword = function(){
        let feedback = '';
        // let feedbackElement = password.nextElementSibling;

        if(validator.isEmpty(password.value)){
            feedback = 'La contraseña es obligatoria';
        }else if(!validator.isLength(password.value, { min: 8 }))  {
            feedback = 'La contraseña debe tener al menos 8 caracteres';
        }

        handleFeedback(password, feedback);

        // if(feedback != ''){
        //     password.classList.add('error');
        //     feedbackElement.classList.add('error');
        //     errors.password = feedback;
        // }else{
        //     password.classList.remove('error');
        //     feedbackElement.classList.remove('error');
        //     delete errors.password;
        // }

        // feedbackElement.innerText = feedback;
        // console.log(errors);
    }

    //Modularizar la funcion para mostrar feedback 
    let handleFeedback = function (element, feedback){
        let feedbackElement = password.nextElementSibling;

        if(feedback != ''){
            element.classList.add('error');
            feedbackElement.classList.add('error');
            errors[element.name] = feedback; //[element. nombre del imput]

        }else{
            element.classList.remove('error');
            feedbackElement.classList.remove('error');
            delete errors.password;
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