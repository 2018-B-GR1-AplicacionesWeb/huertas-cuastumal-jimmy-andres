"use strict";
//import {agregarLibro, libros} from "./biblioteca";
exports.__esModule = true;
var biblioteca_1 = require("./biblioteca");
var inquirer = require('inquirer');
function start() {
    inquirer
        .prompt([
        {
            type: 'list', name: 'Menu', message: 'Seleccione una opcion',
            choices: ['Agregar libro', 'Eliminar libros', 'Prestamo libro', 'Salir']
        }
    ])
        .then(function (opcionMenu) {
        console.log(opcionMenu.Menu);
        switch (opcionMenu.Menu) {
            case 'Agregar libro':
                console.log('1');
                inquirer.prompt([
                    {
                        type: 'input', name: 'Titulo', message: 'Ingrese el tituo del Libro'
                    },
                    {
                        type: 'input', name: 'Autor', message: 'Ingrese el autor del Libro'
                    },
                    {
                        type: 'input', name: 'Genero', message: 'Ingrese el genero del Libro'
                    }
                ])
                    .then(function (respuestasNuevoLibro) {
                    var libroNuevo = {
                        titulo: respuestasNuevoLibro.Titulo,
                        autor: respuestasNuevoLibro.Autor,
                        genero: respuestasNuevoLibro.Genero
                    };
                    biblioteca_1.agregar(biblioteca_1.libros, libroNuevo);
                    console.log('Libro ingresado con exito.!');
                    start();
                });
                break;
            case 'Eliminar libros':
                console.log('3');
                break;
            case 'Prestamo libro':
                console.log('4');
                break;
            case 'Salir':
                break;
        }
    });
}
start();
