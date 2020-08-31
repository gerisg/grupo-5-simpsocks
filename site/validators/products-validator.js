const { check } = require('express-validator'); //usa destructuración
 
module.exports = {
    createForm: [
        check('name')
            .notEmpty().withMessage('Debe completar el nombre del producto').bail() //. bail si no se completo no sigue validando
            .isLength({min:5}).withMessage('El nombre debe tener al menos 5 caracteres'),
        check('description')
            .isLength({min:20}).withMessage('La descripción debe tener al menos 20 caracteres').bail(),
            check('price')
            .notEmpty().withMessage('Debe completar el precio del producto').isNumeric().bail(),
        check('discount')
            .notEmpty().withMessage('Debe completar el descuento del producto').isNumeric()
    ],
    editForm: [
        check('name')
        .notEmpty().withMessage('Debe completar el nombre del producto').bail()
        .isLength({min:5}).withMessage('El nombre debe tener al menos 5 caracteres'),
    check('description')
        .isLength({min:20}).withMessage('La descripción debe tener al menos 20 caracteres').bail(),
        check('price')
        .notEmpty().withMessage('Debe completar el precio del producto').isNumeric().bail(),
    check('discount')
        .notEmpty().withMessage('Debe completar el descuento del producto').isNumeric()
    ]
}