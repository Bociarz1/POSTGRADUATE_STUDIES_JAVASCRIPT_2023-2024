const { getSudoku } = require('sudoku-gen');
class SodokoBoard {
  #grid = [];
  constructor(difficulty) {
    if (
      difficulty !== 'easy' &&
      difficulty !== 'medium' &&
      difficulty !== 'hard' &&
      difficulty !== 'expert'
    ) {
      console.log(
        '[ERROR LOG]: Wrong difficulty level, set (medium) as default'
      );
      difficulty = 'medium';
    }
    this.grid = createSodokoGrid(difficulty);
    console.log(`[LOG]: Create (${difficulty}) level sodoko grid`);
    this.displayGrid();
  }
  get grid() {
    return this.#grid;
  }
  set grid(value) {
    this.#grid = value;
  }
  displayGrid() {
    const sodokoGrid = [...this.grid];
    for (let i = 0; i < sodokoGrid.length; i++) {
      if (i % 3 === 0 && i !== 0) {
        console.log('-'.repeat(27));
      }
      const row = sodokoGrid[i];
      let rowString = '| ';
      for (let j = 0; j < row.length; j++) {
        if (j % 3 === 0 && j !== 0) {
          rowString += ' | ';
        }
        rowString += row[j] + ' ';
      }
      rowString += '|';
      console.log(rowString);
    }
  }
  solve() {
    console.log('[LOG]: Sodoko solving...');
    const isSodokoSolved = solveSodoko(this.grid);
    if (isSodokoSolved) {
      console.log('[LOG]: Sodoko solved!');
      this.displayGrid();
    } else {
      console.log('[ERROR LOG]: Something go wrong with solve sodoko!');
    }
  }
}

function createSodokoGrid(difficulty) {
  // puzzle: '3-67-25----------62---5834--681--425------97-1--5-486-6-72-51----43-76--5324--78-'
  const { puzzle } = getSudoku(difficulty);
  const sodokoLongArray = Array.from(puzzle);
  const sodokoGrid = [];
  for (let i = 0; i < sodokoLongArray.length; i += 9) {
    sodokoGrid.push(sodokoLongArray.slice(i, i + 9));
  }
  return sodokoGrid;
}
function isValid(board, row, col, k) {
  for (let i = 0; i < 9; i++) {
    const m = 3 * Math.floor(row / 3) + Math.floor(i / 3);
    const n = 3 * Math.floor(col / 3) + (i % 3);
    if (board[row][i] == k || board[i][col] == k || board[m][n] == k) {
      return false;
    }
  }
  return true;
}

function solveSodoko(sodokoGrid) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (sodokoGrid[i][j] === '-') {
        for (let k = 1; k <= 9; k++) {
          if (isValid(sodokoGrid, i, j, k)) {
            sodokoGrid[i][j] = `${k}`;
            if (solveSodoko(sodokoGrid)) {
              return true;
            } else {
              sodokoGrid[i][j] = '-';
            }
          }
        }
        return false;
      }
    }
  }
  return true;
}

module.exports = {
  SodokoBoard,
};
