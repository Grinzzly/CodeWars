function encodeRailFenceCipher(string, rows) {
  rows = rows || 3
  const fence = [];
  for (let i = 0; i < rows; i++) fence.push([]);

  let rail = 0;
  let change = 1;

  for (let char of string.split("")) {
    fence[rail].push(char);
    rail += change;

    if (rail === rows - 1 || rail === 0) change = -change;
  }

  let encoded = '';
  for (let rail of fence) encoded += rail.join("");

  return encoded;
}

function decodeRailFenceCipher(string, rows) {
  rows = rows || 3;
  const fence = [];
  for (let i = 0; i < rows; i++) fence.push([]);

  let rail = 0;
  let change = 1;

  string.split("").forEach(char => {
    fence[rail].push(char);
    rail += change;

    if (rail === rows - 1 || rail === 0) change = -change;
  });

  const rFence = [];
  for (let i = 0; i < rows; i++) rFence.push([]);

  let i = 0;
  const s = string.split('');

  for (r of fence) {
    for (let j = 0; j < r.length; j++) rFence[i].push(s.shift());
    i++;
  }

  rail = 0;
  change = 1;
  let decoded = '';
  for (let i = 0; i < string.length; i++) {
    decoded += rFence[rail].shift();
    rail += change;

    if (rail === rows - 1 || rail === 0) change = -change;
  }

  return decoded;
}
