const path = require('path');
const fs = require('fs');
const jsonTable = require('../database/jsonTable');

const productsModel = jsonTable('products');

module.exports = {
    list: (req, res) => {
        let products = productsModel.all();
        res.render('products/list', { products });   
    },
    detail: (req,res) =>{
        let product = productsModel.find(req.params.id);
        res.render('products/detail', {product});
    }
    // create: (req,res) => res.render('products/create'),
    // edit: (req,res) => res.render('products/edit'),
    // cart: (req,res) => res.render('products/cart')
};