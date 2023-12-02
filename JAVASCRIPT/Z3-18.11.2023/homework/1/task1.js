// 1.	Based on data in the financial.json file
const financialData = require('./financial.json');

// TODO (util functions)
// a.	Use the starter file financial.js
// b.	Create an object that will give us data about:
// i.	How much money was spent in 2014
const moneySpentIn2014 = financialData
  .filter((item) => {
    const year = item.detailsOfPayent.date.slice(6, 10);
    if (year === '2014') return true;
    else false;
  })
  .reduce((acc, curr) => {
    curr.cost = curr.cost ?? 0;
    if (isNaN(curr.cost)) curr.cost = 0;
    acc = (Number(acc) + Number(curr.cost)).toFixed(2);
    return acc;
  }, 0);

// ii.	Earnings per company
function customReducer(acc, curr, fieldName) {
  const key = curr.detailsOfPayent[fieldName];
  let prevCost = Number(acc[key]) ?? 0;
  if (isNaN(prevCost)) prevCost = 0;
  const currCost = Number(curr.cost);
  acc[key] = Number(prevCost + currCost).toFixed(2);
  return acc;
}
const earningsPerCompany = financialData.reduce((acc, curr) => {
  return customReducer(acc, curr, 'company');
}, {});

// iii.	Spendings per transaction type
const spendingsPerTransactionType = financialData.reduce((acc, curr) => {
  return customReducer(acc, curr, 'Type');
}, {});

// iv.	Spendings by month
const spendingsByMonth = financialData
  .map((item) => {
    item.detailsOfPayent.date = item.detailsOfPayent.date.slice(3, 5);
    return { ...item };
  })
  .reduce((acc, curr) => {
    return customReducer(acc, curr, 'date');
  }, {});

// v.	Spendings per day of the week
const daysOfWeek = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
const spendingsPerDayOfTheWeek = financialData
  .map((item) => {
    const date = new Date(item.detailsOfPayent.date);
    const indexOfdayOfTheWeek = date.getDay();
    item.detailsOfPayent.dayOfTheWeek = daysOfWeek[indexOfdayOfTheWeek];
    return item;
  })
  .reduce((acc, curr) => {
    return customReducer(acc, curr, 'dayOfTheWeek');
  }, {});

console.log('Financial data: ' + getFiancialObject());

function getFiancialObject() {
  const financialObject = {
    moneySpentIn2014,
    earningsPerCompany,
    spendingsPerTransactionType,
    spendingsByMonth,
    spendingsPerDayOfTheWeek,
  };
  console.log('-----------------------------');
  for (const key in financialObject) {
    console.log(`${key} : `, financialObject[key]);
    console.log('-----------------------------');
  }
  return financialObject;
}
