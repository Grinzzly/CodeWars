Array.prototype.square = function () {
  return this.map((item) => {
    return Math.pow(item, 2);
  });
};

Array.prototype.cube = function () {
  return this.map((item) => {
    return Math.pow(item, 3);
  });
};

Array.prototype.average = function () {
  return (!this.length) ? NaN : this.reduce((acc, value) => {
    return acc + value;
  }) / this.length;
};

Array.prototype.sum = function () {
  return (!this.length) ? 0 : this.reduce((acc, value) => {
    return acc + value;
  });
};

Array.prototype.even = function () {
  return this.filter((item) => {
    return item % 2 === 0;
  });
};

Array.prototype.odd = function () {
  return this.filter((item) => {
    return item % 2 === 1;
  });
};