const { check, body } = require('express-validator')
let bcrypt = require('bcryptjs')
let db = require ("../database/models"); 

module.exports = [
  
    check('email').not().isEmpty().normalizeEmail().withMessage('Debes escribir un email').bail(),
    check('email').isEmail().withMessage('Debes escribir un email válido').bail(),

    body('pass').custom((value, {req}) => {
        return db.User.findOne({
            where: {
                email: req.body.email,
            },
        })
        .then((user) => {
            if(!bcrypt.compareSync(value, user.dataValues.pass)) {
                return Promise.reject("No coincide la contraseña");
            }
        })
        .catch((error) => {
            return Promise.reject("Credenciales inválidas");
        });
    }),

]