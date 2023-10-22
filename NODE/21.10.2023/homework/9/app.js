// 9. Obsługa parametrów wejściowych. Aplikacja złożona jest z jednego pliku: app.js. Podczas uruchamiania aplikacji możemy przekazać jej dodatkowy parametr, który zostanie wyświetlony po komunikacie hello. Gdy podanych będzie więcej parametrów, wtedy ignorujemy wszystkie prócz pierwszego. Gdy nie będzie podanych żadnych parametrów aplikacja wyświetla hello world. Należy wykorzystać globalną zmienną: process.

const param = process.argv;
if (param.length > 2) console.log('hello', param[2]);
if (param.length === 2) console.log('hello world!');
