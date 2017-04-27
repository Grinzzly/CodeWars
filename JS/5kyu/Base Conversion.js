function convert(input, sourceAlph, targetAlph) {

  var inputInDecimal = convertToDecimal(input, sourceAlph);

  return convertToTarget(inputInDecimal, targetAlph);

}

function convertToDecimal(input, sourceAlph) {

  var
    sourcePositionMap = getPositionMap(sourceAlph),
    sourceBase = sourceAlph.length;

  return input.split('').reverse().reduce(function(accum, item, index) {
    return accum + (Math.pow(sourceBase, index) * sourcePositionMap[item]);
  }, 0);

}

function convertToTarget(inputInDecimal, targetAlph) {

  var
    targetSymbolMap = getSymbolMap(targetAlph),
    targetBase = targetAlph.length,
    remainderPositions = [],
    dividend;

  dividend = inputInDecimal;
  do {
    remainderPositions.push(dividend % targetBase);
    dividend = Math.floor(dividend / targetBase);
  } while (dividend > 0);
  return remainderPositions.reverse().map(function(position) {
    return targetSymbolMap[position];
  }).join('');

}

function getPositionMap(alph) {
  return mapper(alph, function(accum, item, index) {
    accum[item] = index;
    return accum;
  });
}
function getSymbolMap(alph) {
  return mapper(alph, function(accum, item, index) {
    accum[index] = item;
    return accum;
  });
}
function mapper(alph, reduceFn) {
  return alph.split('').reduce(reduceFn, {});
}