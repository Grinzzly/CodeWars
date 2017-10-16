Object.prototype.hash = (string) => {
  return string.split('.').reduce((accumulator, value) => accumulator && accumulator.hasOwnProperty(value) && accumulator[value] || null, this);
};