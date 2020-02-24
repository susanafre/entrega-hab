'use strict';

let cadenaDeDado = [];
//const reducer = (accumulator, currentValue);
let sumDado = 0;

//número de veces que se tira el dado
function tirarDado() {
  for (let i = 0; sumDado <= 50; i++) {
    let numDado = Math.round(Math.random() * (1, 5) + 1);
    console.log(numDado);
    cadenaDeDado.push(numDado);
    console.log(cadenaDeDado);
    sumDado += cadenaDeDado[i];

    console.log(sumDado);
    console.log(`Vas por la tirada nº ${cadenaDeDado.length} y tienes un total de ${sumDado}`);
  }
  if (sumDado >= 50) {
    console.log(`Enhorabuena, tienes un total de ${sumDado}`);
  }
}
tirarDado(1, 6);
