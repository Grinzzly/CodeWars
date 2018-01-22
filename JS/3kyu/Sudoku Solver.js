function isValid(i, j, puzzle, num) {
  for (let k = 0; k < puzzle[i].length; k++) {
    if (puzzle[i][k] === num) return false;
  }
  for (let k = 0; k < puzzle.length; k++) {
    if (puzzle[k][j] === num) return false;
  }
  let ii = Math.floor(i / 3), jj = Math.floor(j / 3);
  for (let k = 3 * ii; k < 3 * ii + 3; k++) {
    for (let l = 3 * jj; l < 3 * jj + 3; l++) {
      if (puzzle[k][l] === num) return false;
    }
  }
  return true;
}

function sudoku(puzzle) {
  let isIndexToHigh = false;

  function DFS(puzzle, index) {
    if (index > 80) {
      isIndexToHigh = true;
      return;
    }
    const i = Math.floor(index / 9), j = index % 9;
    if (puzzle[i][j] !== 0) return DFS(puzzle, index + 1);
    for (let v = 1; v <= 9; v++) {
      if (isValid(i, j, puzzle, v)) {
        puzzle[i][j] = v;
        DFS(puzzle, index + 1);
      }
    }
    if (!isIndexToHigh) puzzle[i][j] = 0;
  }

  DFS(puzzle, 0);
  return puzzle;
}
