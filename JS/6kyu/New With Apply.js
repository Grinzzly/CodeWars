function construct(Class) {
  let object = Object.create(Class.prototype);
  Class.apply(object, Array.from(arguments).slice(1));
  return object;
}