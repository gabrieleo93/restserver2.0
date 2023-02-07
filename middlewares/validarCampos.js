const { validationResult } = require('express-validator');


const validarCampos =(req, res, next)=>{

    const validator = validationResult(req);
    if(validator.errors.length > 0){
        res.status(400).json(validator.errors);
        return;
    }
    next();
}




module.exports={
    validarCampos
}