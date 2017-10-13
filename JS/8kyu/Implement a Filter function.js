Array.prototype.filter = function(callback, context) {
  let filtered = [];
  this.forEach((item, index) => {
    if (callback.call(context, item, index, this))
      filtered.push(item);
  });
  return filtered;
};