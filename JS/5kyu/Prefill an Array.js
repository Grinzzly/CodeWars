function prefill(num, value) {
  if(typeof num === 'boolean' || ~~num != num || +num < 0) throw new TypeError(num + ' is invalid');
  return Array.apply(null, new Array(+num)).map(() => { return value })
}