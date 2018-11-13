"use strict";
//import * as inquirer from 'inquirer';
exports.__esModule = true;
var inquirer = require('inquirer');
exports.libros = [];
/*
function agregarLibro(
    titulo: string,
    autor: string,
    genero: string,
) {
    const libro: libroInterface = {
        titulo: titulo,
        autor: autor,
        genero: genero
    };
    libros.push(libro);
}

agregarLibro('Odisea', 'Homero', 'Drama');
agregarLibro('Iliada', 'Homero', 'Drama');
console.log(libros);*/
exports.agregar = function (arreglosLibros, libroNuevo) {
    arreglosLibros.push(libroNuevo);
    return new Promise(function (resolve, reject) {
        resolve(console.log(exports.libros));
        reject({
            mensaje: 'NO SE CREO JUEGO'
        });
    });
};
