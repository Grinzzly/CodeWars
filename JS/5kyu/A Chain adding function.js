function add (n) {
  const chain = (item) => {
    return add (n + item);
  };
  chain.valueOf = chain.toString = () => {return n};
  return chain;
}