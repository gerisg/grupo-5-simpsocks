const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/api/categoryController');
const productController = require('../controllers/api/productController');
const userController = require('../controllers/api/userController');

// Listado de usuarios
router.get('/users', userController.list);
// Ultimo usuario creado
router.get('/users/latest', userController.latest);
// Detalle de usuario
router.get('/users/:id', userController.detail);

//Stock producto
router.post('/products/stock', productController.stock);
// Detalle de producto
router.get('/products', productController.list);
// Ultimo producto creado
router.get('/products/latest', productController.latest);
// Detalle de producto
router.get('/products/:id', productController.detail);

// Listado de categorías
router.get('/categories', categoryController.list);

module.exports = router;