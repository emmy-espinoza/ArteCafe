let express = require('express');
let router = express.Router()
let controller = require('../controllers/indexController.js');
let cookieCheck = require('../middlewares/cookieCheck')


router.get('/', controller.index);

router.get('/contact', controller.contact);

router.get('/', cookieCheck,controller.index);


router.get('/search', controller.search); 

router.get('/sobre_nosotros', controller.sobreNosotros);

router.get('/gallery', controller.gallery);

router.get('/meriendas', controller.meriendas); 

router.get('/molemos', controller.molemos); 

router.get('/cursos', controller.cursos);

router.get('/trabajos', controller.trabajos); 


module.exports = router;


