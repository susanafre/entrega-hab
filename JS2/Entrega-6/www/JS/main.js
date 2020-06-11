"use strict";

//VARIABLES
//label // A...
const destinyCoin = document.getElementsByClassName("monedadestino");
//botón
const superButton = document.getElementById("convert");
//Input//Quiero convertir
const quantityCoin = document.getElementById("numberone");
//Input//Cantidad convertida
const numberToShow = document.getElementById("destinynumber");

const list = document.getElementById("operador");
const item = document.createElement("option");

item.value = "EUR";
item.text = "EUR";

list.add(item, null);

//FUNCIÓN DE CAMBIO
function convertInto() {
  let cantidadCambio = quantityCoin.value;

  numberToShow.value = cantidadCambio;

  //LLAMADA A LA API

  fetch("https://api.exchangerate-api.com/v4/latest/EUR")
    .then(function (response) {
      return response.json();
    })

    .then(function (myJson) {
      let cantidadCambiada = myJson.rates.USD * cantidadCambio;
      destinynumber.value = cantidadCambiada;
    });
}

convertInto();

//EVENTO QUE EJECUTA LA FUNCIÓN DE CONVERTIR AL CLICKAR EN EL BOTÓN

const handleClick = () => {
  let cantidadCambio = quantityCoin.value;

  numberToShow.value = cantidadCambio;
  convertInto();
};

superButton.addEventListener("click", handleClick);
