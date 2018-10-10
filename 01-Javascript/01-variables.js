//Tipados Int edad=1;
var edad =1; // number
var sueldo =1.01; //number
var nombre = "Andres"; //String
var nombre = 'Andres' ; //String
var nombre = `Andres`; //String
var casado = false; // boolean
var hijos = null; // object
var cuatroBrazos; // undefined
var fecha = new Date();

console.log('fecha', fecha);
console.log(typeof fecha);


var andresJSON ={
    "nombre":'Andres',
    "edad": 21,
    "sueldo": 12.2,
    "casado": false,
    "hijos": null.,
    "mascota":{
        "nombre": "cachetes"
    }
}; //object

var andres ={
    'nombre':'Andres',
    "edad": 21,
    sueldo: 12.2,
    casado: false,
    hijos:null,
    deberes: undefined,
    mascota:{
        nombre: 'cachetes'
    },
}; //object

console.log(andres.nombre); // 'Andres"

//truthy
//falsy
if (""){
    console.log("si");//truthy
} else{
    console.log("no");//falsy
}
