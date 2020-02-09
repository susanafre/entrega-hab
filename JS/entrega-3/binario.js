'use strict';

function binaryConverter() {
  let decimal = +prompt('Dime un número');

  let binario = decimal.toString(2);

  console.log(binario);
}

binaryConverter();
