const {response, request} = require('express');
const Usuario = require('../models/user');
const bcrypt = require('bcryptjs');
const { emailExiste } = require('../helpers/db-validator');
const { find } = require('../models/role');



const usuarioGet =async (req = request, res = response)=>{
    const {limite = 5, desde=0} = req.query;
    const query = {estado: true};
    //const usuarios = await Usuario.find(query)
    //       .skip(desde)
    //        .limit(limite);

    // const total = await Usuario.countDocuments(query);

    const [total, usuarios]= await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(desde)
            .limit(limite)
    ])

    res.json({
        total,
        usuarios
    });
};




const usuarioPost = async (req, res = response)=>{

    

    const {nombre, correo, password, rol}=req.body
    const usuario=new Usuario({nombre, correo, password, rol})


    //encriptar la contrasena 
    const salt = bcrypt.genSaltSync(10);
    usuario.password = bcrypt.hashSync(password, salt);

    //guardar en bd
    await usuario.save();
    res.json({

       usuario
    });
};



const usuarioPut = async (req, res = response)=>{
    const {id} = req.params;
    const { password, google, correo,...resto} = req.body;

    // validar contra bd
    if(password){
        //encriptamos password
        const salt = bcrypt.genSaltSync(10);
        resto.password = bcrypt.hashSync(password, salt);
    }
    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
        usuario
    });
};


const usuarioPatch = (req, res = response)=>{
    res.json({
        msg:'hola mundo patch - controlador'
    });
};


const usuarioDelete = (req, res = response)=>{
    res.json({
        msg:'hola mundo delete - controlador'
    });
};

module.exports={
    usuarioGet,
    usuarioPut,
    usuarioDelete,
    usuarioPatch,
    usuarioPost
}