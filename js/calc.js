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
    if (result < 0 && formula[part.index - 1] === '-') {
      formula = formula.replace('-' + part[0], '+' + Math.abs(result));
    } else {
      formula = formula.replace(part[0], result);
    }
    return this.calculate(formula);
  }

  // get parts to multiply
  part = formula.match(/(\d+(?:\.\d+)?)×([+\-]?\d+(?:\.\d+)?)/);
  if (part) {
    result = this.multiply(parseFloat(part[1]), parseFloat(part[2]));

    if (formula[part.index - 1]) {
      if (result < 0 && formula[part.index - 1] === '-') {
        result = formula[part.index - 2] ? '+' + Math.abs(result) : Math.abs(result);
        formula = formula.replace('-' + part[0], result);

      } else if (result < 0 && formula[part.index - 1] === '+') {
        formula = formula.replace('+' + part[0], result);

      } else { formula = formula.replace(part[0], result); }

    } else { formula = formula.replace(part[0], result); }
  }

  // get parts to divide
  part = formula.match(/(\d+(?:\.\d+)?)÷([+\-]?\d+(?:\.\d+)?)/);
  if (part) {
    result = this.divide(parseFloat(part[1]), parseFloat(part[2]));

    if (formula[part.index - 1]) {
      if (result < 0 && formula[part.index - 1] === '-') {
        result = formula[part.index - 2] ? '+' + Math.abs(result) : Math.abs(result);
        formula = formula.replace('-' + part[0], result);

      } else if (result < 0 && formula[part.index - 1] === '+') {
        formula = formula.replace('+' + part[0], result);

      } else { formula = formula.replace(part[0], result); }

      } else { formula = formula.replace(part[0], result); }
  }

  // testing if there is multiplications or divisions for calculate
  if (formula.match(/\d+(?:\.\d+)?[×÷][+\-]?\d+(?:\.\d+)?/)) {
    return this.calculate(formula);
  }

  // get parts to sum
  part = formula.match(/([+\-]?\d+(?:\.\d+)?)\+([+\-]?\d+(?:\.\d+)?)/);
  if (part) {
    result = this.sum(parseFloat(part[1]), parseFloat(part[2]));
    formula = formula.replace(part[0], result);
  }

  // get parts to subtract
  part = formula.match(/([+\-]?\d+(?:\.\d+)?)-([+\-]?\d+(?:\.\d+)?)/);
  if (part) {
    result = this.subtract(parseFloat(part[1]), parseFloat(part[2]));
    formula = formula.replace(part[0], result);
  }

  // testing if there is additions or subtractions for calculate
  if (formula.match(/[+\-]?\d+(?:\.\d+)?[+\-][+\-]?\d+(?:\.\d+)?/)) {
    return this.calculate(formula);
  }
  return Calc.prototype.format(formula);
};

Calc.prototype.isNumber = function (number) {
  var answer = true;
  if (isNaN(number) || (typeof number !== 'number')) { answer = NaN; }
  if (!isFinite(number)) { answer = Infinity; }
  return answer;
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
  number = number || 8;
  decimal = decimal || 8;
  return parseFloat(Number(number).toFixed(decimal));
};

if (typeof exports === 'object') {
  module.exports = Calc;
}
