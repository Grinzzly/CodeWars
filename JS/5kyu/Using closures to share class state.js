var Cat = (function () {

  var cats = [];

  const constructor = function (name, weight) {
    if (!name || !weight) {
      throw "Houston we have a problem!";
    }
    Object.defineProperty(this, 'name', {
      get: function () { return name }
    });
    Object.defineProperty(this, 'weight', {
      get: function () { return weight },
      set: function (arg) { weight = arg; return weight }
    });
    cats.push(this);
  };

  constructor.averageWeight = function() {
    return cats.reduce(function (sum, cat) { return sum + cat.weight }, 0) / cats.length;
  };
  return constructor;
}());