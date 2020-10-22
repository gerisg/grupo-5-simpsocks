window.addEventListener('load', () => {

    //funciones auxiliares 

    function addToCart(item) {
        let items = JSON.parse(localStorage.getItem('items'));
        if (!items) {
            items = []
        }
        items.push(item);
        localStorage.setItem('items', JSON.stringify(items));
        changeConfirmationText('producto añadido al cashito');
    }

    function createData(variantId1, variantId2, productId) {
        const data = new URLSearchParams();
        data.append('variantId', variantId1); //variant tipo //valor del sig select
        data.append('variantId', variantId2); //variant size //valor del evento del select
        data.append('prodId', productId);
        return data;
    }

    function changeConfirmationText(text) {
        let cartConfirm = document.getElementById('cart-confirmation');
        cartConfirm.innerText = text
    }

    function productId() {
        let productId = document.getElementById('productId');
        return productId.value;
    }

    function disabledBtn() {
        let btn = document.getElementById('addToCart');
        btn.disabled = true; //desahabilita el btn añadir al carrito

        btn.classList.add('btn-disabled'); //Acciona en el catch cuando no hay stock
        btn.classList.remove('btn-secondary');

        let stockText = document.getElementById('stock-text');
        stockText.classList.add('no-stock-text'); //Acciona en el catch cuando no hay stock
        stockText.classList.remove('stock');
        stockText.innerText = 'stock no disponible'
    }

    function enableBtn() {
        let btn = document.getElementById('addToCart');
        btn.disabled = false; //habilita el btn añadir al carrito

        btn.classList.remove('btn-disabled'); //Acciona en el catch cuando no hay stock
        btn.classList.add('btn-secondary');

        let stockText = document.getElementById('stock-text');
        stockText.classList.add('stock');
        stockText.classList.remove('no-stock-text')
        stockText.innerText = 'stock disponible'

    }

    function getSelectSiblingValue(id) {
        let sibling = document.getElementById(id);
        return sibling.value;
    }
    //PENDIENTE

    // function removeItem(item) { //Tiene que estar en el carrito
    //   let items = JSON.parse(localStorage.getItem('items'));
    //   console.log(items);
    //   localStorage.removeItem(JSON.stringify(item));
    //   items = JSON.parse(localStorage.getItem('items'));
    //   console.log(items);
    // }

    function changeStockQuantity(newQuantity) {
        let quantity = document.getElementById('stock-quantity')
        quantity.innerText = newQuantity
        console.log(quantity);
    }

    let selectType = document.getElementById('variant-1');
    let selectSize = document.getElementById('variant-2');
    let form = document.getElementById('addToCartForm');

    //listeners

    selectType.addEventListener('change', function (e) {
        changeConfirmationText('');

        let siblingValue = getSelectSiblingValue('variant-2');

        const data = createData(e.target.value, siblingValue, productId()); //ejecucion de fn createData

        axios.post('http://localhost:3000/api/products/stock', data)
            .then(function (response) {
                changeStockQuantity(response.data.stock)
                enableBtn();
            })
            .catch(function () {
                changeStockQuantity(0)
                disabledBtn();
            });
    })

    selectSize.addEventListener('change', function (e) {
        changeConfirmationText('');

        let siblingValue = getSelectSiblingValue('variant-1');

        const data = createData(siblingValue, e.target.value, productId());

        // const data = new URLSearchParams();
        // data.append('variantId', siblingValue); //variant tipo //valor del sig select
        // data.append('variantId', e.target.value); //variant size //valor del evento del select
        // data.append('prodId', productId());

        console.log(data);
        axios.post('http://localhost:3000/api/products/stock', data)
            .then(function (response) {
                // addToCart(response.data);
                changeStockQuantity(response.data.stock)
                console.log(response.data);
                enableBtn();
            })
            .catch(function () {
                changeStockQuantity(0)
                disabledBtn()
                console.log('No hay stock');
            });
    })

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        changeConfirmationText('');

        const data = createData(e.target[0].value, e.target[1].value, e.target[2].value);
        // const data = new URLSearchParams();
        // data.append('variantId', e.target[0].value);
        // data.append('variantId', e.target[1].value);
        // data.append('prodId', e.target[2].value);

        axios.post('http://localhost:3000/api/products/stock', data)
            .then(function (response) {
                addToCart(response.data);
            })
            .catch(function (error) {
                console.log('hice click en el cart');
            });
    });

});