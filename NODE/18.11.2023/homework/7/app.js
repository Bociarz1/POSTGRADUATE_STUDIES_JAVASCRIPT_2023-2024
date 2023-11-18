// 7. Stworzenie aplikacji która pozwoli na zapisanie całego obiektu do pliku. Z wykorzystaniem funkcji pozwalającej na przekonwertowanie obiektu na postać tekstową (JSON.stringify).
const { parse } = require('./parser');

const user = {
  name: 'Jan',
  lastName: 'Nowak',
};

parse(user);
