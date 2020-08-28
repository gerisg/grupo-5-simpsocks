const path = require('path');
const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');
// const guestRoute = require('../middlewares/guestRoute'); // requiero el middleware
// const userRoute = require('../middlewares/userRoute'); requiero el mw de usuario log
// const adminRoute = require('../midlewares/adminRoute'); requiero mw de admin
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
router.get('/login', controller.login); //pasar el middlewere guestRoute
router.get('/register', controller.register);
router.get('/recover', controller.recover);

//Accion de Loguearse
router.post("/users/login", controller.authenticate);

// Formulario de creación de usuarios
router.get('/create', controller.create); //pasar el mw userRoute
// Acción de creación
router.post('/', upload.single('image'), controller.store);

// Formulario de edición de usuarios
router.get('/:id/edit', controller.edit); //pasar el mw de adminRoute
// Acción de edición
router.put('/:id', upload.single('image'), controller.update);
// Acción de borrado
router.delete('/:id', controller.destroy);

// Detalle de un usuario particular
router.get('/:id', controller.detail);

module.exports = router;