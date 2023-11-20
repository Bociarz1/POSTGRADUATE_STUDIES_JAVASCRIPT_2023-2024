const { statSync, readdirSync } = require('fs');

function getFilesDetails(path, paramSize) {
  const filesNames = getFilesNames(path);
  const filesData = mergeData(filesNames, path);
  const filteredData = filterData(filesData, paramSize);
  const sortedData = sortData(filteredData);
  displayData(sortedData);
}

function getFilesNames(path) {
  try {
    return readdirSync(path);
  } catch (err) {
    console.log(err.message);
  }
}

function getFilesSizes(path) {
  try {
    return statSync(path).size;
  } catch (err) {
    console.log(err.message);
  }
}

function mergeData(filesNames, path) {
  let data = [];
  for (let i = 0; i <= filesNames.length - 1; i++) {
    const newItem = {
      name: filesNames[i],
      size: getFilesSizes(`${path}/${filesNames[i]}`),
    };
    data.push(newItem);
  }
  return data;
}

function filterData(filesData, paramSize) {
  if (paramSize) {
    return filesData.filter((item) => {
      return item.size >= paramSize;
    });
  } else {
    let average = 0;
    filesData.forEach((item) => {
      average += Number(item.size ?? 0);
    });
    average = average / filesData.length;
    return filesData.filter((item) => {
      return item.size >= average;
    });
  }
}

function sortData(data) {
  return data.sort((a, b) => b.size - a.size);
}

function displayData(data) {
  let longestName = 0;
  let longestSize = 0;

  data.forEach((item) => {
    longestName = Math.max(longestName, item.name.length);
    longestSize = Math.max(longestSize, String(item.size).length);
  });

  const nameWidth = longestName + 2;
  const sizeWidth = longestSize + 2;

  const tableWidth = nameWidth + sizeWidth + 7;

  console.log('_'.repeat(tableWidth - 4));
  console.log(
    `| name${' '.repeat(nameWidth - 5)}| size${' '.repeat(sizeWidth - 5)}|`
  );
  console.log('|'.padEnd(tableWidth - 4, '_'));

  data.forEach((item) => {
    const namePadding = ' '.repeat(nameWidth - item.name.length - 1);
    const sizePadding = ' '.repeat(sizeWidth - String(item.size).length - 1);
    console.log(`| ${item.name}${namePadding}| ${item.size}${sizePadding}|`);
  });

  console.log('‾'.repeat(tableWidth - 4));
}
module.exports = {
  getFilesDetails,
};
