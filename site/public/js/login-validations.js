window.addEventListener('load', function() {

    let errors = {};

    let loginForm = document.getElementById('loginForm');
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    // let recoverForm = document.getElementById('recoverForm');

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

        feedbackElement.innerText = feedback; //Le agregamos texto a feedback

        // email.nextElementSibling.innerText = feedback;
        console.log(errors);
    }

    let validatePassword = function(){
        let feedback = '';
        let feedbackElement = password.nextElementSibling;

        if(validator.isEmpty(password.value)){
            feedback = 'La contraseña es obligatoria';
        }else if(!validator.isLength(password.value, { min: 8 }))  {
            feedback = 'La contraseña debe tener al menos 8 caracteres';
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

    let validateLogin = function(e){
        // if(email){
        //     validateEmail();
        // }
        validateEmail();
        
        // if(password){
        //     validatePassword();
        // }

        validatePassword();

        // console.log(object);
        // console.log(object.keys(errors));
        if(object.keys(errors).length) { //objeto con arrays de propiedades
            e.preventDefault();
        }
    }

    //Agregado de listeners 

    // if(email){
    //     email.addEventListener('blur', validateEmail);
    // }
    email.addEventListener('blur', validateEmail);

    // if(password){
    //     password.addEventListener('blur', validatePassword);
    // }
    password.addEventListener('blur', validatePassword);

    // if(registerForm){   
    //     registerForm.addEventListener('submit', validateLogin);
    // }
    loginForm.addEventListener('submit', validateLogin);
    // if(recoverForm){   
    //     recoverForm.addEventListener('submit', validateLogin);
    // }
})