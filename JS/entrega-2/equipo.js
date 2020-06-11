"use strict";

/* creamos una variable con las puntuaciones de cada equipo */
const equipoMaria = [62, 34, 55];
const equipoPaula = [35, 60, 59];
const equipoRebeca = [40, 39, 63];

//array donde se añadirán las puntuaciones de todos los equipos
const media = new Array();

//array donde se añadirá la media de cada equipo
const mediaMax = new Array();

//añadimos las puntuaciones al primer array creado
const count = media.push(equipoMaria, equipoPaula, equipoRebeca);

console.log(media);

//función que recorre el array con las puntuaciones y calcula
//la media de cada equipo añadiendola al otro array
function calculateMedia() {
  for (let i = 0; i < media.length; i++) {
    const reducer = media[i].reduce(
      (accumulator, currentValue) => accumulator + currentValue
    );

    mediaMax.push(reducer / media[i].length);
  }
}

calculateMedia();

//visualizamos el array con las medias
console.log(mediaMax);

function winnerTeam() {
  for (let i = 0; i < mediaMax.length; i++) {
    if (mediaMax[0] > mediaMax[1]) {
      console.log(
        `El equipo de María es el ganador con una media de ${mediaMax[0]} puntos`
      );
    } else if (mediaMax[1] > mediaMax[2]) {
      console.log(
        `El equipo de Paula es el ganador con una media de ${mediaMax[1]} puntos`
      );
    } else {
      console.log(
        `El equipo de Rebeca es el ganador con una media de ${mediaMax[2]} puntos`
      );
    }
  }
}
winnerTeam();
