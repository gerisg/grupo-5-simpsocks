const express = require('express');
const router = express.Router();
const controller = require('../controllers/demoController.js');

router.get('/', controller.index);
router.get('/forms', controller.forms);
router.get('/grids', controller.grids);

module.exports = router;