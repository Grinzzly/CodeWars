function spyOn (func) {
  const called  = new Set(),
    returned = new Set();
  let counter = 0;
  const spy = (...args) => {
    counter++;
    args.forEach((item) => { called.add(item)});
    let value = func.apply(this, args);
    returned.add(value);
    return value;
  };
  spy.callCount = () =>  counter;
  spy.wasCalledWith = value => called.has(value);
  spy.returned = value => returned.has(value);
  return spy;
}