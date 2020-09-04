const path = require('path');
const jsonTable = require('../database/jsonTable');
const { validationResult } = require('express-validator');
const contactModel = jsonTable('contact');
const mailer = require('../tools/mailer');

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
    contactInfo: (req,res) => {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            let messageHTML = 
            `<h1>SimpSocks</h1>
            <h2>Nuevo Mensaje de Contacto</h2>
            <p>Nombre: ${req.body.name}</p>
            <p>Email: ${req.body.email}</p>
            <p>Teléfono: ${req.body.phone}</p>
            <p>Mensaje: ${req.body.message}</p>`
            mailer.sendContactInfo(messageHTML);
            res.redirect('/');
        } else {
            res.render('site/contact-form', { errors: errors.mapped(), contactMessage: req.body });
        }
    }
}; 