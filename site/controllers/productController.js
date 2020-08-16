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
    },
    create: (req,res) => {
        res.render('products/create');
    },
    store: (req,res) =>{
        let newProduct =  {
			name: req.body.name,
			price: parseInt(req.body.price),
			discount: parseInt(req.body.discount),
			category: req.body.category,
			description: req.body.description,
			image: "public/images/products/socks-maggie.jpg"
		}
		let id = productsModel.create(newProduct);
		res.redirect('/products/' + id);
    },
    // edit: (req,res) => {
    //     res.render('products/edit'),

    // cart: (req,res) => res.render('products/cart')
};