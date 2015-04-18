function Calc() {
  if (!(this instanceof Calc)) {
    return new Calc();
  }
}

Calc.prototype.isNumber = function (number) {
  var answer = true;
  if (isNaN(number) || (typeof number !== 'number')) { answer = NaN; }
  if (!isFinite(number)) { answer = Infinity; }
  return answer;
};

Calc.prototype.sqrt = function (number) {
  return Calc.prototype.format(Math.sqrt(number));
};

Calc.prototype.power = function (a, b) {
  var result = a;
  var times = Math.abs(b);
  var integer;
  var decimal;

  if (this.isNumber(a) !== true || this.isNumber(b) !== true || (a === 0 && b < 0)) {
    throw new SyntaxError('It\'s impossible calculate power of ' + a);
  }

  // b is float?
  if (b % 1 !== 0) {
    return Calc.prototype.format(Math.pow(a, b));
  }

  if (a === 0 && b > 0) { return 0; }
  if (b === 0) { return 1; }
  if (b === 1) { return a; }

  while (times > 1) {
    result = Calc.prototype.multiply(result, a);
    times -= 1;
  }

  if (b < 0) {
    result = Calc.prototype.divide(1, result);
  }
  return Calc.prototype.format(result);
};

Calc.prototype.percentage = function (a, b) {
  b = b || 1;
  if (this.isNumber(a) === true && this.isNumber(b) === true) {
    return parseFloat((a / 100 * b).toFixed(8));
  }
  throw new SyntaxError('It\'s impossible calculate percentage of ' + a);
};

Calc.prototype.multiply = function (a, b) {
  if (this.isNumber(a) === true && this.isNumber(b) === true) {
    return parseFloat((a * b).toFixed(8));
  }
  throw new SyntaxError('It\'s impossible multiply ' + a + ' by ' + b);
};

Calc.prototype.divide = function (a, b) {
  if (this.isNumber(a) === true && this.isNumber(b) === true && b !== 0) {
    return parseFloat((a / b).toFixed(8));
  }
  throw new SyntaxError('It\'s impossible divide ' + a + ' by ' + b);
};

Calc.prototype.sum = function (a, b) {
  if (this.isNumber(a) === true && this.isNumber(b) === true) {
    return parseFloat((a + b).toFixed(8));
  }
  throw new SyntaxError('It\'s impossible sum ' + a + ' by ' + b);
};

Calc.prototype.subtract = function (a, b) {
  if (this.isNumber(a) === true && this.isNumber(b) === true) {
    return parseFloat((a - b).toFixed(8));
  }
  throw new SyntaxError('It\'s impossible subtract ' + a + ' by ' + b);
};

Calc.prototype.format = function (number, decimal) {
  number = number || number === 0 ? number : NaN;
  decimal = decimal || 8;
  return parseFloat(Number(number).toFixed(decimal));
};

Calc.prototype.parser = function (formula) {
  formula = formula.replace(/[^0-9()+\-×÷%.^√π]/g, '');
  var index;
  var parenthesisOpens = formula.match(/[(]/g);
  var parenthesisCloses = formula.match(/[)]/g);

  if (
      (parenthesisOpens && parenthesisCloses && parenthesisOpens.length !== parenthesisCloses.length) ||
      (parenthesisOpens && !parenthesisCloses) || (!parenthesisOpens && parenthesisCloses)
    ) {
    throw new SyntaxError('divergence between parenthesis');
  }

  parenthesisOpens = parenthesisCloses = 0;
  for (index in formula) {
    if (formula[index] === '(') {
      parenthesisOpens += 1;
    } else if (formula[index] === ')') {
      parenthesisCloses += 1;
      if (parenthesisOpens < parenthesisCloses) {
        throw new SyntaxError('divergence between parenthesis');
      }
    }
  }

  // get errors of arithmetic combination of characters
  if (formula.match(/^[×÷%).]|\+[×÷%).]|-[×÷%).]|×[×÷%).]|÷[×÷%).]|%[0-9%(.]|\([×÷%).]|\)[.]|\.[+\-×÷%().]|\.\d+\.|[+\-×÷(.]$/g)) {
    throw new SyntaxError('invalid arithmetic combination of characters');
  }

  return formula;
};

