let express = require('express');
let router = express.Router()
let controller = require('../controllers/productsController.js');

router.get("/", controller.products);
router.get('/productsDetail/:id', controller.detail);
router.get('/productsDesc', controller.productsDesc);
router.get('/accesorios', controller.accesorios);
router.get('/cafeteras', controller.cafeteras);

module.exports = router;



