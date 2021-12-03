let express = require('express');
let router = express.Router()
let controller = require('../controllers/errorController.js')

router.get('/', controller.error_404);


module.exports = router;