const jsonTable = require('../database/jsonTable');

const categoryModel = jsonTable('categories');

module.exports = {
    list: (req, res) => {
        let categories = categoryModel.all();
        res.render('categories/list', { categories });
    },
    detail: (req, res) => {
        let category = categoryModel.findByPK(req.params.id);
        res.render('categories/detail', { category });
    },
    create: (req, res) => {
        res.render('categories/create-form');
    },
    store: (req, res) => {
        let category =  { 
            name: req.body.name,
            related: null
        };
        let id = categoryModel.create(category);
        res.redirect('/categories/' + id);
    },
    edit: (req, res) => {
        let category = categoryModel.findByPK(req.params.id);
        res.render('categories/edit-form', { category });
    },
    update: (req, res) => {
        let id = parseInt(req.params.id);
        let category =  {
            id: id,
            name: req.body.name,
            related: null
        }
        let _id = categoryModel.update(category);
        res.redirect('/categories/' + _id);
    },
    destroy : (req, res) => {
        let id = req.params.id;
        categoryModel.delete(id);
        res.redirect('/categories');
    }
};