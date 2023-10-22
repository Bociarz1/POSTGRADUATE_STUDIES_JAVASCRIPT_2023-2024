const add = (a, b) => {
  const result = a + b;
  const textResult = `Result of adding ${a} and ${b} is ${result}`;
  console.log(textResult);
};
const subtract = (a, b) => {
  const result = a - b;
  const textResult = `Result of subtracting ${a} from ${b} is ${result}`;
  console.log(textResult);
};

const multiply = (a, b) => {
  const result = a * b;
  const textResult = `Result of multiplying ${a} and ${b} is ${result}`;
  console.log(textResult);
};
const divide = (a, b) => {
  const result = a / b;
  const textResult = `Result of divide ${a} by ${b} is ${result}`;
  console.log(textResult);
};

module.exports = {
  constants: { pi: 3.14 },
  add,
  subtract,
  multiply,
  divide,
};
