"use strict";

/* CREAMOS UNA VARIABLE QUE GUARDARÁ LOS RESULTADOS QUE NOS DEVUELVE EL DADO */

let cadenaDeDado = [];

/* POR DEFECTO LA SUMA DE LAS TIRADAS DE LOS DADOS SERÁ 0 */

//const reducer = (accumulator, currentValue);
let sumDado = 0;

//FUNCIÓN TIRARDADO
function tirarDado() {
  for (let i = 0; sumDado <= 50; i++) {
    //INDICAMOS QUE LOS NÚMEROS QUE PUEDE DEVOLVER EL DADO SON ENTRE 1 Y 6
    let numDado = Math.round(Math.random() * (1, 5) + 1);

    //DEVUELVE EL RESULTADO
    console.log(numDado);

    //AÑADIMOS EL RESULTADO AL ARRAY VACÍO DECLARADO ANTES
    cadenaDeDado.push(numDado);
    console.log(cadenaDeDado);

    //SE SUMARÁN LOS RESULTADOS
    sumDado += cadenaDeDado[i];

    //MUESTRA EN CONSOLA LA SUMA DE TODAS LAS TIRADAS
    console.log(sumDado);

    //MUESTRA EN CONSOLA EL NÚMERO DE TIRADAS Y LA SUMA TOTAL DE ÉSTAS
    console.log(
      `Vas por la tirada nº ${cadenaDeDado.length} y tienes un total de ${sumDado}`
    );
  }
  //CUANDO EL TOTAL ASCIENDE A 50, SALDRÁ EL SIGUIENTE MENSAJE
  if (sumDado >= 50) {
    console.log(`Enhorabuena, tienes un total de ${sumDado}`);
  }
}
tirarDado(1, 6);
