class Pioneer {
  constructor(map, exit) {
    this.map = map;
    this.exit = exit;
    this.found = false;
    this.visited = [];

    map.forEach(() => {
      this.visited.push(new Array(map[0].length));
    });

    this.path = [];
  }

  outOfBoundaries(x, y) {
    return (x < 0 || y < 0 || x >= this.map.length || y >= this.map[0].length);
  }

  walk(x, y) {
    if (x === this.exit.x && y === this.exit.y) {
      this.found = true;
      return true;
    }

    if (this.found || this.outOfBoundaries(x, y) || !this.map[x][y] || this.visited[x][y]) {
      return false;
    }

    this.visited[x][y] = true;

    let moveUp = this.walk(x, y - 1, 'up');
    let moveLeft = this.walk(x - 1, y, 'left');
    let moveRight = this.walk(x + 1, y, 'right');
    let moveDown = this.walk(x, y + 1, 'down');

    let currentMovement = moveLeft ? 'left' : moveUp ? 'up' : moveRight ? 'right' : moveDown ? 'down' : false;

    if (currentMovement) {
      this.path.push(currentMovement);
    }

    return !!currentMovement;
  }

  keepWalking(x, y) {
    this.walk(x, y);

    return this.path.reverse();
  }
}

function solve(map, miner, exit) {
  const pioneer = new Pioneer(map, exit);
  return pioneer.keepWalking(miner.x, miner.y);
}