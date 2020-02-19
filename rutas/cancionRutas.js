const express = require('express');
const CancionControl = require('../control/cancionControl');
const multipart =require('connect-multiparty'); //importamos el paquete 
const subirCancionArchivos= multipart({uploadDir:'./archivos/canciones'});  //ruta de archivos
const subirAudioCancion= multipart({uploadDir:'./archivos/audiosmp3'});

var api = express.Router();

api.get('/cancion', CancionControl.mostrarCanciones);  //buscar canciones todas

api.post('/cancion', CancionControl.crearCancion);  //crear cancion

api.put('/cancion/:id', CancionControl.actualizarCancion);  //modificar cancion

api.get('/cancion/:nombreCancion', CancionControl.mostrarCancion);

api.delete('/cancion/:id', CancionControl.eliminarCancion);

api.put('/subir-imagen-cancion/:id', subirCancionArchivos, CancionControl.subirImgCancion);
api.get('/obtener-imagen-cancion/:imageFile', subirCancionArchivos, CancionControl.mostrarArchivo);

api.put('/subir-audio-cancion/:id', subirAudioCancion, CancionControl.subiraudioCancion);
api.get('/obtener-audio-cancion/:audioFile', subirAudioCancion, CancionControl.mostrarArchivoAudio);

module.exports = api;