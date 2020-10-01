const { check } = require('express-validator');

module.exports = {
    loginForm: [
        check('email')
            .notEmpty().withMessage('Ingrese su correo electrónico').bail()
            .isEmail().withMessage('Debe ingresar un correo electrónico válido')
    ],
    createForm: [
        check('firstname')
            .notEmpty().withMessage('El nombre es obligatorio').bail()
            .isLength({ min: 2 }).withMessage('El nombre debe tener al menos 2 caracteres'),
        check('lastname')
            .notEmpty().withMessage('El apellido es obligatorio').bail()
            .isLength({ min: 2 }).withMessage('El apellido debe tener al menos 2 caracteres'),
        check('email')
            .notEmpty().withMessage('El correo electrónico es obligatorio').bail()
            .isEmail().withMessage('El correo electrónico no posee un formato válido'),
        check('phone')
            .notEmpty().withMessage('Necestiamos un telefono').bail()
            .custom(value => value ? typeof value != 'number' : true).withMessage('Debe ingresar sólo números en el campo teléfono'),
        check('category')
            .notEmpty().withMessage('Debe seleccionar una categoría'),
        check('addresses[0][street]')
            .notEmpty().withMessage('Debes completar una calle').bail()
            .isLength({ min: 5 }).withMessage('Debe tener al menos 5 letras'),
        check('addresses[1][street]')
            .notEmpty().withMessage('Debes completar una calle').bail()
            .isLength({ min: 5 }).withMessage('Debe tener al menos 5 letras'),
        check('addresses[0][number]')
            .notEmpty().withMessage('Debes completar la altura de la direccion').bail()
            .custom(value => value ? typeof value != 'number' : true).withMessage('Debe ingresar sólo números en este campo'),             
        check('addresses[1][number]')
            .notEmpty().withMessage('Debes completar la altura de la direccion').bail()
            .custom(value => value ? typeof value != 'number' : true).withMessage('Debe ingresar sólo números en este campo'),     
        check('addresses[0][city]')
            .notEmpty().withMessage('Debes completar el nombre de tu ciudad').bail()
            .custom(value => value ? typeof value != 'string' : true).withMessage('Debe ingresar sólo letras en este campo'),           
        check('addresses[1][city]')
            .notEmpty().withMessage('Debes completar el nombre de tu ciudad').bail()
            .custom(value => value ? typeof value != 'string' : true).withMessage('Debe ingresar sólo letras en este campo'),          

    ],
    editForm: [
        check('firstname')
            .notEmpty().withMessage('El nombre es obligatorio').bail()
            .isLength({ min: 2 }).withMessage('El nombre debe tener al menos 2 caracteres'),
        check('lastname')
            .notEmpty().withMessage('El apellido es obligatorio').bail()
            .isLength({ min: 2 }).withMessage('El apellido debe tener al menos 2 caracteres'),
        check('email')
            .notEmpty().withMessage('El correo electrónico es obligatorio').bail()
            .isEmail().withMessage('El correo electrónico no posee un formato válido'),
        check('category')
            .notEmpty().withMessage('Debe seleccionar una categoría'),
        check('phone')
            .custom(value => value ? typeof value != 'number' : true).withMessage('Debe ingresar sólo números en el campo teléfono')
    ],
    registerForm: [
        check('firstname')
            .notEmpty().withMessage('El nombre es obligatorio').bail()
            .isLength({ min: 2 }).withMessage('El nombre debe tener al menos 2 caracteres'),
        check('lastname')
            .notEmpty().withMessage('El apellido es obligatorio').bail()
            .isLength({ min: 2 }).withMessage('El apellido debe tener al menos 2 caracteres'),
        check('email')
            .notEmpty().withMessage('El correo electrónico es obligatorio').bail()
            .isEmail().withMessage('El correo electrónico no posee un formato válido'),
        check('password')
            .notEmpty().withMessage('La contraseña es obligatoria').bail()
            .custom(value => value.length ? value.length >= 8 : true).withMessage('La contraseña debe tener al menos 8 caracteres')
    ],
    recoverForm: [
        check('email')
            .notEmpty().withMessage('El correo electrónico es obligatorio').bail()
            .isEmail().withMessage('El correo electrónico no posee un formato válido')
    ],
    profileForm: [
        check('firstname')
            .notEmpty().withMessage('El nombre es obligatorio').bail()
            .isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres'),
        check('lastname')
            .notEmpty().withMessage('El apellido es obligatorio').bail()
            .isLength({ min: 3 }).withMessage('El apellido debe tener al menos 3 caracteres'),
        check('email')
            .notEmpty().withMessage('El correo electrónico es obligatorio').bail()
            .isEmail().withMessage('El correo electrónico no posee un formato válido'),
        check('phone')
            .custom(value => value ? typeof value != 'number' : true).withMessage('Debe ingresar sólo números en el campo teléfono'),
        check('password')
            .notEmpty().withMessage('Ingrese su contraseña actual para guardar los cambios en su perfil'),
        check('newPassword')
            .custom(value => value.length ? value.length >= 8 : true).withMessage('La nueva contraseña debe tener al menos 8 caracteres')
    ]
}