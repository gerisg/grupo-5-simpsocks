const path = require('path');
const fs = require('fs');
const jsonTable = require('../database/jsonTable');

const productsModel = jsonTable('products');
const categoriesModel = jsonTable('categories');

let priceWithDiscount = (price, discount) => discount > 0 ? Math.round(price * ((100 - discount) / 100)) : price;

module.exports = {
    index: (req,res) => {
        let products = productsModel.all();
        products.map(p => p.offerPrice = priceWithDiscount(p.price, p.discount));
        res.render('index', { products } );
    }
}