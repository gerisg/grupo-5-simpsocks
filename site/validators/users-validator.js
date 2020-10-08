const { check } = require('express-validator');
const { user } = require("../database/models")

module.exports = {
    loginForm: [
        check('email')
            .notEmpty().withMessage('Ingrese su correo electrónico').bail()
            .isEmail().withMessage('Debe ingresar un correo electrónico válido').bail(),
        check('password')
            .notEmpty().withMessage('La contraseña es obligatoria')
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
            .isEmail().withMessage('El correo electrónico no posee un formato válido')
            .custom(async value => { 
                let userResult = await user.findOne({ where : { email : value } });
                if(userResult) {
                    return Promise.reject('Este e-mail ya fue utilizado');
                }
            }),
        check('phone')
            .notEmpty().withMessage('Debe ingresar un teléfono').bail()
            .isNumeric().withMessage('Debe ingresar sólo números en este campo'),
        check('category')
            .notEmpty().withMessage('Debe seleccionar una categoría'),
        check('addresses.*.street')
            // https://express-validator.github.io/docs/wildcards.html
            .notEmpty().withMessage('Debe completar una calle').bail()
            .isLength({ min: 2 }).withMessage('Debe tener al menos 2 letras'),
        check('addresses.*.number')
            .notEmpty().withMessage('Debe completar la altura de la calle').bail()
            .isNumeric().withMessage('Debe ingresar sólo números en este campo'),   
        check('addresses.*.city')
            .notEmpty().withMessage('Debe completar el nombre de la ciudad').bail()
            .isLength({ min: 2 }).withMessage('Debe tener al menos 2 letras'),
        check('image')
            .custom((value, { req }) => {
                if (req.file && req.file.error === 'type') {
                    throw new Error('Debe subir un archivo de tipo imagen (jpg, jpeg, png, gif, webp)');
                }
                return true;
            })
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
            .isEmail().withMessage('El correo electrónico no posee un formato válido').bail()
            .custom(async (value, { req }) => { 
                let userResult = await user.findOne({ where : { email : value } });
                if(userResult && userResult.email != req.body.oldEmail) {
                    return Promise.reject('Este e-mail ya fue utilizado por otro usuario');
                }
            }),
        check('category')
            .notEmpty().withMessage('Debe seleccionar una categoría'),
        check('phone')
            .isNumeric().withMessage('Debe ingresar sólo números en este campo'),
        check('addresses.*.street')
            // https://express-validator.github.io/docs/wildcards.html
            .notEmpty().withMessage('Debe completar una calle').bail()
            .isLength({ min: 2 }).withMessage('Debe tener al menos 2 letras'),
        check('addresses.*.number')
            .notEmpty().withMessage('Debe completar la altura de la calle').bail()
            .isNumeric().withMessage('Debe ingresar sólo números en este campo'),   
        check('addresses.*.city')
            .notEmpty().withMessage('Debe completar el nombre de la ciudad').bail()
            .isLength({ min: 2 }).withMessage('Debe tener al menos 2 letras'),
        check('image')
            .custom((value, { req }) => {
                if (req.file && req.file.error === 'type') {
                    throw new Error('Debe subir un archivo de tipo imagen (jpg, jpeg, png, gif, webp)');
                }
                return true;
            })
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
            .isEmail().withMessage('El correo electrónico no posee un formato válido')
            .custom(async value => { 
                let userResult = await user.findOne({ where : { email : value } });
                if(userResult) {
                    return Promise.reject('Este e-mail ya fue utilizado');
                }
            }),
        check('password')
            .notEmpty().withMessage('La contraseña es obligatoria').bail()
            .custom(value => value.length >= 8).withMessage('La contraseña debe tener al menos 8 caracteres'),
    ],
    recoverForm: [
        check('email')
            .notEmpty().withMessage('El correo electrónico es obligatorio').bail()
            .isEmail().withMessage('El correo electrónico no posee un formato válido')
    ],
    profileForm: [
        check('firstname')
            .notEmpty().withMessage('El nombre es obligatorio').bail()
            .isLength({ min: 2 }).withMessage('El nombre debe tener al menos 2 caracteres'),
        check('lastname')
            .notEmpty().withMessage('El apellido es obligatorio').bail()
            .isLength({ min: 2 }).withMessage('El apellido debe tener al menos 2 caracteres'),
        check('email')
            .notEmpty().withMessage('El correo electrónico es obligatorio').bail()
            .isEmail().withMessage('El correo electrónico no posee un formato válido').bail()
            .custom(async (value, { req }) => { 
                let userResult = await user.findOne({ where : { email : value } });
                if(userResult && userResult.email != req.body.oldEmail) {
                    return Promise.reject('Este e-mail ya fue utilizado por otro usuario');
                }
            }),
        check('phone')
            .isNumeric().withMessage('Debe ingresar sólo números en este campo'),
        check('addresses.*.street')
            // https://express-validator.github.io/docs/wildcards.html
            .notEmpty().withMessage('Debe completar una calle').bail()
            .isLength({ min: 2 }).withMessage('Debe tener al menos 2 letras'),
        check('addresses.*.number')
            .notEmpty().withMessage('Debe completar la altura de la calle').bail()
            .isNumeric().withMessage('Debe ingresar sólo números en este campo'),   
        check('addresses.*.city')
            .notEmpty().withMessage('Debe completar el nombre de la ciudad').bail()
            .isLength({ min: 2 }).withMessage('Debe tener al menos 2 letras'),
        check('password')
            .if((value, { req }) => req.body.newPassword).notEmpty().withMessage('Ingrese contraseña actual para cambiar su contraseña').bail()
            .custom((value, { req }) => value !== req.body.newPassword).withMessage('Las contraseñas no pueden ser iguales'),
        check('newPassword')
            .custom(value => value.length ? value.length >= 8 : true).withMessage('La nueva contraseña debe tener al menos 8 caracteres'),
        check('image')
            .custom((value, { req }) => {
                if (req.file && req.file.error === 'type') {
                    throw new Error('Debe subir un archivo de tipo imagen (jpg, jpeg, png, gif, webp)');
                }
                return true;
            })
    ]
}