"use strict";

//Creamos un prompt donde añadimos un número
let eurosDolares = prompt("Dime un número");

//Llamada a la API
fetch("https://api.exchangerate-api.com/v4/latest/EUR")
  .then(function (response) {
    console.log(response);

    return response.json();
  })
  .then(function (myJson) {
    console.log(myJson);
    //Multiplica la cantidad introducida por la conversión a dólares
    const convertIntoDolar = myJson.rates.USD * eurosDolares;
    //Convierte a Yen
    const convertIntoYen = myJson.rates.JPY;

    //Saca por consola la conversión
    console.log(convertIntoDolar);
    console.log(convertIntoYen * convertIntoDolar);
  });
