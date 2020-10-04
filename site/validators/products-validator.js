const { check } = require('express-validator');
 
module.exports = {
    createForm: [
        check('name')
            .notEmpty().withMessage('Debe completar el nombre del producto').bail()
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
            .notEmpty().withMessage('Debe seleccionar el tipo y talle de su producto'),
        check('categories')
            .notEmpty().withMessage('Debe seleccionar al menos una categoria'),

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
            .notEmpty().withMessage('Debe seleccionar una categoría de producto'),
    ]
}