window.addEventListener('load', function() {

    let errors = {};

    let registerForm = document.getElementById('registerForm');
    let email = document.getElementById('email');
    let password = document.getElementById('password');

    let validateEmail = function() {
        let feedback = '';
        let feedbackElement = email.nextElementSibling;

        if(validator.isEmpty(email.value, {ignore_whitespace:true })) {
            feedback = 'El campo no puede estar vacío';
        } else if(!validator.isEmail(email.value)) {
            feedback = 'El email debe incluir @';
        }

        if(feedback != '') {
            email.classList.add('error');
            feedbackElement.classList.add('error');
            errors.email = feedback;
        } else {
            email.classList.remove('error');
            feedbackElement.classList.remove('error');
            delete errors.mail;
        }

        feedbackElement.innerText = feedback;
        // email.nextElementSibling.innerText = feedback;
        console.log(errors);
    }

    let validatePassword = function(){
        let feedback = '';
        let feedbackElement = password.nextElementSibling;

        if(validator.isEmpty(password.value)){
            feedback = 'La contraseña es obligatoria';
        }

        if(feedback != ''){
            password.classList.add('error');
            feedbackElement.classList.add('error');
            errors.password = feedback;
        }else{
            password.classList.remove('error');
            feedbackElement.classList.remove('error');
            delete errors.password;
        }

        feedbackElement.innerText = feedback;
        console.log(errors);
    

    }

    let validateRegister = function(e){
        validateEmail();
        validatePassword();

        if(object.keys(errors).length) {
            e.preventDefault();
        }
    }

    //Agregado de listeners 

    email.addEventListener('blur', validateEmail);
    password.addEventListener('blur', validatePassword);
    registerForm.addEventListener('submit', validateRegister);

    





})
