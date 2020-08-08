const express = require('express');
const router = express.Router();
const controller = require('../controllers/productController');

router.get('/', controller.list);
router.get('/detail', controller.detail);
router.get("/create", controller.create);
router.get ("/edit", controller.edit);
router.get("/cart", controller.cart);

module.exports = router;