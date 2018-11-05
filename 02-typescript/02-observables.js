//import {} from 'rxjs';
//import * as rxjs from 'rxjs';
//import {Observable} from 'rxjs';
const rxjs = require('rxjs');
const map = require('rxjs/operators').map;
const disctinct = require('rxjs/operators').distinct;
const observableUno$ = rxjs.of([1, 2, 3], 3, 'hola', 3, true, { nombre: 'andres' }, new Date(), 3, 3);
console.log(observableUno$);
observableUno$
    .pipe(disctinct(), map((valor) => {
    console.log('valor', valor);
    return {
        data: valor
    };
}))
    .subscribe((ok) => {
    console.log('en ok', ok);
}, (error) => {
    console.log(error);
}, () => {
    console.log('Completado');
});
const promesita = () => {
    return new Promise((resolve, reject) => {
        resolve(':)');
    });
};
async function ejecutarCodigoSyncrono() {
    console.log('inicio');
    try {
        const resultadoPromesita = await promesita();
        console.log(resultadoPromesita);
    }
    catch (e) {
        console.log('error en promesita', e);
    }
    console.log('fin');
}
ejecutarCodigoSyncrono();
/*
const observableDePromesa$ = rxjs.from(promesita());


observableDePromesa$
    .pipe(
        map(
            (valor)=>{
                return{
                    data: valor
                }
            }
        )
    )
    .subscribe(
        (objetoFeliz)=>{
            console.log(objetoFeliz);
        },
        (error)=>{
            console.log(error);
        }
    );
*/ 
