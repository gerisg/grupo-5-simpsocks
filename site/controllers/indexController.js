const path = require('path');
const fs = require('fs');
const jsonTable = require('../database/jsonTable');

const productsModel = jsonTable('products');
const productImagesModel = jsonTable('productImages');

let priceWithDiscount = (price, discount) => discount > 0 ? Math.round(price * ((100 - discount) / 100)) : price;

let populateProduct = product => {
    // Add price with discount
    product.offerPrice = priceWithDiscount(product.price, product.discount);
    // Add main image
    let images = productImagesModel.findByField('prodId', product.id);
    if(images && images.length > 0) { 
        product.image = images[0].name; 
    }
    return product;
};

module.exports = {
    index: (req,res) => {
        let products = productsModel.all();
        products.map(p => populateProduct(p));
        res.render('index', { products } );
    }
}