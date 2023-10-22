// 11. Rozszerzenie aplikacji z zadania 10 tak, by jej uruchomienie z niewłaściwą liczbą parametrów skutkowało wyświetleniem stosownego komunikatu w konsoli.

const { readFileSync } = require('fs');
const param = process.argv;
const { add, subtract, multiply, divide } = require('./math');

if (param.length > 4) {
  console.log('zbyt dużo parametrów!');
  return;
}
if (param.length < 4) {
  console.log('zbyt mało parametrów!');
  return;
}

const fileA = param[2];
const fileB = param[3];

// flag" r -> read only
// encoding: utf8 -> read in utf8 standards
const a = Number(readFileSync(fileA, { encoding: 'utf8', flag: 'r' }));
const b = Number(readFileSync(fileB, { encoding: 'utf8', flag: 'r' }));

add(a, b);
subtract(a, b);
multiply(a, b);
divide(a, b);
