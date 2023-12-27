const axios = require('axios');

function getUserData(userLogin) {
  return axios.get(`https://api.github.com/users/${userLogin}`);
}

function getUserRepos(userLogin) {
  return axios.get(`https://api.github.com/users/${userLogin}/repos`);
}

function getWeatherFromUserLocation(location) {
  return axios.get(
    `https://api.openweathermap.org/data/2.5/weather?appid=0ed761300a2725ca778c07831ae64d6e&q=${location}`
  );
}

module.exports = { getUserData, getUserRepos, getWeatherFromUserLocation };
