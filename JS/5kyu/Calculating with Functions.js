const expr = (number, operation) => {
  return (!operation) ? number : operation(number);
};

function zero(operation) {
  return expr(0, operation)
}

function one(operation) {
  return expr(1, operation)
}

function two(operation) {
  return expr(2, operation)
}

function three(operation) {
  return expr(3, operation)
}

function four(operation) {
  return expr(4, operation)
}

function five(operation) {
  return expr(5, operation)
}

function six(operation) {
  return expr(6, operation)
}

function seven(operation) {
  return expr(7, operation)
}

function eight(operation) {
  return expr(8, operation)
}

function nine(operation) {
  return expr(9, operation)
}

function plus(a) {
  return function (b) {
    return b + a;
  }
}

function minus(a) {
  return (b) => {
    return b - a;
  }
}

function times(a) {
  return (b) => {
    return a * b;
  }
}

function dividedBy(a) {
  return (b) => {
    return b / a;
  }
}