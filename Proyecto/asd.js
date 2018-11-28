const fs = require('fs');
function buscarporNombre(nombre) {
    fs.readFile('bddlibros.json', 'utf-8',
        (err, contenido) => {
            if (err) {
                reject({mensaje: 'Error leyendo'});
            } else {
                const base = JSON.parse(contenido);
                console.log(base);

                const respuesta = base.libros.find(libro => {
                    return libro.nombre === nombre;
                });
               console.log(respuesta);
            }
        }
    );
}
buscarporNombre('asd');
