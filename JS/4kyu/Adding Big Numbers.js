const add = (a, b) => {
  let sum = '', char = 0;
  a = a.split('');
  b = b.split('');
  while (a.length || b.length || char) {
    char += ~~a.pop() + ~~b.pop();
    sum = char % 10 + sum;
    char = char > 9;
  }

  return sum;
};