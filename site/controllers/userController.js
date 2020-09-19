const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const mailer = require('../tools/mailer');

const jsonTable = require('../database/jsonTable');
const usersModel = jsonTable('users');
const usersTokensModel = jsonTable('usersTokens');

let { user, role, address, token } = require('../database/models');

let generatePass = () => {
    let hash = bcrypt.hashSync('simpsocks-secret-phrase-to-hash', 10);
    return hash.slice(-8);
}

module.exports = {
    list: async (req, res) => {
        let users = await user.findAll({ include: role });
        res.render('users/list', { users });
    },
    detail: async (req, res) => {
        let userDetail = await user.findByPk(req.params.id, { include: [role, address]});
        res.render('users/detail', { user: userDetail });
    },
    create: (req, res) => {
        res.render('users/create-form');
    },
    store: async (req, res) => {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            let password = generatePass();
            let encryptedPassword = bcrypt.hashSync(password, 10);
            let newUser = {
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
            await user.create(newUser)   
            mailer.sendWelcome(newUser.email, password);
            return res.redirect('/users/' + newUser.id);
        } else {
            res.render('users/create-form', { errors: errors.mapped(), user: req.body });
        }
    },
    edit: (req, res) => {
        let userResult = user.findByPk(req.params.id);
        delete userResult.password;
        res.render('users/edit-form', { user: userResult });
    },
    update: async (req, res) => {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            let id = parseInt(req.params.id);
            let userResult = await user.findByPk(id);
            let user =  {
                id: id,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: userResult.password,
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
    destroy: async (req, res) => {
        try {
            let id = req.params.id;
            let userResult = await user.findByPk(id);
            const imagePath = path.join(__dirname, '../public/images/users/' + userResult.image);
            fs.existsSync(imagePath) && fs.lstatSync(imagePath).isFile() ? fs.unlinkSync(imagePath) : '';
            await userResult.destroy();
            res.redirect("/users");
        } catch (error) {
            console.log(error);
            res.status(500).render('error-500', error);
        }
    },
    login: (req,res) => {
        res.render('users/login');
    },
    authenticate: async (req,res) => {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            try {
                let userAuthenticated = await user.findOne({ where: { email: req.body.email }, include: [ role ]});
                if (bcrypt.compareSync(req.body.password, userAuthenticated.password)){
                    req.session.user = { id: userAuthenticated.id, name: userAuthenticated.firstname, category: userAuthenticated.role.name};
                    if (req.body.remember){
                        const tokenCrypto = crypto.randomBytes(64).toString('base64');
                        await token.create({ user_id: userAuthenticated.id, token: tokenCrypto });
                        res.cookie('userToken', tokenCrypto, { maxAge: 1000 * 60 * 60 * 24 * 30 });
                    }
                    res.redirect('/');
                } else {
                    res.render('users/login', { errors: { form: { msg: 'Credenciales no válidas' }}});
                }
            } catch (error) {
                console.log(error);
                res.status(500).render('error-500', {error});
            } 
        } else {
            res.render('users/login', { errors: errors.mapped() });
        }
    },
    logout: async (req, res) => {
        await token.destroy({ where: { token: req.cookies.userToken }});
        res.clearCookie('userToken');
        req.session.destroy();
        res.redirect('/users/login');
         
    },
    registerForm: (req,res) => {
        res.render('users/register');
    },
    register:  async (req,res) => {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            let encryptedPassword = bcrypt.hashSync(req.body.password, 10);
            let newUser = {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: encryptedPassword,
                role_id: 1 // user
            }
            let userResult = await user.create(newUser);
            let roleResult = await role.findByPk(newUser.role_id);
            req.session.user = { id: userResult.id, name: userResult.firstname, category: roleResult.name };
            res.redirect('/');
        } else {
            res.render('users/register', { errors: errors.mapped(), user: req.body });
        }
    },
    recoverForm: (req,res) => {
        res.render('users/recover');
    },
    recover: async (req,res) => {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            let email = req.body.email;
            let password = generatePass();
            let userResult = await user.findOne({ where: { email }});
            userResult.password =  bcrypt.hashSync(password, 10);
            await userResult.save();
            mailer.sendRecover(email, password);
            let msg = 'Enviamos un email con la nueva contraseña de acceso.';
            res.render('users/recover', { msg, email });
        } else {
            let email = req.body.email;
            res.render('users/recover', { errors: errors.mapped(), email });
        }   
    },
    profile: async (req, res) => {
        let userResult = await user.findByPk(req.session.user.id);
        res.render('users/profile', { user: userResult });
    },
    updateProfile: async (req, res) => {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            let id = req.session.user.id;
            let userResult = await user.findByPk(id);
            let valid = bcrypt.compareSync(req.body.password, userResult.password);
            if (valid) {
                if (req.body.newPassword) {
                    userResult.password = bcrypt.hashSync(req.body.newPassword, 10);
                }
                if (req.file) {
                    userResult.image = req.file.filename;
                }
                userResult.firstname = req.body.firstname;
                userResult.lastname = req.body.lastname;
                userResult.email = req.body.email;
                userResult.phone = req.body.phone;
                // shipping_address: req.body.shipping_address,
                // payment_address: req.body.payment_address,
                await userResult.save();
                res.redirect('/users/profile');
            } else {
                req.body.image = req.file ? req.file.filename : req.body.currentImage;
                res.render('users/profile', { errors: { form: { msg: 'Credenciales no válidas' }}, user: req.body });
            }
        } else {
            req.body.image = req.file ? req.file.filename : req.body.currentImage;
            res.render('users/profile', { errors: errors.mapped(), user: req.body});
        }
    },
    favorites: (req, res) => {
        console.log('Not implemented yet');
        res.redirect('/');
    }
};