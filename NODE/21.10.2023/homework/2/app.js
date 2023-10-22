// 2. Aplikacja złożona z 2 plików: app.js oraz user.js, która wyświetli przywitanie osoby. Plik app.js odpowiedzialny jest za wczytanie modułu pliku user.js i wyświetlenie w konsoli hello {name}!, gdzie name to wartość z pliku user.js.

const name = require('./user');
console.log(`Hello ${name}`);
