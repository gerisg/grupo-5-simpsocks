const express = require('express');
const router = new express.Router();
const controller = require('../controllers/cartController');

router.get("/", controller.cart);

module.exports = router;