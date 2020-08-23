const express = require('express');
const router = express.Router();
const controller = require('../controllers/categoryController');

// Listado de usuarios
router.get('/', controller.list);

// Formulario de creación de categorías
router.get('/create', controller.create);
// Acción de creación
router.post('/', controller.store);

// Formulario de edición de categorías
router.get('/:id/edit', controller.edit);
// Acción de edición
router.put('/:id', controller.update);
// Acción de borrado
router.delete('/:id', controller.destroy);

// Detalle de una categoría
router.get('/:id', controller.detail);

module.exports = router;