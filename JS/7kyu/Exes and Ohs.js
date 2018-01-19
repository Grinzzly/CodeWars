const XO = (str) => {
  const x = str.match(/x/gi);
  const o = str.match(/o/gi);
  return (x && x.length) === (o && o.length);
};
