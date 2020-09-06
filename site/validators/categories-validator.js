const { check } = require('express-validator'); 
 
module.exports = {
    createCategory: [
        check('name')
            .notEmpty().withMessage('Debe completar el nombre de la categoría')
            .isLength({min:5}).withMessage('El nombre debe tener al menos 5 caracteres'),
           ],
    editCategory: [
        check('name')
            .notEmpty().withMessage('Debe completar el nombre de la categoría')
            .isLength({min:5}).withMessage('El nombre debe tener al menos 5 caracteres'),
            ]
}