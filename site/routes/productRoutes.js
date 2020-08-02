const express = require('express');
const router = new express.Router();
const controller = require('../controllers/productController');

router.get('/', controller.list);

module.exports = router;