'use strict';

function letterCount(str) {
  const sentenceSpaces = str.split(' ');
  let longestWord = sentenceSpaces.sort(function(a, b) {
    return b.length - a.length;
  });
  return longestWord[0];
}
let masLarga = letterCount('Hoy es un día estupendo y fantástico');
console.log(masLarga);
