function countWords(str) {
  let words = str.match(/[a-zA-Z0-9\-'`]+/g);
  return (str === '' || !words) ? 0 : words.length;
}