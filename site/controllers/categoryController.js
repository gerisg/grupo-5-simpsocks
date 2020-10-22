const path = require('path');
const fs = require('fs');
const { validationResult } = require('express-validator');
const { category } = require('../database/models'); 

module.exports = {
    list: async (req, res) => {
        try {
            let categoriesResult = await category.findAll(
                { include: [{ model: category, as: 'parent' }]}
            );
            res.render('categories/list', { categories: categoriesResult });
        } catch (error) {
            console.log(error);
            res.status(500).render('error-500', { error });
        }
    },
    detail: async (req, res) => {
        try {
            let categoryResult = await category.findByPk(parseInt(req.params.id),
                { include: [{ model: category, as: 'parent' }]}
            );
            res.render('categories/detail', { category: categoryResult });
        } catch (error) {
            console.log(error);
            res.status(500).render('error-500', { error });
        }
    },
    create: async (req, res) => {
        try {
            let categoriesResult = await category.findAll();
            let parents = categoriesResult.filter(category => category.parent_id == null);
            res.render('categories/create-form', { parents });
        } catch (error) {
            console.log(error);
            res.status(500).render('error-500', { error });
        }
    },
    store: async (req, res) => {
        try {
            let errors = validationResult(req);
            if (errors.isEmpty()){
                let top = req.body.top ? true : false;
                let parent_id = req.body.parent ? req.body.parent : null;
                let newCategoryData =  { name: req.body.name, parent_id, top };
                let newCategory = await category.create(newCategoryData);
                // Save image
                if(req.file) {
                    let imageFilename =  newCategory.id + path.extname(req.file.originalname);
                    let oldPath = req.file.path;
                    let newPath = req.file.destination.replace('tmp', imageFilename);
                    fs.rename(oldPath, newPath, (err) => {
                        if(err) throw err;
                    });
                    newCategory.image = imageFilename;
                    await newCategory.save();
                }
                res.redirect('/categories/' + newCategory.id);
            }  else {
                res.render('categories/create-form', { errors: errors.mapped()})
            }
        } catch (error) {
            console.log(error);
            res.status(500).render('error-500', { error });
        }
    },
    edit: async (req, res) => {
        try {
            let categoriesResult = await category.findAll();
            let parents = categoriesResult.filter(category => category.parent_id == null);
            let categoryResult = await category.findByPk(parseInt(req.params.id),
                { include: [{ model: category, as: 'parent' }]}
            );
            res.render('categories/edit-form', { category: categoryResult, parents });
        } catch (error) {
            console.log(error);
            res.status(500).render('error-500', { error });
        }
    },
    update: async (req, res) => {
        try {
            let errors = validationResult(req);
            if (errors.isEmpty()){
                let id = parseInt(req.params.id);
                // Update image
                let imageFilename = req.body.currentImage;
                console.log(req);
                if(req.file) {
                    imageFilename = id + path.extname(req.file.originalname);
                    let oldPath = req.file.path;
                    let newPath = req.file.destination.replace('tmp', imageFilename);
                    fs.rename(oldPath, newPath, (err) => {
                        if(err) throw err;
                    });
                }
                
                let categoryResult = await category.findByPk(id);
                categoryResult.name = req.body.name;
                categoryResult.parent_id = req.body.parent ? req.body.parent : null;
                categoryResult.top = req.body.top ? true : false;
                categoryResult.image = imageFilename;
                await categoryResult.save();
                res.redirect('/categories/' + id);
            } else {
                req.body.id = req.params.id;
                res.render('categories/edit-form', { category: req.body, errors: errors.mapped()})
            }
        } catch (error) {
            console.log(error);
            res.status(500).render('error-500', { error });
        }
    },
    destroy: async (req, res) => {
        try {
            let id = parseInt(req.params.id);
            // TODO Implement a better way. Don't remove 'destacados'
            if(id == 1) { throw new Error('La categoría "destacados" no puede ser eliminada del sistema'); }
            let categoryResult = await category.findByPk(id);
            let categoryImage = await categoryResult.image;
            await categoryResult.destroy();
            // remove local images
            if (categoryImage) {
                const imagePath = path.join(__dirname, '../public/images/categories/', categoryImage);
                fs.existsSync(imagePath) ? fs.unlinkSync(imagePath) : '';
            }
            res.redirect('/categories');
        } catch (error) {
            console.log(error);
            res.status(500).render('error-500', { error });
        }
    }
};