function order(words){
  return words.split(" ").sort((x,y)=>x.replace(/\D/g,'')-y.replace(/\D/g,'')).join(' ');
}