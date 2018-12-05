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
        'Buscar Libro',
        'Borrar Libro',
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
const preguntaBuscarLibroPorNombre = {
    type: 'input',
    name: 'nombreABuscar',
    message: 'Ingrese el nombre del libro a buscar'
};
const preguntaBorrarLibroPorNombre = {
    type: 'input',
    name: 'nombreABorrar',
    message: 'Ingrese el nombre del libro a borrar'
};
const preguntasActualizarLibro = [
    {
        type: 'input',
        name: 'nombreActual',
        message: 'Nombre del libro a cabiar: '
    },
    {
        type: 'input',
        name: 'nuevoNombre',
        message: 'Ingrese en nuevo nombre: '
    }
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
            case "Buscar Libro":
                return preguntarLibroABuscarPorNombre()
                    .pipe(map((nombreLibro) => {
                    respuesta.nombreLibro = nombreLibro.nombreABuscar;
                    return respuesta;
                }));
            case 'Borrar Libro':
                return preguntarLibroABorrarPorNombre()
                    .pipe(map((nombreLibro) => {
                    respuesta.nombreLibro = nombreLibro.nombreABorrar;
                    return respuesta;
                }));
            case 'Actualizar Libro':
                return preguntarLibroAActualizarPorNombre()
                    .pipe(map((nombreLibro) => {
                    respuesta.nombreLibro = nombreLibro.nombreActual;
                    respuesta.nuevoNombre = nombreLibro.nuevoNombre;
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
            case 'Buscar Libro':
                const nombreLibro = respuesta.nombreLibro;
                buscarPorNombre(nombreLibro);
                return respuesta;
            case 'Borrar Libro':
                const nombreBorrar = respuesta.nombreLibro;
                borrarLibro(nombreBorrar);
                return respuesta;
            case 'Actualizar Libro':
                const nombreActual = respuesta.nombreLibro;
                const nuevoNombre = respuesta.nuevoNombre;
                editarLibro(nombreActual, nuevoNombre);
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
        main();
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
function preguntarLibroABuscarPorNombre() {
    return rxjs.from(inquirer.prompt(preguntaBuscarLibroPorNombre));
}
function preguntarLibroABorrarPorNombre() {
    return rxjs.from(inquirer.prompt(preguntaBorrarLibroPorNombre));
}
function preguntarLibroAActualizarPorNombre() {
    return rxjs.from(inquirer.prompt(preguntasActualizarLibro));
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
function buscarPorNombre(nombre) {
    fs.readFile('bddlibros.json', 'utf-8', (err, contenido) => {
        if (err) {
            err({ mensaje: 'Error leyendo' });
        }
        else {
            const base = JSON.parse(contenido);
            const respuestaFind = base.libros.
                find((libro) => {
                return libro.nombre === nombre;
            });
            console.log(respuestaFind);
            return respuestaFind;
        }
    });
}
function editarLibro(nombre, nuevoNombre) {
    return new Promise((resolve, reject) => {
        fs.readFile('bddlibros.json', 'utf-8', (err, contenido) => {
            if (err) {
                reject({ mensaje: 'Error leyendo' });
            }
            else {
                const base = JSON.parse(contenido);
                const indiceLibro = base.libros
                    .findIndex((libro) => {
                    return libro.nombre === nombre;
                });
                base.libros[indiceLibro].nombre = nuevoNombre;
                fs.writeFile('bddlibros.json', JSON.stringify(base), (err) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve({ mensaje: 'Libro Editado' });
                    }
                });
            }
        });
    });
}
function borrarLibro(nombre) {
    return new Promise((resolve, reject) => {
        fs.readFile('bddlibros.json', 'utf-8', (err, contenido) => {
            if (err) {
                reject({ mensaje: 'Error leyendo' });
            }
            else {
                const base = JSON.parse(contenido);
                const indiceLibro = base.libros
                    .findIndex((libro) => {
                    return libro.nombre === nombre;
                });
                base.libros.splice([indiceLibro], 1);
                fs.writeFile('bddlibros.json', JSON.stringify(base), (err) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve({ mensaje: 'Libro Editado' });
                    }
                });
            }
        });
    });
}
