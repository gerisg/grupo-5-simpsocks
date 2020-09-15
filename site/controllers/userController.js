const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const mailer = require('../tools/mailer');
const jsonTable = require('../database/jsonTable');

const usersModel = jsonTable('users');//remmplazar por query de DB
const usersTokensModel = jsonTable('usersTokens');

let { user, role, address }   = require('../database/models');

let getCurrentPass = async userId => {
    let currentUser = await user.findByPk(userId);//user.findByPk
    return currentUser ? currentUser.password : null; // TODO If not found throw error
}

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
            let updatedUserId = user.update(user);
            res.redirect('/users/' + updatedUserId);
        } else {
            req.body.id = req.params.id;
            req.body.image = req.file ? req.file.filename : req.body.currentImage;
            res.render('users/edit-form', { errors: errors.mapped(), user: req.body });
        }
    },
    destroy: async (req, res) => {
        // let id = req.params.id;
        // remove image
        // let image = usersModel.findByPK(id).image;
        // const imagePath = path.join(__dirname, '../public/images/users/' + image);
        // fs.existsSync(imagePath) && fs.lstatSync(imagePath).isFile() ? fs.unlinkSync(imagePath) : '';
        // remove users
        // usersModel.delete(id);
        // res.redirect('/users');

        // let existingUser = await user.findByPk(req.params.id);
        // const imagePath = path.join(__dirname, '../public/images/users/' + image) // va existingUser.image?
        try {
            await user.destroy({ where: { id: req.params.id }})
            // TODO image not implemented yet: fs.existsSync(imagePath) && fs.lstatSync(imagePath).isFile() ? fs.unlinkSync(imagePath) : '';
            return res.redirect ("/users");
        } catch (error) {
            console.log(error);
            res.status(500).render('error-404', error); // TODO error 500 view
        }
    },
    login: (req,res) => {
        res.render('users/login');
    },
    authenticate: async (req,res) => {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            try { //si hay error ejecuta el catch
                let userAuthenticated = await user.findOne({ include: role },{where: {email: req.body.email}});
                if (bcrypt.compareSync(req.body.password, userAuthenticated.password)){
                    req.session.user = { id: userAuthenticated.id, name: userAuthenticated.firstname, category: userAuthenticated.role.name};
                    if (req.body.remember){
                        const token = crypto.randomBytes(64).toString('base64');
                        usersTokensModel.create({ userId: userAuthenticated.id, token });
                        res.cookie('userToken', token, { maxAge: 1000 * 60 * 60 * 24 * 30 })
                    }
                    res.redirect('/');
                } else {
                    return res.render('users/login', { errors: { form: { msg: 'Credenciales no válidas' }}});
                }
            } catch (error) {
                console.log(error);
                res.status(500).render('error-500', {error});
            } 
        } else {
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
        res.render('users/register');
    },
    register:  async (req,res) => {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            let encryptedPassword = bcrypt.hashSync(req.body.password, 10);
            let newUser = await user.create ({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: encryptedPassword,
                role_id: 1 //user
            });
            // .catch(error => res.render('error-404', error))
            res.redirect('/'); 
            // let id = usersModel.create(user);
            req.session.newUser = { newUser, id, name: user.firstname, category: user.category };
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
            let recover = await user.findOne({where: {email: req.body.email}});
            console.log('recover',recover);
            let password = generatePass();
            recover.password =  bcrypt.hashSync(password, 10);
            // TODO debería sobreescribir el password cuando el usuario confirma que solicitó el cambio
            user.update(recover); 
            mailer.sendRecover(req.body.email, password);
            let msg = 'Enviamos un email con la nueva contraseña de acceso.';
            return res.render('users/recover', { recover, msg, email: req.body.email });
        } else {
            res.render('users/recover', { errors: errors.mapped(), email: req.body.email });
        }   
    },
    profile: async (req, res) => {
        let id = req.session.user.id;
        // let user = usersModel.findByPK(id);
        console.log(user);
        let newUser = await user.findByPk(id);
        // res.render('users/profile', { user });
        res.render('users/profile', {newUser});
    },
    updateProfile: async (req, res) => {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            let userId = req.session.user.id;
        
            let valid = bcrypt.compareSync(req.body.password, await getCurrentPass(userId));
            if(valid) {
                let password = req.body.newPassword ? req.body.newPassword : req.body.password;
                let userProfile =  {
                    id: userId,
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    email: req.body.email,
                    password: bcrypt.hashSync(password, 10),
                    role_id: req.session.user.category,
                    phone: req.body.phone,
                    // shipping_address: req.body.shipping_address,
                    // payment_address: req.body.payment_address,
                    image: req.file ? req.file.filename : req.body.currentImage
                }
                await user.update(userProfile, { where: {id: userId}});
                res.redirect('users/profile');
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