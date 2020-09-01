const { check } = require('express-validator'); //usa destructuración
 
module.exports = {
    createForm: [
        check('name')
            .notEmpty().withMessage('Debe completar el nombre del producto').bail() //. bail si no se completo no sigue validando
            .isLength({min:5}).withMessage('El nombre debe tener al menos 5 caracteres'),
        check('description')
            .isLength({min:20}).bail().withMessage('La descripción debe tener al menos 20 caracteres'),
        check('price')
            .notEmpty().withMessage('Debe completar el precio del producto').isNumeric().withMessage('El precio debe ser un número'),
        check('discount')
            .notEmpty().withMessage('Debe completar el descuento del producto').bail()
            .isNumeric().withMessage('El descuento debe ser un campo numérico (sin el símbolo %)')
            .isInt({min: 0, max:100}).withMessage('El descuento tiene que ser entre 0 y 100')
    ],
    editForm: [
        check('name')
            .notEmpty().withMessage('Debe completar el nombre del producto').bail()
            .isLength({min:5}).withMessage('El nombre debe tener al menos 5 caracteres'),
        check('description')
            .isLength({min:20}).withMessage('La descripción debe tener al menos 20 caracteres'),
        check('price')
            .notEmpty().withMessage('Debe completar el precio del producto').isNumeric().withMessage('El precio debe ser un número'),
        check('discount')
            .notEmpty().withMessage('Debe completar el descuento del producto').bail()
            .isNumeric().withMessage('El descuento debe ser un campo numérico (sin el símbolo %)')
            .isInt({min: 0, max:100}).withMessage('El descuento tiene que ser entre 0 y 100')
    ]
}