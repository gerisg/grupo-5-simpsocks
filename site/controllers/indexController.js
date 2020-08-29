const path = require('path');
const fs = require('fs');
const jsonTable = require('../database/jsonTable');

const productsModel = jsonTable('products');
const productImagesModel = jsonTable('productImages');
const categoriesModel = jsonTable('categories');

let categoryMatch = categoryName => categoriesModel.findByFields(['name'], categoryName);

let priceWithDiscount = (price, discount) => discount > 0 ? Math.round(price * ((100 - discount) / 100)) : price;

let populateProduct = product => {
    // Add price with discount
    product.offerPrice = priceWithDiscount(product.price, product.discount);
    // Populate images
    product.images = productImagesModel.findAll('prodId', product.id);
    return product;
};

module.exports = {
    index: (req,res) => {
        let category = categoryMatch('destacados');
        let featured = productsModel.findByMultivalueField('categories', category[0].id);
        featured.map(p => populateProduct(p));
        res.render('index', { featured } );
    }
}