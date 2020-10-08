window.addEventListener('load', function () {
    let errors = {};

    let editProductForm = document.getElementById('editProductForm');
    let name = editProductForm[0];
    let price = editProductForm[1];
    let discount = editProductForm[2];
    let description = editProductForm[3];
    let stocks = editProductForm.getElementsByClassName('stock-in');
    let categories = editProductForm.getElementsByClassName('cat-in');
    let images = editProductForm.getElementsByTagName('input').images;
    
    let validateName = function () {
        let feedback = '';

        if (validator.isEmpty(name.value, { ignore_whitespace: true })) {
            feedback = 'El campo no puede estar vacío';
        } else if (!validator.isLength(name.value, { min: 5 })) {
            feedback = 'El nombre debe tener al menos 5 caracteres';
        }

        handleFeedback(name, feedback);
    };

    let validatePrice = function () {
        let feedback = '';

        if (validator.isEmpty(price.value, { ignore_whitespace: true })) {
            feedback = 'El campo no puede estar vacío';
        } else if (!validator.isFloat(price.value)) {
            feedback = 'El precio debe ser númerico';
        }

        handleFeedback(price, feedback);
    };

    let validateDiscount = function () {
        let feedback = '';

        if (validator.isEmpty(discount.value, { ignore_whitespace: true })) {
            feedback = 'Debe completar el descuento del producto con valores numéricos ';
        } else if (!validator.isInt(discount.value, { min: 0, max: 100 })) {
            feedback = 'El descuento debe ser entre 0 y 100';
        }

        handleFeedback(discount, feedback);
    };

    let validateDescription = function () {
        let feedback = '';

        if (validator.isEmpty(description.value, { ignore_whitespace: true })) {
            feedback = 'El campo no puede estar vacío';
        } else if (!validator.isLength(description.value, { min: 20 })) {
            feedback = 'La descripción debe tener al menos 20 caracteres';
        }

        handleFeedback(description, feedback);
    };

    let validateStock = function(event) {
        let feedback = '';
        if (validator.isEmpty(this.value, { ignore_whitespace: true })) {
            feedback = 'El campo no puede estar vacío';
        } else if (!validator.isInt(this.value, { min: 0, max: 100 })) {
            feedback = 'Ingrese su stock';
        }
        console.log(this.value);
        handleFeedback(this, feedback);
    };

    let validateStocks = function() {
        Array.prototype.forEach.call(stocks, function(stock) {
            let feedback = '';
            if (validator.isEmpty(stock.value, { ignore_whitespace: true })) {
                feedback = 'El campo no puede estar vacío';
            } else if (!validator.isInt(stock.value, { min: 0, max: 100 })) {
                feedback = 'Ingrese su stock';
            }
            console.log(stock.value);
            handleFeedback(stock, feedback);
        });
    };

    let validateCategories = function () {
        let someoneChecked = Array.prototype.filter.call(categories, cat => cat.checked);
        handleFeedback(categories[0].parentElement.parentElement, someoneChecked.length == 0 ? 'El campo no puede estar vacío' : '');
    };

    let validateImages = function (event){ //captura el path y nombre del archivo
        let regex = new RegExp('^.*\.(jpg|gif|png|jpeg)$');
        handleFeedback(images, regex.test(event.target.value) ? '' : 'Debe ser jpg, gif, png o jpeg');
    }

    //Modularizar la funcion para mostrar feedback 
    let handleFeedback = function (element, feedback) {
        let feedbackElement = element.nextElementSibling;

        if (feedback != '') {
            // element.classList.add('error');
            feedbackElement.classList.add('error');
            console.log(element);
            errors[element.name] = feedback; //[element. nombre del imput]

        } else {
            // element.classList.remove('error');
            feedbackElement.classList.remove('error');
            delete errors[element.name];
        }

        feedbackElement.innerText = feedback;
    };


    let validateEditProduct = function (e) {

        validateName();
        validateDescription();
        validatePrice();
        validateDiscount();
        // TODO validateType();
        // TODO validateSize();
        validateStocks();
        validateCategories();
        validateImages();

        console.log(Object.keys(errors));

        if (Object.keys(errors).length) { //objeto con arrays de propiedades
            e.preventDefault();
        }
    };

    //Agregado de listeners 
    name.addEventListener('blur', validateName);
    price.addEventListener('blur', validatePrice);
    discount.addEventListener('blur', validateDiscount);
    description.addEventListener('blur', validateDescription);
    Array.prototype.forEach.call(stocks, function(stock) {
        stock.addEventListener('blur', validateStock, false)
    });
    categories[0].parentElement.parentElement.addEventListener('change', validateCategories);
    images.addEventListener('change', validateImages);
    
    editProductForm.addEventListener('submit', validateEditProduct);

})