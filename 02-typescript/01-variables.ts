const nombre:string = '2312'
const edad:number =12;
const nada = null;
const casado: boolean = false;
let loQueSea:any = {};
loQueSea = 1;
loQueSea = 'facil';
loQueSea = true;
const fechaNacimiento:Date = new Date();

let identificador: number | string = '1';
identificador = 1;
identificador = 'uno';

//tsc nombreArchivo --target es3

interface usuarioInterface {
    nombre: string;
    apellido: string;
    edad?: number | string;
}

class Usuario{
    public nombre:string;
    public apellido:string;
    public eded?:number | string;
}
const usuario: usuarioInterface =
    {
    nombre: 'Andres',
    apellido: 'Huertas'
    };
usuario.edad = '2';

function  sumarDosNumeros(
    numeroUno:number,
    numeroDos:number

) {
    return numeroUno + numeroDos;
}
sumarDosNumeros(2,2);

const saludar = (nombre:string,
                 apellido?:string,
                 ...infinito:number[]): any =>{
    return 2;
};
let respuesta = <string> saludar('nombre','huertas',1,2,3,4);
respuesta= respuesta.toUpperCase();
let nombreDos ='andres'; //duck typing

