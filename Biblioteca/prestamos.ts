import {lecturaArchivoLibros} from "./biblioteca";

declare var require;
const fs = require('fs');

declare var Promise:any;
const fechaActual = new Date();

export const prestamosLibros: any = [];

export interface prestamosInterface{
    fecha: string;
    nombreLibro: string;
    fechaEntrega: string;
}

const prestamoejm:prestamosInterface = {
    fecha: fechaActual.getDate()+'/'+(fechaActual.getMonth()+1)+'/'+fechaActual.getFullYear(),
    nombreLibro: 'Odisea',
    fechaEntrega: fechaActual.getDate()+'/'+(fechaActual.getMonth()+2)+'/'+fechaActual.getFullYear()
};

export const lecturaArchivoPrestamos = new Promise(
    (resolve, reject) => {
        fs.readFile('prestamos.json','utf-8',
            (err, contenidoArchivo)=>{
                if (err) {
                    resolve('');
                } else {
                    resolve(contenidoArchivo);
                }
            });
    }
);

const escrituraArchivoPrestamos = (contenidoLeido:string, datosLibro:string) => {
    return new Promise(
        (resolve, reject) => {
            const  contenido = contenidoLeido ? contenidoLeido + datosLibro: datosLibro;
            fs.writeFile('prestamos.json', contenido,
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

export const crearPrestamo = (arreglosPrestamos, nuevoPrestamo) =>{
    arreglosPrestamos.push(nuevoPrestamo);
    return new Promise(
        (resolve, reject) => {
            //const archivo:string = 'prestamos.json';
            const datosPrestamo:string = '\n' + JSON.stringify(nuevoPrestamo);
            lecturaArchivoPrestamos
                .then(
                    (contenidoArchivo)=>{
                        return escrituraArchivoPrestamos(contenidoArchivo,datosPrestamo);
                    }
                )

        }
    )
};
