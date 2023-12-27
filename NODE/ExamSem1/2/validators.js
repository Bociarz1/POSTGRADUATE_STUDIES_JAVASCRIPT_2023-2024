function isParamValid(argv) {
  if (argv.length > 3) {
    console.log('Too many parameters! You have to apply only one parameter');
    return false;
  }
  if (argv.length < 3) {
    console.log('Too little parameters! You have to apply only one parameter');
    return false;
  }
  if (typeof argv[2] !== 'string') {
    console.log('Parameter must be a type of string !');
    return false;
  }
  return true;
}

module.exports = { isParamValid };
