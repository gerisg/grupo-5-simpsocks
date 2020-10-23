window.addEventListener('load', () => {
    function getProduct() {
        let items = JSON.parse(localStorage.getItem('items'));
        console.log(items);
        
        let  productContainer = document.getElementById('purchase-container');
        
        for (let i = 0; i < items.length; i ++) {
            let id = items[i].product_id //obtengo el id de cada producto en el ls

            axios.get('http://localhost:3000/api/products/' + id)
                .then(function (response) {
                    console.log(response.data.data.name);
                    productContainer.innerHTML +=  `<div class="purchase-details">
                            <img src="${response.data.data.images[0].url}" alt="foto producto">
                            <article class="cart-info">
                                <span class="cancel" id="remove"><i class="fa fa-times" aria-hidden="true"></i></span>
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
                        </div> `
                })
                .catch(function () {
                    console.log('Error');
                });
        }

        console.log(productContainer.innerHTML);

    }
    
    getProduct();

    function renderAddedProduct(product) {
        // return `  
        //     <div class="purchase-details">
        //         <img src="/images/products/medias-homero-dona-2.png" alt="foto producto">
        //         <article class="cart-info">
        //             <span class="cancel" id="remove"><i class="fa fa-times" aria-hidden="true"></i></span>
        //             <p class="text">${product.name}</p>
        //             <div class="cart-quantity">
        //                 <span class="quantity-label">Cantidad:</span>
        //                 <select name="products" id="products">
        //                     <option value="1">1</option>
        //                     <option value="2">2</option>
        //                     <option value="3">3</option>
        //                 </select>
        //             </div>
        //             <div class="cart-price">
        //                 <p class="article-price">$320</p><i class="far fa-heart"></i>
        //             </div>
        //         </article>
        //     </div> 
        //     `
    } 

    renderAddedProduct();
});