// 1.	Array exercises:

// a.	example array: [1,6,23,8,4,8,3,7]
const array = [1, 6, 23, 8, 4, 8, 3, 7];

// b.	Create a function that takes in an array of numbers and returns sum of all elements
function sumOfArrayElements(arr) {
  let sum = 0;
  for (const element of arr) {
    sum += element;
  }
  console.log(`b) Sum of array elements: ${sum}`);
}
sumOfArrayElements(array);

// c.	Create a function that takes in an array of numbers and returns sum of first and last element
function sumFirstAndLastElementOfArray(arr) {
  let sum = arr[0] + arr[arr.length - 1];
  console.log(`c) Sum of fisrt and last array elements: ${sum}`);
}
sumFirstAndLastElementOfArray(array);

// d.	Create a function that takes in an array and returns its copy in reverse order (DON’T use .reverse() method!)
function createArrayReverse(arr) {
  let reverseArr = [...arr];
  for (let i = 0; i <= arr.length - 1; i++) {
    reverseArr[i] = arr[arr.length - 1 - i];
  }
  console.log(`d) array Reverse: [${reverseArr}]`);
}
createArrayReverse(array);
// e.	Create a function that takes two parameters - array of numbers, and number of attempts. Choose random numbers from the array based on the number of attempts and return the lowest among them.
function returnLowestValueFromRandomAttempts(arr, attempts) {
  const maxRangeValue = arr.length - 1;
  const randomValuesFromArray = [];
  for (let i = 0; i <= attempts; i++) {
    const randomIndex = Math.floor(Math.random() * maxRangeValue);
    randomValuesFromArray.push(arr[randomIndex]);
  }
  const minOfRandomValues = Math.min(...randomValuesFromArray);
  console.log(`e) min value is: ${minOfRandomValues}`);
}
returnLowestValueFromRandomAttempts(array, 2);

// f.	Create a function that takes in an array and returns it in random order
function returnArrayInRandomOrder(arr) {
  const copyArr = [...arr];
  const maxRangeValue = arr.length - 1;
  for (const index in arr) {
    const randomIndex = Math.floor(Math.random() * maxRangeValue);
    const currentArrayValue = copyArr[index];
    copyArr.splice(index, 1);
    copyArr.splice(randomIndex - 1, 0, currentArrayValue);
  }
  console.log(`f) Random array: [${copyArr}]`);
}
returnArrayInRandomOrder(array);

// g.	Calculate the sum of the odd items [1,6,23,8,4,98,3,7,3,98,4,98]
function sumOfOddItems(arr) {
  let sum = 0;
  for (let i = 1; i <= arr.length; i++) {
    if (i % 2 !== 0) sum += arr[i - 1];
  }
  console.log(`g) Sum of odd: [${arr}]`);
}
sumOfOddItems(array);

// h.	With  a given start value of 0. Iterate the array and add even items and subtract odd ones. [1,6,23,8,4,98,3,7,3,98,4,98]
function addEvenSubtractOddElements(arr) {
  let result = 0;
  for (let i = 1; i <= arr.length; i++) {
    if (i % 2 !== 0) {
      result -= arr[i - 1];
    } else {
      result += arr[i - 1];
    }
  }
  console.log(`h) Result: ${result}`);
}
const array2 = [1, 6, 23, 8, 4, 98, 3, 7, 3, 98, 4, 98];
addEvenSubtractOddElements(array2);
