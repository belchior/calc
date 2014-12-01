function Calc() {
  if (!(this instanceof Calc)) {
    return new Calc();
  }
}

Calc.prototype.parser = function (formula) {
  formula = formula.replace(/[^0-9()+\-x÷.]/g, '');
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
  if (formula.match(/^[x÷).]|\+[x÷).]|-[x÷).]|x[x÷).]|÷[x÷).]|\([x÷).]|\)[.]|\.[+\-x÷().]|\.\d+\.|[+\-x÷(.]$/g)) {
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
  part = formula.match(/\([+\-]?\d+(?:\.\d+)?(?:(?:[x÷][+\-]?|[+\-]|[+][\-]?|[\-][+]?)\d+(?:\.\d+)?)*\)/);
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
  part = formula.match(/[+\-]?\d+(?:\.\d+)?x[+\-]?\d+(?:\.\d+)?/);
  if (part) {
    result = part[0].split('x');
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

  if (formula.match(/[+\-]?\d+(?:\.\d+)?[+\-x÷][+\-]?\d+(?:\.\d+)?/)) {
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

Calc.prototype.skin = function (selector) {
  selector = !selector || typeof selector !== 'string' ? '.calc' : selector;

  var _this = this;
  _this.skin = document.querySelector(selector);
  _this.input = _this.skin.querySelector('.input');
  _this.output = _this.skin.querySelector('.output');
  _this.backspace = _this.skin.querySelector('.btn[data-name=backspace]');
  _this.parenthesisOpen = _this.skin.querySelector('.bracket[data-name=parenthesisOpen]');
  _this.parenthesisClose = _this.skin.querySelector('.bracket[data-name=parenthesisClose]');
  _this.number1 = _this.skin.querySelector('.number[data-name=number1]');
  _this.number2 = _this.skin.querySelector('.number[data-name=number2]');
  _this.number3 = _this.skin.querySelector('.number[data-name=number3]');
  _this.number4 = _this.skin.querySelector('.number[data-name=number4]');
  _this.number5 = _this.skin.querySelector('.number[data-name=number5]');
  _this.number6 = _this.skin.querySelector('.number[data-name=number6]');
  _this.number7 = _this.skin.querySelector('.number[data-name=number7]');
  _this.number8 = _this.skin.querySelector('.number[data-name=number8]');
  _this.number9 = _this.skin.querySelector('.number[data-name=number9]');
  _this.number0 = _this.skin.querySelector('.number[data-name=number0]');
  _this.clear = _this.skin.querySelector('.btn[data-name=clear]');
  _this.dot = _this.skin.querySelector('.btn[data-name=dot]');
  _this.addition = _this.skin.querySelector('.operator[data-name=addition]');
  _this.subtraction = _this.skin.querySelector('.operator[data-name=subtraction]');
  _this.multiplication = _this.skin.querySelector('.operator[data-name=multiplication]');
  _this.division = _this.skin.querySelector('.operator[data-name=division]');
  _this.equality = _this.skin.querySelector('.operator[data-name=equality]');

  _this.display = {
    input: {
      concat: function () {
        if (typeof arguments[0] !== 'undefined') {
          _this.input.innerHTML += arguments[0];
        } else {
          return _this.input.innerHTML;
        }
      },
      get: function () {
        return _this.input.innerHTML;
      },
      set: function (formula) {
        _this.input.innerHTML = formula;
      }
    },
    output: {
      get: function () {
        return _this.output.innerHTML;
      },
      set: function (formula) {
        _this.output.innerHTML = formula;
      }
    },
    erase: function () {
      _this.input.innerHTML = '';
      _this.output.innerHTML = '0';
    }
  };

  _this.showError = function () {
    _this.skin.classList.add('calcError');
    setTimeout(function () {
      _this.skin.classList.remove('calcError');
    }, 300);
  };
  _this.showResult = function () {
    try {
      var formula = _this.parser(_this.display.input.get());
      if (!formula) {
        return _this.showError();
      }
      formula = _this.calculate(formula);
      var results = _this.display.output.get();
      _this.display.input.set('');
      _this.display.output.set(formula);

    } catch (err) {
      console.error('Calc error: ' + err.message);
      _this.showError();
    }
  };

  _this.rulesForBackspace = function () {
    var formula = _this.display.input.get();
    if (formula) {
      return _this.display.input.set(formula.slice(0, formula.length - 1));
    }
    return _this.showError();
  };
  _this.rulesForparenthesisOpen = function () {
    var formula = _this.display.input.get();
    if (formula === '') {
      return _this.display.input.concat(this.getAttribute('data-value'));
    } else if (formula[formula.length - 1].search(/[)0-9]/) >= 0) {
      return _this.display.input.concat('x' + this.getAttribute('data-value'));
    } else if (formula[formula.length - 1].search(/[.]/) < 0) {
      return _this.display.input.concat(this.getAttribute('data-value'));
    }
    return _this.showError();
  };
  _this.rulesForparenthesisCloses = function () {
    var formula = _this.display.input.get();
    var opens = formula.match(/[(]/g);
    var closes = formula.match(/[)]/g);
    if ((opens && closes && opens.length > closes.length) || (opens && !closes)) {
      if (formula[formula.length - 1].search(/[.+\-x÷(]/) < 0) {
        return _this.display.input.concat(this.getAttribute('data-value'));
      }
    }
    return _this.showError();
  };
  _this.rulesForNumbers = function () {
    var formula = _this.display.input.get();
    if (formula === '') {
      return _this.display.input.concat(this.getAttribute('data-value'));
    } else if (formula[formula.length - 1].search(/[)]/) < 0) {
      return _this.display.input.concat(this.getAttribute('data-value'));
    }
    return _this.showError();
  };
  _this.rulesForDot = function () {
    var formula = _this.display.input.get();
    if (formula) {
      formula = formula.split(/[+\-x÷]/).pop();
      if (formula && formula.search(/[.]/) < 0 && formula[formula.length - 1].search(/[()]/) < 0) {
        return _this.display.input.concat(this.getAttribute('data-value'));
      }
    }
    return _this.showError();
  };
  _this.rulesForAddition = function () {
    var formula = _this.display.input.get();
    if (formula){
      if (formula[formula.length - 1].match(/[+\-x÷]/)) {
        return _this.display.input.set(formula.slice(0, formula.length - 1) + '+');
      } else if (formula[formula.length - 1].search(/[.(]/) < 0) {
        return _this.display.input.concat(this.getAttribute('data-value'));
      }
    }
    return _this.showError();
  };
  _this.ruleForSubtraction = function () {
    var formula = _this.display.input.get();
    if (!formula){
      return _this.display.input.concat(this.getAttribute('data-value'));
    }
    if (formula[formula.length - 1].match(/[+\-x÷]/)) {
      return _this.display.input.set(formula.slice(0, formula.length - 1) + '-');
    }
    if (formula[formula.length - 1].search(/[.]/) < 0) {
      return _this.display.input.concat(this.getAttribute('data-value'));
    }
    return _this.showError();
  };
  _this.ruleForMultiplication = function () {
    var formula = _this.display.input.get();
    if (formula){
      if (formula[formula.length - 1].match(/[+\-x÷]/)) {
        return _this.display.input.set(formula.slice(0, formula.length - 1) + 'x');
      } else if (formula[formula.length - 1].search(/[.(]/) < 0) {
        return _this.display.input.concat(this.getAttribute('data-value'));
      }
    }
    return _this.showError();
  };
  _this.ruleForDivision = function () {
    var formula = _this.display.input.get();
    if (formula){
      if (formula[formula.length - 1].match(/[+\-x÷]/)) {
        return _this.display.input.set(formula.slice(0, formula.length - 1) + '÷');
      } else if (formula[formula.length - 1].search(/[.(]/) < 0) {
        return _this.display.input.concat(this.getAttribute('data-value'));
      }
    }
    return _this.showError();
  };

  // Defining events
  _this.backspace.addEventListener('click', _this.rulesForBackspace);
  _this.parenthesisOpen.addEventListener('click', _this.rulesForparenthesisOpen);
  _this.parenthesisClose.addEventListener('click', _this.rulesForparenthesisCloses);
  _this.number1.addEventListener('click', _this.rulesForNumbers);
  _this.number2.addEventListener('click', _this.rulesForNumbers);
  _this.number3.addEventListener('click', _this.rulesForNumbers);
  _this.number4.addEventListener('click', _this.rulesForNumbers);
  _this.number5.addEventListener('click', _this.rulesForNumbers);
  _this.number6.addEventListener('click', _this.rulesForNumbers);
  _this.number7.addEventListener('click', _this.rulesForNumbers);
  _this.number8.addEventListener('click', _this.rulesForNumbers);
  _this.number9.addEventListener('click', _this.rulesForNumbers);
  _this.number0.addEventListener('click', _this.rulesForNumbers);
  _this.clear.addEventListener('click', _this.display.erase);
  _this.dot.addEventListener('click', _this.rulesForDot);
  _this.addition.addEventListener('click', _this.rulesForAddition);
  _this.subtraction.addEventListener('click', _this.ruleForSubtraction);
  _this.multiplication.addEventListener('click', _this.ruleForMultiplication);
  _this.division.addEventListener('click', _this.ruleForDivision);
  _this.equality.addEventListener('click', _this.showResult);
  _this.input.addEventListener('keyup', function () {
    this.value = this.value.replace(/[^0-9+\-x÷().]/, '');
  });
  _this.skin.addEventListener('click', function () {
    _this.input.focus();
  });
  _this.display.erase();

  return _this;
};

if (typeof exports === 'object') {
  module.exports = Calc;
}
