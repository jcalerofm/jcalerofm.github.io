const resolveButton = document.getElementById('resolve-button');
const clearButton = document.getElementById('clear-button');
const rows = document.querySelectorAll('.row');

function findEmptyCell(grid) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (grid[i][j] === 0) {
        return [i, j];
      }
    }
  }
  return null;
}

function isValid(grid, row, col, num) {
  // Check row
  for (let i = 0; i < 9; i++) {
    if (grid[row][i] === num) {
      return false;
    }
  }

  // Check column
  for (let i = 0; i < 9; i++) {
    if (grid[i][col] === num) {
      return false;
    }
  }

  // Check 3x3 box
  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (grid[boxRow + i][boxCol + j] === num) {
        return false;
      }
    }
  }
  return true;
}

function solveSudokuHelper(grid, solutions) {
  const emptyCell = findEmptyCell(grid);
  if (!emptyCell) {
    solutions.push(JSON.parse(JSON.stringify(grid)));
    return;
  }

  const [row, col] = emptyCell;
  for (let num = 1; num <= 9; num++) {
    if (isValid(grid, row, col, num)) {
      grid[row][col] = num;
      solveSudokuHelper(grid, solutions);
      if (solutions.length >= 2) return;
      grid[row][col] = 0;
    }
  }
}

function solveSudoku(grid) {
  const solutions = [];
  solveSudokuHelper(grid, solutions);
  return solutions;
}

function readBoard() {
  const grid = [];
  for (let i = 0; i < 9; i++) {
    const row = [];
    for (let j = 0; j < 9; j++) {
      const cell = rows[i].querySelector(`[data-col="${j}"]`);
      const value = parseInt(cell.value) || 0;
      row.push(value);
    }
    grid.push(row);
  }
  return grid;
}

function writeBoard(grid) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const cell = rows[i].querySelector(`[data-col="${j}"]`);
      cell.value = grid[i][j] === 0 ? '' : grid[i][j];
    }
  }
}

resolveButton.addEventListener('click', () => {
  const grid = readBoard();
  const solutions = solveSudoku(grid);
  if (solutions.length === 0) {
    alert('No se encontró una solución para este Sudoku.');
  } else if (solutions.length === 1) {
    writeBoard(solutions[0]);
  } else {
    writeBoard(solutions[0]);
    alert('Existen múltiples soluciones para este Sudoku.');
  }
});

clearButton.addEventListener('click', () => {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const cell = rows[i].querySelector(`[data-col="${j}"]`);
      cell.value = '';
    }
  }
});
