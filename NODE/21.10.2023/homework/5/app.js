// 5. Rozbudowanie kalkulatora o stałą matematyczną PI (3,14) i wypisanie jej wartości na konsoli w naszej głównej aplikacji.

const { add, subtract, multiply, divide, constants } = require('./math');
const { pi } = constants;
add(1, pi);
subtract(1, pi);
multiply(1, pi);
divide(1, pi);
