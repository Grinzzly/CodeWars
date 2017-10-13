function array(item){
  return item.split(",").slice(1,-1).join(" ") || null;
}