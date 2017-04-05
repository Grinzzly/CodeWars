function descendingOrder(n){
  return Number((''+n).split('').sort(function(a,b){return b-a}).join(''))
}