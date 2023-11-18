function uniq(tab) {
  return [new Set(tab)];
}

function diff(tab1, tab2) {
  let result = [];
  tab1.forEach(function (element) {
    if (tab2.indexOf(element) === -1) {
      result.push(element);
    }
  });
  return result;
}

module.exports = {
  uniq,
  diff,
};