Calc.prototype.calculate = function (formula) {

  this.calculate.parenthesis = function (formula, stack) {
    stack = stack.slice();
    var part;
    var result;
    var next = stack.pop();

    // obteins the most internal parenthesis
    part = formula.match(/\([0-9+\-×÷%.^√π]+\)/);
    if (part) {
      result = next(part[0].replace(/[()]/g, ''), stack);
      if (result < 0 && formula[part.index - 1] === '-') {
        formula = formula.replace('-' + part[0], '+' + Math.abs(result));
      } else {
        formula = formula.replace(part[0], result);
      }
      stack.push(next);
      return Calc.prototype.calculate.parenthesis(formula, stack);
    }

    return next(formula, stack);
  };

  this.calculate.power = function (formula, stack) {
    stack = stack.slice();
    var part;
    var result;
    var next;

    // get part to calculate power
    part = formula.match(/(\d+(?:\.\d+)?)\^([+\-]?\d+(?:\.\d+)?)/);
    if (part) {
      part[1] = parseFloat(part[1]);
      part[2] = parseFloat(part[2]);
      result = Calc.prototype.power(part[1], part[2]);
      formula = formula.replace(part[0], result);
      return Calc.prototype.calculate.power(formula, stack);
    }

    next = stack.pop();
    return next(formula, stack);
  };

  this.calculate.sqrt = function (formula, stack) {
    stack = stack.slice();
    var part;
    var result;
    var next;

    // get part to calculate sqrt
    part = formula.match(/√([+]?\d+(?:\.\d+)?)/);
    if (part) {
      part[1] = parseFloat(part[1]);
      result = Calc.prototype.sqrt(part[1]);
      formula = formula.replace(part[0], result);
      return Calc.prototype.calculate.sqrt(formula, stack);
    }

    next = stack.pop();
    return next(formula, stack);
  };

  this.calculate.percentage = function (formula, stack) {
    stack = stack.slice();
    var part;
    var result;
    var next;

    // get parts to calculate percentage
    part = formula.match(/(?:([+\-]?\d+(?:\.\d+)?)[+\-×÷])?([+\-]?\d+(?:\.\d+)?)%/);
    if (part) {
      part = [part[0], parseFloat(part[1]), parseFloat(part[2])];
      result = Calc.prototype.percentage(part[2], part[1]);
      result = part[0].replace(part[2] + '%', result);
      formula = formula.replace(part[0], result);
      return Calc.prototype.calculate.percentage(formula, stack);
    }

    next = stack.pop();
    return next(formula, stack);
  };

  this.calculate.multiplyOrDivide = function (formula, stack) {
    stack = stack.slice();
    var part;
    var result;
    var next;

    // get parts to multiply or divide
    part = formula.match(/([+\-]?\d+(?:\.\d+)?)(×|÷)([+\-]?\d+(?:\.\d+)?)/);
    if (part) {
      part[1] = parseFloat(part[1]);
      part[3] = parseFloat(part[3]);
      result = part[2] === '×' ? Calc.prototype.multiply(part[1], part[3]) : Calc.prototype.divide(part[1], part[3]);
      if (
        formula[part.index - 1] &&
        ((part[1] >= 0 && part[3] >= 0) || (part[1] < 0 && part[3] < 0))
      ) {
        formula = formula.replace(part[0], '+' + result);
      }
      formula = formula.replace(part[0], result);
      return Calc.prototype.calculate.multiplyOrDivide(formula, stack);
    }

    next = stack.pop();
    return next(formula, stack);
  };

  this.calculate.sumOrSubtract = function (formula, stack) {
    stack = stack.slice();
    var part;
    var result;
    var next;

    // get parts to sum or subtract
    part = formula.match(/([+\-]?\d+(?:\.\d+)?)(\+|-)([+\-]?\d+(?:\.\d+)?)/);
    if (part) {
      part = [part[0], parseFloat(part[1]), part[2], parseFloat(part[3])];
      result = part[2] === '+' ? Calc.prototype.sum(part[1], part[3]) : Calc.prototype.subtract(part[1], part[3]);
      formula = formula.replace(part[0], result);
      return Calc.prototype.calculate.sumOrSubtract(formula, stack);
    }

    next = stack.pop();
    return next(formula, stack);
  };

  this.calculate.format = function (formula) {
    return Calc.prototype.format(formula);
  };

  formula = this.parser(formula);
  if (!formula) {return NaN;}

  var stack = [
    this.calculate.parenthesis,
    this.calculate.power,
    this.calculate.sqrt,
    this.calculate.percentage,
    this.calculate.multiplyOrDivide,
    this.calculate.sumOrSubtract,
    this.calculate.format
  ].reverse();
  var next = stack.pop();

  return next(formula, stack);
};

if (typeof exports === 'object') {
  module.exports = Calc;
}
