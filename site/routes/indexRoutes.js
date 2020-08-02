const express = require('express');
const router = new express.Router();
const controller = require('../controllers/indexController.js');

router.get('/', controller.index);

module.exports = router;