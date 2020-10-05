window.addEventListener('load', function(){
    let errors = {};

    let profileForm = document.getElementById('profileForm');
    let firstName = profileForm[0]
    let lastName = profileForm[1]
    let phone = profileForm[2]
    let email = profileForm[3]
    // let password = document.getElementById('password');
    let password = profileForm[12];
    let images = profileForm[14];


    let validateFisrtName = function() {
        let feedback = '';

        if(validator.isEmpty(firstName.value, {ignore_whitespace:true })){
            feedback = 'El nombre es obligatorio';
        } else if (!validator.isLength(firstName.value, { min: 3 })) {
            feedback = 'El nombre debe tener al menos 3 caracteres';    
        }

        handleFeedback(firstName, feedback);

    };

    let validateLastName = function() {
        let feedback = '';

        if(validator.isEmpty(lastName.value, {ignore_whitespace:true })) {
            feedback = 'El apellido es obligatorio';
        } else if(!validator.isLength(lastName.value, { min: 3 }))  {
            feedback = 'El apellido debe tener al menos 3 caracteres';
        }

        handleFeedback(lastName, feedback);

    };

    let validatePhone = function() {
        let feedback = '';

        if(validator.isEmpty(phone.value, {ignore_whitespace:true })){
            feedback = 'Debe ingresar un número de celular'
        }else if(!validator.isInt(phone.value)){
            feedback = 'Ingrese su número sin 0 y sin 15'
        }

        handleFeedback(phone, feedback);
    };

    let validateEmail = function() {
        let feedback = '';
   
        if(validator.isEmpty(email.value, {ignore_whitespace:true })) {
            feedback = 'El correo electrónico es obligatorio';
        } else if(!validator.isEmail(email.value)) {
            feedback = 'El email debe incluir @';
        }

        handleFeedback(email, feedback);
    };

    let validateImages = function (event){ //captura el path y nombre del archivo
        let regex = new RegExp('^.*\.(jpg|gif|png|jpeg)$');
        handleFeedback(images, regex.test(event.target.value) ? '' : 'Debe ser jpg, gif, png o jpeg');
    }

    let validatePassword = function(){
        let feedback = '';

        if(validator.isEmpty(password.value)){
            feedback = 'Ingrese su contraseña actual para guardar los cambios en su perfil';
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

    let validateProfileForm = function(e) {
        validateFisrtName();
        validateLastName();
        validatePhone();
        validateEmail();
        validateImages();
        validatePassword();

        if(object.keys(errors).length) { //objeto con arrays de propiedades
            e.preventDefault();
        }
    }

    //Agregando listeners

    firstName.addEventListener('blur', validateFisrtName);
    lastName.addEventListener('blur', validateLastName);
    phone.addEventListener('blur', validatePhone);
    email.addEventListener('blur', validateEmail);
    password.addEventListener('blur', validatePassword);
    images.addEventListener('change', validateImages);
    profileForm.addEventListener('submit', validateProfileForm);


    

})