let itemTemplate = document.getElementById('item-template');
let resumeCart = document.getElementById('resume');
let message = document.getElementById('message');
let buyBtn = document.getElementById('buy-btn');

function getItems() {
    let cart = localStorage.getItem('simpsocks_cart');
    return cart ? JSON.parse(cart) : [];
}

function removeAllItems() {
    localStorage.removeItem('simpsocks_cart');
}

function saveItems(items) {
    let cart = JSON.stringify(items);
    localStorage.setItem('simpsocks_cart', cart);
}

function findItem(id) {
    let items = getItems();
    let index = items.findIndex(item => item.id == id);
    if(index == -1)
        return undefined;
    return { items, index };
}

function removeItem(id) {
    let found = findItem(id);
    if(found) {
        found.items.splice(found.index, 1);
        saveItems(found.items);
        return;
    }
    console.error('Not found item: ' + id);
}

function increment(id, count=1) {
    let found = findItem(id);
    if(found) {
        let item = found.items[found.index];
        item.count += count;
        found.items[found.index] = item;
        saveItems(found.items);
        return item.count;
    }
    console.error('Not found item: ' + id);
}

function decrement(id, count=1) {
    let found = findItem(id);
    if(found) {
        let item = found.items[found.index];
        if(item.count == 1) return 1;
        item.count -= count;
        found.items[found.index] = item;
        saveItems(found.items);
        return item.count;
    }
    console.error('Not found item: ' + id);
}
/* Devuelve el precio total con el descuento aplicado */
function calculateTotalPrice(price, discount, count) {
    return count * (discount > 0 ? Math.round(price * ((100 - discount) / 100)) : price);
}

function fetchResumeCart() {
    let items = getItems();
    if(!items.length) {
        message.style.display = 'block';
        message.nextElementSibling.nextElementSibling.nextElementSibling.style.display = 'none'; // TODO: improve structure design
        return;
    }
    // Initialize
    let total = 0;
    let totalDiscount = 0;
    resumeCart.children[0].innerHTML = '';
    resumeCart.children[1].innerHTML = '';
    // Calculate
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const totalPrice = item.price * item.count;
        total += totalPrice;
        if(item.discount) {
            totalDiscount += (totalPrice - calculateTotalPrice(item.price, item.discount, item.count));
        }
        resumeCart.children[0].innerHTML += `<div class="resume-line"><span>${item.name}:</span><span>$${totalPrice}</span></div>`;
    }
    resumeCart.children[1].innerHTML += `<div class="resume-line"><span>Descuentos:</span><span>-$${totalDiscount}</span></div>`;
    resumeCart.children[3].innerHTML = `<div class="resume-total"><span>Total a Pagar:</span><span>$${total - totalDiscount}</span></div>`;
}

function init() {
    
    // Load resume cart
    fetchResumeCart();

    // Load items cart
    let items = getItems();
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        let newItemNode = itemTemplate.cloneNode(true);

        // Static data
        newItemNode.setAttribute('id', item.id);
        newItemNode.childNodes[1].src = `/images/products/${item.image}`;
        newItemNode.childNodes[3].childNodes[3].innerHTML = `${item.name}<br /><span class="text-small">${item.detail}</span>`;
        
        // Calculate total
        const totalPrice = calculateTotalPrice(item.price, item.discount, item.count);
        
        // Item discount
        let discountElement = newItemNode.childNodes[3].childNodes[7].childNodes[1].childNodes[1];
        if(item.discount > 0) {
            discountElement.innerText = item.discount + '%';
        }
        // Item offer price
        let originalPriceElement = newItemNode.childNodes[3].childNodes[7].childNodes[1].childNodes[3];
        if(item.discount > 0) {
            originalPriceElement.innerText = `$ ${item.price * item.count}`;
        }
        // Item total price
        let priceElement = newItemNode.childNodes[3].childNodes[7].childNodes[1].childNodes[5];
        priceElement.innerText = `$ ${totalPrice}`;

        // Item count
        let countElement = newItemNode.childNodes[3].childNodes[5].childNodes[3].childNodes[2];
        countElement.value = item.count;

        // Decrement count listener
        newItemNode.childNodes[3].childNodes[5].childNodes[3].childNodes[1].addEventListener('click', e => {
            const updatedCount = decrement(item.id);
            countElement.value = updatedCount;
            priceElement.innerText = `$ ${calculateTotalPrice(item.price, item.discount, updatedCount)}`;
            if(item.discount > 0) {
                originalPriceElement.innerText = `$ ${item.price * updatedCount}`;
            }
            fetchResumeCart();
        });

        // Increment count listener
        newItemNode.childNodes[3].childNodes[5].childNodes[3].childNodes[3].addEventListener('click', e => {
            const updatedCount = increment(item.id);
            countElement.value = updatedCount;
            priceElement.innerText = `$ ${calculateTotalPrice(item.price, item.discount, updatedCount)}`;
            if(item.discount > 0) {
                originalPriceElement.innerText = `$ ${item.price * updatedCount}`;
            }
            fetchResumeCart();
        });

        // Remove item
        newItemNode.childNodes[3].childNodes[1].addEventListener('click', e => {
            removeItem(item.id);
            newItemNode.parentNode.removeChild(newItemNode);
            fetchResumeCart();
        });
        
        itemTemplate.nextElementSibling.insertBefore(newItemNode, null);
    }

    // buy button
    buyBtn.addEventListener('click', e => {
        message.innerHTML = `Gracias por probar nuestra demo. Para más info envianos un <a href="/site/contact">mensaje aquí.</a>`;
        message.classList.add("success");
        message.style.display = "block";
        removeAllItems();
    });
}

init();