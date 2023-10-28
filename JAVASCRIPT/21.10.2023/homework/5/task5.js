// 5.	Create a function that:

// a.	Checks if a given number is a prime number
function isPrimeNumber(number) {
  if (number <= 1) return isNotPrime(number);
  else if (number === 2) return isPrime(number);
  else if (number % 2 === 0) return isNotPrime(number);
  else {
    for (let i = 3; i <= Math.sqrt(number); i += 2) {
      if (number % i === 0) return isNotPrime(number);
    }
    return isPrime(number);
  }
}
const isPrime = (num) => console.log(`${num} is a prime number`);
const isNotPrime = (num) => console.log(`${num} is not a prime number`);
isPrimeNumber(10);

// b.	Takes in n (numbers) as a parameter and returns first n prime numbers
function createPrimeNumber(n) {
  const primeNumbers = [];
  for (let num = 2; primeNumbers.length < n; num++) {
    for (let divisor = 2; divisor <= Math.sqrt(num); divisor++) {
      if (num % divisor === 0) {
        primeNumbers.push(num);
        break;
      }
    }
  }
  return console.log(`The first ${n} prime numbers are: ${primeNumbers}`);
}
createPrimeNumber(10);
