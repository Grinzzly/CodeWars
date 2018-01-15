const wireCode = Object.keys(global).filter((index) => (typeof global[index] === 'number'))[0];
Bomb.CutTheWire(global[wireCode]);
