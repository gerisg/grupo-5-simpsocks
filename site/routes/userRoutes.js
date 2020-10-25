const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');
const validate = require('../validators/users-validator');

const guestRoute = require('../middlewares/guestRoute');
const userRoute = require('../middlewares/userRoute');
const adminRoute = require('../middlewares/adminRoute');

const upload = require('../tools/uploader')('users');

// TODO Not implemented yet
router.get('/favorites', userRoute, controller.favorites);

// Perfil de usuario
router.get('/profile/edit', userRoute, controller.profileForm);
router.get('/profile', userRoute, controller.profile);
router.put('/profile', userRoute, upload.single('image'), validate.profileForm, controller.updateProfile);

// Sesion de usuarios
router.get('/login', guestRoute, controller.login);
router.post('/login', guestRoute, validate.loginForm, controller.authenticate);
router.post('/logout', controller.logout);

// Recuperación de contraseña
router.get('/recover', guestRoute, controller.recoverForm);
router.post('/recover', validate.recoverForm, controller.recover);

// Registro de usuario
router.get('/register', guestRoute, controller.registerForm);
router.post('/register', guestRoute, validate.registerForm, controller.register);
router.get('/create', adminRoute, controller.create);
router.post('/', adminRoute, upload.single('image'), validate.createForm, controller.store);

// Listado de usuarios
router.get('/', adminRoute, controller.list);

// Formulario de edición de usuarios
router.get('/:id/edit', adminRoute, controller.edit);
router.put('/:id', adminRoute, upload.single('image'), validate.editForm, controller.update);
router.delete('/:id', adminRoute, controller.destroy);

// Detalle de un usuario particular
router.get('/:id', adminRoute, controller.detail);

module.exports = router;