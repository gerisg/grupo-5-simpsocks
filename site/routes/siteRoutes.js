const express = require('express');
const router = express.Router();
const controller = require('../controllers/siteController.js');

router.get('/', controller.index);
router.get('/aboutus', controller.aboutUs);
router.get('/faq', controller.faq);
router.get('/contact', controller.contact);

module.exports = router;