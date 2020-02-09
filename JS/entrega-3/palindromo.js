'use strict';

//eliminamos los espacios y cambiamos las mayúsculas a minúsculas
//devolvemos la frase cambiada

let re = / /gi;

const fraseConEspacios = 'Arriba la birra';

const fraseSinEspacios = fraseConEspacios.replace(re, '');

const fraseCambiada = fraseSinEspacios.toLowerCase();

console.log(fraseCambiada);

//creamos la funcion palindromeTwo

function palindromeTwo() {
  for (let i = 0; i < fraseCambiada.length; i++) {
    if (fraseCambiada[i] != fraseCambiada[fraseCambiada.length - i - 1]) {
      return false;
    }
  }

  return true;
}

console.log(palindromeTwo());
