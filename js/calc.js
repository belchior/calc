function Calc() {
  if (!(this instanceof Calc)) {
    return new Calc();
  }
}

Calc.prototype.parser = function (formula) {
  formula = formula.replace(/[^0-9()+\-×÷.]/g, '');
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
  if (formula.match(/^[×÷).]|\+[×÷).]|-[×÷).]|×[×÷).]|÷[×÷).]|\([×÷).]|\)[.]|\.[+\-×÷().]|\.\d+\.|[+\-×÷(.]$/g)) {
    throw new SyntaxError('invalid arithmetic combination of characters');
  }

  return formula;
};

Calc.prototype.calculate = function (formula) {
  formula = this.parser(formula);
  if (!formula) {
    return NaN;
  }

  var part;
  var result;

  // obteins the most internal parenthesis
  part = formula.match(/\([+\-]?\d+(?:\.\d+)?(?:(?:[×÷][+\-]?|[+\-]|[+][\-]?|[\-][+]?)\d+(?:\.\d+)?)*\)/);
  if (part) {
    result = this.calculate(part[0].replace(/[()]/g, ''));
    if (part < 0 && formula[part.index - 1] === '-') {
      formula = formula.replace('-' + part[0], '+' + Math.abs(result));
    } else {
      formula = formula.replace(part[0], result);
    }
    return this.calculate(formula);
  }

  // get parts to multiply
  part = formula.match(/[+\-]?\d+(?:\.\d+)?×[+\-]?\d+(?:\.\d+)?/);
  if (part) {
    result = part[0].split('×');
    result = this.multiply(parseFloat(result[0]), parseFloat(result[1]));
    formula = formula.replace(part[0], result);
  }

  // get parts to divide
  part = formula.match(/[+\-]?\d+(?:\.\d+)?÷[+\-]?\d+(?:\.\d+)?/);
  if (part) {
    result = part[0].split('÷');
    result = this.divide(parseFloat(result[0]), parseFloat(result[1]));
    formula = formula.replace(part[0], result);
  }

  // get parts to sum
  part = formula.match(/[+\-]?\d+(?:\.\d+)?\+[+\-]?\d+(?:\.\d+)?/);
  if (part) {
    result = part[0].split('+');
    result = this.sum(parseFloat(result[0]), parseFloat(result[1]));
    formula = formula.replace(part[0], result);
  }

  // get parts to subtract
  part = formula.match(/[+\-]?\d+(?:\.\d+)?-[+\-]?\d+(?:\.\d+)?/);
  if (part) {
    result = part[0].split('-');
    result = this.subtract(parseFloat(result[0]), parseFloat(result[1]));
    formula = formula.replace(part[0], result);
  }

  if (formula.match(/[+\-]?\d+(?:\.\d+)?[+\-×÷][+\-]?\d+(?:\.\d+)?/)) {
    return this.calculate(formula);
  }
  return Calc.prototype.format(formula);
};

Calc.prototype.multiply = function (a, b) {
  return typeof a === 'number' && typeof b === 'number' ? parseFloat((a * b).toFixed(8)) : NaN;
};

Calc.prototype.divide = function (a, b) {
  if (typeof b === 'number' && b === 0) {
    return Infinity;
  }
  return typeof a === 'number' && typeof b === 'number' ? parseFloat((a / b).toFixed(8)) : NaN;
};

Calc.prototype.sum = function (a, b) {
  return typeof a === 'number' && typeof b === 'number' ? parseFloat((a + b).toFixed(8)) : NaN;
};

Calc.prototype.subtract = function (a, b) {
  return typeof a === 'number' && typeof b === 'number' ? parseFloat((a - b).toFixed(8)) : NaN;
};

Calc.prototype.format = function (formula) {
  var decimal = Math.abs(formula.indexOf('.') - 11);
  decimal = decimal < 8 ? decimal : 8;
  return parseFloat(Number(formula).toFixed(decimal));
};

if (typeof exports === 'object') {
  module.exports = Calc;
}
