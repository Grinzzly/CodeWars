function isSantaClausable(obj) {
  return (typeof(obj.sayHoHoHo) === 'function' && typeof(obj.distributeGifts) === 'function' && typeof(obj.goDownTheChimney) === 'function') ? true : false;
}