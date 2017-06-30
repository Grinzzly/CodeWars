function isInteresting(number, phrase) {
  function isIncrementing(n) {
    var nSplit = n.toString().split("").map(function(n) { return parseInt(n) });
    var current = nSplit[0];
    for (var i = 1; i < nSplit.length; i++) {
      if (nSplit[i] == 0 && current == 9 && i == nSplit.length - 1) return true;
      if (nSplit[i] != current + 1) return false;
      current = nSplit[i];
    }
    return true;
  }
  
  function isDecrementing(n) {
    var nSplit = n.toString().split("").map(function(n) { return parseInt(n) });
    var current = nSplit[0];
    for (var i = 1; i < nSplit.length; i++) {
      if (nSplit[i] == 0 && current == 1 && i == nSplit.length - 1) return true;
      if (nSplit[i] != current - 1) return false;
      current = nSplit[i];
    }
    return true;
  }
  
  function isPalindrome(n) {
    var nSplit = n.toString().split("").map(function(n) { return parseInt(n) });
    for (var i = 0; i < Math.floor(nSplit.length / 2);  i++) {
      if (nSplit[i] != nSplit[nSplit.length - i - 1]) return false;
    }
    return true;
  }
  
  function isAllZeroes(n) {
    return n.toString().split("0").length == n.toString().length
  }
  
  function isAllSame(n) {
    var nSplit = n.toString().split("").map(function(n) { return parseInt(n) });
    for(var i = 0; i < nSplit.length; i++) {
      if (nSplit[i] != nSplit[0]) return false;
    }
    return true;
  }
  
  function isAwesome(n) {
    var awesome = false;
    phrase.forEach(function(m) { awesome = awesome || n == m });
    return awesome;
  }
    
  var cases = [isAllSame, isIncrementing, isDecrementing, isAllZeroes, isPalindrome, isAwesome];
  
  if (number < 98) return 0;
  for (var i = 0; i < cases.length; i++) {
    console.log(cases[i](number), cases[i].name);
    if (number >= 100 && cases[i](number)) return 2;
    if (cases[i](number + 2) || cases[i](number + 1)) return 1;
  }
  return 0;
}