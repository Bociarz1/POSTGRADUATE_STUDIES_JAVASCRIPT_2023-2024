function isParamValid(argv) {
  if (argv.length > 4) {
    console.log('Too many parameters! You have to apply only one parameter');
    return false;
  }
  if (argv.length < 3) {
    console.log('Too little parameters! You have to apply only one parameter');
    return false;
  }
  if (argv.length === 4 && argv[3] !== 'true' && argv[3] !== 'false') {
    console.log('Parameter must be a type of boolean !');
    return false;
  }
  return true;
}

module.exports = { isParamValid };
