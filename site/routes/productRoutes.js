const express = require('express');
const router = express.Router();
const controller = require('../controllers/productController');
const validate = require('../validators/products-validator');
const upload = require('../tools/uploader')('products');
const adminRoute = require('../middlewares/adminRoute');

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