// 3.	Create an IIFE that returns an object with fields: method setValue(), method showValue() and method reverseValue(). Calling showValue should log the value, or if there is no value - tell us about that. Calling setValue will set given number or string in closure, if the argument is other type - throw an error. Value can be type string or number. reverseValue(): If number do (*(-1)), if string reverse it.  Closure pattern.

class Value {
  _value = '';
  constructor(value) {
    this._value = value;
  }
  getValue() {
    if (this._value === undefined || this._value === null) {
      console.log('There is no value');
    } else {
      console.log(`Value is: ${this._value}`);
      return this._value;
    }
  }
  setValue() {
    if (typeof this._value === 'number' || typeof this._value === 'string') {
      console.log(`Value was changed to ${this._value}`);
    } else {
      throw new Error('Value is not a number or string');
    }
  }
  reverseValue() {
    if (typeof this._value === 'number') {
      console.log(`Reversed number is ${+this._value * -1}`);
    } else if (typeof this._value === 'string') {
      const reversedStr = this._value.split('').reverse().join('');
      console.log(`Reversed string is ${reversedStr}`);
    }
  }
}

const someValue = true;
const myFunc = (function iifeFuntion() {
  const value = new Value(someValue);
  value.getValue();
  value.setValue();
  value.reverseValue();
  return value;
})();
console.log(myFunc);
