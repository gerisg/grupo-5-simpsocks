window.addEventListener('load', () => {
    getProduct();
    async function getProduct() {
        let items = JSON.parse(localStorage.getItem('items'));
        console.log(items);
        
        let  productContainer = document.getElementById('purchase-container');
        let  priceDetailsContainer = document.getElementById('price-details-container');
        priceDetailsContainer.innerHTML = '';
        let total = 0;

        for (let i = 0; i < items.length; i ++) {
            let id = items[i].product_id //obtengo el id de cada producto en el ls

            await axios.get('http://localhost:3000/api/products/' + id)
            .then(function (response) {
                productContainer.innerHTML +=  `
                    <div class="purchase-details" id="purchase-${i+1}">
                        <img src="${response.data.data.images[0].url}" alt="foto producto">
                        <article class="cart-info">
                            <span class="cancel"><i class="fa fa-times" id="remove-${i+1}" aria-hidden="true"></i></span>
                            <p class="text">${response.data.data.name}</p>
                            <div class="cart-quantity">
                                <span class="quantity-label">Cantidad:</span>
                                <select name="products" id="products">
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                </select>
                            </div>
                            <div class="cart-price">
                                <p class="article-price">$${response.data.data.price}</p><i class="far fa-heart"></i>
                            </div>
                        </article>
                    </div> 
                    `

                priceDetailsContainer.innerHTML += `
                    <div class="price-details" id="price-${i+1}">
                        <div>${response.data.data.name}</div>
                        <div id="price-value-${i+1}">$${response.data.data.price}</div>
                    </div>
                `
                total += response.data.data.price;
                if (response.data.data.discount > 0) {
                    let discount = Math.trunc(response.data.data.price - (response.data.data.price * response.data.data.discount / 100))
                    total -= discount
                    priceDetailsContainer.innerHTML += `
                        <div class="price-details resume-discount" id="discount-${i+1}">
                            <div>Descuento</div>
                            <div id="discount-value-${i+1}">-$${discount}</div>
                        </div>
                    `  
                }
            })
            .catch(function () {
                console.log('Error');
            });

        }

        priceDetailsContainer.innerHTML += `
            <div class="divisor"></div>
            <div class="payment price-details">
                <div>Total</div>
                <div id="total-price">${total}</div>
            </div>
            <div class="btn-payment">
                <button class="btn btn-primary">Pagar</button>
            </div>
        `
         //Busca las "x" por id y agrega sus respectivos listeners 
         for (let j = 1; j <= items.length; j++) { // items del ls
            let productId = 'purchase-'.concat(j);
            let deleteBtnId = 'remove-'.concat(j);
            let discountId = 'discount-'.concat(j);
            let discountValueId = 'discount-value-'.concat(j);
            let priceId = 'price-'.concat(j);
            let priceValueId = 'price-value-'.concat(j);
            let deleteBtn = document.getElementById(deleteBtnId);
            console.log(deleteBtnId);
            let productBox = document.getElementById(productId);
            let discount = document.getElementById(discountId);
            let price = document.getElementById(priceId);
            let discountValue = document.getElementById(discountValueId);
            let priceValue = document.getElementById(priceValueId);
            let totalPrice = document.getElementById('total-price');


            deleteBtn.addEventListener('click', () => {
                console.log(discount);
                console.log(price);
                console.log(productBox);
                productBox.remove(); //Elimino la card
                console.log(discount.innerText);
                console.log(price.innerText);
                parseInt(discountValue.innerText.replace('-$', ''));
                parseInt(priceValue.innerText.replace('$', ''));
                parseInt(totalPrice.innerText);
                totalPrice.innerText = parseInt(totalPrice.innerText) - (parseInt(priceValue.innerText.replace('$', '')) - parseInt(discountValue.innerText.replace('-$', '')))
                if(discount){
                    discount.remove();
                }
                price.remove();
                items.splice(j-1, 1); // elimino item del array
                localStorage.clear;
                localStorage.setItem('items', JSON.stringify(items)); //seteo los items restantes
            }); 

        }
    }
});