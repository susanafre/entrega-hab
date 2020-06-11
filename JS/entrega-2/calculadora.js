"use strict";

/* ### CÁLCULO MEDIANTE SWITCH ### */

/* CREAMOS VARIABLES PARA LA OPERACIÓN QUE SE REALIZARÁ Y LOS DOS OPERANDOS */

let numberOne = 2;
let operationOne = "*+";
let numberTwo = 5;

/* SWITCH */

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

/* ### CÁLCULO MEDIANTE IF ### */

/* CREAMOS VARIABLES PARA EL OPERADOR Y LOS OPERANDOS QUE SE USARÁN EN EL CÁLCULO*/

let numberOne = 19;
let operationOne = "**";
let numberTwo = 5;

/* CREAMOS VARIABLES PARA LOS OPERADORES QUE SE PUEDEN USAR  */

let suma = operationOne === "+";
let resta = operationOne === "-";
let division = operationOne === "/";
let multiplicacion = operationOne === "*";
let exponente = operationOne === "**";

/* IF */

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
