let { check } = require('express-validator');

module.exports = [
    check('name')
    .notEmpty()
    .withMessage("El campo nombre no puede ir vacío")
    .isLength({ min: 5 })
    .withMessage("Ingrese más de 5 caracteres"),

    check('description')
    .notEmpty()
    .withMessage("Debes ingresar una descripcion")
    .isLength({min: 20 })
    .withMessage('Ingrese más de 20 caracteres'),

    check("category")
    .notEmpty()
    .withMessage("Debes elegir una categoría"),

    check('price')
    .notEmpty()
    .withMessage('Coloca un precio')
    .isNumeric()
    .withMessage("Solo puedes ingresar números")
]
