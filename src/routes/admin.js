let express = require('express')
let router = express.Router()

let { 
    admin,
    // Métodos de Producto
    products, 
    productsCreate, 
    productStore,
    productEdit, 
    deleteProduct,
    productUpdate,
    // Metodos de Categoría
    categoriesList,
    categoriesCreateForm,
    categoriesCreate,
    categoriesEditForm,
    categoriesEdit,
    deleteCategory,
} = require('../controllers/adminController');


let uploadProductFile = require('../middlewares/uploadProductsFiles')
let productValidator = require('../validations/productCreateOrEditValidator')
let adminSessionCheck = require('../middlewares/adminSessionCheck');

router.get('/', adminSessionCheck, admin);

/* ABM-CRUD de Productos */
router.get('/products', adminSessionCheck, products); 
/* Creacion de Producto */
router.get('/products/create', adminSessionCheck, productsCreate); // Crear un producto (Formulario)
router.post('/products/create', adminSessionCheck, uploadProductFile.array("images"), productValidator, productStore); // Crear un producto (Envio de formulario)
/* Edicion de Producto */
router.get('/products/edit/:id', adminSessionCheck, productEdit); // Edita un producto (Formulario)
router.put('/products/edit/:id', adminSessionCheck, uploadProductFile.array("images"), productValidator, productUpdate); // Edita un producto (Envio de formulario)
/* Borrado de Producto */
router.delete('/products/delete/:id', adminSessionCheck, deleteProduct); //Borra un producto

/* ABM-CRUD de Categorias */
router.get('/categoriesList', adminSessionCheck, categoriesList);
/* creación de categoria*/
router.get('/categories/createForm', adminSessionCheck,categoriesCreateForm ); // Crear una categoria (Formulario)
router.post('/categories/create', adminSessionCheck,categoriesCreate); // Crear una categoria (Formulario)

/* Edicion de categoria */
router.get('/categories/editForm/:id', adminSessionCheck, categoriesEditForm); // Edita una categoria (Formulario)
router.put('/categories/editForm/:id', adminSessionCheck, categoriesEdit ); // Edita unas categoria(Envio de formulario)

/* Borrado de categoria */
router.delete('/categories/delete/:id', adminSessionCheck, deleteCategory); //Borra una categoria


module.exports = router;
