function dblLinear(n) {
  let smallerQuantity = 0;
  let largerQuantity = 0;
  let equalQuantity = 0;
  const u = [1];
  while (smallerQuantity + largerQuantity < n + equalQuantity) {
    const x = 2 * u[smallerQuantity] + 1;
    const y = 3 * u[largerQuantity] + 1;
    if (x < y) {
      u.push(x);
      smallerQuantity++;
    } else if (x > y) {
      u.push(y);
      largerQuantity++;
    } else {
      u.push(x);
      smallerQuantity++;
      largerQuantity++;
      equalQuantity++;
    }
  }
  return u.pop();
}