"use strict";
exports.__esModule = true;
var biblioteca_1 = require("./biblioteca");
var prestamos_1 = require("./prestamos");
var inquirer = require('inquirer');
var fechaActual = new Date();
function start() {
    inquirer
        .prompt([
        {
            type: 'list', name: 'Menu', message: 'Seleccione una opcion',
            choices: ['Agregar libro', 'Listar libros', 'Prestamo libro', 'Salir']
        }
    ])
        .then(function (opcionMenu) {
        //console.log(opcionMenu.Menu);
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
                    biblioteca_1.agregarLibro(biblioteca_1.libros, libroNuevo);
                    console.log('Libro ingresado con exito.!');
                    start();
                });
                break;
            case 'Listar libros':
                biblioteca_1.listarLibros();
                start();
                break;
            case 'Prestamo libro':
                biblioteca_1.listarLibros();
                //console.log('Escoja un libro de la lista');
                inquirer.prompt([
                    {
                        type: 'input', name: 'Titulo', message: 'Ingrese el tituo del Libro'
                    }
                ])
                    .then(function (respuestasNuevoPrestamo) {
                    var nuevoPrestamo = {
                        fecha: fechaActual.getDate() + '/' + (fechaActual.getMonth() + 1) + '/' + fechaActual.getFullYear(),
                        nombreLibro: respuestasNuevoPrestamo.Titulo,
                        fechaEntrega: fechaActual.getDate() + '/' + (fechaActual.getMonth() + 2) + '/' + fechaActual.getFullYear()
                    };
                    prestamos_1.crearPrestamo(prestamos_1.prestamosLibros, nuevoPrestamo);
                    console.log('Prestamo registrado con exito.!');
                    start();
                });
                break;
            case 'Salir':
                break;
        }
    });
}
start();
