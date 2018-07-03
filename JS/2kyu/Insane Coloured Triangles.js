const m = { BB: 'B', BG: 'R', BR: 'G', GB: 'R', GG: 'G', GR: 'B', RB: 'G', RG: 'B', RR: 'R' };

function getColor(k) {
  return m[k];
}

function triangle(row) {
  while (row.length > 1) {
    let counter = 1;
    let newLine = '';

    while (row.length % (3 * counter) === 1) counter *= 3;
    for (let i = 0; i < row.length - 1; i += counter) {
      newLine += getColor(row[i] + row[i + counter]);
    }
    row = newLine;
  }
  return row;
}
