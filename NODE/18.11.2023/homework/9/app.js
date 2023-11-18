// 7. Stworzenie aplikacji która pozwoli na zapisanie całego obiektu do pliku. Z wykorzystaniem funkcji pozwalającej na przekonwertowanie obiektu na postać tekstową (JSON.stringify).
const { parse } = require('./parser');
const { name, lastName } = require('yargs').argv;

if (name && lastName) {
  const user = {
    name,
    lastName,
  };
  console.log(`new name is: ${name}`);
  parse(user);
} else {
  console.log('Brak parametrów!');
}
