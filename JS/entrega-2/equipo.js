"use strict";

let equipoMaria = [62, 34, 55];

let equipoPaula = [35, 60, 59];

let equipoRebeca = [40, 39, 63];

let resultado = equipoMaria[0] + equipoMaria[1] + equipoMaria[2];

let resultadoUno = equipoPaula[0] + equipoPaula[1] + equipoPaula[2];

let resultadoDos = equipoRebeca[0] + equipoRebeca[1] + equipoRebeca[2];

let mayorPuntuacion = [];

function addToArray() {
  let sumaMedia = resultado / equipoMaria.length;
  console.log(sumaMedia);
  mayorPuntuacion.push(sumaMedia);
}

addToArray();

function addToArrayOne() {
  let sumaMedia = resultadoUno / equipoPaula.length;
  console.log(sumaMedia);
  mayorPuntuacion.push(sumaMedia);
}

addToArrayOne();

function addToArrayTwo() {
  let sumaMedia = resultadoDos / equipoRebeca.length;
  console.log(sumaMedia);
  mayorPuntuacion.push(sumaMedia);
}
console.log(mayorPuntuacion);

addToArrayTwo();

if (mayorPuntuacion[0] >= mayorPuntuacion[1]) {
  console.log(`El equipo ganador es el de María`);
} else if (mayorPuntuacion[1] >= mayorPuntuacion[2]) {
  console.log(`El equipo ganador es el de Paula`);
} else {
  console.log(`El equipo ganador es el de Rebeca`);
}
