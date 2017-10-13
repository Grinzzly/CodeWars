function partitionOn(pred, items) {
  let right = items.filter(item => !pred(item));
  let left = items.filter(item =>  pred(item));
  items.splice(0); items.push(...right); items.push(...left);
  return right.length;
}