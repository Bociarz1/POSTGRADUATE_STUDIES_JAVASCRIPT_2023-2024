// 7.  Program który wyświetla informacje o plikach i folderach w danej lokalizacji:
// - użytkownik w parametrze podaje adres folderu (parametr wymagany) i rozmiar pliku (parametr opcjonalny)
// - program wyświetla informacje o plikach w folderze: nazwa i wielkość:
//     - jeżeli użytkownik poda w parametrze rozmiar pliku, to wyświetlamy listę plików, które są większe niż podany rozmiar
//     - w przeciwnym wypadku, wyświetlamy listę plików których rozmiar jest większy niż średni rozmiar pliku w tym folderze

// Pliki powinny być posortowane malejąco od największych do najmniejszych.

const { getFilesDetails } = require('./parser');
const { directory, size } = require('yargs').argv;

if (directory) {
  getFilesDetails(directory, size);
} else {
  console.log('Brak parametrów!');
}
