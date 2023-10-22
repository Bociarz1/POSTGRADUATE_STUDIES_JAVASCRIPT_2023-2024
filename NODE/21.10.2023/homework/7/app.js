// 7. Aplikacja wyświetlająca informację o zalogowanym użytkowniku systemu, przy użyciu modułu OS (https://nodejs.org/dist/latest-v18.x/docs/api/os.html , szukana funkcja ma przyrostek Sync). Dodatkowo: zapis nazwy użytkownika do pliku na dysku.
// szukana funkcja ma przyrostek Sync (takowej nie znalazłem w dokumentacji)
const { appendFileSync } = require('fs');
const { userInfo } = require('os');
const userName = userInfo().username;
console.log(userName);
appendFileSync('result.txt', userName + '\n');
