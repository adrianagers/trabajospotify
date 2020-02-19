/*
vamos a crear el manejo de rutas de express para la api 
se encargará de manejar las rutas del back
*/
const express=require('express');
const UsuarioControl =require('../control/usuarioControl'); //importamos el controlador de las funciones 
const multipart =require('connect-multiparty'); //importamos el paquete 
const subirImgDirectorio= multipart({uploadDir:'./archivos/usuarios'});  //ruta de archivos
/*
Estosson denominados métodos HTTP y hacen parte de las caracteristicas de una API

 POST->agregar datos 
 GET->obtener datos 
 PUT->Actualizar datos 
 DELETE->Eliminar Datos
 
 */
var api =express.Router();  //cargamos el manejo de rutas de express
// declaracion de manejo de rutas que darán paso a la ejecucuin de las funciones
// craremos una ruta para que maneje todas las demas rutas 
api.post('/registro',UsuarioControl.crearUsuario);

// en el caso de un loguin o un inicio de sesion, utlizamos el método post //sirve para crear in
// informacion en vez de get.

api.post('/loguinUsuario',UsuarioControl.login);

// ruta para actualizar 
api.put('/actualizarUsuario/:id', UsuarioControl.actualizarUsuario);


//Ruta subir imagen
api.put('/subir-imagen-usuario/:id', subirImgDirectorio, UsuarioControl.subirImg);
api.get('/obtener-imagen-usuario/:imageFile', subirImgDirectorio, UsuarioControl.mostrarArchivo)

// exportacion del archivo
module.exports = api; 