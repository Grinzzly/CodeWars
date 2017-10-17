const Node = function (value, sum) {
  this.duplicat = 1;
  this.value = value;
  this.sum = sum;
  this.right = null;
  this.left = null;
};

const insert = (num, node, ans, i, preSum) => {
  if (node === null) {
    node = new Node(num, 0);
    ans[i] = preSum;
  }
  else if (node.value === num) {
    node.duplicat++;
    ans[i] = preSum + node.sum;
  }
  else if (node.value > num) {
    node.sum++;
    node.left = insert(num, node.left, ans, i, preSum);
  }
  else {
    node.right = insert(num, node.right, ans, i, preSum + node.duplicat + node.sum);
  }

  return node;
};

function smaller(array) {
  let quantity = [];
  let root = null;
  for (let i = array.length - 1; i >= 0; i--) {
    root = insert(array[i], root, quantity, i, 0);
  }

  return quantity;
}