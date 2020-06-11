"use strict";

/* Creamos un prompt que nos devolverá un string */

function binaryConverter() {
  let decimal = +prompt("Dime un número");

  //Pasamos el string a decimal con base 2 y ya devuelve el número en binario
  let binario = decimal.toString(2);

  console.log(binario);
}

binaryConverter();
