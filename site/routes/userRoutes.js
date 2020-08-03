const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');

router.get('/login', controller.login);
router.get('/register', controller.register);
router.get('/recover', controller.recover);

module.exports = router;