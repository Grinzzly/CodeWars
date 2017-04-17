function tribonacci(signature,n){
  if (n < 3) {
    return signature.slice(0,n);
  }

  var result = signature;
  
  for (var i = 3; i < n; i++) {
    result.push((result[i-1] + result[i-2] + result[i-3]));
  }

  return result;
}