const path = require('path');
const fs = require('fs');
const jsonTable = require('../database/jsonTable');

const categoriesModel = jsonTable('categories');
const productsModel = jsonTable('products');
const productImagesModel = jsonTable('productImages');

let productsTypes = [{ id: 1, name: 'Soquete' }, { id: 2, name: 'Media Larga' }, { id: 3, name: 'Bucanera' }];
let productsSize = [{ id: 1, name: 'Small' }, { id: 2, name: 'Medium' }, { id: 3, name: 'Large' }];

let priceWithDiscount = (price, discount) => discount > 0 ? Math.round(price * ((100 - discount) / 100)) : price;

let populate = products => products.map(p => populateProduct(p));

let populateProduct = product => {
    // Add price with discount
    product.offerPrice = priceWithDiscount(product.price, product.discount);
    // Add main image
    let images = productImagesModel.findByField('prodId', product.id);
    if(images && images.length > 0) { 
        product.image = images[0].name; 
    }
    // Populate categories
    product.categories = product.categories.map(catId => categoriesModel.find(catId));

    return product;
};

module.exports = {
    find: (req, res) => {
        let products = productsModel.all();
        populate(products);
        res.render('products/find', { products });
    },
    list: (req, res) => {
        let products = productsModel.all();
        populate(products);
        res.render('products/list', { products, productsTypes, productsSize });
    },
    detail: (req,res) =>{
        let images = productImagesModel.findByField('prodId', req.params.id);
        let product = productsModel.find(req.params.id);
        populateProduct(product);
        res.render('products/detail', { product, images });
    },
    show: (req,res) =>{
        let featured = productsModel.all(); // TODO Destacados
        let images = productImagesModel.findByField('prodId', req.params.id);
        console.log(images);
        let product = productsModel.find(req.params.id);
        populateProduct(product);
        res.render('products/show', { product, images, featured });
    },
    create: (req,res) => {
        let categories = categoriesModel.all();
        res.render('products/create-form', { categories });
    },
    store: (req,res,next) =>{
        console.log(req.body.size);
        console.log(req.body.type);
        let product = {
			name: req.body.name,
			price: parseFloat(req.body.price),
			discount: parseFloat(req.body.discount),
            description: req.body.description,
            size: parseInt(req.body.size),
            type: parseInt(req.body.type),
            categories: req.body.categories.map(c => parseInt(c))
        }
        let id = productsModel.create(product);
        req.files.forEach(file => {
            let productImage = { prodId: id, name: file.filename };
            productImagesModel.create(productImage);
        });
        res.redirect('/products/' + id);
    },
    edit: (req,res) => {
        let categories = categoriesModel.all();
        let product = productsModel.find(req.params.id);
        res.render('products/edit-form', { product, productsTypes, productsSize, categories });
    },
    update: (req, res) => {
        let product = {
            id: parseInt(req.params.id),
            name: req.body.name,
            price: parseFloat(req.body.price),
            discount: req.body.discount,
            description: req.body.description,
            size: parseInt(req.body.size),
            type: parseInt(req.body.type),
            categories: req.body.categories.map(c => parseInt(c))
        };
        let id = productsModel.update(product);
        // TODO update images
        res.redirect('/products');
    },
    destroy : (req, res) => {
        let id = req.params.id;
        // remove image
        let images = productImagesModel.findByField('prodId', id);
        if(images && images.length > 0) { 
            images.forEach(image => {
                const imagePath = path.join(__dirname, '../public/images/products/' + image.name);
                fs.existsSync(imagePath) ? fs.unlinkSync(imagePath) : '';
                productImagesModel.delete(image.id);
            });
        }
        // remove product
        productsModel.delete(id);
        res.redirect('/products');
    },
    cart: (req,res) => {
        console.log('Not implemented yet');
        res.render('products/cart', { products: productsModel.all() });
    },
};