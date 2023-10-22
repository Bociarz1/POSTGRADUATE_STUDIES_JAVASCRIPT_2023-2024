// 8. Rozszerzenie zadania 4. Aplikacja powinna wczytać jedną liczbę z pliku a.txt, drugą liczbę z pliku b.txt (zakładamy, że oba te pliki zawierają tylko jedną liczbę). Na tych liczbach należy wykonać operacja dodawania, odejmowania, mnożenia i dzielenia a wyniki wszystkich działań zapisać w pliku wynik.txt, każdy wynik w osobnej linii. Należy wykorzystać moduł Core'owy File system (https://nodejs.org/dist/latest-v18.x/docs/api/fs.html , szukane funkcje mają przyrostek Sync)

const { readFileSync } = require('fs');
const { add, subtract, multiply, divide } = require('./math');

// flag: r -> read only
// encoding: utf8 -> read in utf8 standards
const a = Number(readFileSync('./a.txt', { encoding: 'utf8', flag: 'r' }));
const b = Number(readFileSync('./b.txt', { encoding: 'utf8', flag: 'r' }));

add(a, b);
subtract(a, b);
multiply(a, b);
divide(a, b);
