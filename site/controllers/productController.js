const path = require('path');
const fs = require('fs');
const jsonTable = require('../database/jsonTable');

const categoriesModel = jsonTable('categories');
const productsModel = jsonTable('products');
const productImagesModel = jsonTable('productImages');

let productsTypes = [{ id: 1, name: 'Soquete' }, { id: 2, name: 'Media Larga' }, { id: 3, name: 'Bucanera' }];
let productsSize = [{ id: 1, name: 'Small' }, { id: 2, name: 'Medium' }, { id: 3, name: 'Large' }];

let priceWithDiscount = (price, discount) => discount > 0 ? Math.round(price * ((100 - discount) / 100)) : price;

let populate = products => {
    products.map(p => {
        // Add price with discount
        p.offerPrice = priceWithDiscount(p.price, p.discount);
        // Add main image
        let images = productImagesModel.findByField('prodId', p.id);
        if(images && images.length > 0) { 
            p.image = images[0].name; 
        }
        // Populate categories
        p.categories = p.categories.map(catId => categoriesModel.find(catId));
        
        return p;
    });
}

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
        product.categories = product.categories.map(catId => categoriesModel.find(catId));
        res.render('products/detail', { product, images });
    },
    show: (req,res) =>{
        let featured = productsModel.all(); // TODO Destacados
        let images = productImagesModel.findByField('prodId', req.params.id);
        let product = productsModel.find(req.params.id);
        res.render('products/show', { product, images, featured });
    },
    create: (req,res) => {
        let categories = categoriesModel.all();
        res.render('products/create-form', { categories });
    },
    store: (req,res,next) =>{
        let product = {
			name: req.body.name,
			price: req.body.price,
			discount: req.body.discount,
            description: req.body.description,
            size:req.body.size,
            type:req.body.type
        }
        let id = productsModel.create(product);
        req.files.forEach(file => {
            let productImage = { prodId: id, name: file.filename };
            productImagesModel.create(productImage);
        });
        res.redirect('/products/' + id);
    },
    edit: (req,res) => {
        let product = productsModel.find(req.params.id);
        res.render('products/edit-form', { product, productsTypes, productsSize});
    },
    update: (req, res) => {
        let product = {
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