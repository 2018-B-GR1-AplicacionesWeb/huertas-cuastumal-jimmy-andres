const fs = require('fs');

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

const PromesaAppendFileLectura= new Promise(
    (resolve, reject) => {
        fs.readFile(nombreArchivo,'utf-8',
            (err, contenidoArchivo)=>{
                if (err) {
                    resolve('');
                } else {
                    resolve(contenidoArchivo);
                }
            });
    }
);
const PromesaAppendFIleEscritura = (contenidoLeido) => {
    return new Promise(
        (resolve, reject) => {
            const  contenido = contenidoLeido ? contenidoLeido;
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