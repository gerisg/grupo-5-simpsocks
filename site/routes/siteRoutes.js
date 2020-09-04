const express = require('express');
const router = express.Router();
const controller = require('../controllers/siteController.js');
const validate = require('../validators/contact-validator');

router.get('/', controller.index);
router.get('/aboutus', controller.aboutUs);
router.get('/faq', controller.faq);
router.get('/contact', controller.contact);
router.post('/contact', validate.contactForm, controller.contactInfo);

module.exports = router;