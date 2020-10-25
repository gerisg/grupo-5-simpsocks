const express = require('express');
const router = express.Router();
const controller = require('../controllers/dashboardController');

router.get('/', controller.index);

module.exports = router;