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
                    <div class="purchase-details">
                        <img src="${response.data.data.images[0].url}" alt="foto producto">
                        <article class="cart-info">
                            <span class="cancel"><i class="fa fa-times" id="remove" aria-hidden="true"></i></span>
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
                    <div class="price-details">
                        <div>${response.data.data.name}</div>
                        <div>$${response.data.data.price}</div>
                    </div>
                `
                total += response.data.data.price;
                if (response.data.data.discount > 0) {
                    let discount = Math.trunc(response.data.data.price - (response.data.data.price * response.data.data.discount / 100))
                    total -= discount
                    priceDetailsContainer.innerHTML += `
                        <div class="price-details resume-discount">
                            <div>Descuento</div>
                            <div>-$${discount}</div>
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
                <div>${total}</div>
            </div>
            <div class="btn-payment">
                <button class="btn btn-primary">Pagar</button>
            </div>
        `
    }

    function removeItem(item) {
        let items = JSON.parse(localStorage.getItem('items'));
        console.log(items);
        remove = localStorage.removeItem(JSON.stringify(item));
        items = JSON.parse(localStorage.getItem('items'));
        console.log(items);
        console.log('se borra', remove);
    }
});