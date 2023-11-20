// 8. 8. Rozszerzenie aplikacji z zadania 7 o wprowadzanie danych które chcemy zapisać w parametrach uruchamiania. Do wykorzystania zewnętrzny moduł `yargs`.
const { parse } = require('./parser');
const { name, lastName } = require('yargs').argv;

if (name && lastName) {
  const user = {
    name,
    lastName,
  };
  parse(user);
} else {
  console.log('Brak parametrów!');
}
