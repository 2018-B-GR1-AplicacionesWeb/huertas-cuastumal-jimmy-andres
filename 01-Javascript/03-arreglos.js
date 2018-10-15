var arreglo = [ ];
arreglo = [
    1,
    "Andres",
    false,
    null,
    new Date(),
    {
        nombre:"Jimmy"
    },
    [1,2,false,true]
];
 console.log(arreglo);
 arreglo.push(3);
 console.log(arreglo);
 arreglo.pop();
 console.log(arreglo);

 var arregloNumeros = [1,2,3,4,5];
 arregloNumeros.splice(1,0,1.1);
 console.log(arregloNumeros);
 arregloNumeros.splice(4,1);
 console.log(arregloNumeros);
 var indiceDelNumerDos = arregloNumeros.indexOf(2);
 console.log(indiceDelNumerDos);
 arregloNumeros.splice(indiceDelNumerDos,0,1.2,1.3,1.4,1.5,1.6,1.7,1.8,1.9);
 console.log(arregloNumeros);
 var indiceUnoSiete = arregloNumeros.indexOf(1.7);
 console.log(arregloNumeros[indiceUnoSiete]); // 1.7
console.log(arregloNumeros[0]); // 1
var posicionInicialUnoUno = arregloNumeros.indexOf(1.1);
var posicionInicialUnoNueve = arregloNumeros.indexOf(1.9);

var desdeElUnoUnoAlUnoNueve = (posicionInicialUnoNueve -posicionInicialUnoUno + 1);

var arregloArgumentos = [posicionInicialUnoUno, desdeElUnoUnoAlUnoNueve];
arregloNumeros.splice(...arregloArgumentos);
console.log(arregloNumeros);

var arregloUno = [1,2,3];
var arregloDos = [4,5,6];
//destructuracion de arreglos
console.log(1,2,3);
console.log(...arregloUno);
var arregloCompleto = [...arregloUno, ...arregloDos];
console.log(arregloCompleto);

//destructuracion de objetos
var andres ={
    nombre:"Andres",
    apellido: "Huertas",
    direccion: "Loma grande",
    casado:false,
    edad:21
};

var jimmy ={
    mascota:{
        nombre:"flopy"
    },
    fechaNacimiento: new Date('1997-06-10')
};
var datosDelUsuario ={
    ...andres,
    ...jimmy
};
console.log(datosDelUsuario);

//objetos
var atributosDelObjeto = Object.keys(datosDelUsuario);
console.log(atributosDelObjeto);
console.log(datosDelUsuario['nombre']);


