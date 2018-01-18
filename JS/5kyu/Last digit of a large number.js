const lastDigit = (str1, str2) => {
  return +!+str2 || Math.pow(str1.slice(-1) % 10, str2.slice(-2) % 4 || 4) % 10;
};
