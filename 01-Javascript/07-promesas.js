const fs = require('fs');
/*
const nuevaPromesaLectura = new Promise(
    (resolve, reject) => {
            fs.readFile('06-texto23.txt','utf-8',
                (err, contenidoArchivo)=>{
                if (err) {
                    resolve('');
                } else {
                    resolve(contenidoArchivo);
                }
                });
    }
);

const nuevaPromesaEscritura = (contenidoLeido) => {
    return new Promise(
        (resolve, reject) => {
            const  contenido = contenidoLeido ? contenidoLeido + 'Otro ola' : 'Otro ola';
            fs.writeFile('06-texto.txt', contenido,
                (err,) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(contenido);
                    }
                });
        }
    );
};

console.log(nuevaPromesaLectura);

nuevaPromesaLectura
    .then(
        (resultadoOk)=> {
            console.log('Todo bien',resultadoOk);
            return nuevaPromesaEscritura(resultadoOk);
        }
    )
    .then(
        (contenidoCompleto)=>{
            console.log('Contenido completo', contenidoCompleto)
        }
    )
    .catch(
        (resultadoError)=> {
            console.log('Algo malo paso', resultadoError);
        }
    );


function appendFile(nombreArchivo, contenidoArchivo) {
    const PromesaAppendFileLectura = new Promise(
        (resolve, reject) => {
            fs.readFile(nombreArchivo, 'utf-8',
                (err, contenidoArchivo) => {
                    if (err) {
                        resolve('');
                        console.log('error');
                    } else {
                        resolve(contenidoArchivo);
                    }
                });
        }
    );
    const PromesaAppendFIleEscritura = (contenidoLeido) => {
        return new Promise(
            (resolve, reject) => {
                const contenido = contenidoLeido ? contenidoLeido:
                fs.writeFile(nombreArchivo, contenido,
                    (err,) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(contenido);
                        }
                    });
            }
        );
    };
}

appendFile('07-Promesas.txt', 'Hola');*/

const promesaEjercicioArchivos = (indice, string) => {  //Promesa para escritura
    return new Promise(
        (resolve, reject) => {
            const archivo = `${indice}-${string}.txt`;
            const contenido = string;
            fs.writeFile(archivo,
                contenido,
                (err) => {
                    if(err) {
                        reject(err);
                    } else {
                        const respuesta = {
                            nombreArchivo: archivo,
                            contenidoArchivo: contenido,
                            error: err
                        };

                        resolve(respuesta);
                    }
                })
        }
    )
};
const arregloStrings = ['E', 'F', 'G'];
const arregloResultados = [];

arregloStrings.forEach(
    (string, index) => {
        promesaEjercicioArchivos(index, string)
            .then(
                (respuesta) => {

                    arregloResultados.push(respuesta);
                    console.log(arregloResultados);
                }
            )
            .catch(
                (error) => {
                    console.log('Error', error);
                }
            );
    }
);

console.log(arregloStrings);

const funcionConCallback = function (parametros, callback){
    callback() //...
};

const funcionConPromesa = function (parametros){
    return new Promise(
        (resolve, reject) => {
            console.log(arregloRespuestas)
        }
    )
};