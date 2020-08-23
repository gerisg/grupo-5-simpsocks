const path = require('path');
const fs = require('fs');
const jsonTable = require('../database/jsonTable');

const productsModel = jsonTable('products');
const productImagesModel = jsonTable('productImages');

let productsTypes = [
    { id: 1, name: 'Soquete' },
    { id: 2, name: 'Media Larga' },
    { id: 3, name: 'Bucanera' },
];

let productsSize = [
    { id: 1, name: 'Small' },
    { id: 2, name: 'Medium' },
    { id: 3, name: 'Large' },
];

let priceWithDiscount = (price, discount) => discount > 0 ? Math.round(price * ((100 - discount) / 100)) : price;

module.exports = {
    find: (req, res) => {
        let products = productsModel.all();
        products.map(p => {
            p.offerPrice = priceWithDiscount(p.price, p.discount);
            return p;
        });
        res.render('products/find', { products });   
    },
    list: (req, res) => {
        let products = productsModel.all();
<<<<<<< HEAD
        res.render('products/list', { products, productsTypes , productsSize});   
=======
        products.map(p => p.offerPrice = priceWithDiscount(p.price, p.discount));
        res.render('products/list', { products });   
>>>>>>> Calculate offer price and show it (only index and find, to check other views)
    },
    detail: (req,res) =>{
        let images = productImagesModel.findByField('prodId', req.params.id);
        let product = productsModel.find(req.params.id);
        res.render('products/detail', { product, images });
    },
    show: (req,res) =>{
        let featured = productsModel.all(); // TODO Destacados
        let images = productImagesModel.findByField('prodId', req.params.id);
        let product = productsModel.find(req.params.id);
        res.render('products/show', { product, images, featured });
    },
    create: (req,res) => {
        res.render('products/create-form');
    },
    store: (req,res,next) =>{
        let images = [];
        req.files.forEach(file => {
            images.push(file.filename);
        });
        let product =  {
			name: req.body.name,
			price: req.body.price,
			discount: req.body.discount,
            description: req.body.description,
            size:req.body.size,
            type:req.body.type,
            image: images
            // category: req.body.categoria, //Averiguar como van a funcionar las categorias en el create de products
            //TODO revisar las categorias de la vista create y agregar las que faltan
        }
        let id = productsModel.create(product);
        console.log(product.image);
		res.redirect('/products/' + id);
    },
    edit: (req,res) => {
        
        let product = productsModel.find(req.params.id);
        res.render('products/edit-form', { product, productsTypes , productsSize});
    },
        
    update: (req, res) => {
        let product =  {
            id: parseInt(req.params.id),
            name: req.body.name,
            price: parseFloat(req.body.price),
            size: parseInt(req.body.size),
            type: parseInt(req.body.type),
            image: req.file ? req.file.filename : req.body.currentImage
        };

        let id = productsModel.update(product);
        res.redirect('/products');
    },
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