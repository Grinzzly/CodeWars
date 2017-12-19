const fill = (lines, i, j, old, newvalue) => {
  if ((lines[i] || [])[j] === old) {
    lines[i][j] = newvalue;
    for (let di = -1; di <= 1; di++) {
      for (let dj = -1; dj <= 1; dj++) {
        if (di === 0 && dj === 0) continue;
        fill(lines, i + di, j + dj, old, newvalue);
      }
    }
  }
};

const normalize = (piece) => {
  while (piece.every((line) => {
    return line[0] === ' ';
  })) {
    piece.forEach((line, i) => {
      piece[i] = piece[i].slice(1);
    });
  }
  return piece.filter((line) => {
    return !line.every((place) => {
      return place === ' ';
    });
  });
};

const extractX = (lines) => {
  const neigh = (array, i, j) => {

    return (array[i] || [])[j];
  };

  const piece = lines.map((line, i) => {
    return line.map((value, j) => {
      if (neigh(lines, i - 1, j - 1) === 'x' || neigh(lines, i - 1, j) === 'x' || neigh(lines, i - 1, j + 1) === 'x' ||
        neigh(lines, i, j - 1) === 'x' || neigh(lines, i, j) === 'x' || neigh(lines, i, j + 1) === 'x' ||
        neigh(lines, i + 1, j - 1) === 'x' || neigh(lines, i + 1, j) === 'x' || neigh(lines, i + 1, j + 1) === 'x') {
        return value;
      }

      return ' ';
    });
  });

  piece.forEach((line, i) => {
    line.forEach((value, j) => {
      if (piece[i][j] === '+') {
        if (neigh(piece, i - 1, j) !== '|' && neigh(piece, i + 1, j) !== '|') {
          piece[i][j] = '-';
        } else if (neigh(piece, i, j - 1) !== '-' && neigh(piece, i, j + 1) !== '-') {
          piece[i][j] = '|';
        }
      }
    });
  });

  return normalize(piece);
};

const breakPieces = (shape) => {
  const lines = [];
  shape.split('\n').forEach((line, i) => {
    lines[i] = line.split('');
  });

  const pieces = [];

  lines.forEach((item, index) => {
    fill(lines, index, 0, ' ', 'y');
    fill(lines, index, item.length - 1, ' ', 'y');
  });

  lines[0].forEach((item, index) => {
    fill(lines, 0, index, ' ', 'y');
  });

  for (let j = 0; j < lines[lines.length - 1].length; j++) {
    fill(lines, lines.length - 1, j, ' ', 'y');
  }

  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[i].length; j++) {
      if (lines[i][j] !== ' ') continue;
      fill(lines, i, j, ' ', 'x');
      const piece = normalize(extractX(lines, i, j));
      pieces.push(piece.map((line) => {
        return line.join('').replace(/\s+$/, '');
      }).join('\n').replace(/x/g, ' '));
      fill(lines, i, j, 'x', 'y');
    }
  }

  return pieces;
};