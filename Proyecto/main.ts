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

const  preguntaBuscarLibroPorNombre = {
    type: 'input',
    name: 'nombreABuscar',
    message: 'Ingrese el nombre del libro a buscar'
};

function main() {
    console.log('ok');

    inicializarBase()
        .pipe(
            mergeMap(
                (respuestaBDD: RespuestaBDD) => {
                    return preguntarMenuPrincipal()
                        .pipe(
                            map(
                                (respuesta: OpcionesPreguntaMenuPrincipal) => {
                                    return {
                                        respuestaUsuario: respuesta,
                                        respuestaBDD
                                    }
                                }
                            )
                        )
                }
            ),
            mergeMap(
                (respuesta: RespuestaUsuario) => {
                    console.log(respuesta);
                    switch (respuesta.respuestaUsuario.opcionMenu){
                        case 'Agregar Libro':
                            return preguntarDatosLibro()
                                .pipe(
                                    map(
                                        (libro) =>{
                                            respuesta.libro = libro;
                                            return respuesta;
                                        }
                                    )
                                );
                        case "Buscar Libro":
                            return preguntarLibroABuscarPorNombre()
                                .pipe(
                                    map(
                                        (nombreLibro) => {
                                            respuesta.nombreLibro = nombreLibro.nombreABuscar;
                                            return respuesta;
                                        }
                                    )
                                );
                        default:
                            return 'no entro';
                    }
                }
            ),
            map(
                (respuesta: RespuestaUsuario) => {
                    console.log('ejecutando');
                        switch(respuesta.respuestaUsuario.opcionMenu){
                            case 'Agregar Libro':
                                const libroNuevo = respuesta.libro;
                                respuesta.respuestaBDD.bdd.libros.push(libroNuevo);
                                return respuesta;
                            case 'Buscar Libro':
                                const nombreLibro = respuesta.nombreLibro;

                                buscarPorNombre(nombreLibro);
                                return respuesta;


                        }
                }
            ),
            mergeMap(
                (respuesta: RespuestaUsuario) => {
                    return guardarBase(respuesta.respuestaBDD.bdd);
                }
            )
        ).subscribe(
        (mensaje) => {
            console.log(mensaje);
        },
        (error) => {
            console.log(error);
        }, () => {
            console.log('Completado');
            main();
        }
    )
}
function inicializarBase() {

    const leerBDD$ = rxjs.from(leerBDD());

    return leerBDD$
        .pipe(
            mergeMap(
                (respuestaLeerBDD: RespuestaBDD) => {
                    if (respuestaLeerBDD.bdd) {
                        // truty / {}
                        return rxjs.of(respuestaLeerBDD)
                    } else {
                        // falsy / null
                        return rxjs.from(crearBDD())
                    }
                }
            )
        )
    ;
}
function preguntarMenuPrincipal() {
    return rxjs.from(inquirer.prompt(preguntasMenuPrincipal));
}
function preguntarDatosLibro() {
    return rxjs.from(inquirer.prompt(preguntasAgregarLibro));
}
function preguntarLibroABuscarPorNombre() {
    return rxjs.from(inquirer.prompt(preguntaBuscarLibroPorNombre));
}
function leerBDD(){
    return new Promise(
        (resolve) => {
            fs.readFile(
                'bddlibros.json',
                'utf-8',
                (error, contenidoLeido) => {
                    if (error) {
                        resolve({
                            mensaje: 'Base de datos vacia',
                            bdd: null
                        });
                    } else {
                        resolve({
                            mensaje: 'Si existe la Base',
                            bdd: JSON.parse(contenidoLeido)
                        });
                    }

                }
            );
        }
    );
}
function crearBDD() {
    const contenidoInicialBDD = '{"libros": [] }';
    return new Promise(
        (resolve, reject) => {
            fs.writeFile(
                'bddlibros.json',
                contenidoInicialBDD,
                (err) => {
                    if (err) {
                        reject({
                            mensaje: 'Error creando Base',
                            error: 500
                        });
                    } else {
                        resolve({
                            mensaje: 'BDD creada',
                            bdd: JSON.parse(contenidoInicialBDD)
                        });
                    }

                }
            )

        }
    )
}
main();
function guardarBase(bdd: BaseDeDatos) {
    return new Promise(
        (resolve, reject) => {
            fs.writeFile(
                'bddlibros.json',
                JSON.stringify(bdd),
                (err) => {
                    if (err) {
                        reject({
                            mensaje: 'Error guardando BDD',
                            error: 500
                        })
                    } else {
                        resolve({
                            mensaje: 'BDD guardada'
                        })
                    }
                }
            )
        }
    );
}

function buscarLibroPorNombre(nombre) {
    return new Promise(
        (resolve, reject) => {
            fs.readFile('bddlibros.json', 'utf-8',
                (err, contenido) => {
                    if (err) {
                        reject({mensaje: 'Error leyendo'});
                    } else {
                        const bdd = JSON.parse(contenido);

                        const respuestaFind = bdd.libros
                            .find(
                                (libro) => {
                                    return libro.nombre === nombre;
                                }
                            );

                        resolve(respuestaFind);
                    }
                });
        }
    );
}

function buscarPorNombre(nombre) {
    fs.readFile('bddlibros.json', 'utf-8',
        (err, contenido) => {
            if (err) {
                err({mensaje: 'Error leyendo'});
            } else {
                const base = JSON.parse(contenido);
                const respuestaFind = base.libros.
                    find((libro) => {
                    return libro.nombre === nombre;
                    }
                );
                console.log(respuestaFind);
                return respuestaFind;

            }
        }
    );

}

interface BaseDeDatos {
    libros: Libro [];
}
interface RespuestaBDD {
    mensaje: string,
    bdd: BaseDeDatos
}

interface Libro {
    nombre: string;
    autor: string;
    genero: string;
}

interface OpcionesPreguntaMenuPrincipal{
    opcionMenu: 'Agregar Libro' | 'Borrar Libro' | 'Buscar Libro' | 'Actualizar Libro'
}

interface RespuestaUsuario {
    respuestaUsuario: OpcionesPreguntaMenuPrincipal,
    respuestaBDD: RespuestaBDD,
    libro?: Libro,
    nombreLibro : string
}
