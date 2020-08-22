const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const jsonTable = require('../database/jsonTable');

const usersModel = jsonTable('users');

let getCurrentPass = userId => {
	let user = usersModel.find(userId);
	return user ? user.password : null; // TODO If not found throw error
}

module.exports = {
	list: (req, res) => {
		let users = usersModel.all();
		res.render('users/list', { users });
	},
	detail: (req, res) => {
		let user = usersModel.find(req.params.id);
		res.render('users/detail', { user });
	},
	create: (req, res) => {
		res.render('users/create-form');
	},
	store: (req, res) => {
		let encryptedPassword = bcrypt.hashSync(req.body.password, 10);
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
		res.redirect('/users/' + id);
	},
	edit: (req, res) => {
		let user = usersModel.find(req.params.id);
		delete user.password;
		res.render('users/edit-form', { user });
	},
	update: (req, res) => {
		let id = parseInt(req.params.id);
		let encryptedPassword = req.body.password ? bcrypt.hashSync(req.body.password, 10) : getCurrentPass(id);
		let user =  {
            id: id,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: encryptedPassword,
			category: req.body.category,
			phone: req.body.phone,
			shipping_address: req.body.shipping_address,
			payment_address: req.body.payment_address,
			image: req.file ? req.file.filename : req.body.currentImage
		}
		let updatedUserId = usersModel.update(user);
		res.redirect('/users/' + updatedUserId);
	},
	destroy : (req, res) => {
		let id = req.params.id;
		// remove image
		let image = usersModel.find(id).image;
		const imagePath = path.join(__dirname, '../public/images/users/' + image);
		fs.existsSync(imagePath) ? fs.unlinkSync(imagePath) : '';
		// remove users
		usersModel.delete(id);
		res.redirect('/users');
    },
    login: (req,res) => {
		res.render('users/login')
	},
	logout: (req, res) => {
		console.log('Not implemented yet');
		res.redirect('/users/login');
	},
    register: (req,res) => {
		(res.render('users/register'));
	},
	recover: (req,res) => {
		(res.render('users/recover'));
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