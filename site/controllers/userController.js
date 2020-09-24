const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const { user, role, address, token } = require('../database/models');
const mailer = require('../tools/mailer');
const parser = require('../tools/parser');

let generatePass = () => {
    let hash = bcrypt.hashSync('simpsocks-secret-phrase-to-hash', 10);
    return hash.slice(-8);
}

module.exports = {
    list: async (req, res) => {
        try {
            let users = await user.findAll({ include: role });
            res.render('users/list', { users });
        } catch (error) {
            console.log(error);
            res.status(500).render('error-500', { error });
        }
    },
    detail: async (req, res) => {
        try {
            let userResult = await user.findByPk(parseInt(req.params.id), { include: [role, address]});
            res.render('users/detail', { user: userResult });
        } catch (error) {
            console.log(error);
            res.status(500).render('error-500', { error });
        }
    },
    create: async (req, res) => {
        try {
            let roles = await role.findAll();
            res.render('users/create-form', { roles });
        } catch (error) {
            console.log(error);
            res.status(500).render('error-500', { error });
        }
    },
    store: async (req, res) => {
        try {
            let errors = validationResult(req);
            if (errors.isEmpty()) {
                let password = generatePass();
                let encryptedPassword = bcrypt.hashSync(password, 10);
                let newUser= await user.create({
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    email: req.body.email,
                    password: encryptedPassword,
                    role_id: req.body.category, 
                    phone: req.body.phone,
                    image: req.file ? req.file.filename : null,
                    addresses: [{
                        type: "shipping",                        
                        street: req.body.shipping_address, 
                        number: req.body.shipping_number,
                        city: req.body.shipping_city
                    }, {
                        type: "billing",                        
                        street: req.body.payment_address, 
                        number: req.body.payment_number,
                        city: req.body.payment_city
                    }] 
                }, {
                    include: [
                        { model: address }
                    ]
                });             
               console.log('userCreate', newUser);
                mailer.sendWelcome(newUser.email, password);
                return res.redirect('/users/' + newUser.id);
            } else {
                res.render('users/create-form', { errors: errors.mapped(), user: req.body });
            }
        } catch (error) {
            console.log(error);
            res.status(500).render('error-500', { error });
        }
    },
    edit: async (req, res) => {
        try {
            let userResult = await user.findByPk(parseInt(req.params.id));
            let shippingAddress = await address.findOne({ where: {user_id: req.params.id, type:'shipping' }});
            let billingAddress = await address.findOne({ where: {user_id: req.params.id, type:'billing' }});
            console.log(shippingAddress.get());
            console.log(billingAddress.get());
            console.log(userResult);
             // TODO faltan las tablas relacionadas
            delete userResult.password;
            res.render('users/edit-form', { user: userResult, shippingAddress: shippingAddress, billingAddress: billingAddress });
        } catch (error) {
            console.log(error);
            res.status(500).render('error-500', { error });
        }
    },
    update: async (req, res) => {
        try {
            let errors = validationResult(req);
            if (errors.isEmpty()) {
                let id = parseInt(req.params.id);
                let userResult = await user.findByPk(id, {
                    include: [{ model: address }]
                });
                userResult.id = req.body.id;
                userResult.firstname = req.body.firstname;
                userResult.lastname = req.body.lastname;
                userResult.email = req.body.email;
                userResult.role_id = req.body.category;
                userResult.phone = req.body.phone;
                userResult.image = req.file ? req.file.filename : req.body.currentImage;
                userResult.addresses[0].get().number = 1990;
                console.log(userResult.get().addresses);
                await userResult.save();
                // userResult.addresses.map(async function(addr){
                //     if(addr.get().type == 'shipping'){
                        await address.update( { number: req.body.shipping_number, street: req.body.shipping_address,city: req.body.shipping_city}, {where: {user_id: req.params.id, type: 'shipping'}});

                        await address.update( { number: req.body.payment_number, street: req.body.payment_address,city: req.body.payment_city}, {where: {user_id: req.params.id, type: 'billing'}});

                        // console.log('antes',currentAddress);
                        // if (!currentAddress){
                        //     await address.create({user_id: req.params.id,
                        //                         street: req.body.shipping_address,
                        //                         number: req.body.shipping_number,
                        //                         city: req.body.shipping_city,
                        //                         type: addr.get().type});
                        // }
                        // else{
                        //     currentAddress.dataValues.street = req.body.shipping_address,
                        //     currentAddress.dataValues.number = req.body.shipping_number,
                        //     currentAddress.dataValues.city = req.body.shipping_city
                        // }

                    // console.log('meh',currentAddress, 'despues');

               
                // await currentAddress.save();
                res.redirect('/users/' + id);
            } else {
                req.body.id = req.params.id;
                req.body.image = req.file ? req.file.filename : req.body.currentImage;
                res.render('users/edit-form', { errors: errors.mapped(), user: req.body });
            }
        } catch (error) {
            console.log(error);
            res.status(500).render('error-500', { error });
        }
    },
    destroy: async (req, res) => {
        try {
            let id = parseInt(req.params.id);
            let userResult = await user.findByPk(id);
            const imagePath = path.join(__dirname, '../public/images/users/' + userResult.image);
            fs.existsSync(imagePath) && fs.lstatSync(imagePath).isFile() ? fs.unlinkSync(imagePath) : '';
            await userResult.destroy();
            res.redirect("/users");
        } catch (error) {
            console.log(error);
            res.status(500).render('error-500', {error});
        }
    },
    login: (req,res) => {
        res.render('users/login');
    },
    authenticate: async (req,res) => {
        try {
            let errors = validationResult(req);
            if (errors.isEmpty()) {
                let userAuthenticated = await user.findOne({ where: { email: req.body.email }, include: role });
                if (bcrypt.compareSync(req.body.password, userAuthenticated.password)){
                    req.session.user = { id: userAuthenticated.id, name: userAuthenticated.firstname, category: userAuthenticated.role.id};
                    if (req.body.remember){
                        const tokenCrypto = crypto.randomBytes(64).toString('base64');
                        await token.create({ user_id: userAuthenticated.id, token: tokenCrypto });
                        res.cookie('userToken', tokenCrypto, { maxAge: 1000 * 60 * 60 * 24 * 30 });
                    }
                    res.redirect('/');
                } else {
                    res.render('users/login', { errors: { form: { msg: 'Credenciales no válidas' }}});
                }
            } else {
                res.render('users/login', { errors: errors.mapped() });
            }
        } catch (error) {
            console.log(error);
            res.status(500).render('error-500', {error});
        }
    },
    logout: (req, res) => {
        try {
            if (req.cookies.userToken) {
                token.destroy({ where: { token: req.cookies.userToken }});
                res.clearCookie('userToken');
            }
            req.session.destroy();
            res.redirect('/users/login');
        } catch (error) {
            console.log(error);
            res.status(500).render('error-500', {error});
        }
    },
    registerForm: (req,res) => {
        res.render('users/register');
    },
    register:  async (req,res) => {
        try {
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
        } catch (error) {
            console.log(error);
            res.status(500).render('error-500', {error});
        }
    },
    recoverForm: (req,res) => {
        res.render('users/recover');
    },
    recover: async (req,res) => {
        try {
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
        } catch (error) {
            console.log(error);
            res.status(500).render('error-500', {error});
        }
    },
    profile: async (req, res) => {
        try {
            let id = parseInt(req.session.user.id);
            let userResult = await user.findByPk(id, { include: [ role, address ]});
            res.render('users/profile', { user: userResult });
        } catch (error) {
            console.log(error);
            res.status(500).render('error-500', {error});
        }
    },
    profileForm: async (req, res) => {
        try {
            let id = parseInt(req.session.user.id);
            let userResult = await user.findByPk(id, { include: [ role, address ]});
            res.render('users/edit-profile', { user: userResult });
        } catch (error) {
            console.log(error);
            res.status(500).render('error-500', {error});
        }
    },
    updateProfile: async (req, res) => {
        try {
            let errors = validationResult(req);
            if (errors.isEmpty()) {
                let id = parseInt(req.session.user.id);
                let userResult = await user.findByPk(id);
                let valid = bcrypt.compareSync(req.body.password, userResult.password);
                if (valid) {
                    if (req.body.newPassword)
                        userResult.password = bcrypt.hashSync(req.body.newPassword, 10);
                    if (req.file)
                        userResult.image = req.file.filename;
                    userResult.firstname = req.body.firstname;
                    userResult.lastname = req.body.lastname;
                    userResult.email = req.body.email;
                    userResult.phone = req.body.phone;
                    await userResult.save();
                    // Update addresses
                    let i = 0;
                    let addresses = parser.parseAddresses(req.body.addresses)
                    let addrsResult = await userResult.getAddresses();
                    await Promise.all(addrsResult.map(async (addrResult) => await addrResult.update(addresses[i++])));
                    res.redirect('/users/profile');
                } else {
                    req.body.image = req.file ? req.file.filename : req.body.currentImage;
                    res.render('users/edit-profile', { errors: { form: { msg: 'Credenciales no válidas' }}, user: req.body });
                }
            } else {
                req.body.image = req.file ? req.file.filename : req.body.currentImage;
                res.render('users/edit-profile', { errors: errors.mapped(), user: req.body});
            }
        } catch (error) {
            console.log(error);
            res.status(500).render('error-500', {error});
        }
    },
    favorites: (req, res) => {
        console.log('Not implemented yet');
        res.redirect('/');
    }
};