const{Schema, model}=require('mongoose')

const UsuarioSchema = new Schema({
  nombre:{
    type: String,
    required:[true, 'el nombre es obligatorio']
  },
  correo:{
    type: String,
    required:[true, 'el correo es obligatorio'],
    unique:true
  },
  password:{
    type: String,
    required:[true, 'el password es obligatorio'],
    
  },
  img:{
    type: String
  },
  rol:{
    type: String,
    required:true,
    emun:['ADMIN_ROL', 'USER_ROL']  
  },
  estado:{
    type: Boolean,
    default: true
  },
  google:{
    type: Boolean,
    default: false
    
  },


});

UsuarioSchema.methods.toJSON=function(){
  const{__v, password, ...usuario}= this.toObject();
  return usuario;
}

module.exports = model('Usuario', UsuarioSchema);