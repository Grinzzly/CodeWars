const handler = function (res, unknown) {
  const valid = res.every(row =>
    row.every(cur =>
      cur !== unknown && cur > 0
    ),
  );

  return valid ? res : null;
};

const ruler = function () {
  const args = [].slice.call(arguments);

  if (args.length === 2) return args[0] - args[1];

  return [[0], ...args[0]].reduce((res, cur) => {
    const val = args[1][cur[0]][cur[1]];

    (val === args[2] && (res.push(cur))) ||
    (res[0] += val);

    return res;
  });
};

const getCoors = function (coor, map) {
  const rowIndex = coor[0];
  const colIndex = coor[1];

  return [
    map[0].map((cur, i) => [rowIndex, i]),
    map.map((cur, i) => [i, colIndex]),
  ];
};

const getSupers = function (poss, sec) {
  poss = poss.filter((curves) => {
    const temp = sec.filter((sCur) => !(curves[0] === sCur[0] && curves[1] === sCur[1]));
    const len = sec.length;

    sec = temp;

    return len === temp.length;
  });

  return [...poss, ...sec];
};

const completeMatrix = function(matrix, unknown = null) {
  matrix.forEach((row, i) =>
    row.forEach((cur, j) => {
      const coors = getCoors([i, j], matrix);
      const row = ruler(coors[0], matrix, unknown);
      const col = ruler(coors[1], matrix, unknown);
      const supers = getSupers(
        row.slice(1), col.slice(1),
      );

      if (supers.length !== 1) return;

      matrix[supers[0][0]][supers[0][1]] = row.length === Math.min(row.length, col.length) ?
        ruler(row[0], col[0]) :
        ruler(col[0], row[0]);
    }),
  );

  return handler(matrix);
};
