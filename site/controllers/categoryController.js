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
                let parent_id = req.body.parent ? req.body.parent : null
                let newCategory =  { name: req.body.name, parent_id };
                let categoryResult = await category.create(newCategory);
                res.redirect('/categories/' + categoryResult.id);
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
                let categoryResult = await category.findByPk(id);
                categoryResult.name = req.body.name;
                categoryResult.parent_id = req.body.parent ? req.body.parent : null;
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
            if(id == 1) { 
                throw new Error('La categoría "destacados" no puede ser eliminada del sistema');
            }
            await category.destroy({ where: { id }});
            res.redirect('/categories');
        } catch (error) {
            console.log(error);
            res.status(500).render('error-500', { error });
        }
    }
};