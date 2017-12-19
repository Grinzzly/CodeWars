const diff = (() => {

  class Node {
  simplify() {
    return this;
  }

  derivative() {
    this.notImplementedError('derivative');
  }

  toString() {
    this.notImplementedError('toString');
  }

  notImplementedError(funcName) {
    throw new Error('Houston we have a problem!');
  }
}

class UnaryFuncNode extends Node {
  constructor(arg, funcName) {
    super();
    this.arg = arg;
    this.funcName = funcName;
  }

  simplify() {
    return new this.constructor(this.arg.simplify());
  }

  toString() {
    return `(${this.funcName} ${this.arg})`;
  }
}

class BinaryOpNode extends Node {
  constructor(left, right, op) {
    super();
    this.left = left;
    this.right = right;
    this.op = op;
  }

  simplify() {
    return new this.constructor(this.left.simplify(), this.right.simplify());
  }

  toString() {
    return `(${this.op} ${this.left} ${this.right})`;
  }
}

class ConstNode extends Node {
  constructor(value) {
    super();
    this.value = value;
  }

  derivative() {
    return new ConstNode(0);
  }

  toString() {
    return `${this.value}`;
  }
}

class VarNode extends Node {
  constructor(symbol) {
    super();
    this.symbol = symbol;
  }

  derivative() {
    return new ConstNode(1);
  }

  toString() {
    return this.symbol;
  }
}

class AddNode extends BinaryOpNode {
  constructor(left, right) {
    super(left, right, '+');
  }

  derivative() {
    return new AddNode(this.left.derivative(), this.right.derivative());
  }

  simplify() {
    let left = this.left.simplify();
    let right = this.right.simplify();
    if (left instanceof ConstNode && right instanceof ConstNode) {
      return new ConstNode(left.value + right.value);
    }
    if (left instanceof ConstNode && left.value === 0) {
      return right;
    }
    if (right instanceof ConstNode && right.value === 0) {
      return left;
    }
    return new AddNode(left, right);
  }
}

class SubNode extends BinaryOpNode {
  constructor(left, right) {
    super(left, right, '-');
  }

  derivative() {
    return new SubNode(this.left.derivative(), this.right.derivative());
  }

  simplify() {
    const left = this.left.simplify();
    const right = this.right.simplify();
    if (left instanceof ConstNode && right instanceof ConstNode) {
      return new ConstNode(left.value - right.value);
    }
    if (right instanceof ConstNode && right.value === 0) {
      return left;
    }
    return new SubNode(left, right);
  }
}

class MulNode extends BinaryOpNode {
  constructor(left, right) {
    super(left, right, '*');
  }

  derivative() {
    const left = new MulNode(this.left, this.right.derivative());
    const right = new MulNode(this.left.derivative(), this.right);
    return new AddNode(left, right);
  }

  simplify() {
    const left = this.left.simplify();
    const right = this.right.simplify();
    if (left instanceof ConstNode && right instanceof ConstNode) {
      return new ConstNode(left.value * right.value);
    }
    if (left instanceof ConstNode) {
      if (left.value === 0) {
        return new ConstNode(0);
      }
      if (left.value === 1) {
        return right;
      }
    }
    if (right instanceof ConstNode) {
      if (right.value === 0) {
        return new ConstNode(0);
      }
      if (right.value === 1) {
        return left;
      }
    }
    return new MulNode(left, right);
  }
}

class DivNode extends BinaryOpNode {
  constructor(num, den) {
    super(num, den, '/');
    this.num = num;
    this.den = den;
  }

  derivative() {
    const numLeft = new MulNode(this.num.derivative(), this.den);
    const numRight = new MulNode(this.num, this.den.derivative());
    const num = new SubNode(numLeft, numRight);
    const den = new PowNode(this.den, new ConstNode(2));
    return new DivNode(num, den);
  }

  simplify() {
    const num = this.num.simplify();
    const den = this.den.simplify();
    if (den instanceof ConstNode) {
      if (num instanceof ConstNode) {
        return new ConstNode(num.value / den.value);
      }
      if (den.value === 1) {
        return num;
      }
    }
    return new DivNode(num, den);
  }
}

class PowNode extends BinaryOpNode {
  constructor(arg, pow) {
    super(arg, pow, '^');
    this.arg = arg;
    this.pow = pow;
  }

  derivative() {
    const dInner = this.arg.derivative();
    const powerMinusOne = new SubNode(this.pow, new ConstNode(1));
    const dOuter = new MulNode(this.pow, new PowNode(this.arg, powerMinusOne));
    return new MulNode(dInner, dOuter);
  }

  simplify() {
    let arg = this.arg.simplify();
    let pow = this.pow.simplify();
    if (arg instanceof ConstNode && pow instanceof ConstNode) {
      return new ConstNode(Math.pow(arg.value, pow.value));
    }
    if (pow instanceof ConstNode) {
      if (pow.value === 0) {
        return new ConstNode(1);
      }
      if (pow.value === 1) {
        return arg;
      }
    }
    return new PowNode(arg, pow);
  }
}

class ExpNode extends UnaryFuncNode {
  constructor(arg) {
    super(arg, 'exp');
  }

  derivative() {
    return new MulNode(this.arg.derivative(), this);
  }
}

class LnNode extends UnaryFuncNode {
  constructor(arg) {
    super(arg, 'ln');
  }

  derivative() {
    return new DivNode(this.arg.derivative(), this.arg);
  }
}

class SinNode extends UnaryFuncNode {
  constructor(arg) {
    super(arg, 'sin');
  }

  derivative() {
    return new MulNode(this.arg.derivative(), new CosNode(this.arg));
  }
}

class CosNode extends UnaryFuncNode {
  constructor(arg) {
    super(arg, 'cos');
  }

  derivative() {
    return new MulNode(this.arg.derivative(), new MulNode(new ConstNode(-1), new SinNode(this.arg)));
  }
}

class TanNode extends UnaryFuncNode {
  constructor(arg) {
    super(arg, 'tan');
  }

  derivative() {
    let dInner = this.arg.derivative();
    let tanSquared = new PowNode(this, new ConstNode(2));
    let dOuter = new AddNode(new ConstNode(1), tanSquared);
    return new MulNode(dInner, dOuter);
  }
}

const tokenRe = /x|-?\d+|\(|\)|\+|-|\*|\/|\^|sin|cos|tan|exp|ln/g;

class Parser {
  constructor(expr) {
    this.tokenize(expr);
    this.pos = 0;
    this.advance();
  }

  tokenize(expr) {
    this.tokens = tokenRe[Symbol.match](expr);
  }

  advance() {
    this.currentToken = this.pos < this.tokens.length ? this.tokens[this.pos++] : 'EOF';
  }

  error() {
    throw new Error(`Houston we have a problem!`);
  }

  eat(token) {
    if (this.currentToken === token) {
      this.advance();
    } else {
      this.error();
    }
  }

  parse() {
    let node = this.expr();
    return node;
  }

  expr() {
    if (this.currentToken === '(') {
      this.eat(this.currentToken);
      let node = this.expr();
      this.eat(')');
      return node;
    }
    if (/-?\d+/.test(this.currentToken)) {
      let node = new ConstNode(parseInt(this.currentToken));
      this.eat(this.currentToken);
      return node;
    }
    if (this.currentToken === 'x') {
      let node = new VarNode(this.currentToken);
      this.eat(this.currentToken);
      return node;
    }
    if (['sin', 'cos', 'tan', 'exp', 'ln'].includes(this.currentToken)) {
      let func = this.currentToken;
      this.eat(func);
      let arg = this.expr();
      switch (func) {
        case 'sin':
          return new SinNode(arg);
        case 'cos':
          return new CosNode(arg);
        case 'tan':
          return new TanNode(arg);
        case 'exp':
          return new ExpNode(arg);
        case 'ln':
          return new LnNode(arg);
        default:
          return null;
      }
    }
    if ('+-*/^'.includes(this.currentToken)) {
      let op = this.currentToken;
      this.eat(op);
      let left = this.expr();
      let right = this.expr();
      switch (op) {
        case '+':
          return new AddNode(left, right);
        case '-':
          return new SubNode(left, right);
        case '*':
          return new MulNode(left, right);
        case '/':
          return new DivNode(left, right);
        case '^':
          return new PowNode(left, right);
        default:
          return null;
      }
    }
    this.error();
  }
}

return expr => new Parser(expr).parse().derivative().simplify().toString();
})();