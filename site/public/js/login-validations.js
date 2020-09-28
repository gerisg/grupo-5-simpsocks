window.addEventListener('load', function() {

    let errors = {};

    let loginForm = document.getElementById('loginForm');
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    // let recoverForm = document.getElementById('recoverForm');

    let validateEmail = function() {
        let feedback = '';
        // let feedbackElement = email.nextElementSibling;

        if(validator.isEmpty(email.value, {ignore_whitespace:true })) {
            feedback = 'El campo no puede estar vacío';
        } else if(!validator.isEmail(email.value)) {
            feedback = 'El email debe incluir @';
        }

        handleFeedback(email, feedback) //recibe el elemento(nombre del input)

        // if(feedback != '') {
        //     email.classList.add('error');
        //     feedbackElement.classList.add('error');
        //     errors.email = feedback;
        // } else {
        //     email.classList.remove('error');
        //     feedbackElement.classList.remove('error');
        //     delete errors.mail;
        // }

        // feedbackElement.innerText = feedback; //Le agregamos texto a feedback

        // // email.nextElementSibling.innerText = feedback;
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

    };
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

    let validateLogin = function(e){
        validateEmail();
        validatePassword();

        if(object.keys(errors).length) { //objeto con arrays de propiedades
            e.preventDefault();
        }
    }

    //Agregado de listeners 

    email.addEventListener('blur', validateEmail);
    password.addEventListener('blur', validatePassword);
    loginForm.addEventListener('submit', validateLogin);
})
