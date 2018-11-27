const inquirer = require('inquirer');
const fs = require('fs');
const rxjs = require('rxjs');
const mergeMap = require('rxjs/operators').mergeMap;
const map = require('rxjs/operators').map;
const preguntasMenuPrincipal = {
    type: 'list',
    name: 'opcionMenu',
    message: 'Que quieres hacer',
    choices: [
        'Agregar Libro',
        'Borrar Libro',
        'Buscar Libro',
        'Actualizar Libro',
    ]
};
const preguntasAgregarLibro = [
    {
        type: 'input',
        name: 'nombre',
        message: 'Nombre del libro: '
    },
    {
        type: 'input',
        name: 'autor',
        message: 'Autor: '
    },
    {
        type: 'input',
        name: 'genero',
        message: 'Genero: '
    },
];
function main() {
    console.log('ok');
    inicializarBase()
        .pipe(mergeMap((respuestaBDD) => {
        return preguntarMenuPrincipal()
            .pipe(map((respuesta) => {
            return {
                respuestaUsuario: respuesta,
                respuestaBDD
            };
        }));
    }), mergeMap((respuesta) => {
        console.log(respuesta);
        switch (respuesta.respuestaUsuario.opcionMenu) {
            case 'Agregar Libro':
                return preguntarDatosLibro()
                    .pipe(map((libro) => {
                    respuesta.libro = libro;
                    return respuesta;
                }));
            default:
                return 'no entro';
        }
    }), map((respuesta) => {
        console.log('ejecutando');
        switch (respuesta.respuestaUsuario.opcionMenu) {
            case 'Agregar Libro':
                const libroNuevo = respuesta.libro;
                respuesta.respuestaBDD.bdd.libros.push(libroNuevo);
                return respuesta;
        }
    }), mergeMap((respuesta) => {
        return guardarBase(respuesta.respuestaBDD.bdd);
    })).subscribe((mensaje) => {
        console.log(mensaje);
    }, (error) => {
        console.log(error);
    }, () => {
        console.log('Completado');
        //main();
    });
}
function inicializarBase() {
    const leerBDD$ = rxjs.from(leerBDD());
    return leerBDD$
        .pipe(mergeMap((respuestaLeerBDD) => {
        if (respuestaLeerBDD.bdd) {
            // truty / {}
            return rxjs.of(respuestaLeerBDD);
        }
        else {
            // falsy / null
            return rxjs.from(crearBDD());
        }
    }));
}
function preguntarMenuPrincipal() {
    return rxjs.from(inquirer.prompt(preguntasMenuPrincipal));
}
function preguntarDatosLibro() {
    return rxjs.from(inquirer.prompt(preguntasAgregarLibro));
}
function leerBDD() {
    return new Promise((resolve) => {
        fs.readFile('bddlibros.json', 'utf-8', (error, contenidoLeido) => {
            if (error) {
                resolve({
                    mensaje: 'Base de datos vacia',
                    bdd: null
                });
            }
            else {
                resolve({
                    mensaje: 'Si existe la Base',
                    bdd: JSON.parse(contenidoLeido)
                });
            }
        });
    });
}
function crearBDD() {
    const contenidoInicialBDD = '{"libros": [] }';
    return new Promise((resolve, reject) => {
        fs.writeFile('bddlibros.json', contenidoInicialBDD, (err) => {
            if (err) {
                reject({
                    mensaje: 'Error creando Base',
                    error: 500
                });
            }
            else {
                resolve({
                    mensaje: 'BDD creada',
                    bdd: JSON.parse(contenidoInicialBDD)
                });
            }
        });
    });
}
main();
function guardarBase(bdd) {
    return new Promise((resolve, reject) => {
        fs.writeFile('bddlibros.json', JSON.stringify(bdd), (err) => {
            if (err) {
                reject({
                    mensaje: 'Error guardando BDD',
                    error: 500
                });
            }
            else {
                resolve({
                    mensaje: 'BDD guardada'
                });
            }
        });
    });
}
