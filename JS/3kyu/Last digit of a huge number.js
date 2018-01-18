const lastDigit = (pows) => {
  return pows.reduceRight((exponent, base) => {
    if (exponent === 0) {
      return 1;
    } else if (exponent === 1) {
      return base;
    }
    return Math.pow(base % 100, (exponent % 4) + 4);
  }, 1) % 10;
};
