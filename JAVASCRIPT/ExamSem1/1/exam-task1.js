function setRiddleByRandom() {
  const riddle = [1, 1, 1, 1, 1, 1, 1, 1];
  const randomIndex = Math.floor(Math.random() * 8);
  riddle[randomIndex] = 2;
  return riddle;
}

class Comparison {
  riddleArray = [];
  leftSideIndexes = [];
  rightSideIndexes = [];
  resultEqual = '';
  resultLeft = '';
  resultRight = '';
  constructor(
    riddleArray,
    leftSideIndexes,
    rightSideIndexes,
    resultEqual,
    resultLeft,
    resultRight
  ) {
    this.riddleArray = riddleArray;
    this.leftSideIndexes = leftSideIndexes;
    this.rightSideIndexes = rightSideIndexes;
    this.resultEqual = resultEqual;
    this.resultLeft = resultLeft;
    this.resultRight = resultRight;
  }
  compareTwoSides() {
    const addingLeft = this.leftSideIndexes.reduce((acc, currVal) => {
      return (acc += this.riddleArray[currVal]);
    }, 0);
    const addingRight = this.rightSideIndexes.reduce((acc, currVal) => {
      return (acc += this.riddleArray[currVal]);
    }, 0);
    if (addingLeft === addingRight) return this.resultEqual;
    else if (addingLeft > addingRight) return this.resultLeft;
    else return this.resultRight;
  }
}

function checkHeavyRiddleInTwoSteps(riddle) {
  const firstComparison = new Comparison(
    riddle,
    [0, 1, 2],
    [3, 4, 5],
    'equal',
    'left',
    'right'
  );
  const firstComparisonResult = firstComparison.compareTwoSides();
  switch (firstComparisonResult) {
    case 'equal':
      return new Comparison(riddle, [6], [7], -1, 6, 7).compareTwoSides();
    case 'left':
      return new Comparison(riddle, [0], [1], 2, 0, 1).compareTwoSides();
    case 'right':
      return new Comparison(riddle, [3], [4], 5, 3, 4).compareTwoSides();
  }
}

const randomRiddle = setRiddleByRandom();
const findingIndex = checkHeavyRiddleInTwoSteps(randomRiddle);
console.log(`${randomRiddle} ----> index:${findingIndex}`);
