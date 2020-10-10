window.addEventListener('load', function () {
    let errors = {};

    let editProductForm = document.getElementById('editProductForm');
    let name = editProductForm[0];
    let price = editProductForm[1];
    let discount = editProductForm[2];
    let description = editProductForm[3];
    let stocks = editProductForm.stocks; // filter by name
    let categoriesWrapper = document.getElementById('categories');
    let categories = editProductForm.categories; // filter by name
    let images = editProductForm.images;
    
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

    let validateStock = function(stock) {
        let feedback = '';
        if (validator.isEmpty(stock.value, { ignore_whitespace: true })) {
            feedback = 'El campo no puede estar vacío';
        } else if (!validator.isInt(stock.value, { min: 0 })) {
            feedback = 'Stock inválido';
        }
        handleFeedback(stock, feedback , `${stock.name}-${stock.id}`);
    };

    let validateCategories = function () {
        let someoneChecked = Array.prototype.filter.call(categories, cat => cat.checked);
        handleFeedback(categoriesWrapper, someoneChecked.length == 0 ? 'El campo no puede estar vacío' : '', 'categories');
    };

    let validateImages = function (event){
        let regex = new RegExp('^.*\.(jpg|gif|png|jpeg)$');
        handleFeedback(images, regex.test(event.target.value) ? '' : 'Debe ser jpg, gif, png o jpeg');
    }

    let handleFeedback = function (element, feedback, name=element.name) {
        let feedbackElement = element.nextElementSibling;

        if (feedback != '') {
            feedbackElement.classList.add('error');
            errors[name] = feedback;
        } else {
            feedbackElement.classList.remove('error');
            delete errors[name];
        }

        feedbackElement.innerText = feedback;
    };

    let validateEditProduct = function (e) {

        validateName();
        validateDescription();
        validatePrice();
        validateDiscount();
        validateCategories();
        // TODO validateType();
        // TODO validateSize();

        Array.prototype.forEach.call(stocks, function(stock) {
            validateStock(stock);
        });

        if (Object.keys(errors).length) {
            e.preventDefault();
        }
    };

    // Agregado de listeners 
    name.addEventListener('blur', validateName);
    price.addEventListener('blur', validatePrice);
    discount.addEventListener('blur', validateDiscount);
    description.addEventListener('blur', validateDescription);
    categoriesWrapper.addEventListener('change', validateCategories);
    images.addEventListener('change', validateImages);
    Array.prototype.forEach.call(stocks, function(stock) {
        stock.addEventListener('change', validateStock.bind(this, stock));
    });
    
    editProductForm.addEventListener('submit', validateEditProduct);

})