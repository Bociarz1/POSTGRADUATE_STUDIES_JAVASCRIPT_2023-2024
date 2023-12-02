const films = require('./sw-films.json');
const planets = require('./sw-planets.json');
const people = require('./sw-people.json');
const starships = require('./sw-starships.json');

// count sum of all starships cost from episodes 4-6
console.log(
  'Sum of all starships cost from episodes 4 - 6 is: ' +
    sumAllStarshipsCostFromEpisodes(4, 6)
);

function sumAllStarshipsCostFromEpisodes(startEp, endEp) {
  let sum = 0;
  starships.forEach((item) => {
    item.films.forEach((episode) => {
      occuredInEpisodes = false;
      episodeNumber = episode.slice(episode.length - 2, episode.length - 1);
      if (episodeNumber >= startEp && episodeNumber <= endEp) {
        occuredInEpisodes = true;
      }
    });
    if (occuredInEpisodes && !isNaN(item.cost_in_credits))
      sum += Number(item.cost_in_credits);
  });
  return sum;
}

// find the fastest starship you can afford having 8500000 credits

console.log(
  'Fastest ship I can get for up to 8500000 is: ' +
    getFastestShipFor(8500000).name
);

function getFastestShipFor(money) {
  let ship;
  let maxSpeed = 0;
  starships.forEach((item) => {
    if (
      money <= item.cost_in_credits &&
      item.max_atmosphering_speed > maxSpeed
    ) {
      ship = item;
    }
  });
  return ship;
}

// find planet name with the lowest difference between the rotation period and orbital period

console.log(
  'Planet name with the lowest difference between the rotation period and orbital period is: ' +
    getPlanetNameWithLowestDifference('rotation_period', 'orbital_period')
);

function getPlanetNameWithLowestDifference(key1, key2) {
  let planetName = planets[0].name;
  let minDifference = Math.abs(
    Number(planets[0][key1]) - Number(planets[0][key2])
  );
  planets.forEach((item) => {
    const difference = Math.abs(Number(item[key1]) - Number(item[key2]));
    if (difference < minDifference) {
      minDifference = difference;
      planetName = item.name;
    }
  });
  return planetName;
}

// map all starships with crew <= 4 that were created between 10 dec 2014 and 15 dec 2014

console.log(
  'Ships with max crew of 4 created between 10.12.2014 - 12.12.2014 number is: ' +
    getCrewShipFrom(4, new Date(2014, 11, 11), new Date(2014, 11, 13)).length
);

function getCrewShipFrom(maxCrew, dateStart, dateEnd) {
  let ships = [];
  starships.forEach((item) => {
    const crew = Number(item.crew);
    if (crew <= maxCrew) {
      const createdDate = new Date(item.created);
      if (createdDate >= dateStart && createdDate <= dateEnd) {
        ships.push(item);
      }
    }
  });
  return ships;
}

// create an array of people’s names from episodes 1 and 5 sorted by the diameter of origin planet low to high

console.log(
  'People from ep 1 - 5 sorted by origin planet diameter low to high: ' +
    getPeopleSortedByOriginPlanetDiameter(1, 5)
);

function getPeopleSortedByOriginPlanetDiameter(startEp, endEp) {
  return people
    .filter((item) => {
      const episodeFilter = item.films.filter((episode) => {
        episodeNumber = episode.slice(episode.length - 2, episode.length - 1);
        if (episodeNumber >= startEp && episodeNumber <= endEp) return true;
        else return false;
      });
      if (episodeFilter.length > 0) return true;
      else return false;
    })
    .map((item) => {
      planets.forEach((planet) => {
        if (planet.url === item.homeworld) {
          item = { ...item, planetDiameter: planet.diameter };
        }
      });
      return item;
    })
    .map((item) => {
      return Number(item.planetDiameter);
    })
    .sort((a, b) => {
      return b - a;
    });
}
