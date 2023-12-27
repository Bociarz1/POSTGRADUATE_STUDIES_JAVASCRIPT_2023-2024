// 6. Napisz aplikację pozwalającą na przechowywanie w pliku listy zadań do wykonania (klasyczna lista TODO). Aplikacja powinna pozwalać na dodanie do listy nowego zadania, jak również wyświetlić zawartość całej listy. Przy uruchomieniu bez parametrów aplikacja powinna informować o możliwych parametrach wywołania.

// zapis/odczyt wykonuj asynchronicznie
// pamiętaj o obsłudze błędów
// poinformuj użytkownika o poprawności wykonanych operacji
// wydziel odczyt i zapis informacji do osobnych modułów
// Sugeruje użyć modułu yargs z konstrukcją yargs.command.

// Przykład wywołania programu:

// > node app.js dodaj "napisac program na zaliczenie z NodeJS"
// > node app.js lista

const yargs = require('./node_modules/yargs');
const { addNewToDoTask } = require('./modules/addNewToDoTask.module');
const { showToDoList } = require('./modules/showToDoList.module');
const { invalidCommand } = require('./modules/validators.module');

console.log('[LOG]: APP LAUNCHING...');
yargs.command(addNewToDoTask);
yargs.command(showToDoList);
yargs.command(invalidCommand);
yargs.argv;
