const divideIntoGroups = (items, centers) => {
  const maps = centers.map((c) => {
    return {};
  });
  const sum = items.reduce((result, item) => {
    const n = item.size;
    let index = centers.findIndex((c, i) => i === centers.length - 1 || n <= (centers[i] + centers[i + 1]) / 2);
    if (index === 2 && item.ch === '1') {
      index = 1;
    }
    const delta = Math.abs(n - centers[index]);
    maps[index][n] = maps[index][n] ? maps[index][n] + 1 : 1;
    return result + delta * delta;
  }, 0);
  return {maps, sum};
};
const getNewCenter = (map) => {
  let sum = 0;
  let count = 0;
  for (const s in map) {
    const c = map[s];
    sum += s * c;
    count += c;
  }
  return count ? sum / count : 0;
};

const kmeans = (items, centers) => {
  let prevState = divideIntoGroups(items, centers);
  let newState = null;

  let limit = 100;
  while (limit--) {
    centers = prevState.maps.map(getNewCenter);
    newState = divideIntoGroups(items, centers);
    if (Math.abs(prevState.sum - newState.sum) < 0.01) break;
    prevState = newState;
  }

  return newState.maps;
};

const decodeBitsAdvanced = (bits) => {
  bits = bits.replace(/^0+/, '').replace(/0+$/, '');
  if (!bits) return '';

  const items = bits.match(/([01])\1*/g).map((match) => {
    return {
      ch: match[0],
      size: match.length
    };
  });

  const centers = [1, 3, 7];
  const sizeMaps = kmeans(items, centers);

  const avgs = sizeMaps.map((m) => {
    const keys = Object.keys(m).map((s) => parseInt(s));
    return (Math.min.apply(Math, keys) + Math.max.apply(Math, keys)) / 2;
  });

  const valid = avgs.filter((val) => val).length;

  let limit1;
  let limit2;
  if (valid === 3) {
    limit1 = (avgs[0] + avgs[1]) / 2;
    limit2 = (avgs[1] + avgs[2]) / 2;
  } else if (valid === 2) {
    const min = avgs[0] || avgs[1];
    const max = avgs[2] || avgs[1];
    if (max >= min * (3 + 7) / 2) {
      const avg3 = (min + max) * 3 / (1 + 7);
      limit1 = (min + avg3) / 2;
      limit2 = (avg3 + max) / 2;
    } else if (max >= min * (1 + 3) / 2) {
      limit1 = (min + max) / 2;
      limit2 = max;
    } else {
      limit1 = min;
      limit2 = (min + max) / 2;
    }
  } else if (valid === 1) {
    limit1 = avgs[0] || avgs[1] || avgs[2];
  }

  return bits.replace(/0+|1+/g, (match) => {
    if (match[0] === '1') {
      return match.length <= limit1 ? '.' : '-';
    } else {
      if (match.length <= limit1) return '';
      if (match.length <= limit2) return ' ';
      return '   ';
    }
  });
};

const decodeMorse = (morseCode) => {
  return morseCode.trim().split('   ').map((codes) => {
    return codes.split(' ').map((c) => MORSE_CODE[c]).join('');
  }).join(' ');
};
