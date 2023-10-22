// 10. Rozszerzenie aplikacji z zadania 8 tak, by nazwy plików z których pobieramy liczby były podawane w parametrach w czasie uruchamiania.
const { readFileSync } = require('fs');
const param = process.argv;
const { add, subtract, multiply, divide } = require('./math');

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
