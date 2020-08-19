const path = require('path');
const express = require('express');
const router = express.Router();
const controller = require('../controllers/productController');
const multer = require('multer');

// Configure multer
const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/images/products'),
    filename: (req, file, callback) => {
        callback(null, file.fieldname + '-' + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

// Listado de productos
router.get('/find/:category?', controller.find); // Vista de negocio
router.get('/', controller.list); // Vista de administrador

// Formulario de creación de productos
router.get('/create', controller.create);
// Acción de creación
router.post('/',upload.single('image'), controller.store);

// Formulario de edición de productos

 router.get('/:id/edit', controller.edit);


// Acción de edición
// router.put('/:id', controller.update);
// Acción de borrado
// router.delete('/:id', controller.destroy);

// NAV - Carrito de compras
router.get('/cart', controller.cart);

// // Detalle de un producto particular
router.get('/:id', controller.detail);

module.exports = router;