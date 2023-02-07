const Role = require('../models/role');
const Usuario = require('../models/user');




//HELPER PARA VALIDAR ROLES
const esRolValido = async (rol='')=>{
    const existeRol= await Role.findOne({rol});
    if(!existeRol){
        throw new Error(`El rol ${rol} no esta registrado en la base de datos`);
    }
}

//HELPER PARA VALIDAR CORREOS
    
    
const emailExiste=async(correo='')=>{
    const verifCorreo = await Usuario.findOne({correo});
    if(verifCorreo){
        throw new Error(`el correo ${correo} ya se encuentra registrado`);
}

}

const existeUsuarioPorId = async( id ) => {

    // Verificar si el correo existe
    const existeUsuario = await Usuario.findById(id);
    if ( !existeUsuario ) {
        throw new Error(`El id no existe ${ id }`);
    }
}




module.exports={
    esRolValido,
    emailExiste,
    existeUsuarioPorId
}