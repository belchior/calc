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

  // Methods and variables private
  var _skin = document.querySelector(selector);
  var _input = _skin.querySelector('.input');
  var _output = _skin.querySelector('.output');
  var _backspace = _skin.querySelector('.btn[data-name=backspace]');
  var _parenthesisOpen = _skin.querySelector('.bracket[data-name=parenthesisOpen]');
  var _parenthesisClose = _skin.querySelector('.bracket[data-name=parenthesisClose]');
  var _number1 = _skin.querySelector('.number[data-name=number1]');
  var _number2 = _skin.querySelector('.number[data-name=number2]');
  var _number3 = _skin.querySelector('.number[data-name=number3]');
  var _number4 = _skin.querySelector('.number[data-name=number4]');
  var _number5 = _skin.querySelector('.number[data-name=number5]');
  var _number6 = _skin.querySelector('.number[data-name=number6]');
  var _number7 = _skin.querySelector('.number[data-name=number7]');
  var _number8 = _skin.querySelector('.number[data-name=number8]');
  var _number9 = _skin.querySelector('.number[data-name=number9]');
  var _number0 = _skin.querySelector('.number[data-name=number0]');
  var _clear = _skin.querySelector('.btn[data-name=clear]');
  var _dot = _skin.querySelector('.btn[data-name=dot]');
  var _addition = _skin.querySelector('.operator[data-name=addition]');
  var _subtraction = _skin.querySelector('.operator[data-name=subtraction]');
  var _multiplication = _skin.querySelector('.operator[data-name=multiplication]');
  var _division = _skin.querySelector('.operator[data-name=division]');
  var _equality = _skin.querySelector('.operator[data-name=equality]');

  var _display = {
    input: {
      concat: function () {
        if (typeof arguments[0] !== 'undefined') {
          _input.value += arguments[0];
        } else {
          return _input.value;
        }
      },
      get: function () {
        return _input.value;
      },
      set: function (formula) {
        _input.value = formula;
      }
    },
    output: {
      get: function () {
        return _output.innerHTML;
      },
      set: function (formula) {
        _output.innerHTML = formula;
      }
    },
    erase: function () {
      _input.value = '';
      _output.innerHTML = '0';
    }
  };

  var isValid = function (formula) {
    try {
      return Calc.prototype.parser(formula);

    } catch (err) {
      console.error('Calc error: ' + err.message);
      _showError();
    }
  };

  var _showError = function () {
    _skin.classList.add('calcError');
    setTimeout(function () {
      _skin.classList.remove('calcError');
    }, 300);
  };
  var _showResult = function () {
    var formula = _display.input.get();
    if (!isValid(formula)) {
      return _showError();
    }
    _display.input.set('');
    _display.output.set(Calc.prototype.calculate(formula));
  };

  var _rulesForBackspace = function () {
    var formula = _display.input.get();
    if (formula) {
      return _display.input.set(formula.slice(0, formula.length - 1));
    }
    return _showError();
  };
  var _rulesForparenthesisOpen = function () {
    var formula = _display.input.get();
    if (formula === '') {
      return _display.input.concat(this.innerHTML);
    } else if (formula[formula.length - 1].search(/[)0-9]/) >= 0) {
      return _display.input.concat('x' + this.innerHTML);
    } else if (formula[formula.length - 1].search(/[.]/) < 0) {
      return _display.input.concat(this.innerHTML);
    }
    return _showError();
  };
  var _rulesForparenthesisCloses = function () {
    var formula = _display.input.get();
    var opens = formula.match(/[(]/g);
    var closes = formula.match(/[)]/g);
    if ((opens && closes && opens.length > closes.length) || (opens && !closes)) {
      if (formula[formula.length - 1].search(/[.+\-x÷(]/) < 0) {
        return _display.input.concat(this.innerHTML);
      }
    }
    return _showError();
  };
  var _rulesForNumbers = function () {
    var formula = _display.input.get();
    if (formula === '') {
      return _display.input.concat(this.innerHTML);
    } else if (formula[formula.length - 1].search(/[)]/) < 0) {
      return _display.input.concat(this.innerHTML);
    }
    return _showError();
  };
  var _rulesForDot = function () {
    var formula = _display.input.get();
    if (formula) {
      formula = formula.split(/[+\-x÷]/).pop();
      if (formula && formula.search(/[.]/) < 0 && formula[formula.length - 1].search(/[()]/) < 0) {
        return _display.input.concat(this.innerHTML);
      }
    }
    return _showError();
  };
  var _rulesForAddition = function () {
    var formula = _display.input.get();
    if (formula){
      if (formula[formula.length - 1].match(/[+\-x÷]/)) {
        return _display.input.set(formula.slice(0, formula.length - 1) + '+');
      } else if (formula[formula.length - 1].search(/[.(]/) < 0) {
        return _display.input.concat(this.innerHTML);
      }
    }
    return _showError();
  };
  var _ruleForSubtraction = function () {
    var formula = _display.input.get();
    if (!formula){
      return _display.input.concat(this.innerHTML);
    }
    if (formula[formula.length - 1].match(/[+\-x÷]/)) {
      return _display.input.set(formula.slice(0, formula.length - 1) + '-');
    }
    if (formula[formula.length - 1].search(/[.]/) < 0) {
      return _display.input.concat(this.innerHTML);
    }
    return _showError();
  };
  var _ruleForMultiplication = function () {
    var formula = _display.input.get();
    if (formula){
      if (formula[formula.length - 1].match(/[+\-x÷]/)) {
        return _display.input.set(formula.slice(0, formula.length - 1) + 'x');
      } else if (formula[formula.length - 1].search(/[.(]/) < 0) {
        return _display.input.concat(this.innerHTML);
      }
    }
    return _showError();
  };
  var _ruleForDivision = function () {
    var formula = _display.input.get();
    if (formula){
      if (formula[formula.length - 1].match(/[+\-x÷]/)) {
        return _display.input.set(formula.slice(0, formula.length - 1) + '÷');
      } else if (formula[formula.length - 1].search(/[.(]/) < 0) {
        return _display.input.concat(this.innerHTML);
      }
    }
    return _showError();
  };

  // Defining events
  _backspace.addEventListener('click', _rulesForBackspace);
  _parenthesisOpen.addEventListener('click', _rulesForparenthesisOpen);
  _parenthesisClose.addEventListener('click', _rulesForparenthesisCloses);
  _number1.addEventListener('click', _rulesForNumbers);
  _number2.addEventListener('click', _rulesForNumbers);
  _number3.addEventListener('click', _rulesForNumbers);
  _number4.addEventListener('click', _rulesForNumbers);
  _number5.addEventListener('click', _rulesForNumbers);
  _number6.addEventListener('click', _rulesForNumbers);
  _number7.addEventListener('click', _rulesForNumbers);
  _number8.addEventListener('click', _rulesForNumbers);
  _number9.addEventListener('click', _rulesForNumbers);
  _number0.addEventListener('click', _rulesForNumbers);
  _clear.addEventListener('click', _display.erase);
  _dot.addEventListener('click', _rulesForDot);
  _addition.addEventListener('click', _rulesForAddition);
  _subtraction.addEventListener('click', _ruleForSubtraction);
  _multiplication.addEventListener('click', _ruleForMultiplication);
  _division.addEventListener('click', _ruleForDivision);
  _equality.addEventListener('click', _showResult);
  _input.addEventListener('keyup', function () {
    this.value = this.value.replace(/[^0-9+\-x÷().]/, '');
  });
  _skin.addEventListener('click', function () {
    _input.focus();
  });
};

if (typeof exports === 'object') {
  module.exports = Calc;
}
