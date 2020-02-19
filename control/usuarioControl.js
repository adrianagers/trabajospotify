/* 
    Se encargara de recibir los datos que el usuario realiza desde la vista, procesandolos
    para enviarlos al modelo y que este los pueda corroborar con la base de datos para posteriormente
    guardarlos, tambien tendra toda la logica de las consultas, actualizaciones y eliminaciones.
*/

const Usuario = require('../modelo/usuario'); // Importamos el modelo de usuario
const fs = require('fs');
const path =require('path');


// Funcion registro de usuario
function crearUsuario(req, res){
    // Instanciar el objeto Usuario 
    var usuario = new Usuario();

    // Guardar el cuerpo de la petición para mejor acceso de los datos que el usuario esta enviando
    // parametros = {"nombre": "", "apellido": "", "correo": "", "contraseña": ""}

    var parametros = req.body;

    //
    
    usuario.nombre = parametros.nombre;
    usuario.apellido = parametros.apellido;
    usuario.correo = parametros.correo;
    usuario.contrasena = parametros.contrasena;
    usuario.rol = "usuario";
    usuario.imagen = null;

    // Guardar y validar los datos
    // db.coleccion.insert()
    usuario.save((err, usuarioNuevo)=>{
        if(err){
            // El primner error a validar sera a nivel de servidor e infraestructura
            // para esto existen states o estados.
            res.status(500).send({ message: "Error en el servidor"});
        } else {
            if(!usuarioNuevo){
                // 404 -> Pagina no encontrada
                // 200 -> Ok pero con una alerta indicando que los datos invalidos
                res.status(200).send({message: "No fue posible realizar el registro"});
            } else {
                res.status(200).send({usuario: usuarioNuevo});
            }
        }
    });

}

// LOGIN USUARIO

function login(req, res){
    var parametros = req.body;
    var correoUsuario = parametros.correo;
    var contraUsuario = parametros.contrasena;

    // Buscamos al usuario a través del correo. Usaremos toLowerCase() para evitar problema de datos

    Usuario.findOne({correo: correoUsuario.toLowerCase()}, (err, usuarioLogueado)=>{
        if(err){
            res.status(500).send({message: "Error en el servidor!!"});
        } else {
            if(!usuarioLogueado){
                res.status(200).send({message: "No has podido iniciar sesión. Verifica los datos"});
            }else{
                if(usuarioLogueado.contrasena != contraUsuario){
                    res.status(200).send({message: "Contraseña incorrecta"});
                }else{
                    res.status(200).send({usuario: usuarioLogueado});
                }
            }
        }
    });
}
 function actualizarUsuario(req,res){
     var usuarioId =req.params.id;
     var nuevosDatosUsuario= req.body;
     usuario.findByIdAndUpdate(usuarioId,nuevosDatosUsuario,(err, usuarioActualizado)=>{
         if(err){
             res.status(500).send({message:"error en el servidor"});
         }else{
             if(!usuarioActualizado){
                 res.status(200).send({message:"no fue editado el nombre"});
             }else{
                 res.status(200).send({usuario: usuarioActualizado})
             }
         }
     });
 }
// subir una imagen
 function subirImg(req,res){
     var usuarioId=req.params.id;
     var nombreArchivo = "No he subido ninguna imagen";
    //  validacion de que la imagen si se esta resiviendo 
    if(req.files){
        // verifivcacion de ruta del archivo , el nombre y la extencion  
        // file es para verificar si el archivo esta existe o cual es la ruta 
        var rutaArchivo =req.files.imagen.path;
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
            // actualizar del usuario, el campo imagen que inicialmente teníamos null
            Usuario.findByIdAndUpdate(usuarioId,{imagen:nombreArchivo},(err,usuarioConImg)=>{
               if(err){
                   res.status(500).send({message: "Error en le servidor"}) ;            
              }else{
                  if(!usuarioConImg){
                      res.status(200).send({message:"no fue posible subir la img"});
                  }else{
                      res.status(200).send({
                          imagen:nombreArchivo,
                          usuario:usuarioConImg                       
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
        var ruta ='./archivos/usuarios/'+ archivo;
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

// Exportacion de las funciones creadas 

module.exports = {
    crearUsuario,
    login,
    actualizarUsuario,
    subirImg,
    mostrarArchivo
}