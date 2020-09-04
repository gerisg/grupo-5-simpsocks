const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const mailer = require('../tools/mailer');
const jsonTable = require('../database/jsonTable');

const usersModel = jsonTable('users');
const usersTokensModel = jsonTable('usersTokens');

let getCurrentPass = userId => {
    let user = usersModel.findByPK(userId);
    return user ? user.password : null; // TODO If not found throw error
}

let generatePass = () => {
    let hash = bcrypt.hashSync('simpsocks-secret-phrase-to-hash', 10);
    return hash.slice(-8);
}

module.exports = {
    list: (req, res) => {
        let users = usersModel.all();
        res.render('users/list', { users });
    },
    detail: (req, res) => {
        let user = usersModel.findByPK(req.params.id);
        res.render('users/detail', { user });
    },
    create: (req, res) => {
        res.render('users/create-form');
    },
    store: (req, res) => {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            let password = generatePass();
            let encryptedPassword = bcrypt.hashSync(password, 10);
            let user =  {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: encryptedPassword,
                category: req.body.category,
                phone: req.body.phone,
                shipping_address: req.body.shipping_address,
                payment_address: req.body.payment_address,
                image: req.file ? req.file.filename : null
            }
            let id = usersModel.create(user);
            mailer.sendWelcome(user.email, password);
            res.redirect('/users/' + id);
        } else {
            res.render('users/create-form', { errors: errors.mapped(), user: req.body });
        }
    },
    edit: (req, res) => {
        let user = usersModel.findByPK(req.params.id);
        delete user.password;
        res.render('users/edit-form', { user });
    },
    update: (req, res) => {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            let id = parseInt(req.params.id);
            let user =  {
                id: id,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: getCurrentPass(id),
                category: req.body.category,
                phone: req.body.phone,
                shipping_address: req.body.shipping_address,
                payment_address: req.body.payment_address,
                image: req.file ? req.file.filename : req.body.currentImage
            }
            let updatedUserId = usersModel.update(user);
            res.redirect('/users/' + updatedUserId);
        } else {
            req.body.id = req.params.id;
            req.body.image = req.file ? req.file.filename : req.body.currentImage;
            res.render('users/edit-form', { errors: errors.mapped(), user: req.body });
        }
    },
    destroy : (req, res) => {
        let id = req.params.id;
        // remove image
        let image = usersModel.findByPK(id).image;
        const imagePath = path.join(__dirname, '../public/images/users/' + image);
        fs.existsSync(imagePath) && fs.lstatSync(imagePath).isFile() ? fs.unlinkSync(imagePath) : '';
        // remove users
        usersModel.delete(id);
        res.redirect('/users');
    },
    login: (req,res) => {
        res.render('users/login');
    },
    authenticate: (req,res) => {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            let user = usersModel.findOne('email', req.body.email);
            if (user && bcrypt.compareSync(req.body.password, user.password)){
                req.session.user = { id: user.id, name: user.firstname, category: user.category };
                if (req.body.remember){
                    const token = crypto.randomBytes(64).toString('base64');
                    usersTokensModel.create({ userId: user.id, token });
                    res.cookie('userToken', token, { maxAge: 1000 * 60 * 60 * 24 * 30 })
                }
                res.redirect('/');
            } else {
                console.log('credenciales no validas');
                res.render('users/login', { errors: { form: { msg: 'Credenciales no válidas' }}});
            }
        } else {
            console.log(errors.mapped());
            res.render('users/login', { errors: errors.mapped() });
        }
    },
    logout: (req, res) => {
        let userToken = usersTokensModel.findOne('token', req.cookies.userToken);
        if (userToken) {
            usersTokensModel.delete(userToken.id);
        }
        res.clearCookie('userToken');
        req.session.destroy();
        res.redirect('/users/login');
    },
    registerForm: (req,res) => {
        res.render('users/register-form');
    },
    register: (req,res) => {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            let password = generatePass();
            let encryptedPassword = bcrypt.hashSync(password, 10);
            let user =  {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: encryptedPassword,
                category: 'user'
            }
            let id = usersModel.create(user);
            req.session.user = { id, name: user.firstname, category: user.category };
            mailer.sendWelcome(user.email, password);
            res.redirect('/');
        } else {
            res.render('users/register-form', { errors: errors.mapped(), user: req.body });
        }
    },
    recoverForm: (req,res) => {
        res.render('users/recover-form');
    },
    recover: (req,res) => {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            let user = usersModel.findOne('email', req.body.email);
            if(user) {
                let password = generatePass();
                user.password =  bcrypt.hashSync(password, 10);
                // TODO debería sobreescribir el password cuando el usuario confirma que solicitó el cambio
                usersModel.update(user); 
                mailer.sendRecover(user.email, password);
            }
            let msg = 'Si el usuario existe recibirá en su correo una nueva contraseña.';
            res.render('users/recover-form', { msg, email: req.body.email });
        } else {
            res.render('users/recover-form', { errors: errors.mapped(), email: req.body.email });
        }
    },
    favorites: (req, res) => {
        console.log('Not implemented yet');
        res.redirect('/');
    },
    profile: (req, res) => {
        console.log('Not implemented yet');
        res.redirect('/');
    }
};