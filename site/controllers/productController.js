const path = require('path');
const fs = require('fs');
const { Op } = require('sequelize');
const { validationResult } = require('express-validator');
const { product, image, category, variant, variant_value, sku } = require('../database/models');
const parser = require('../tools/parser');

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
            // Calcular descuentos
            productResult.offerPrice = productResult.discount > 0 ? Math.round(productResult.price * ((100 - productResult.discount) / 100)) : productResult.price;
            // Relacionados: otros productos en la misma categoría de tipo 'personaje'
            let relatedResults = [];
            let matchCategory = productResult.categories.find(category => category.parent && category.parent.name == 'personajes');
            if(matchCategory) {
                relatedResults = await product.findAll({ where: {
                    id: { [Op.not]: productResult.id }},
                    include: [
                        { model: image },
                        { model: category, where: { id: matchCategory.id }}
                    ]
                });
                relatedResults.forEach(related => related.offerPrice = related.discount > 0 ? Math.round(related.price * ((100 - related.discount) / 100)) : related.price);
            }
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
                category.findAll({ where: {
                    [Op.or]: [
                        { name: 'destacados' }, 
                        { parent_id: { [Op.ne]: null }}
                    ]
                }}), 
                variant.findAll({ include: variant_value })
            ]);
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
                    skus: parsedVariants.skus,
                    created_at: new Date()
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
                // Save images
                if(req.files) {
                    req.files.forEach(file => {
                        fs.rename(file.path, file.path.replace('/tmp', ''), (err) => {
                            if (err) throw err;
                        });
                    });
                }
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
                product.findByPk(parseInt(req.params.id), {
                    include: [{
                            model: image
                        },
                        {
                            model: category
                        },
                        {
                            model: sku,
                            include: 'properties'
                        }
                    ]
                }),
                category.findAll()
            ]);
            categories = categories.filter(cat => cat.name == 'destacados' || cat.parent_id != null);
            res.render('products/edit-form', {
                product: productResult,
                categories
            });
        } catch (error) {
            console.log(error);
            res.status(500).render('error-500', {
                error
            });
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
                if (req.body.removeCurrentImages) {
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
                if (parsedImages.length)
                    parsedImages.forEach(async (img) => await productResult.createImage(img));
                // Save images
                if(req.files) {
                    req.files.forEach(file => {
                        fs.rename(file.path, file.path.replace('/tmp', ''), (err) => {
                            if (err) throw err;
                        });
                    });
                }
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
        let productResult = await product.findByPk(parseInt(req.params.id));
        let productImages = await productResult.getImages();
        await productResult.destroy();
        // remove local images
        if (productImages && productImages.length) {
            productImages.forEach(img => {
                const imagePath = path.join(__dirname, '../public/images/products/' + img.name);
                fs.existsSync(imagePath) ? fs.unlinkSync(imagePath) : '';
            });
        }
        res.redirect('/products');
    },
    cart: async (req,res) => {
        console.log('Not implemented yet');
        let featuredCategory = await category.findOne({
            where: {
                name: 'destacados'
            }
        });
        let featuredProducts = await product.findAll({
            include: [{
                    model: image
                },
                {
                    model: category,
                    where: {
                        id: featuredCategory.id
                    }
                }
            ]
        });
        featuredProducts.forEach(prod => prod.offerPrice = prod.discount > 0 ? Math.round(prod.price * ((100 - prod.discount) / 100)) : prod.price);
        res.render('products/cart', {
            featured: featuredProducts
        });
    },
    find: async (req, res) => {
        let filter = {};
        let productResults = [];
        let categorySearchTerms = req.params.category;
        let querySearchTerms = req.query.query;
        try {
            // Search by category
            if (categorySearchTerms) {
                let categoryMatch = await category.findOne({ where: { name: categorySearchTerms }});
                if (categoryMatch) {
                    productResults = await product.findAll(
                        { include: [
                            { model: image },
                            { model: category, where: { id: categoryMatch.id }}
                        ]}
                    );
                    filter.category = categoryMatch.id;
                }
            }
            // Search by keywords
            if (querySearchTerms && !productResults) {
                productResults = await product.findAll(
                    { where: 
                        { [Op.or]: [
                            { name: { [Op.like]: `%${querySearchTerms}%` }},
                            { description: { [Op.like]: `%${querySearchTerms}%` }}
                        ]},
                        include: [ image, category ]
                    }
                );
            }
            if (!productResults) {
                productResults = await product.findAll({ include: [ image, category ]});
            }
            // Add offer price
            productResults.forEach(prod => prod.offerPrice = prod.discount > 0 ? Math.round(prod.price * ((100 - prod.discount) / 100)) : prod.price);
            // Get categories and variants
            let [categories, variants] = await Promise.all([
                category.findAll({ where: {
                    [Op.or]: [
                        { name: 'destacados' }, 
                        { parent_id: { [Op.ne]: null }}
                    ]
                }}), 
                variant.findAll({ include: variant_value })
            ]);
            res.render('products/find', { results: productResults, query: querySearchTerms, filter, categories, variants });
        } catch (error) {
            res.render('products/find', { results: productResults, query: querySearchTerms, filter });
        }
    }
};