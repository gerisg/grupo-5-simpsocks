const path = require('path');
const jsonTable = require('../database/jsonTable');
const { validationResult } = require('express-validator');
const contactModel = jsonTable('contact');

module.exports = {
    index: (req, res) => {
        res.render('index');
    },
    aboutUs: (req, res) => {
        res.render('site/about-us');
    },
    faq: (req, res) => {
        res.render('site/faq');
    },
    contact: (req, res) => {
     res.render('site/contact-form');
    },
    store: (req, res) => {
        let errors = validationResult(req);
        if(errors.isEmpty()){
            let contactMessage = {
                name: req.body.name, 
                email: req.body.email,
                phone:req.body.phone,
                message: req.body.message
            }
            let id = contactModel.create(contactMessage);
            res.redirect('/');
        }else {
            res.render('site/contact-form', { errors: errors.mapped(), contactMessage: req.body });
        }
    }
}; 