window.addEventListener('load', function(){
    let errors = {};

    let createProductForm = document.getElementById('createProductForm');
    let name = document.getElementById('name');
    let description = document.getElementById('description');
    let price = document.getElementById('price');
    let discount = document.getElementById('discount');
    let checkbox = document.getElementById('checkbox');
    // let size = document.getElementById('checkbox');
    let categories = document.getElementById('categories');
   

    let validateName = function (){
        let feedback = '';
     
        if(validator.isEmpty(name.value, {ignore_whitespace:true })) {
            feedback = 'El campo no puede estar vacío';
        }else if(!validator.isLength(name.value, { min: 5 }))  {
            feedback = 'El nombre debe tener al menos 5 caracteres';
        }

        handleFeedback(name, feedback)
    }

    let validateDescription = function (){
        let feedback = '';
     
        if(validator.isEmpty(description.value, {ignore_whitespace:true })) {
            feedback = 'El campo no puede estar vacío';
        }else if(!validator.isLength(description.value, { min: 20 }))  {
            feedback = 'La descripción debe tener al menos 20 caracteres';
        }

        handleFeedback(description, feedback)
    }

    let validatePrice = function (){
        let feedback = '';
     
        if(validator.isEmpty(price.value, {ignore_whitespace:true })) {
            feedback = 'El campo no puede estar vacío';
        }else if(!validator.isFloat(price.value))  {
            feedback = 'El precio debe ser númerico';
        }

        handleFeedback(price, feedback)
    }

    let validateDiscount = function (){
        let feedback = '';
     
        if(validator.isEmpty(discount.value, {ignore_whitespace:true })) {
            feedback = 'Debe completar el descuento del producto con valores numéricos ';
        }else if(!validator.isInt(discount.value, { min: 0, max: 100 }))  {
            feedback = 'El descuento debe ser entre 0 y 100';
        }

        handleFeedback(discount, feedback)
    }

    let validateCheckbox = function() {
        let feedback = 'El campo no puede estar vacío';
        console.log(checkbox);

        for(let i = 0; i < checkbox.children.length; i++){
            if(checkbox.children[i].children[0].checked){
                feedback = ''
            }
        }
        handleFeedback(checkbox, feedback);
    }

    let validateCategories = function() {
        let feedback = 'El campo no puede estar vacío';
        console.log(checkbox);

        for(let i = 0; i < categories.children.length; i++){
            if(categories.children[i].children[0].checked){
                feedback = ''
            }
        }
        handleFeedback(categories, feedback);

    }
    //Modularizar la funcion para mostrar feedback 
    let handleFeedback = function (element, feedback){
        let feedbackElement = element.nextElementSibling;

        if(feedback != ''){
            element.classList.add('error');
            feedbackElement.classList.add('error');
            errors[element.name] = feedback; //[element. nombre del imput]

        }else{
            element.classList.remove('error');
            feedbackElement.classList.remove('error');
            delete errors[element.name];
        }

        feedbackElement.innerText = feedback;
        console.log(errors);
    };


    let validateCreateProduct = function(e){
        validateName();
        validateDescription();
        validatePrice();
        validateDiscount();
        validateCheckbox();
        validateCategories();
       
        if(object.keys(errors).length) { //objeto con arrays de propiedades
            e.preventDefault();
        }
    };

    //Agregado de listeners 

    name.addEventListener('blur', validateName);
    description.addEventListener('blur', validateDescription);
    price.addEventListener('blur', validatePrice);
    discount.addEventListener('blur', validateDiscount);
    checkbox.addEventListener('change', validateCheckbox);
    categories.addEventListener('change', validateCategories);

    
    createProductForm.addEventListener('submit', validateCreateProduct);
})