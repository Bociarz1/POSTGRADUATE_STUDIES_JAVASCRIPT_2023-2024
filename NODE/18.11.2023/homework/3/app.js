//  3. Zmiana 2 zadania tak, by funkcje pochodziły nie z naszego modułu utils lecz z repozytorium npm (nazwa modułu lodash).

// Load the full build.
const _ = require('lodash');
// Load the FP build for immutable auto-curried iteratee-first data-last methods.
const fp = require('lodash/fp');

// Load method categories.
const array = require('lodash/array');
const object = require('lodash/fp/object');

// Cherry-pick methods for smaller browserify/rollup/webpack bundles.
const at = require('lodash/at');
const curryN = require('lodash/fp/curryN');

const tabA = ['ala', 'ma', 'kota'];
const tabB = ['ala', 'ma', 'psa'];

console.log(array.difference(tabA, tabB));
console.log(array.difference(tabB, tabA));
