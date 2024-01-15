// 2.  Napisz aplikację która przyjmuje w parametrze uruchamiania ciąg znaków a następnie wyświetli go w kolorach tęczy. Wykorzystaj moduł colors (https://www.npmjs.com/package/colors) w wersji 1.3.2!. Pamiętaj o obsłudze błędów.

const colors = require('colors');
const { isParamValid } = require('./validators');

if (isParamValid(process.argv)) {
  console.log(process.argv[2].rainbow);
}

// Sample invocation:
// node app Hello
