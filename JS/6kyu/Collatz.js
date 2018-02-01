const collatz = (n, r = [n], next = n % 2 !== 0 ? (3 * n) + 1 : n / 2) => {
  return n > 1 ? collatz(next, [...r, next]) : r.join('->');
};
