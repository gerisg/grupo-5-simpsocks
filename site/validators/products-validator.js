const { check } = require('express-validator'); //usa destructuración
const { variants, categories } = require("../database/models")
 
module.exports = {
    createForm: [
        check('name')
            .notEmpty().withMessage('Debe completar el nombre del producto').bail() //. bail si no se completo no sigue validando
            .isLength({min:5}).withMessage('El nombre debe tener al menos 5 caracteres'),
        check('description')
            .isLength({min:20}).withMessage('La descripción debe tener al menos 20 caracteres').bail(),
        check('price')
            .notEmpty().withMessage('Debe completar el precio del producto').bail()
            .isNumeric().withMessage('El precio debe ser un campo numérico'),
        check('discount')
            .notEmpty().withMessage('Debe completar el descuento del producto').bail()
            .isNumeric().withMessage('El descuento debe ser un campo numérico (sin el símbolo %)').bail()
            .isInt({min: 0, max:100}).withMessage('El descuento debe ser entre 0 y 100'),
        check('variants')
            .notEmpty().withMessage('Debes escoger el tipo y talle de tu Simpsock'),
        check('categories')
            .notEmpty().withMessage('Debes escoger al menos una categoria'),

    ],
    editForm: [
        check('name')
            .notEmpty().withMessage('Debe completar el nombre del producto').bail()
            .isLength({min:5}).withMessage('El nombre debe tener al menos 5 caracteres'),
        check('description')
            .isLength({min:20}).withMessage('La descripción debe tener al menos 20 caracteres'),
        check('price')
            .notEmpty().withMessage('Debe completar el precio del producto').bail()
            .isNumeric().withMessage('El precio debe ser un campo numérico'),
        check('discount')
            .notEmpty().withMessage('Debe completar el descuento del producto').bail()
            .isNumeric().withMessage('El descuento debe ser un campo numérico (sin el símbolo %)').bail()
            .isInt({min: 0, max:100}).withMessage('El descuento debe ser entre 0 y 100'),
        check('categories')
            .notEmpty().withMessage('Debes seleccionar un tipo'),
       
    ]
}