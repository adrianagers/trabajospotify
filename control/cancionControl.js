const Cancion = require('../modelo/cancion'); 
const fs = require('fs');
const path =require('path');

function crearCancion(req, res){

    var cancion = new Cancion();

    var parametros = req.body;
    
    cancion.artista = parametros.artista;
    cancion.nombreCancion = parametros.nombreCancion;
    cancion.album = parametros.album;
    cancion.anio = parametros.anio;
    cancion.genero = parametros.genero;
    cancion.url = null;
    cancion.imagen = null;

    cancion.save((err, cancionNuevo)=>{
        if(err){
            res.status(500).send({ message: "Error en el servidor"});
        } else {
            if(!cancionNuevo){

                res.status(200).send({message: "No fue posible subir la canción"});
            } else {
                res.status(200).send({cancion: cancionNuevo});
            }
        }
    });

}


function actualizarCancion(req,res){
    var cancionId =req.params.id;
    var nuevosDatosCancion= req.body;
    cancion.findByIdAndUpdate(cancionId,nuevosDatosCancion,(err, cancionActualizado)=>{
        if(err){
            res.status(500).send({message:"error en el servidor"});
        }else{
            if(!cancionActualizado){
                res.status(200).send({message:"no fue posible encontrar escontrar la cancion"});
            }else{
                res.status(200).send({cancion: cancionActualizado})
            }
        }
    });
}

function mostrarCancion(req,res){
    var cancionNombre =req.params.id;

    Cancion.findOne(cancionNombre,(err, cancionmos)=>{
        if(err){
            res.status(500).send({message:"error en el servidor"});
        }else{
            if(!cancionmos){
                res.status(200).send({message:"no fue posible actualizar datos "});
            }else{
                res.status(200).send({cancion: cancionmos})
            }
        }
    });
}

function eliminarCancion(req,res){
    var cancionId =req.params.id;

    Cancion.findByIdAndDelete({_id:cancionId},(err, cancionElimi)=>{
        if(err){
            res.status(500).send({message:"error en el servidor"});
        }else{
            if(!cancionElimi){
                res.status(200).send({message:"no se pudo eliminar"});
            }else{
                res.status(200).send({cancion: cancionElimi})
            }
        }
    });
}

function mostrarCanciones(req,res){

    Cancion.find({},(err,todasCanciones)=>{
        if(err){
            res.status(500).send({message:"error en el servidor"});
        }else{
            if(!todasCanciones){
                res.status(200).send({message:"no se pudo mostrar todas las canciones"});
            }else{
                res.status(200).send({cancion:todasCanciones})
            }
        }
    });
}
    
function subirImgCancion(req,res){
    var cancionId=req.params.id;
    var nombreArchivo = "No he subido ninguna imagen";
   //  validacion de que la imagen si se esta resiviendo 
   if(req.files){
       // verifivcacion de ruta del archivo , el nombre y la extencion  
       // file es para verificar si el archivo esta existe o cual es la ruta 
       var rutaArchivo =req.files.Audio.path;
       console.log(rutaArchivo);

       var partirArchivo =rutaArchivo.split('\\');
       console.log(partirArchivo);

       var nombreArchivo = partirArchivo[2];
       console.log(nombreArchivo);

       var extencionImg = nombreArchivo.split('\.');
       console.log(extencionImg);

       var extencionArchivo= extencionImg[1];
       console.log(extencionArchivo);




       // validacion del formato de cada imagen y si es aceptable 

       if(extencionArchivo == "png" || extencionArchivo == "jpg" || extencionArchivo =="jpeg"){
           // actualizar del cancion, el campo imagen que inicialmente teníamos null
           Cancion.findByIdAndUpdate(cancionId,{imagen:nombreArchivo},(err,cancionConImg)=>{
              if(err){
                  res.status(500).send({message: "Error en le servidor"}) ;            
             }else{
                 if(!cancionConImg){
                     res.status(200).send({message:"no fue posible subir la img"});
                 }else{
                     res.status(200).send({
                         imagen:nombreArchivo,
                         usuario:cancionConImg                       
                       });
                 }
             }
           });
           // validacion de la extención
       }else{
           //  formato invalido
           res.status(200).send({message:"Formato Invalido !! no es una imagen"});

           }
       }else{
       // no existe una imagen para subir
       res.status(200).send({message:"no has subido una imgen"});
       }


    }
   //  MOSTRAR Archivo

 function mostrarArchivo(req,res){
   // pedir archivo que queremos mostrar
       var archivo=req.params.imageFile;
       // varificamos la carpeta
       var ruta ='./archivos/canciones/'+ archivo;
       // validar si existe la imagen
       // fs.exists('el archivo existe')
       fs.exists(ruta, (exists)=>{
               if (exists){
                   res.sendFile(path.resolve(ruta));                    
               }else{
                   res.status(200).send({menssage:"imagen no encontrada"});
               }
       });
   }
   function subiraudioCancion(req,res){
    var cancionId=req.params.id;
    var nombreArchivo = "No he subido ningun audio";
   //  validacion de que la imagen si se esta resiviendo 
   if(req.files){
       // verifivcacion de ruta del archivo , el nombre y la extencion  
       // file es para verificar si el archivo esta existe o cual es la ruta 
       var rutaArchivo =req.files.Audio.path;
       console.log(rutaArchivo);

       var partirArchivo =rutaArchivo.split('\\');
       console.log(partirArchivo);

       var nombreArchivo = partirArchivo[2];
       console.log(nombreArchivo);

       var extencionImg = nombreArchivo.split('\.');
       console.log(extencionImg);

       var extencionArchivo= extencionImg[1];
       console.log(extencionArchivo);




       // validacion del formato de cada imagen y si es aceptable 

       if(extencionArchivo == "mp3" || extencionArchivo == "ogg" ){
           // actualizar del cancion, el campo imagen que inicialmente teníamos null
           Cancion.findByIdAndUpdate(cancionId,{imagen:nombreArchivo},(err,cancionAudio)=>{
              if(err){
                  res.status(500).send({message: "Error en le servidor"}) ;            
             }else{
                 if(!cancionAudio){
                     res.status(200).send({message:"no fue posible subir el audio"});
                 }else{
                     res.status(200).send({
                         Audio:nombreArchivo,
                         usuario:cancionAudio                       
                       });
                 }
             }
           });
           // validacion de la extención
       }else{
           //  formato invalido
           res.status(200).send({message:"Formato Invalido !!solo mp3 y ogg"});

           }
       }else{
       // no existe una imagen para subir
       res.status(200).send({message:"no has subido audio"});
       }


    }
   //  MOSTRAR Archivo

 function mostrarArchivoAudio(req,res){
   // pedir archivo que queremos mostrar
       var archivo=req.params.audioFile;
       // varificamos la carpeta
       var ruta ='./archivos/audiosmp3/'+ archivo;
       // validar si existe la imagen
       // fs.exists('el archivo existe')
       fs.exists(ruta, (exists)=>{
               if (exists){
                   res.sendFile(path.resolve(ruta));                    
               }else{
                   res.status(200).send({menssage:"audio no encontrada"});
               }
       });
   }



module.exports = {
    crearCancion,
    mostrarCancion,
    actualizarCancion,
    eliminarCancion,
    mostrarCanciones,
    subirImgCancion,
    mostrarArchivo,
    subiraudioCancion,
    mostrarArchivoAudio
}
