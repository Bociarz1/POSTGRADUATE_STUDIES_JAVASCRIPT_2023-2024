// 12. Aplikacja złożona jest z jednego pliku: app.js. Podczas uruchamiania możemy przekazać jej dodatkowy parametr który jest ścieżką do istniejącego na dysku folderu. Zadaniem aplikacji jest wyświetlanie w konsoli nazw wszystkich plików i folderów znajdujących się bezpośrednio we wskazanym folderze. Uruchomienie z niewłaściwą liczbą parametrów powinno skutkować wyświetleniem komunikatu w konsoli. Należy wykorzystać moduł Core'owy File system (https://nodejs.org/dist/latest-v18.x/docs/api/fs.html , potrzebna funkcja przyrostek Sync)

const { readdirSync } = require('fs');
const { param = process.argv } = require('process');

if (param.length > 3) {
  console.log('zbyt dużo parametrów!');
  return;
}
if (param.length < 3) {
  console.log('zbyt mało parametrów!');
  return;
}

const path = param[2];
const files = readdirSync(path);
console.log(`Pliki w folderze ${path}:`);
files.forEach((file) => {
  console.log(file);
});
