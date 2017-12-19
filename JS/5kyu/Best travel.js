const chooseBestSum = (t, k, ls) => {
  let answer = 0;
  const deepSearch = (t, k, ls, start, path) => {
    if (path.length === k) {
      const sum = path.reduce((a, b) => {
        return a + b;
      }, 0);
      if (sum <= t) answer = Math.max(answer, sum);
      return;
    }
    for (let i = start; i < ls.length; i++) {
      path.push(ls[i]);
      deepSearch(t, k, ls, i+1, path);
      path.pop();
    }
  };

  deepSearch(t, k, ls, 0, []);
  return answer === 0 ? null : answer;
};