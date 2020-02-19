

/*
el modelo en la representacion en codio de la estructura de nuestras tablas (colecciones en mongo)
de nuestra base de datos
*/
 const mongoose=require('mongoose');
 const Schema = mongoose.Schema;  //creamos un objeto schema para nuestra coleccion 

//crearemos una instancia del objeto schema

var UsuarioSchema = new Schema({
    nombre:String,
    apellido:String,
    correo:String,
    contraseña:String,
    rol:String,
    imagen:String
}); 
// exportamos el esquema 
// mongoose.model recibedos parámetros que son el nombre de la collección 
// y la estructurao o el  esquema de la collecion

module.exports =mongoose.model('Usuario', UsuarioSchema);
