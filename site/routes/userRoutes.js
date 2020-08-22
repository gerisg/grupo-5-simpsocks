const path = require('path');
const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');
const multer = require('multer');

// Configure multer
const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/images/users'),
    filename: (req, file, callback) => {
        callback(null, 'user-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

// Listado de usuarios
router.get('/', controller.list);

// TODO Not implemented yet
router.get('/favorites', controller.favorites);
router.get('/profile', controller.profile);
router.get('/logout', controller.logout);

// Sesión de usuarios
router.get('/login', controller.login);
router.get('/register', controller.register);
router.get('/recover', controller.recover);

// Formulario de creación de usuarios
router.get('/create', controller.create);
// Acción de creación
router.post('/', upload.single('image'), controller.store);

// Formulario de edición de usuarios
router.get('/:id/edit', controller.edit);
// Acción de edición
router.put('/:id', upload.single('image'), controller.update);
// Acción de borrado
router.delete('/:id', controller.destroy);

// Detalle de un usuario particular
router.get('/:id', controller.detail);

module.exports = router;