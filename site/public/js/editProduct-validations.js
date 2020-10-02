window.addEventListener('load', function () {
        let errors = {};

        let editProductForm = document.getElementById('editProductForm');
        let name = document.getElementById('name');
        let price = document.getElementById('price');
        let discount = document.getElementById('discount');
        let description = document.getElementById('description');
        let stock = document.getElementById('stock');
        let categories = document.getElementById('categories');
        let images = document.getElementById('files');
        console.log(images);

        
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

        //REVISAR
        let validateStock = function () {
            console.log('jola');
            let feedback = '';

            if (validator.isEmpty(stock.children[0].value, { ignore_whitespace: true })) {
                feedback = 'El campo no puede estar vacío';
            } else if (!validator.isInt(stock.children[0].value, { min: 0, max: 100 })) {
                feedback = 'Ingrese su stock';
            }
            console.log(stock.children[0].value);

            handleFeedback(stock, feedback);
        };

        let validateCategories = function () {
            let showError = true;

            for (let i = 0; i < categories.children.length; i++) {
                if (categories.children[i].children[1].checked) {
                    showError = false;
                }
            }
            console.log(showError);
            let feedback = showError ? 'El campo no puede estar vacío' : '';
            handleFeedback(categories, feedback);

        };

        let validateImages = function (event){ //captura el path y nombre del archivo
            console.log(event.target.value);
            let feedback = ''
            let regex = new RegExp('^.*\.(jpg|gif|png|jpeg)$');

            let result = regex.test(event.target.value) ? 'ok' : 'NO'; 
            console.log(result);

            if(!result){
                feedback = 'El campo no puede estar vacío';
            }

            handleFeedback(images, feedback);
            // result = regex.test('hola.gif') ? 'ok' :'NO';
            // console.log(result);
            // result = regex.test('hola.jpg') ? 'ok' :'NO';
            // console.log(result);
            // result = regex.test('hola.jpeg') ? 'ok' :'NO';
            // console.log(result);
            // result = regex.test('hola.png') ? 'ok' :'NO';
            // console.log(result);

        }

        //Modularizar la funcion para mostrar feedback 
        let handleFeedback = function (element, feedback) {
            let feedbackElement = element.nextElementSibling;

            if (feedback != '') {
                // element.classList.add('error');
                feedbackElement.classList.add('error');
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
            validateType();
            validateSize();
            validateStock();
            validateCategories();
            validateImages();

            console.log(Object.keys(errors));

            if (Object.keys(errors).length) { //objeto con arrays de propiedades
                console.log(Object.keys(errors).length);
                e.preventDefault();

            }
            console.log(Object.keys(errors).length);

        };

        //Agregado de listeners 
        name.addEventListener('blur', validateName);
        price.addEventListener('blur', validatePrice);
        discount.addEventListener('blur', validateDiscount);
        description.addEventListener('blur', validateDescription);
        stock.addEventListener('blur', validateStock);
        categories.addEventListener('change', validateCategories);
        images.addEventListener('change', validateImages);


        editProductForm.addEventListener('submit', validateEditProduct);

    })