//import * as inquirer from 'inquirer';

//var inquirer = require("inquirer");

declare var require;
const inquirer = require('inquirer');
declare var Promise:any;

export const libros: any = [];

export interface libroInterface {
    titulo: string;
    autor: string;
    genero: string;
}
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

export const agregar = (arreglosLibros, libroNuevo) =>{
    arreglosLibros.push(libroNuevo);
    return new Promise(
        (resolve, reject) => {
            resolve(
                console.log(libros)
            );
            reject({
                mensaje: 'NO SE CREO JUEGO'
            });
        }
    )
};
