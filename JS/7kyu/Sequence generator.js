function sequence(n, pattern) {
  return (!pattern && n) ? [null, null] :
    (!n && !pattern) ? [] :
      Array.from({length: n}, typeof pattern === "function" ? pattern : () => pattern)
}