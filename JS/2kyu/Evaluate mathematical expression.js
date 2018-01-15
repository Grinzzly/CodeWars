const calc = s => {
  s = s.replace(/\s/g, '');
  s = s.replace(/--/g, '+');

  let exec;

  const rParentesis = /\(([^(]*?)\)/;
  const rTerm = /(.*[^*/]\b)([+-])(.+)/;
  const rFactor = /(.+)([*/])(.+)/;
  const rDigit = /^[-+]?\d+(\.\d+)?$/;

  while (exec = rParentesis.exec(s)) {
    s = s.replace(rParentesis, calc(exec[1]));
  }

  while (exec = rTerm.exec(s)) {
    const leftSide = calc(exec[1]);
    const rightSide = calc(exec[3]);
    const operand = exec[2];

    const result = operand === '+' ? +leftSide + +rightSide : +leftSide - +rightSide;
    s = s.replace(rTerm, result);
  }

  while (exec = rFactor.exec(s)) {
    const leftSide = calc(exec[1]);
    const rightSide = calc(exec[3]);
    const operand = exec[2];

    const result = operand === '*' ? +leftSide * +rightSide : +leftSide / +rightSide;
    s = s.replace(rFactor, result);
  }

  if (exec = rDigit.exec(s)) {
    return Number(exec[0]);
  }

  return s;
};
