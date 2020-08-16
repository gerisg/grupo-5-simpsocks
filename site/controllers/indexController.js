const path = require('path');
const fs = require('fs');
const jsonTable = require('../database/jsonTable');

const productsModel = jsonTable('products');
module.exports = {
    index: (req,res) => {
        let products = productsModel.all();
        res.render('index', {products} );
    }
}