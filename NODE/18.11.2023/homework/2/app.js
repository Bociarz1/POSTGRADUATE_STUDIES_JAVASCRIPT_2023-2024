// 2. Rozszerzenie poprzedniego zadania o nową funkcję która: przyjmuje jako argument dwie tablice i zwraca elementy które są tylko w pierwszej tablicy.

const { diff } = require('./utils.js');

const tabA = ['ala', 'ma', 'kota'];
const tabB = ['ala', 'ma', 'psa'];

console.log(diff(tabA, tabB));
console.log(diff(tabB, tabA));
