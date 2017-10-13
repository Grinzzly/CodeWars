longest = (s1, s2) ->
  s1.concat(s2).split('').filter((currentValue, index, arr) -> arr.indexOf(currentValue) == index).sort().join('');