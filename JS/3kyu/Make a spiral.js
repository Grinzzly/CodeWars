const spiralize = (size) => {
  const fill = () => Array(size).fill(0);
  let spiral = fill().map(() => fill());
  let partial = size;

  while (partial > size / 2) {
    const top = partial - 1;
    const bottom = size - partial;
    spiral = spiral.map((a, i) => {
      if (i === bottom || i === top) {
        a = a.map((e, j) => j < size - partial || j > partial - 1 ? e : 1);
      }
      a = a.map((e, j) => (i > bottom && i < top) && (j === bottom || j === top) ? 1 : e);

      return a;
    });
    if (top - bottom > 0) {
      spiral[bottom + 1] = spiral[bottom + 1].map((e, i) => i === bottom ? 0 : e);
    }
    if (top - bottom > 3) {
      spiral[bottom + 2] = spiral[bottom + 2].map((e, i) => i === bottom + 1 ? 1 : e);
    }
    partial -= 2;
  }

  return spiral;
};
