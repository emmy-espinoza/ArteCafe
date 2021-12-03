let express = require('express');
let router = express.Router()

const { 
    loginForm,
    register,
    processRegister,
    processLogin,
    userProfileEdit,
    userProfile,
    userDelete,
    userUpdateProfile,
    logout,
    userChangePasswordForm,
    userChangePassword,
} = require('../controllers/usersController'); // Traigo los metodos del controller

const loginValidator = require('../validations/loginValidator'); // Traigo el validador del formulario de Login
const registerValidator = require('../validations/registerValidator'); // Traigo el validador del formulario de Registro
const updatePasswordValidator = require('../validations/updatePasswordValidator');
const userSessionCheck = require('../middlewares/userSessionCheck'); // Traigo el "SessionCheck", middleware para verficiar si hay session iniciada
const userLog = require('../middlewares/userLog'); // Traigo el "UserLog", verifica si hay una sesion iniciada antes de abrir el formulario de Login
const upload = require('../middlewares/uploadUserAvatar'); // Traigo el "Multer", middleware para cargar imagen de usuario

// LOGIN Handler
router.get('/login', userLog, loginForm); //Trae el formulario de Login
router.post('/login', loginValidator, processLogin); //Acá le pega el formulario para logear (Busca en la base)
router.get('/logout', userSessionCheck, logout); //Aca le pega el usuario para deslogear (Destrute la session)

// REGISTER Handler
router.get('/register', userLog, register); //Trae el formulario de registro
router.post('/register', upload.single('avatar'), registerValidator, processRegister); //Acá le pega el form para crear el usuario

//CRUD Usuario
router.get('/userProfile', userSessionCheck, userProfile); // Acá el usuario ve su perfil
router.get('/userEdit', userSessionCheck, userProfileEdit); //Acá el usuario puede editar su perfil
router.put('/profile/userEdit/:id', upload.single('avatar'), userUpdateProfile); //Acá le pega el form para actualizar los datos de X id
router.delete('/userDelete/:id',userSessionCheck, userDelete); //Acá se le pega para borrar un usuario de X id

//Cambiar Contraseña
router.get('/cambiarContrasenia', userSessionCheck, userChangePasswordForm);
router.put('/cambiarContrasenia/:id', userSessionCheck, updatePasswordValidator, userChangePassword);
module.exports = router;
