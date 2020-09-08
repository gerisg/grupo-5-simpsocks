const { check } = require('express-validator'); 
 
module.exports = {
    createForm: [
        check('name')
            .notEmpty().withMessage('Debe completar el nombre de la categoría').bail()
            .isLength({min:3}).withMessage('El nombre debe tener al menos 3 caracteres'),
    ],
    editForm: [
        check('name')
            .notEmpty().withMessage('Debe completar el nombre de la categoría').bail()
            .isLength({min:3}).withMessage('El nombre debe tener al menos 3 caracteres'),
    ]
}