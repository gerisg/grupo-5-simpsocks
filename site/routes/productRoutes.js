const path = require('path');
const express = require('express');
const router = express.Router();
const controller = require('../controllers/productController');
const validate = require('../validators/products-validator');

const userRoute = require('../middlewares/userRoute');
const adminRoute = require('../middlewares/adminRoute');

const multer = require('multer');

// Configure multer
const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/images/products'),
    filename: (req, file, callback) => {
        callback(null,  file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

// Listado de productos
router.get('/find/:category?', controller.find);
router.get('/', adminRoute, controller.list);

// Formulario de creación de productos
router.get('/create', adminRoute, controller.create);
// Acción de creación
router.post('/', adminRoute, upload.any('images'), validate.createForm, controller.store);
// Formulario de edición de productos
router.get('/:id/edit', adminRoute, controller.edit);

// Acción de edición
router.put('/:id', adminRoute, upload.any('images'), validate.editForm, controller.update);

// Acción de borrado
router.delete('/:id', adminRoute, controller.destroy);

// NAV - Carrito de compras
router.get('/cart', controller.cart);

// Detalle de un producto
router.get('/:id/show', controller.show);
router.get('/:id', adminRoute, controller.detail);

module.exports = router;