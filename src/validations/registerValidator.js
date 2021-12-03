const { check, body } = require('express-validator')
const db = require('../database/models');


module.exports = [
    check('name')
    .notEmpty()
    .withMessage('Debes ingresar un nombre').bail()
    .isLength({ min:2 }).withMessage('Tu nombre debe tener mínimo 2 caracteres'),

    check('last_name')
    .notEmpty()
    .withMessage('Debes ingresar un apellido').bail()
    .isLength({ min:2 }).withMessage('El apellido debe tener al menos 2 caracteres'),
    
    check('phone')
    .notEmpty()
    .withMessage('Debes ingresar un teléfono').bail()
    .isLength({ min:8 }).withMessage('El teléfono debe tener al menos 8 caracteres'),

    check('email')
    .isEmail().withMessage('Debes ingresar un email válido').bail()
    .notEmpty().withMessage('Debes ingresar un email'),

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


    body('pass2')
    .notEmpty().withMessage('Debes escribir tu contraseña')
    .custom(function(value,{req}){
        if(value != req.body.pass){
            return false
        } return true
    })
    .withMessage('Las contraseñas no coinciden'),

    check('terms')
    .isString('on')
    .withMessage('Debes aceptar los términos y condiciones'),

  
    

]

  
        
