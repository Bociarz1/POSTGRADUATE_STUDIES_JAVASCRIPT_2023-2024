const { appendFileSync, unlinkSync } = require('fs');

function parse(obj) {
  const jsonObj = JSON.stringify(obj);
  unlinkSync(filePath);
  appendFileSync('obj.json', jsonObj);
}

module.exports = {
  parse,
};
