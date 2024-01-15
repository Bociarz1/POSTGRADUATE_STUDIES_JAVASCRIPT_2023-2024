function isParamValid(argv) {
  if (argv.length > 3) {
    console.log('Too many parameters! You have to apply only one parameter');
    return false;
  }
  if (argv.length < 3) {
    console.log('Too little parameters! You have to apply only one parameter');
    return false;
  }
  return true;
}

module.exports = { isParamValid };
