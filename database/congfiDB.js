const mongoose = require('mongoose');




const dbConection = async()=>{
    mongoose.set('strictQuery', false);

    try{
       await  mongoose.connect(process.env.MONGO_DB_ATLAS);
        console.log('base de dato online');
        
    }catch(error){
        console.log(error);
    throw new error('Error a la hora de iniciar la base de datos ');

    }



}



module.exports={
    dbConection
}