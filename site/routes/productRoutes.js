const express = require('express');
const router = express.Router();
const controller = require('../controllers/productController');

// Listado de productos
router.get('/', controller.list);


// // Formulario de creación de productos
// router.get('/create', controller.create);
// // Acción de creación
// // router.post('/', controller.store);

// // Formulario de edición de productos
// router.get('/:id/edit', controller.edit);
// // Acción de edición
// // router.put('/:id', controller.update);
// // Acción de borrado
// // router.delete('/:id', controller.destroy);

// // NAV - Carrito de compras
// router.get("/cart", controller.cart);

// // Detalle de un producto particular
router.get('/:id', controller.detail);

module.exports = router;