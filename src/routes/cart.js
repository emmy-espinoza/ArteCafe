let express = require('express');
let router = express.Router()
let { cart, emergente, vista, formulario } = require('../controllers/cartController');

router.get('/', cart);


router.get('/emergente', emergente);

router.get('/vista',vista);

router.get('/formulario', formulario);

module.exports = router;

