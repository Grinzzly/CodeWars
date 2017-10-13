function compose(f,g) {
  return function(a) {
    return (arguments.length > 1) ? f.call(null, g.apply(null, arguments)) : f(g(a));
  }
}