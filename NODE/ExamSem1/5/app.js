// 5. Stwórz aplikację która pobierze z GitHuba informacje o użytkowniku i jego repozytoriach. Dodatkowo sprawdź aktualną pogodę w lokalizacji użytkownika.

// w parametrach uruchomienia jest podawany login użytkownika oraz opcjonalnie informacja czy wyświetlać liczbę śledzących użytkownika, sposób obsługi parametrów wejściowych jest dowolny (w kodzie rozwiązania należy dodać komentarz z przykładowym wywołaniem).

// wyświetl nazwę użytkownika (name)
// wyświetl liczbę śledzących użytkownika (followers) - tylko jeżeli użyto odpowiedniego parametru przy uruchomieniu aplikacji
// wyświetl liczbę repozytoriów
// wyświetl nazwy repozytoriów (name)
// wyświetl opis pogody (weather.main, weather.description) w lokalizacji użytkownika (location - zwraca GitHub w danych użytkownika)

// żądania do API wysyłaj asynchronicznie
// pamiętaj o obsłudze błędów
// podziel rozwiązanie na moduły
// Lista endpointów API:

// dane użytkownika: https://api.github.com/users/{userName}
// np https://api.github.com/users/octocat
// repozytoria użytkownika: https://api.github.com/users/{username}/repos
// np https://api.github.com/users/octocat/repos
// pogoda: https://api.openweathermap.org/data/2.5/weather?appid=0ed761300a2725ca778c07831ae64d6e&q={name}
// np https://api.openweathermap.org/data/2.5/weather?appid=0ed761300a2725ca778c07831ae64d6e&q=Białystok

const { isParamValid } = require('./validators');
const {
  getUserData,
  getUserRepos,
  getWeatherFromUserLocation,
} = require('./api.service');
(async () => {
  let displayFollowers = false;
  const isValid = isParamValid(process.argv);
  if (!isValid) return;

  const userLogin = process.argv[2];
  if (process.argv.length === 4) {
    displayFollowers = JSON.parse(process.argv[3]);
  }
  try {
    const {
      data: { name, followers, location },
    } = await getUserData(userLogin);
    if (name === undefined || name === null) {
      console.log('That user does not exist!');
      return;
    }
    const { data: userRepos } = await getUserRepos(userLogin);
    let weather;
    if (location !== null && location !== undefined) {
      weather = await getWeatherFromUserLocation(location);
    } else {
      console.log('User did not provide location information!');
    }
    const dataToDisplay = {
      userName: name,
      amountOfRepos: userRepos.length ?? 0,
      allRepos: (userRepos || []).map((repo) => repo?.name),
      weather: weather
        ? { main: weather.main, description: weather.description }
        : 'no info',
    };
    if (displayFollowers) {
      dataToDisplay['followers'] = followers;
    }
    console.log('dataToDisplay', dataToDisplay);
  } catch (error) {
    console.log('Error: ' + error);
  }
})();
