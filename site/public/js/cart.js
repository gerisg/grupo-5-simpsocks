let itemTemplate = document.getElementById('item-template');

function getItems() {
    let cart = localStorage.getItem('simpsocks_cart');
    return cart ? JSON.parse(cart) : [];
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

function calculateTotalPrice(price, discount, count) {
    return count * (discount > 0 ? Math.round(price * ((100 - discount) / 100)) : price);
}

let items = getItems();

for (let i = 0; i < items.length; i++) {
    const item = items[i];
    let newItemNode = itemTemplate.cloneNode(true);

    // Static data
    newItemNode.setAttribute('id', item.id);
    newItemNode.childNodes[1].src = `/images/products/${item.image}`;
    newItemNode.childNodes[3].childNodes[3].innerHTML = `${item.name}<br /><span class="text-small">${item.detail}</span>`;
    
    // Calculate total
    const price = item.price;
    const discount = item.discount;
    const totalPrice = calculateTotalPrice(price, discount, item.count);
    
    // Item discount
    let discountElement = newItemNode.childNodes[3].childNodes[7].childNodes[1].childNodes[1];
    if(discount > 0) {
        discountElement.innerText = discount + '%';
    }
    // Item offer price
    let originalPriceElement = newItemNode.childNodes[3].childNodes[7].childNodes[1].childNodes[3];
    if(discount > 0) {
        originalPriceElement.innerText = `$ ${price * item.count}`;
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
        priceElement.innerText = `$ ${calculateTotalPrice(price, discount, updatedCount)}`;
        if(discount > 0) {
            originalPriceElement.innerText = `$ ${price * updatedCount}`;
        }
    });

    // Increment count listener
    newItemNode.childNodes[3].childNodes[5].childNodes[3].childNodes[3].addEventListener('click', e => {
        const updatedCount = increment(item.id);
        countElement.value = updatedCount;
        priceElement.innerText = `$ ${calculateTotalPrice(price, discount, updatedCount)}`;
        if(discount > 0) {
            originalPriceElement.innerText = `$ ${price * updatedCount}`;
        }
    });

    // Remove item
    newItemNode.childNodes[3].childNodes[1].addEventListener('click', e => {
        removeItem(item.id);
        newItemNode.parentNode.removeChild(newItemNode);
    });
    
    itemTemplate.nextElementSibling.insertBefore(newItemNode, null);
}