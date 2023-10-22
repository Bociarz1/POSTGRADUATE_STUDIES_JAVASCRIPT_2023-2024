const { appendFileSync } = require('fs');
const add = (a, b) => {
  const result = a + b;
  const textResult = `Result of adding ${a} and ${b} is ${result}`;
  saveResultInAnotherFile(textResult);
};
const subtract = (a, b) => {
  const result = a - b;
  const textResult = `Result of subtracting ${a} from ${b} is ${result}`;
  saveResultInAnotherFile(textResult);
};

const multiply = (a, b) => {
  const result = a * b;
  const textResult = `Result of multiplying ${a} and ${b} is ${result}`;
  saveResultInAnotherFile(textResult);
};
const divide = (a, b) => {
  const result = a / b;
  const textResult = `Result of dividing ${a} by ${b} is ${result}`;
  saveResultInAnotherFile(textResult);
};

function saveResultInAnotherFile(text) {
  appendFileSync('result.txt', text + '\n');
}

module.exports = {
  constants: { pi: 3.14 },
  add,
  subtract,
  multiply,
  divide,
};
