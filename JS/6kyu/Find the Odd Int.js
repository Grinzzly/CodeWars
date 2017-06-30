function findOdd(A) {
  var n = 0;
  for(var i=0; i<A.length; i++){
    n = n^A[i];
  }
  return n;
}