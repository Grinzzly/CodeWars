var nbrOfLaps = function (x, y) {
  for (var i=x; i > 1; i--){
      if (x % i === 0 && y % i === 0) {
          x = x/i;
          y = y/i;
      }
  }
  var xLaps = y;
  var yLaps = x;
  return [xLaps, yLaps];
}