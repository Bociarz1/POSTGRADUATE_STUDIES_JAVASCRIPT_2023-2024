// 2.	Create a function that returns number of days till Friday
function daysTillFriday() {
  const day = new Date().getDay();
  if (day <= 5) console.log(`Days till friday: ${5 - day}`);
  else console.log(`Days till friday: ${6}`);
}
daysTillFriday();
