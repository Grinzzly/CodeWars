function humanReadable(seconds) {
  var t = function(x) { return (x < 10) ? "0"+x : x; }
    return t(parseInt(seconds / (60*60))) + ":" + t(parseInt(seconds / 60%60)) + ":" +
    t(seconds % 60)
}