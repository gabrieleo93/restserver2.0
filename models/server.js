const express = require('express'); 
var cors = require('cors');
const { dbConection } = require('../database/congfiDB');
class Server{
    constructor(){
        this.app = express();
        this.port =process.env.PORT;
        this.usuariosPath = ('/api/usuarios');

        //conectar a base de datos
        this.conectarDB();

        //MIDDLEWARES
        this.middleware();

        //rutas app
        this.routes();
    }

    
    async conectarDB(){
        await dbConection();
    }

    middleware(){
        //cors
        this.app.use(cors());

        // lectura y parseo  del body
        this.app.use(express.json())
        //directorio publico
        this.app.use(express.static('public'));
    }
    routes(){
       this.app.use(this.usuariosPath, require('../routes/userRut'));
    }
    listen(){
        this.app.listen(this.port,()=>{
            console.log('Server running in a port', this.port);
        });
    }

}

module.exports = Server