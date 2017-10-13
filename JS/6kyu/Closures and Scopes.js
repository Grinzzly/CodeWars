function createFunctions(n) {
  let callbacks = [];

  for(let i = 0; i < n; i++)
    (function (i) {
      callbacks.push(
        function () {
          return i;
        }
      );
    })(i);

  return callbacks;
}