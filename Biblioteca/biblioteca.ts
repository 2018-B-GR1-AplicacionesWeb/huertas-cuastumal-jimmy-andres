//import * as inquirer from 'inquirer';

//var inquirer = require("inquirer");

declare var require;
const inquirer = require('inquirer');
const fs = require('fs');

declare var Promise:any;

export const libros: any = [];

export interface libroInterface {
    titulo: string;
    autor: string;
    genero: string;
}

const libroEjemplo: libroInterface = {
    titulo:'libropueba',
    autor:'aninimo',
    genero:'comedia'
};


export const lecturaArchivoLibros = new Promise(
    (resolve, reject) => {
        fs.readFile('libros.json','utf-8',
            (err, contenidoArchivo)=>{
                if (err) {
                    resolve('');
                } else {
                    resolve(contenidoArchivo);
                }
            });
    }
);

const escrituraArchivoLibros = (contenidoLeido:string, datosLibro:string) => {
    return new Promise(
        (resolve, reject) => {
            const  contenido = contenidoLeido ? contenidoLeido + datosLibro: datosLibro;
            fs.writeFile('libros.json', contenido,
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

export const agregarLibro = (arreglosLibros, libroNuevo) =>{
    arreglosLibros.push(libroNuevo);
    return new Promise(
        (resolve, reject) => {
            const archivo:string = 'libros.json';
            const datosLibro:string = '\n' + JSON.stringify(libroNuevo);
            lecturaArchivoLibros
                .then(
                    (contenidoArchivo)=>{
                        return escrituraArchivoLibros(contenidoArchivo,datosLibro);
                    }
                )
                .then(
                    (contenidoActualizado)=>{
                        console.log('Contenido completo: \n', contenidoActualizado);
                    }
                )
        }
    )
};

export const listarLibros = () =>{
    return new Promise(
        (resolve, reject) => {
            lecturaArchivoLibros
                .then(
                    (contenidoArchivo)=>{
                        console.log('\n*****Libros*****\n', contenidoArchivo);
                    }
                )
        }
    )
};
