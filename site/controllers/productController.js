const path = require('path');
const fs = require('fs');
const { Op } = require('sequelize');
const { validationResult } = require('express-validator');
const { product, image, category, variant, variant_value, sku } = require('../database/models');
const parser = require('../tools/parser');

let categoryMatch = categoryName => category.findAll({ where: { name: categoryName }});

module.exports = {
    list: async (req, res) => {
        try {
            let products = await product.findAll({ include: [ image, category ]});
            res.render('products/list', { products });
        } catch (error) {
            console.log(error);
            res.status(500).render('error-500', { error });
        }
    },
    detail: async (req,res) => {
        try {
            let productResult = await product.findByPk(parseInt(req.params.id), 
                { include: [
                    { model: image },
                    { model: category },
                    { model: sku, include: { model: variant_value, as: 'properties' }}
                ]}
            );
            res.render('products/detail', { product: productResult });
        } catch (error) {
            console.log(error);
            res.status(500).render('error-500', { error });
        }
    },
    show: async (req,res) => {
        try {
            // Producto a Mostrar
            let productResult = await product.findByPk(parseInt(req.params.id),
                { include: [
                    { model: image },
                    { model: category, include: 'parent' },
                    { model: variant, include: variant_value }
                ]}
            );
            // Relacionados: otros productos en la misma categoría de tipo 'personaje'
            let matchCategory = productResult.categories.find(category => category.parent && category.parent.name == 'personajes');
            let relatedResults = await product.findAll(
                { include: [
                    { model: image },
                    { model: category, where: { id: matchCategory.id }}
                ]},
                { where: { id: { [Op.not]: productResult.id }}}
            );
            // Calcular descuentos
            productResult.offerPrice = priceWithDiscount(productResult.price, productResult.discount);
            relatedResults.forEach(related => related.offerPrice = priceWithDiscount(related.price, related.discount));
            // Render
            res.render('products/show', { product: productResult, related: relatedResults});
        } catch (error) {
            console.log(error);
            res.status(500).render('error-500', { error });
        }
    },
    create: async (req,res) => {
        try {
            let [categories, variants] = await Promise.all([
                category.findAll(), 
                variant.findAll({ include: variant_value })
            ]);
            categories = categories.filter(cat => cat.name == 'destacados' || cat.parent_id != null);
            res.render('products/create-form', { variants, categories });
        } catch (error) {
            console.log(error);
            res.status(500).render('error-500', { error });
        }
    },
    store: async (req,res) => {
        try {
            let errors = validationResult(req);
            if (errors.isEmpty()) {
                // Prepare data
                let parsedImages = parser.parseImages(req.files);
                let parsedCategories = parser.parseCategories(req.body.categories);
                let parsedVariants = parser.parseVariants(req.body.variants);
                // Create registers on products and 'hasMany' relations
                let newProduct = await product.create({
                    name: req.body.name,
                    price: parseFloat(req.body.price),
                    discount: parseInt(req.body.discount),
                    description: req.body.description,
                    images: parsedImages,
                    skus: parsedVariants.skus
                }, {
                    include: [{ model: image }, { model: sku }]
                });
                // Register tables related 'belongsToMany' with products
                newProduct.addCategories(parsedCategories);
                newProduct.addVariants(parsedVariants.variants);
                // Register tables related 'belongsToMany' with skus
                newProduct.skus.forEach(sku => {
                    sku.addProperties(parsedVariants.skus.find(e => e.sku == sku.sku).properties);
                });
                // Render
                res.redirect('/products/' + newProduct.id);
            } else {
                let [categories, variants] = await Promise.all([
                    category.findAll(), 
                    variant.findAll({ include: variant_value })
                ]);
                res.render('products/create-form', { errors: errors.mapped(), product: req.body, variants, categories });
            }
        } catch (error) {
            console.log(error);
            res.status(500).render('error-500', { error });
        }
    },
    edit: async (req,res) => {
        try {
            let [productResult, categories] = await Promise.all([
                product.findByPk(parseInt(req.params.id), { include: [
                    { model: image },
                    { model: category },
                    { model: sku, include: 'properties' }
                ]}),
                category.findAll()
            ]);
            categories = categories.filter(cat => cat.name == 'destacados' || cat.parent_id != null);
            res.render('products/edit-form', { product: productResult, categories });
        } catch (error) {
            console.log(error);
            res.status(500).render('error-500', { error });
        }
    },
    update: async (req, res) => {
        try {
            let errors = validationResult(req);
            if (errors.isEmpty()){
                // Prepare data
                let id = parseInt(req.params.id);
                let stocks = req.body.stocks;
                let parsedImages = parser.parseImages(req.files);
                let parsedCategories = parser.parseCategories(req.body.categories);
                // Update product
                let productResult = await product.findByPk(id);
                productResult.name = req.body.name;
                productResult.price = parseFloat(req.body.price);
                productResult.discount = parseInt(req.body.discount);
                productResult.description = req.body.description;
                await productResult.save();
                // Delete images
                if(req.body.removeCurrentImages) {
                    let productImages = await productResult.getImages();
                    if (productImages && productImages.length) {
                        productImages.forEach(img => {
                            const imagePath = path.join(__dirname, '../public/images/products/' + img.name);
                            fs.existsSync(imagePath) ? fs.unlinkSync(imagePath) : '';
                        });
                        await productResult.setImages([]);
                    }
                }
                // Add new images
                if(parsedImages.length)
                    parsedImages.forEach(async (img) => await productResult.createImage(img));
                // Update categories
                productResult.setCategories(parsedCategories);
                // Update stocks 
                // FIX asumimos mismo orden
                let i = 0; 
                let skusResult = await productResult.getSkus();
                await Promise.all(skusResult.map(async (skuResult) => await skuResult.update({ stock: stocks[i++] })));
                res.redirect('/products/' + id);
            } else {
                let parsedCategories = parser.parseCategories(req.body.categories);
                let [productResult, categories] = await Promise.all([
                    product.findByPk(parseInt(req.params.id), { include: [
                        { model: image },
                        { model: category },
                        { model: sku, include: 'properties' }
                    ]}),
                    category.findAll()
                ]);
                // Prepare product
                productResult.name = req.body.name;
                productResult.price = req.body.price;
                productResult.discount = req.body.discount;
                productResult.description = req.body.description;
                productResult.categories = categories.filter(cat => parsedCategories.includes(cat.id));
                // Prepare categories
                categories = categories.filter(cat => cat.name == 'destacados' || cat.parent_id != null);
                // Prepare stocks
                res.render('products/edit-form', { errors: errors.mapped(), product: productResult, categories, stocks: req.body.stocks });
            }
        } catch (error) {
            console.log(error);
            res.status(500).render('error-500', { error });
        }
    },
    destroy: async (req, res) => {
        let id = parseInt(req.params.id);
        // remove image
        let images = await image.findAll({ where: { product_id: id }});
        if (images && images.length) {
            await Promise.all(images.forEach(async (img) => {
                const imagePath = path.join(__dirname, '../public/images/products/' + img.name);
                fs.existsSync(imagePath) ? fs.unlink(imagePath) : '';
                await image.destroy(img.id);
            }));
        }
        // remove product
        productsModel.delete(id);
        res.redirect('/products');
    },
    cart: (req,res) => {
        console.log('Not implemented yet');
        let category = categoryMatch('destacados');
        let featured = productsModel.findByMultivalueField('categories', category[0].id);
        populate(featured);
        res.render('products/cart', { featured });
    },
    find: (req, res) => {
        let filter = {};
        let results;
        let category = categoryMatch(req.params.category);
        // Search by category
        if(category && category.length) {
            results = productsModel.findByMultivalueField('categories', category[0].id);
            filter.category = category[0].id;
        }
        // Search by keywords
        let query = req.query.query;
        if(!results){
            results = productsModel.findByFields(['name', 'description'], query);
            if(!results || results.length == 0) {
                results = productsModel.all();
            }
            let size = req.query.size;
            if(size) { 
                results = results.filter(product => product.size == size);
                filter.size = size;
            }
            let type = req.query.type;
            if(type) {
                results = results.filter(product => product.type == type);
                filter.type = type;
            }
        }
        // Populate
        if(results && results.length) {
            populate(results);
        };
        // Categories
        let categories = categoriesModel.all();
        res.render('products/find', { results, query, filter, productsTypes, productsSize, categories });
    }
};