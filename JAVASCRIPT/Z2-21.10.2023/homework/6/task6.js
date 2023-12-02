// 6.	Implement binary search
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const alphabetArray = Array.from(alphabet);

function binarySearch(target, array) {
  const middleIndex = Math.floor(array.length / 2);
  if (array[middleIndex] === target) {
    return console.log(`Found ${target} element in final array: [${array}]`);
  } else if (target < array[middleIndex]) {
    array.splice(middleIndex, array.length - middleIndex);
    binarySearch(target, array);
  } else {
    array.splice(0, middleIndex + 1);
    binarySearch(target, array);
  }
}
binarySearch('C', alphabetArray);
