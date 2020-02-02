"use strict";

let numberOne = 2;
let operationOne = "*+";
let numberTwo = 5;

switch (operationOne) {
  case "-":
    console.log(numberOne - numberTwo);
    break;
  case "+":
    console.log(numberOne + numberTwo);
    break;
  case "*":
    console.log(numberOne * numberTwo);
    break;
  case "/":
    console.log(numberOne / numberTwo);
    break;
  case "**":
    console.log(numberOne ** 1);
  default:
    console.log("No es una operación válida");
}

let numberOne = 19;
let operationOne = "**";
let numberTwo = 5;

let suma = operationOne === "+";
let resta = operationOne === "-";
let division = operationOne === "/";
let multiplicacion = operationOne === "*";
let exponente = operationOne === "**";

if (suma) {
  console.log(numberOne + numberTwo);
} else if (resta) {
  console.log(numberOne - numberTwo);
} else if (multiplicacion) {
  console.log(numberOne * numberTwo);
} else if (division) {
  console.log(numberOne % numberTwo);
} else if (exponente) {
  console.log(1 ** 2);
} else {
  console.log("No es una operación válida");
}
