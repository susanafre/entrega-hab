"use strict";
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

function convertInto() {
  let cantidadCambio = quantityCoin.value;

  numberToShow.value = cantidadCambio;

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

const handleClick = () => {
  let cantidadCambio = quantityCoin.value;

  numberToShow.value = cantidadCambio;
  convertInto();
};

superButton.addEventListener("click", handleClick);
