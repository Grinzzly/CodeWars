const helloWorld = () => {
  const emptyString = new String();

  const math = Math.toString().split(emptyString);
  math.pop(); // ]
  const h = math.pop().toUpperCase();

  const undef = (new String(undefined)).split(emptyString);
  const d = undef.pop();
  const e = undef.pop();

  const l = (new String(null)).split(emptyString).pop();

  const obj = (new String(Object())).split(emptyString);
  obj.shift(); // [
  const o = obj.shift();
  obj.shift(); // b
  obj.shift(); // j
  obj.shift(); // e
  obj.shift(); // c
  obj.shift(); // t

  const space = obj.shift();

  const w = WeakMap.name.split(emptyString).shift();

  let spaceCode = space.charCodeAt();
  const excl = String.fromCharCode(++spaceCode);

  const arr = Array.name.split(emptyString);
  arr.shift(); // A
  const r = arr.shift();

  return h+e+l+l+o+space+w+o+r+l+d+excl;
};
