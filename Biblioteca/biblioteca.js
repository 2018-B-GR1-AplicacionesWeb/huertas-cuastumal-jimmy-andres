//const inquirer = require('inquirer');
const fs = require('fs');
export const libros = [];
const libroEjemplo = {
    titulo: 'libropueba',
    autor: 'aninimo',
    genero: 'comedia'
};
export const lecturaArchivoLibros = new Promise((resolve, reject) => {
    fs.readFile('libros.json', 'utf-8', (err, contenidoArchivo) => {
        if (err) {
            resolve('');
        }
        else {
            resolve(contenidoArchivo);
        }
    });
});
const escrituraArchivoLibros = (contenidoLeido, datosLibro) => {
    return new Promise((resolve, reject) => {
        const contenido = contenidoLeido ? contenidoLeido + datosLibro : datosLibro;
        fs.writeFile('libros.json', contenido, (err) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(contenido);
            }
        });
    });
};
export const agregarLibro = (arreglosLibros, libroNuevo) => {
    arreglosLibros.push(libroNuevo);
    return new Promise((resolve, reject) => {
        const archivo = 'libros.json';
        const datosLibro = '\n' + JSON.stringify(libroNuevo);
        lecturaArchivoLibros
            .then((contenidoArchivo) => {
            return escrituraArchivoLibros(contenidoArchivo, datosLibro);
        });
    });
};
export const listarLibros = () => {
    return new Promise((resolve, reject) => {
        lecturaArchivoLibros
            .then((contenidoArchivo) => {
            console.log('\n*****Libros*****\n', contenidoArchivo);
        });
    });
};
