// 4. Napisz aplikację która odczyta z pliku data.json liczbę oraz nazwę pliku, a następnie:

// pobierze z API informacje o danej liczbie (https://lukaszuk.net/numbers.php?number={number}, np https://lukaszuk.net/numbers.php?number=1)
// informacje pobrane z API zapisze w pliku o pobranej wcześniej nazwie
// Przykład pliku: data.json

// {
//     "number": "588",
//     "filename": "file.json"
// }
// Pamiętaj o obsłudze błędów. Żądania do API oraz zapis do pliku wykonuj asynchronicznie.

const { readFile, writeFile } = require('fs').promises;
const { validateData } = require('./validators');
const axios = require('axios');
const API_URL = 'https://lukaszuk.net/numbers.php?number=';

function getDataFromJsonFile() {
  return readFile('data.json', { encoding: 'utf-8' });
}

function getDataAboutNumber(number) {
  return axios.get(API_URL + number);
}

function saveDataAboutNumberInJsonFile(fileName, data) {
  return writeFile(`./${fileName}`, JSON.stringify(data));
}

(async () => {
  try {
    const dataFromJsonFile = await getDataFromJsonFile();
    const { filename, number } = JSON.parse(dataFromJsonFile);
    const isValid = validateData(filename, number, process.argv);
    if (!isValid) return;
    const { data } = await getDataAboutNumber(number);
    saveDataAboutNumberInJsonFile(filename, { data });
  } catch (error) {
    console.log('Have an error:' + error);
  }
})();
