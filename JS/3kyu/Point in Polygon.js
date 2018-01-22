function getPosition(nvert, vertx, verty, testx, testy) {
  let c = false;
  for (let i = 0, j = nvert - 1; i < nvert; j = i++) {
    const isItIn = ((verty[i] >= testy) !== (verty[j] >= testy))
      && (testx <= (vertx[j] - vertx[i]) * (testy - verty[i]) / (verty[j] - verty[i]) + vertx[i]);
    if (isItIn) c = !c;
  }
  return c;
}

function pointInPoly(poly, point) {
  const x = [], y = [];
  for (let i = 0; i < poly.length; i++) {
    x.push(poly[i][0]);
    y.push(poly[i][1]);
  }
  const res = getPosition(poly.length, x, y, point[0], point[1]);
  return res;
}
