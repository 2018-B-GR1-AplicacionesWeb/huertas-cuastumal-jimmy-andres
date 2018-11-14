"use strict";
exports.__esModule = true;
//const inquirer = require('inquirer');
var fs = require('fs');
exports.libros = [];
var libroEjemplo = {
    titulo: 'libropueba',
    autor: 'aninimo',
    genero: 'comedia'
};
exports.lecturaArchivoLibros = new Promise(function (resolve, reject) {
    fs.readFile('libros.json', 'utf-8', function (err, contenidoArchivo) {
        if (err) {
            resolve('');
        }
        else {
            resolve(contenidoArchivo);
        }
    });
});
var escrituraArchivoLibros = function (contenidoLeido, datosLibro) {
    return new Promise(function (resolve, reject) {
        var contenido = contenidoLeido ? contenidoLeido + datosLibro : datosLibro;
        fs.writeFile('libros.json', contenido, function (err) {
            if (err) {
                reject(err);
            }
            else {
                resolve(contenido);
            }
        });
    });
};
exports.agregarLibro = function (arreglosLibros, libroNuevo) {
    arreglosLibros.push(libroNuevo);
    return new Promise(function (resolve, reject) {
        var archivo = 'libros.json';
        var datosLibro = '\n' + JSON.stringify(libroNuevo);
        exports.lecturaArchivoLibros
            .then(function (contenidoArchivo) {
            return escrituraArchivoLibros(contenidoArchivo, datosLibro);
        });
    });
};
exports.listarLibros = function () {
    return new Promise(function (resolve, reject) {
        exports.lecturaArchivoLibros
            .then(function (contenidoArchivo) {
            console.log('\n*****Libros*****\n', contenidoArchivo);
        });
    });
};
