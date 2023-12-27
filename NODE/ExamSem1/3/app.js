// 3. Napisz program który wypisze szczegóły pliku z własnym kodem źródłowym.
// Wypisywane informacje:
// -czas utworzenia
// -czas modyfikacji
// -rozmiar
// Program powinien działać poprawnie także po zmianie nazwy i lokalizacji pliku - bez zmiany kodu źródłowego!
// Przykłady wywołania
// > node app.js //wyświetla szczegóły pliku app.js
// po zmianie nazwy app.js na app2.js
// > node app2.js //wyświetla szczegóły pliku app2.js

const { stat } = require('fs').promises;

const fileName = process.argv[1];

if (process.argv.length > 2) {
  console.log('Too many parameters! You have to apply only file name');
  return;
}

stat(fileName)
  .then((stats) => {
    console.log('File name:', fileName);
    console.log('Created date:', stats?.birthtime);
    console.log('Modified date:', stats?.mtime);
    console.log('Size:', stats?.size, 'bytes');
  })
  .catch((err) => console.log('Error reading file information:', err.message));
