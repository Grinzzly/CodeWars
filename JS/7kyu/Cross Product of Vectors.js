function crossProduct (a, b) {
  if (!a || !b || a.length !== 3 || b.length !== 3) throw 'Arguments are not 3D vectors!';
  return [ a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0] ];
}