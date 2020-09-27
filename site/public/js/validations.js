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

        if(feedback != "") {
            email.classList.add('error');
            feedbackElement.classList.add('error');
            errors.email = feedback;
        } else {
            email.classList.remove('error');
            feedbackElement.classList.remove('error');
            delete errors.mail;
        }

        email.nextElementSibling.innerText = feedback;
        console.log(errors);
    }
    
    //Agregado de listeners 

    email.addEventListener('blur', validateEmail);

    registerForm.addEventListener('submit', function(e){
        validateEmail()

        if(object.keys(errors).length) {
            e.preventDefault();
        }
    })

    





})
