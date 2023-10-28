// 7.	Implement selection sort
const numbers = '98468945553211';
const numberArray = Array.from(numbers);
function selectionSort(array) {
  for (let i = 0; i <= array.length - 1; i++) {
    let lowestNumIndex = i;
    for (let j = i; j <= array.length - 1; j++) {
      if (array[j] < array[lowestNumIndex]) {
        lowestNumIndex = j;
      }
    }
    const temp = array[i];
    array[i] = array[lowestNumIndex];
    array[lowestNumIndex] = temp;
    lowestNumIndex = array[i];
    console.log(array);
  }
}
selectionSort(numberArray);
