const path = require('path');
const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');

const guestRoute = require('../middlewares/guestRoute'); // requiero el middleware
const userRoute = require('../middlewares/userRoute');
const adminRoute = require('../middlewares/adminRoute');// requiero mw de admin

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
router.get('/', adminRoute, controller.list);

// TODO Not implemented yet
router.get('/favorites', userRoute, controller.favorites); //userRoute?
router.get('/profile', userRoute,  controller.profile); //userRoute?

// Sesion de usuarios
router.get('/login', guestRoute, controller.login); //paso el mw de huesped
router.post('/login', controller.authenticate);
router.post('/logout', controller.logout);
router.get('/register', guestRoute, controller.register);
router.get('/recover', controller.recover);

// Formulario de creación de usuarios
router.get('/create', adminRoute, controller.create);
router.post('/', upload.single('image'), controller.store);

// Formulario de edición de usuarios
router.get('/:id/edit', controller.edit);
router.put('/:id', upload.single('image'), controller.update);
router.delete('/:id', controller.destroy);

// Detalle de un usuario particular
router.get('/:id', controller.detail);

module.exports = router;