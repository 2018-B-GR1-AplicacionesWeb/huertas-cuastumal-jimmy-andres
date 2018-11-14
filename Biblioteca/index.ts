
import {agregarLibro, lecturaArchivoLibros, libroInterface, libros, listarLibros} from "./biblioteca";
import {crearPrestamo, prestamosInterface, prestamosLibros} from "./prestamos";

declare var require;
const inquirer = require('inquirer');

const fechaActual = new Date();

function start() {
    inquirer
        .prompt([
            {
                type: 'list', name: 'Menu', message: 'Seleccione una opcion',
                choices: ['Agregar libro', 'Listar libros', 'Prestamo libro', 'Salir']
            }
        ])
        .then(opcionMenu => {
            //console.log(opcionMenu.Menu);
            switch (opcionMenu.Menu) {
                case 'Agregar libro':
                    console.log('1');
                    inquirer.prompt([
                        {
                            type: 'input', name: 'Titulo', message: 'Ingrese el tituo del Libro'},
                        {
                            type: 'input', name: 'Autor', message: 'Ingrese el autor del Libro'},
                        {
                            type: 'input', name: 'Genero', message: 'Ingrese el genero del Libro'}
                    ])
                        .then(respuestasNuevoLibro => {
                            const libroNuevo: libroInterface = {
                                titulo: respuestasNuevoLibro.Titulo,
                                autor: respuestasNuevoLibro.Autor,
                                genero: respuestasNuevoLibro.Genero
                            };
                            agregarLibro(libros, libroNuevo);
                            console.log('Libro ingresado con exito.!');
                            start();
                        });
                    break;
                case 'Listar libros':
                    listarLibros();
                    start();
                    break;
                case 'Prestamo libro':
                    listarLibros();
                    //console.log('Escoja un libro de la lista');
                    inquirer.prompt([
                        {
                            type: 'input', name: 'Titulo', message: 'Ingrese el tituo del Libro'}
                    ])
                        .then(respuestasNuevoPrestamo=> {
                            const nuevoPrestamo: prestamosInterface = {
                                fecha: fechaActual.getDate()+'/'+(fechaActual.getMonth()+1)+'/'+fechaActual.getFullYear(),
                                nombreLibro: respuestasNuevoPrestamo.Titulo,
                                fechaEntrega: fechaActual.getDate()+'/'+(fechaActual.getMonth()+2)+'/'+fechaActual.getFullYear()
                            };
                            crearPrestamo(prestamosLibros, nuevoPrestamo);
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