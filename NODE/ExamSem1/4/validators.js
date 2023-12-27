function validateData(filename, number, argv) {
  if (!filename.endsWith('.json')) {
    console.log('File to save results must be a json file !');
    return false;
  } else if (isNaN(number)) {
    console.log(' Number parameter inside data.json must be a number!');
    return false;
  } else if (argv.length > 2) {
    console.log('Too many parameters!');
    return false;
  }
  return true;
}

module.exports = { validateData };
