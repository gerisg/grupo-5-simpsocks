const path = require('path');
const fs = require('fs');
const jsonTable = require('../database/jsonTable');

const usersModel = jsonTable('users');

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
		let user =  {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: req.body.password, // TODO hashing
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
		let user = usersModel.find(req.params.id)
		res.render('users/edit-form', { user });
	},
	update: (req, res) => {
		let user =  {
            id: parseInt(req.params.id),
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: req.body.password, // TODO hashing
			category: req.body.category,
			phone: req.body.phone,
			shipping_address: req.body.shipping_address,
			payment_address: req.body.payment_address,
			image: req.file ? req.file.filename : req.body.currentImage
		}
		let id = usersModel.update(user);
		res.redirect('/users/' + id);
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
		res.redirect('/');
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