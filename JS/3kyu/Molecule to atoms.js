function parseMolecule(formula) {
  const stack = [];
  const output = {};
  let multiplier = 1;
  let elementMultiplier = false;

  formula = formula.match(/([A-Z][a-z]?)|(\d+)|([\[\]\(\)\{\}])/g);

  formula.reverse().forEach((element) => {
    if (/\d+/.test(element)) {
      multiplier *= parseInt(element);
      stack.push(parseInt(element));
      elementMultiplier = true;
    } else if (/[\]\)\}]/.test(element)) {
      elementMultiplier = false;
    } else if (/[\[\(\{}]/.test(element)) {
      const remove = stack.pop();
      multiplier /= remove;
    } else if (/[A-Z][a-z]?/.test(element)) {
      if (!output[element]) {
        output[element] = 0;
      }

      output[element] += multiplier;

      if (elementMultiplier) {
        const remove = stack.pop();
        multiplier /= remove;
        elementMultiplier = false;
      }
    }
  });

  return output;
}
