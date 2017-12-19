class Quadrants {
  constructor(map) {
    this.map = map.split('\n').map(y => y.split(' ').map(x => (x === '?') ? -1 : Number(x)));

    const yl = this.map.length;
    const xl = this.map[0].length;

    this.saved = {},
      this.locs = {'toMark': {}, 'bombs': {}, 'nonBombs': {}, 'zeros': {}},
      this.nBombs = 0,
      this.last = [],
      this.invalid = false;

    for (let i = 0; i < yl; i++) {
      this.saved[i] = {};
      this.locs['toMark'][i] = {};
      this.locs['bombs'][i] = {};
      this.locs['nonBombs'][i] = {};
      this.locs['zeros'][i] = {};

      for (let j = 0; j < xl; j++) {
        const val = this.map[i][j];
        const loc = this.locForVal(val);
        const adj = [[i - 1, j - 1], [i, j - 1], [i + 1, j - 1], [i + 1, j], [i + 1, j + 1], [i, j + 1], [i - 1, j + 1], [i - 1, j]]
          .filter(x => x[0] < yl && x[0] >= 0 && x[1] < xl && x[1] >= 0)
        this.locs[loc][i][j] = [];
        this.saved[i][j] = {
          'val': val,
          'row': i,
          'col': j,
          'rcs': i + ',' + j,
          'loc': loc,
          'adj': adj,
          'adjRcs': adj.map(x => x.join(',')),
          'bombs': 0
        };
      }
    }

    const bombs = this.bombs;
    for (let i = 0; i < bombs.length; i++) {
      this.addBombAround(this.get(bombs[i][0], bombs[i][1]));
      this.nBombs++;
    }
  }

  locForVal(val) {
    switch (val) {
      case -1:
        return 'toMark';
      case -2:
        return 'bombs';
      case 0:
        return 'zeros';
      default:
        return 'nonBombs';
    }
  }

  getAllLocs(loc) {
    const currentResult = [];
    const obj = this.locs[loc];
    for (let i = 0; i < Object.keys(obj).length; i++) {
      const dots = Object.keys(obj[i]);
      for (let j = 0; j < dots.length; j++) {
        currentResult.push([i, Number(dots[j])]);
      }
    }
    return currentResult;
  }

  zeroOpen(row, col) {
    this.get(row, col).adj.forEach((x) => {
      if (this.get(x[0], x[1]).val === -1) this.unfold(x[0], x[1]);
    });
  }

  addBombAround(point) {
    for (let i = 0; i < point.adj.length; i++) {
      this.saved[point.adj[i][0]][point.adj[i][1]]['bombs'] += 1;
    }
  }

  draw() {
    return this.map.map(x => x.map(y => {
      switch (y) {
        case -2:
          return 'x';
        case -1:
          return '?';
        default:
          return String(y);
      }
    }).join(' '));
  }

  toString() {
    return this.draw().join('\n');
  }

  unfold(row, col) {
    this.set(Number(open(row, col)), row, col);
  }

  set(val, row, col) {
    if (Number.isNaN(val)) {
      this.invalid = true;
    } else {
      const prev = this.saved[row][col];
      if (val !== prev.val) {
        const loc = this.locForVal(val);
        if (loc !== prev.loc) {
          delete this.locs[prev.loc][row][col];
          this.locs[loc][row][col] = true;
          this.saved[row][col]['loc'] = loc;
        }
        this.saved[row][col]['val'] = val;
        this.map[row][col] = val;
        this.last.push([row, col]);
        if (val === -2) {
          this.addBombAround(prev);
          this.nBombs++;
        } else if (val === 0) this.zeroOpen(row, col);
      }
    }
  }

  get(row, col) {
    return this.saved[row][col];
  }

  getRcs(rcs) {
    rcs = rcs.split(',');
    return this.get(rcs[0], rcs[1]);
  }

  getAdj(row, col) {
    const currentResult = [];
    const adj = this.get(row, col).adj;
    for (let i = 0; i < adj.length; i++) {
      currentResult.push(this.get(adj[i][0], adj[i][1]));
    }
    return currentResult;
  }

  getAdjRcs(rcs) {
    rcs = rcs.split(',');
    return this.getAdj(rcs[0], rcs[1]);
  }

  get toMark() {
    return this.getAllLocs('toMark');
  }

  get toMarkRcs() {
    return this.toMark.map(x => x.join(','));
  }

  get bombs() {
    return this.getAllLocs('bombs');
  }

  get zeros() {
    return this.getAllLocs('zeros');
  }

  get nonBombsAdjToMark() {
    const toMark = this.toMarkRcs;
    let currentResult = [];
    for (let i = 0; i < toMark.length; i++) {
      const cToMark = this.getRcs(toMark[i]);
      currentResult = currentResult.concat(cToMark.adjRcs);
    }
    return currentResult
      .filter((x, i, arr) => arr.indexOf(x) === i)
      .map(x => x.split(','))
      .filter(x => this.get(x[0], x[1]).val > 0);
  }
}

