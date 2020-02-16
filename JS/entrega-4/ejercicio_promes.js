"use strict";

let eurosDolares = prompt("Dime un número");

fetch("https://api.exchangerate-api.com/v4/latest/EUR")
  .then(function(response) {
    console.log(response);

    return response.json();
  })
  .then(function(myJson) {
    console.log(myJson);

    const convertIntoDolar = myJson.rates.USD * eurosDolares;
    const convertIntoYen = myJson.rates.JPY;

    console.log(convertIntoDolar);
    console.log(convertIntoYen * convertIntoDolar);
  });
