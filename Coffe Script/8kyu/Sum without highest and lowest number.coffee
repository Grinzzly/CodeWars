sumArray = (arr) ->
  if arr
    arr.sort (a,b) ->
      a-b.slice(1, arr.length-1).reduce (x,y) -> x+y
      ,0
  else
    0