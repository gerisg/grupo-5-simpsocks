let addToCartForm = document.getElementById('addToCartForm');
let addToCartBtn = document.getElementById('addToCartBtn');
let variantElements = document.getElementsByClassName('variants');
let itemPriceElement = document.getElementById('itemPrice');
let offerPriceElement = document.getElementById('offerPrice');
let messageElement = document.getElementById('message');
let prodIdElement = document.getElementById('productId');

let variants = [];

Array.prototype.forEach.call(variantElements, variant => {
    variant.addEventListener('change', async function(e){
        const selectedVariant = { id: e.target.id, value: e.target.value }
        let index = variants.findIndex(v => v.id == e.target.id);
        if(index != -1) {
            variants[index] = selectedVariant;
        } else {
            variants.push(selectedVariant);
        }
        await fetch();
    });
});

addToCartForm.addEventListener('submit', async function(e){
    e.preventDefault();
    const sku = await fetch();
    sku.image = e.target[3].value;
    sku.price = e.target[4].value;
    sku.discount = e.target[5].value;
    sku.name = e.target[6].value;
    saveItem(sku);

    // Saved: show success message
    messageElement.innerText = 'Agregaste el producto a tu carrito';
    messageElement.classList.add('success');
    messageElement.style.display = 'block';
    setTimeout(() => messageElement.style.display = 'none', 5000);
});

async function fetch() {
    try {
        // prepare params
        const params = new URLSearchParams();
        params.append('prodId', prodIdElement.value.trim());
        for (let i = 0; i < variants.length; i++) {
            params.append('variantId', variants[i].value);
        }
        // get SKU from API
        const sku = await getSKU(params);
        
        // OK: hide error message and enable button
        messageElement.style.display = 'none';
        messageElement.innerText = '';
        addToCartBtn.disabled = false;
        
        // Return fetched stock unit
        return sku;

    } catch (error) {
        // Error:  show error message and disable button
        messageElement.classList.remove('success');
        messageElement.innerText = 'No hay Stock';
        messageElement.style.display = 'block';
        addToCartBtn.disabled = true;
    }
}

async function getSKU(params) {
    try {
        const response = await axios.post('/api/products/stock', params);
        return response.data;
    } catch (error) {
        throw Error(error.message);
    }
}

function saveItem(item) {
    // load cart
    let cart = localStorage.getItem('simpsocks_cart');
    cart = cart ? JSON.parse(cart) : [];
    // update count
    let index = cart.findIndex(i => i.id == item.id);
    if(index != -1) {
        let current = cart[index];
        current.count = current.count + 1;
        cart[index] = current;
    } else {
        item.count = 1;
        cart.push(item);
    }
    // save cart
    localStorage.setItem('simpsocks_cart', JSON.stringify(cart));
}