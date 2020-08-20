const path = require('path');
const fs = require('fs');
const jsonTable = require('../database/jsonTable');

const productsModel = jsonTable('products');

let addedToCart = []; //momentaneo hasta consultar donde debe ir 

module.exports = {
    find: (req, res) => {
        let products = productsModel.all();
        res.render('products/find', { products });   
    },
    list: (req, res) => {
        let products = productsModel.all();
        res.render('products/list', { products });   
    },
    detail: (req,res) =>{
        res.send("TODO Mostrando un producto (admin): " + req.params.id);
    },
    detail2: (req,res) =>{
        let featured = productsModel.all(); // TODO Destacados
        let product = productsModel.find(req.params.id);
        res.render('products/detail', {product, featured});
    },
    create: (req,res) => {
        res.render('products/create-form');
    },
    store: (req,res) =>{
        let product =  {
			name: req.body.name,
			price: req.body.price,
			discount: req.body.discount,
            description: req.body.description,
            size:req.body.talle,
            type:req.body.type,
            image: req.file ? req.file.filename : null,
            category: req.body.categoria, //Averiguar como van a funcionar las categorias en el create de products
            //TODO revisar las categorias de la vista create y agregar las que faltan
        }
        console.log(product);
        let id = productsModel.create(product);
        console.log(product.image);
		res.redirect('/products/' + id);
    },
     edit: (req,res) => {
        let product = productsModel.find(req.params.id)
        res.render('products/edit-form', { product })},
        
    update: (req, res) => {
        let product =  {
            id: parseInt(req.params.id),
            name: req.body.name,
            price: req.body.price,
            size: req.body.size,
            type: req.body.type,
            image: req.file ? req.file.filename : req.body.currentImage
            }

        let id = productsModel.update(product);
        res.redirect('/products')},

    destroy : (req, res) => {
        let id = req.params.id;
        // remove image
        
        let image = productsModel.find(id).image;
        const imagePath = path.join(__dirname, '../public/images/products/' + image);
        fs.existsSync(imagePath) ? fs.unlinkSync(imagePath) : '';
        
        // remove product
        productsModel.delete(id);
        res.redirect('/products');
        },

    cart: (req,res) => {
        console.log('Not implemented yet');
        res.render('products/cart', { products: productsModel.all() });
    },
};