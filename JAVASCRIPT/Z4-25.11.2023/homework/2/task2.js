// 2.	Using https://rickandmortyapi.com/api fetch all characters from episode 7.
// a.	documentation can be found here: https://rickandmortyapi.com/documentation/#rest

const API = 'https://rickandmortyapi.com/api';

async function fetchCharactersFromEpisode(episodeNumber) {
  try {
    const response = await fetch(`${API}/episode/${episodeNumber}`);
    if (!response.ok) throw new Error('Fetch failed!');
    const data = await response.json();
    const charactersIds = getCharactersIds(data.characters);
    const charactersFromEpisode = await fetchCharacters(charactersIds);
    displayCharacters(charactersFromEpisode);
  } catch (e) {
    console.log(e);
  }
}

function getCharactersIds(array) {
  return array.map((item) => {
    const parts = item.split('/');
    const characterNumber = parts.pop();
    return characterNumber;
  });
}

async function fetchCharacters(charactersIds) {
  let stringFromArray = '';
  charactersIds.forEach((episode) => {
    stringFromArray += episode + ',';
  });
  stringFromArray = stringFromArray.substring(0, stringFromArray.length - 1);
  try {
    const response = await fetch(`${API}/character/${stringFromArray}`);
    if (!response.ok) throw new Error('Fetch failed!');
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
  }
}

function displayCharacters(characters) {
  characters.forEach((character) => {
    console.log(character.name);
  });
}

fetchCharactersFromEpisode(7);
