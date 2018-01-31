const sumStrings = (a, b) => {
  let sum = '';
  let tmp = 0;
  a = a.split('');
  b = b.split('');
  while (a.length || b.length || tmp) {
    tmp += ~~a.pop() + ~~b.pop();
    sum = (tmp % 10) + sum;
    tmp = tmp > 9;
  }

  return sum.replace(/^0+/ig, '');
};
