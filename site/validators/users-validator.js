const { check } = require('express-validator');

module.exports = {
    loginForm: [
        check('email')
            .notEmpty().withMessage('Ingrese su correo electrónico').bail()
            .isEmail().withMessage('Debe ingresar un correo electrónico válido'),
    ],
    createForm: [
        check('firstname')
            .notEmpty().withMessage('El nombre es obligatorio').bail()
            .isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres'),
        check('lastname')
            .notEmpty().withMessage('El apellido es obligatorio').bail()
            .isLength({ min: 3 }).withMessage('El apellido debe tener al menos 3 caracteres'),
        check('email')
            .notEmpty().withMessage('El correo electrónico es obligatorio').bail()
            .isEmail().withMessage('El correo electrónico no posee un formato válido'),
        check('category')
            .notEmpty().withMessage('Debe seleccionar una categoría'),
        check('phone')
            .custom(value => value ? value.isNumeric() : true).withMessage('Debe ingresar sólo números en el campo teléfono'),
        check('password')
            .notEmpty().withMessage('La contraseña es obligatoria').bail()
            .isLength({ min:8 }).withMessage('La contraseña debe tener al menos 8 caracteres'),
    ],
    editForm: [
        check('firstname')
            .notEmpty().withMessage('El nombre es obligatorio').bail()
            .isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres'),
        check('lastname')
            .notEmpty().withMessage('El apellido es obligatorio').bail()
            .isLength({ min: 3 }).withMessage('El apellido debe tener al menos 3 caracteres'),
        check('email')
            .notEmpty().withMessage('El correo electrónico es obligatorio').bail()
            .isEmail().withMessage('El correo electrónico no posee un formato válido'),
        check('category')
            .notEmpty().withMessage('Debe seleccionar una categoría'),
        check('phone')
            .custom(value => value ? value.isNumeric() : true).withMessage('Debe ingresar sólo números en el campo teléfono'),
        check('password')
            .custom(value => value.length ? value.length >= 8 : true).withMessage('La contraseña debe tener al menos 8 caracteres'),
    ],
    registerForm: [
        check('firstname')
            .notEmpty().withMessage('El nombre es obligatorio').bail()
            .isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres'),
        check('lastname')
            .notEmpty().withMessage('El apellido es obligatorio').bail()
            .isLength({ min: 3 }).withMessage('El apellido debe tener al menos 3 caracteres'),
        check('email')
            .notEmpty().withMessage('El correo electrónico es obligatorio').bail()
            .isEmail().withMessage('El correo electrónico no posee un formato válido'),
        check('password')
            .notEmpty().withMessage('La contraseña es obligatoria').bail()
            .isLength({ min:8 }).withMessage('La contraseña debe tener al menos 8 caracteres'),
    ]
}