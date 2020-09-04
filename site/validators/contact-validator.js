const { check } = require('express-validator');

module.exports = {
    contactForm: [
        check('name')
            .notEmpty().withMessage('El nombre es obligatorio').bail()
            .isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres'),
        check('email')
            .notEmpty().withMessage('Ingrese su correo electrónico').bail()
            .isEmail().withMessage('Debe ingresar un correo electrónico válido'),
        check('phone')
            .isNumeric().withMessage('Debe ingresar sólo números en el campo teléfono'),
        check('message')
            .notEmpty().withMessage('Debe escribir un mensaje')
    ]
}