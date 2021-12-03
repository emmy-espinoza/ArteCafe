const { check, body } = require('express-validator')
const db = require('../database/models');


module.exports = [
    check('name')
    .notEmpty()
    .withMessage('Debes ingresar un nombre').bail()
    .isLength({ min:2 }).withMessage('Tu nombre debe tener mínimo 2 caracteres'),


    body('email')
    .custom(value => {
        return db.User.findOne({
            where:{
            email: value
            }
        })
        .then(user =>{
            if(user){
                return Promise.reject ('Este mail ya está registrado')
            }
        })
        
    }).withMessage('Este mail ya está registrado'),

    check('pass')
    .notEmpty().withMessage('Debes escribir tu contraseña')
    .isLength({
        min: 8
    })
    .withMessage('La contraseña debe tener como mínimo 8 caracteres'),

    check('pass')
    .isAlphanumeric(['es-ES'])
    .withMessage('La contraeña debe tener al menos una letra y número'),




]