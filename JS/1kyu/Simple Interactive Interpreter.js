function i(obj) {
  return JSON.stringify(obj);
}

function Interpreter() {
  this.functions = {};
  this.variables = {};
}

Interpreter.prototype = {
  input: function (expr) {
    var tokens = this.tokenize(expr);
    var tree = this.parse(tokens);
    var result = this.interpret(tree);
    return result;
  },
  interpret: function (tree) {
    switch (tree.type) {
      case "operator":
        return this.interpretOperator(tree);
      case "number":
        return this.interpretNumber(tree);
      case "assignment":
        return this.interpretAssignment(tree);
      case "identifier":
        return this.interpretIdentifier(tree);
      case "function":
        return this.interpretFunction(tree);
      case "fnCall":
        return this.interpretFnCall(tree);
      case "container":
        return this.interpretContainer(tree);
      case "noop":
        return this.interpretNoop(tree);
      default:
        throw "What type is " + JSON.stringify(tree);
    }
  },
  interpretNumber: function (number) {
    return parseFloat(number.value);
  },
  interpretAssignment: function (assignment) {
    if (assignment.name in this.functions)
      throw "Variable name collides with function name: " + assignment.name;
    var value = this.interpret(assignment.value);
    this.variables[assignment.name] = value;
    return value;
  },
  interpretIdentifier: function (identifier) {
    if (identifier.value in this.variables)
      return this.variables[identifier.value];
    throw "Missing identifier: " + identifier.value;
  },
  interpretFunction: function (fn) {
    if (fn.name in this.variables)
      throw "Function name collides with variable name: " + fn.name;
    this.functions[fn.name] = fn;
    return "";
  },
  interpretFnCall: function (fnCall) {



    var that = this;
    var fn = this.functions[fnCall.name];
    var args = fnCall.args.reduce(function (args, pair) {
      args[pair[0]] = that.interpret(pair[1]);
      return args;
    }, Object.create(this.variables));
    var oldVars = this.variables;
    this.variables = args;
    var result = this.interpret(fn.body);
    this.variables = oldVars;
    return result;
  },
  interpretOperator: function (tree) {
    var left = this.interpret(tree.left);
    var right = this.interpret(tree.right);
    switch (tree.operator) {
      case "+":
        return left + right;
      case "*":
        return left * right;
      case "-":
        return left - right;
      case "/":
        return left / right;
      case "%":
        return left % right;
      default:
        throw "What operator is in here? " + JSON.stringify(tree);
    }
  },
  interpretNoop: function (noop) {
    return "";
  },
  interpretContainer: function (container) {
    return this.interpret(container.child);
  },
  tokenize: function (program) {
    if (program === "")
      return [];
    var regex = /\s*(=>|[-+*\/\%=\(\)]|[A-Za-z_][A-Za-z0-9_]*|[0-9]*\.?[0-9]+)\s*/g;
    return program.split(regex).filter(function (s) {
      return !s.match(/^\s*$/);
    });
  },
  parse: function (tokens) {
    var parsed = new Parser(this.functions, tokens).parse();
    if (tokens.length !== 0)
      throw "Extra tokens: " + i(tokens);
    return parsed;
  },
  parseString: function (code) {
    var tokens = this.tokenize(code);
    return this.parse(tokens);
  },
};


function Parser(functions, tokens) {
  this.functions = functions;
  this.tokens = tokens;
}

