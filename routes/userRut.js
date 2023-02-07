
const express = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validarCampos');
const { esRolValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validator');

const { usuarioGet,
    usuarioPost,
    usuarioPut,
    usuarioPatch,
    usuarioDelete  } = require('../controllers/userController');

const router = express.Router();

///rutas

router.get('/', usuarioGet);

router.put('/:id',
[
    check('id', 'no es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('nombre', 'El nombre de usuario debe ser alfa numerico').isAlphanumeric(),
    check('password', "La longitud minima de la contrasena es de 5 caracteres y la maxima de 8").isLength({min: 5, max: 8}),
    //check('correo', "El correo del usuario es obligatorio").not().isEmpty(),
    //check('correo').custom(emailExiste),
    check('rol').custom(esRolValido),
    validarCampos

], usuarioPut);


router.post('/', 
[
    check('nombre', "El nombre de usuario es obligatorio").not().isEmpty(),
    check('nombre', 'El nombre de usuario debe ser alfa numerico').isAlphanumeric(),
    check('password', "La contrasena es obligatoria").not().isEmpty(),
    check('password', "La longitud minima de la contrasena es de 5 caracteres y la maxima de 8").isLength({min: 5, max: 8}),
    check('correo', "El correo del usuario es obligatorio").not().isEmpty(),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom(emailExiste),
    //check('rol', 'no es un rol valido').isIn(['ADMIN_ROL', 'USER_ROL']),
    check('rol').custom(esRolValido),//USAMOS HELPER DE ROL  
    validarCampos,
],usuarioPost );


router.delete('/',usuarioDelete );


router.patch('/',usuarioPatch );

module.exports = router