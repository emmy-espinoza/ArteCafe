const { check, body } = require('express-validator')
const db = require('../database/models');


module.exports = [

    check('pass')
    .notEmpty().withMessage('Debes escribir tu contraseña')
    .isLength({
        min: 8
    })
    .withMessage('La contraseña debe tener como mínimo 8 caracteres')
    .isAlphanumeric(['es-ES'])
    .withMessage('La contraeña debe tener al menos una letra y número'),

    body('pass2')
    .notEmpty().withMessage('Debes escribir tu contraseña')
    .custom(function(value,{req}){
        if(value != req.body.pass){
            return false
        } return true
    })
    .withMessage('Las contraseñas no coinciden'),

]

  
        
