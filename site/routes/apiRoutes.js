const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/api/categoryController');
const productController = require('../controllers/api/productController');
const userController = require('../controllers/api/userController');

// Listado de usuarios
router.get('/users', userController.list);
// Detalle de un usuario
router.get('/users/:id', userController.detail);

// Detalle de producto
router.get('/products', productController.list);
// Detalle de un producto
router.get('/products/:id', productController.detail);

// Listado de categorías
router.get('/categories', categoryController.list);

module.exports = router;