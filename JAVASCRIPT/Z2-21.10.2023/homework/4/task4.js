// 4.	Create a function that takes in a n (number) as a parameter and returns first n Fibonacci numbers - use recursion

function createFiboSequence(n) {
  if (n === 1) {
    return [0];
  } else if (n === 2) {
    return [0, 1];
  } else {
    const fiboNumbers = createFiboSequence(n - 1);
    fiboNumbers.push(fiboNumbers[n - 2] + fiboNumbers[n - 3]);
    return fiboNumbers;
  }
}

const n = 5;
const fiboSequence = createFiboSequence(5);
console.log(`Fibo sequence of ${n} elements: ${fiboSequence}`);