function solveMine(map, n) {

  function firstPass() {
    const zeros = map.zeros;
    for (let i = 0; i < zeros.length; i++) {
      map.zeroOpen(zeros[i][0], zeros[i][1]);
    }
  }

  function secondPass() {
    if (map.invalid) return;
    map.last = [];
    let points = map.nonBombsAdjToMark;
    for (let i = 0; i < points.length; i++) {
      const c = points[i];
      const cObj = map.get(c[0], c[1]);
      const adj = map.getAdj(c[0], c[1]);
      const unmarked = adj.filter(x => x.val === -1);
      const bombsToMark = cObj.val - adj.filter(x => x.val === -2).length;
      if (unmarked.length > 0 && bombsToMark > 0 && unmarked.length === bombsToMark) {
        unmarked.forEach(x => {
          map.set(-2, x.row, x.col);
        });
      }
      else if (unmarked.length > 0 && bombsToMark === 0) {
        unmarked.forEach(x => {
          map.unfold(x.row, x.col);
        });
      }
    }
    if (map.last.length > 0) secondPass();
  }

  function getClusters() {

    const points = map.nonBombsAdjToMark;
    const clusters = {};

    for (let i = 0; i < points.length; i++) {
      const cPoint = map.get(points[i][0], points[i][1]);
      const missingBombs = cPoint.val - cPoint.bombs;
      const theseClusters = [];
      for (let k = 0; k < cPoint.adj.length; k++) {
        let cAdj = map.get(cPoint.adj[k][0], cPoint.adj[k][1]);
        if (cAdj.val === -1) theseClusters.push(cAdj.rcs);
      }
      if (!clusters.hasOwnProperty(missingBombs)) clusters[missingBombs] = [];
      clusters[missingBombs].push(theseClusters);
    }

    return clusters;
  }

  function getAllChances(toMark, bombsToMark, clusters) {
    function validateFulfillAll(config) {
      const clustersKeys = Object.keys(clusters);
      let valid = true;
      outerLoop:
        for (let i = 0; i < clustersKeys.length; i++) {
          const thisKey = clustersKeys[i];
          const bombs = Number(thisKey);
          const theseClusters = clusters[thisKey];
          for (let j = 0; j < theseClusters.length; j++) {
            let thisCluster = theseClusters[j];
            if (thisCluster.filter(x => config.indexOf(x) !== -1).length !== bombs) {
              valid = false;
              break outerLoop;
            }
          }
        }
      return valid;
    }

    function validateCurrent(current, past) {
      let valid = true;
      const dotAdj = map.getAdjRcs(current);

      for (let i = 0; i < dotAdj.length; i++) {
        const thisAdj = dotAdj[i];
        const val = thisAdj.val;
        if (val < 1) continue;
        const acceptBombs = val - thisAdj.bombs;
        if (acceptBombs === 0) {
          valid = false;
          break;
        }
        const addB = thisAdj.adjRcs.filter(x => past.indexOf(x) !== -1).length;
        if ((acceptBombs - addB - 1) < 0) {
          valid = false;
          break;
        }
      }

      return valid;
    }

    function recursiveTest(past, current, remaining) {
      const pastCurrent = past.concat(current).sort();
      const pastCurrentId = pastCurrent.join('-');

      if (!testedObj.hasOwnProperty(pastCurrentId)) {
        testedObj[pastCurrentId] = true;
        if (validateCurrent(current, past)) {
          let totalBombsNow = past.length + 1;

          if (validateFulfillAll(pastCurrent)) {
            totals = totals.concat(pastCurrent);
            if ((!anyValidLessBombs) && totalBombsNow < bombsToMark) anyValidLessBombs = true;
          }

          if (totalBombsNow < bombsToMark) {
            for (let i = 0; i < remaining.length; i++) {
              const shallowCopy = remaining.concat();
              shallowCopy.splice(i, 1);
              recursiveTest(pastCurrent, remaining[i], shallowCopy)
            }
          }
        }
      }
    }

    const testedObj = {};
    let anyValidLessBombs = false;
    let totals = [];

    for (let i = 0; i < toMark.length; i++) {
      const remaining = toMark.concat();
      remaining.splice(i, 1);
      recursiveTest([], toMark[i], remaining);
    }
    totals = totals.filter((x, i, arr) => arr.indexOf(x) === i);

    return [totals, anyValidLessBombs];
  }

  function thirdPass() {
    function secondAndThird() {
      secondPass();
      return thirdPass();
    }

    function listUnfold(toUnfold) {
      for (let i = 0; i < toUnfold.length; i++) {
        const q = toUnfold[i].split(',');
        map.unfold(q[0], q[1]);
      }
      return secondAndThird();
    }

    const bombsToMark = n - map.nBombs;

    if (map.invalid) return bombsToMark;
    if (bombsToMark === 0) return 0;

    let clusters = getClusters();

    let toMark = map.toMarkRcs;
    const toMarkNeedToFulfill = [];

    for (let i = 0; i < toMark.length; i++) {
      const dotAdjs = map.getAdjRcs(toMark[i]);
      let needToFulfill = false;
      innerLoop:
        for (let j = 0; j < dotAdjs.length; j++) {
          const adj = dotAdjs[j];
          if (adj.val > 0 && (adj.val - adj.bombs) > 0) {
            needToFulfill = true;
            break innerLoop;
          }
        }
      if (needToFulfill) toMarkNeedToFulfill.push(toMark[i]);
    }

    const [totals, anyValidLessBombs] = getAllChances(toMarkNeedToFulfill, bombsToMark, clusters);

    if (totals.length === 0) return bombsToMark;
    if (anyValidLessBombs) {
      toMark = toMarkNeedToFulfill;
    }
    if (totals.length < toMark.length) {
      const toUnfold = toMark.filter(x => totals.indexOf(x) === -1);
      return listUnfold(toUnfold);
    }

    return bombsToMark;
  }

  function finalize() {
    if (map.toMark.length) {
      const each = map.toMark
        .map((x) => [x, map.getAdj(x[0], x[1]).map(y => y.val).reduce((acc, y) => (y === -2) ? acc + 1 : acc, 0)]);
      each.forEach((x) => map.set(x[1], x[0][0], x[0][1]));
    }
  }

  map = new Quadrants(map);
  firstPass();
  secondPass();
  const bombsLeft = thirdPass();

  if (bombsLeft || map.invalid || map.nBombs !== n) return '?';
  finalize();
  return map.toString();
}