// 6. Zapisanie do pliku wyniku działania z zadania 5. Wykorzystując moduł Core'owy File System (https://nodejs.org/dist/latest-v18.x/docs/api/fs.html , szukana funkcja ma przyrostek Sync).

const { add, subtract, multiply, divide, constants } = require('./math');
const { pi } = constants;
add(1, pi);
subtract(1, pi);
multiply(1, pi);
divide(1, pi);
