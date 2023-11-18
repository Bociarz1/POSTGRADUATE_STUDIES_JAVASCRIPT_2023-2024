//  6. Stworzenie kalkulatora wprowadzonych danych. Przy użyciu zewnętrznej biblioteki yargs (moduł odpowiedzialny parsowanie parametrów wejściowych).

const { a, b, operator } = require('yargs').argv;
if (a && b && operator && !isNaN(a) && !isNaN(b)) {
  console.log(calc(operator, a, b));
} else {
  console.log('Brak parametrów lub są niepoprawne!');
}

function calc(operator, a, b) {
  switch (operator) {
    case '+':
      return a + b;
    case '-':
      return a - b;
    case '*':
      return a * b;
    case '/':
      return a / b;
  }
  console.log('Taki operator nie istnieje!');
}
