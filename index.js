/*vaa contener la conexion de Node con nuestra BD Mongo atraves de mongoose*/
const mongoose= require('mongoose');   //aquí importamos mongoose para la conexión
const app = require('./app'); // va a tener toda la logica de express
const port= 4000; //decraramos puerto 

// vamos a crear la logica de conexion con la base de datos 

mongoose.connect('mongodb://localhost:27017/kods',(err,res)=>{
    if(err){
        console.log(`El error es ${err}`);
    }else{
    console.log('conexion Exitosa!!');
    app.listen(port,()=>{
        console.log(`puerto:${port}`);
     });
    }
});
/* 
    Va a contener la conexion con node con nuestra BD Mongo a traves de mongoose.
    */

 