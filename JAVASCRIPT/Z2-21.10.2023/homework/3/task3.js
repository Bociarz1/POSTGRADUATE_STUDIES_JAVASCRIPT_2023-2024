// 3.	Create two functions:

// a.	First that takes in a string and shift number, and returns encrypted string using Caesar Cipher
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
function encryptCaesar(text, key) {
  text = text.toUpperCase();
  let encryptedText = '';
  for (const index in text) {
    if (text[index] === ' ') encryptedText += ' ';
    else {
      const letterIndexInAlphabet = alphabet.indexOf(text[index]);
      let shiftNumberInAlphabet = letterIndexInAlphabet + key;
      if (shiftNumberInAlphabet > alphabet.length - 1) {
        shiftNumberInAlphabet = shiftNumberInAlphabet % alphabet.length;
      }
      const encryptedChar = alphabet[shiftNumberInAlphabet];
      encryptedText += encryptedChar;
    }
  }
  console.log(`a) ${text} --encrypt into Caesar--> ${encryptedText}`);
}
encryptCaesar('Hello world for everyone', 2);

// b.	Second that takes in encrypted string and shift number, and returns decrypted message using Caesar Cipher
function decryptCaesar(text, key) {
  text = text.toUpperCase();
  let decryptedText = '';
  for (const index in text) {
    if (text[index] === ' ') decryptedText += ' ';
    else {
      let encryptedChar = '';
      const letterIndexInAlphabet = alphabet.indexOf(text[index]);
      let shiftNumberInAlphabet = letterIndexInAlphabet - key;
      if (shiftNumberInAlphabet < 0) {
        shiftNumberInAlphabet = shiftNumberInAlphabet % alphabet.length;
        encryptedChar = alphabet[alphabet.length + shiftNumberInAlphabet];
      } else {
        encryptedChar = alphabet[shiftNumberInAlphabet];
      }
      decryptedText += encryptedChar;
    }
  }
  console.log(`b) ${text} --decrypt from Caesar--> ${decryptedText}`);
}
decryptCaesar('JGNNQ YQTNF HQT GXGTAQPG', 2);

// c.	Reference: https://youtu.be/l6jqKRXSShI
