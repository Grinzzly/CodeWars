function Node() {
  this.next = null;
  this.getNext = function () {
    return this.next;
  };
  this.setNext = function (node) {
    this.next = node;
  };
}

function loop_size(node) {
  let turtle = node,
    hare = node.getNext(),
    size = 0;
  while (turtle !== hare) {
    turtle = turtle.getNext();
    hare = hare.getNext().getNext();
  }
  size++;
  turtle = turtle.getNext();
  while (turtle !== hare) {
    size++;
    turtle = turtle.getNext();
  }
  return size;
}