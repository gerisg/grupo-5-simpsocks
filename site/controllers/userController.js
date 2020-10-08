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
                    role_id: parseInt(req.body.category), 
                    phone: req.body.phone,
                    addresses: parser.parseAddresses(req.body.addresses)
                }, { include: address });
                // Save image
                if(req.file) {
                    let imageFilename =  newUser.id + path.extname(req.file.originalname);
                    let oldPath = req.file.path;
                    let newPath = req.file.destination.replace('tmp', imageFilename);
                    fs.rename(oldPath, newPath, (err) => {
                        if(err) throw err;
                    });
                    newUser.image = imageFilename;
                    await newUser.save();
                }
                // Send welcome email
                mailer.sendWelcome(newUser.email, password);
                return res.redirect('/users/' + newUser.id);
            } else {
                let roles = await role.findAll();
                res.render('users/create-form', { errors: errors.mapped(), user: req.body, roles });
            }
        } catch (error) {
            console.log(error);
            res.status(500).render('error-500', { error });
        }
    },
    edit: async (req, res) => { 
        try {
            let [userResult, roles] = await Promise.all([
                user.findByPk(parseInt(req.params.id), { include: address }),
                role.findAll()
            ]);
            if (userResult)
                delete userResult.password;
            res.render('users/edit-form', { user: userResult, roles });
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
                // Update image
                let imageFilename = req.body.currentImage;
                if(req.file) {
                    imageFilename = id + path.extname(req.file.originalname);
                    let oldPath = req.file.path;
                    let newPath = req.file.destination.replace('tmp', imageFilename);
                    fs.rename(oldPath, newPath, (err) => {
                        if(err) throw err;
                    });
                }
                let userResult = await user.findByPk(id, { include: address });
                userResult.id = req.body.id;
                userResult.firstname = req.body.firstname;
                userResult.lastname = req.body.lastname;
                userResult.email = req.body.email;
                userResult.role_id = req.body.category;
                userResult.phone = req.body.phone;
                userResult.image = imageFilename;
                await userResult.save();
                // Update addresses
                await userResult.setAddresses([]);
                let adrrs = parser.parseAddresses(req.body.addresses);
                await Promise.all(
                    adrrs.map(async (adr) => {
                        let newAdr = await address.create(adr);
                        await userResult.addAddress(newAdr);
                    }));
                res.redirect('/users/' + id);
            } else {
                let roles = await role.findAll();
                req.body.id = req.params.id;
                req.body.image = req.file ? req.file.filename : req.body.currentImage;
                res.render('users/edit-form', { errors: errors.mapped(), user: req.body, roles });
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
                if (userAuthenticated && bcrypt.compareSync(req.body.password, userAuthenticated.password)){
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
                let exist = await user.findOne({ where: { email: req.body.email }});
                if(exist)
                    return res.render('users/register', { errors: { email: { msg: 'Ya existe un usuario registrado con este e-mail.' }}, user: req.body });
                let encryptedPassword = bcrypt.hashSync(req.body.password, 10);
                let newUser = {
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    email: req.body.email,
                    password: encryptedPassword,
                    role_id: 1 // user
                }
                let userResult = await user.create(newUser);
                req.session.user = { id: userResult.id, name: userResult.firstname, category: 1 };
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
                if(userResult) {
                    userResult.password =  bcrypt.hashSync(password, 10);
                    await userResult.save();
                    mailer.sendRecover(email, password);
                }
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
                // Get current user
                let userResult = await user.findByPk(id);
                if(!userResult) {
                    throw new Error('Usuario no válido');
                }
                // Validate old password to update new password
                if(req.body.newPassword) {
                    let valid = bcrypt.compareSync(req.body.password, userResult.password);
                    if(valid) {
                        userResult.password = bcrypt.hashSync(req.body.newPassword, 10);
                    } else {
                        req.body.image = req.file ? req.file.filename : req.body.currentImage;
                        return res.render('users/edit-profile', { errors: { password: { msg: 'Credenciales no válidas' }}, user: req.body });
                    }
                }
                // Save image
                if(req.file) {
                    let newFilename = userResult.id + path.extname(req.file.originalname)
                    let oldPath = req.file.path;
                    let newPath = req.file.destination.replace('tmp', newFilename);
                    fs.rename(oldPath, newPath, (err) => {
                        if(err) throw err;
                    });
                    userResult.image = newFilename;
                }
                // Update user
                userResult.firstname = req.body.firstname;
                userResult.lastname = req.body.lastname;
                userResult.email = req.body.email;
                userResult.phone = req.body.phone;
                await userResult.save();
                // Update addresses
                await userResult.setAddresses([]);
                await Promise.all(
                    parser.parseAddresses(req.body.addresses).map(async (adr) => {
                        let newAdr = await address.create(adr);
                        await userResult.addAddress(newAdr);
                    }));
                res.redirect('/users/profile');
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