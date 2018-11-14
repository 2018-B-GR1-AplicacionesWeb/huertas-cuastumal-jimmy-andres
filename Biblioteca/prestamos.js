"use strict";
exports.__esModule = true;
var fs = require('fs');
var fechaActual = new Date();
exports.prestamosLibros = [];
var prestamoejm = {
    fecha: fechaActual.getDate() + '/' + (fechaActual.getMonth() + 1) + '/' + fechaActual.getFullYear(),
    nombreLibro: 'Odisea',
    fechaEntrega: fechaActual.getDate() + '/' + (fechaActual.getMonth() + 2) + '/' + fechaActual.getFullYear()
};
exports.lecturaArchivoPrestamos = new Promise(function (resolve, reject) {
    fs.readFile('prestamos.json', 'utf-8', function (err, contenidoArchivo) {
        if (err) {
            resolve('');
        }
        else {
            resolve(contenidoArchivo);
        }
    });
});
var escrituraArchivoPrestamos = function (contenidoLeido, datosLibro) {
    return new Promise(function (resolve, reject) {
        var contenido = contenidoLeido ? contenidoLeido + datosLibro : datosLibro;
        fs.writeFile('prestamos.json', contenido, function (err) {
            if (err) {
                reject(err);
            }
            else {
                resolve(contenido);
            }
        });
    });
};
exports.crearPrestamo = function (arreglosPrestamos, nuevoPrestamo) {
    arreglosPrestamos.push(nuevoPrestamo);
    return new Promise(function (resolve, reject) {
        //const archivo:string = 'prestamos.json';
        var datosPrestamo = '\n' + JSON.stringify(nuevoPrestamo);
        exports.lecturaArchivoPrestamos
            .then(function (contenidoArchivo) {
            return escrituraArchivoPrestamos(contenidoArchivo, datosPrestamo);
        });
    });
};
