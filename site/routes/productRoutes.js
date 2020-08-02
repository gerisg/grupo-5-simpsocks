const express = require('express');
const router = new express.Router();
const controller = require('../controllers/productController');

router.post('/', controller.create);
router.delete('/:id', controller.delete);
router.put('/', controller.update);
router.get('/:id', controller.get);
router.get('/all', controller.list);

module.exports = router;