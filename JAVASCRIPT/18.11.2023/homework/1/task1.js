const arr = [0, 1, 2, 3];

// map
function convert(num, index) {
  if (num % 2 !== 0) {
    return num * 2;
  } else return num;
}

const newArr = arr.map(convert);
console.log(newArr);

// reduce
function sumEvenSubstractOdd(array) {
  return array.reduce((acc, curr) => {
    if (curr % 2 === 0) acc += curr;
    else acc -= curr;
    return acc;
  }, 0);
}
console.log(sumEvenSubstractOdd(arr));

// filter
function filterOdd(array) {
  return array.filter((item) => {
    if (item % 2 !== 0) return true;
    else return false;
  });
}
filterOdd(arr);

// find
function findElement(target, array) {
  return array.find(item => item)
}
// every
// some