Parser.prototype = {
  parse: function () {
    if (this.noInput())
      return this.noop();
    if (this.isFunction())
      return this.parseFn();
    else
      return this.parseExpr();
  },
  parseFn: function () {
    this.shift();
    var name = this.tokens.shift();
    var args = this.parseFnArgs();
    this.shift();
    var body = this.parseExpr();
    this.validateIdentifiers(args, body);
    var fn = {
      type: "function",
      name: name,
      args: args,
      body: body,
    };
    return fn;
  },
  shift: function () {
    return this.tokens.shift();
  },
  parseExpr: function () {
    var leftExpr = null;
    var rightExpr = null;

    if (this.tokens.length === 0)
      throw "omg!";

    if (this.isAssignment()) {
      leftExpr = this.parseAssignment();
    } else if (this.isNumber()) {
      leftExpr = this.parseNumber();
    } else if (this.isFnCall()) {
      leftExpr = this.parseFnCall();
    } else if (this.isIdentifier()) {
      leftExpr = this.parseIdentifier();
    } else if (this.opensContainer()) {
      leftExpr = this.parseContainer();
    } else if (this.isFunction()) {
      leftExpr = this.parseFn();
    } else if (this.closesContainer()) {
      throw "WHAT THE FUCK IS: " + JSON.stringify(this.tokens);
    }

    if (this.tokens.length === 0)
      return leftExpr;

    if (!this.isOperator())
      return leftExpr;

    var operator = this.shift();
    var rightExpr = this.parseExpr();
    if ((rightExpr.type !== 'operator') || (!this.shouldSwapOperators(operator, rightExpr.operator)))
      return {
        type: "operator",
        operator: operator,
        left: leftExpr,
        right: rightExpr,
      };

    rightExpr.left = {
      type: "operator",
      operator: operator,
      left: leftExpr,
      right: rightExpr.left,
    }
    return rightExpr;
  },
  noInput: function () {
    return this.tokens.length === 0;
  },
  noop: function () {
    return {type: 'noop'};
  },
  isFnCall: function () {
    return this.isIdentifier() && this.functions[this.tokens[0]];
  },
  isNumber: function () {
    return this.tokens[0].match(/^[0-9][\.0-9]*$/);
  },
  isOperator: function () {
    var t = this.tokens[0];
    return t === '+' ||
      t === '-' ||
      t === '*' ||
      t === '/' ||
      t === '%';
  },
  shouldSwapOperators: function (leftOp, rightOp) {
    return leftOp === '*' || leftOp === '/' || leftOp === '%' ||
      rightOp === '+' || rightOp === '-';
  },
  isIdentifier: function () {
    return this.tokens[0].match(/^[a-zA-Z][_a-zA-Z0-9]*$/);
  },
  isAssignment: function () {
    return this.isIdentifier() && this.tokens[1] === '=';
  },
  opensContainer: function () {
    return this.tokens[0][0] === '(';
  },
  closesContainer: function () {
    return this.tokens[0][0] === ')';
  },
  isFunction: function () {
    return this.tokens[0] === 'fn';
  },
  parseNumber: function () {
    return {type: "number", value: this.tokens.shift()};
  },
  parseIdentifier: function () {
    return {type: "identifier", value: this.tokens.shift()};
  },
  parseAssignment: function () {
    var name = this.parseIdentifier().value;
    this.shift();
    var value = this.parseExpr();
    return {type: "assignment", name: name, value: value};
  },
  parseFnCall: function () {
    var that = this;
    var name = this.tokens.shift();
    var fn = this.functions[name];
    var args = fn.args.map(function (name) {
      if (that.tokens.length === 0)
        throw "Too few arguments!";
      return [name, that.parse()];
    });
    return {
      type: "fnCall",
      name: name,
      args: args,
    };
  },
  parseContainer: function () {
    this.shift();
    var expr = this.parseExpr();
    this.shift();
    return {type: 'container', child: expr};
  },
  parseFnArgs: function () {
    var args = [];
    while (this.tokens[0] !== "=>")
      args.push(this.tokens.shift());
    if (this.containsDuplicates(args))
      throw "Duplicate argument names";
    return args;
  },
  containsDuplicates: function (array) {
    for (var i = 0; i < array.length; ++i)
      for (var j = i + 1; j < array.length; ++j)
        if (array[i] === array[j])
          return true;
    return false;
  },
  validateIdentifiers: function (names, tree) {
    var used = this.varNames(tree);
    used.forEach(function (name) {
      if (-1 === names.indexOf(name))
        throw "Unknown identifier: " + name;
    });
  },
  varNames: function (tree) {
    switch (tree.type) {
      case "operator":
        return this.varNames(tree.left).concat(this.varNames(tree.right));
      case "number":
        return [];
      case "assignment":
        return this.varNames(tree.value);
      case "identifier":
        return [tree.value];
      case "function":
        return [];
      case "fnCall":
        var all = [];
        args.forEach(function (crnt) {
          all = all.concat(crnt);
        });
        return all;
      case "container":
        return this.varNames(tree.child);
      case "noop":
        return [];
      default:
        throw "What type is " + JSON.stringify(tree);
    }
  }
}