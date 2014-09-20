function Calc(selector) {
  if (!(this instanceof Calc)) {
    return new Calc(selector);
  }
  selector = !selector || typeof selector !== 'string' ? '.calc' : selector;

  // Methods and variables public
  // hoisting from hell
  var display = {
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
        return _output.value;
      },
      set: function (formula) {
        _output.value = formula;
      }
    },
    erase: function () {
      _input.value = '';
      _output.innerHTML = '0';
    }
  };
  var showError = function () {
    _skin.classList.add('calcError');
    setTimeout(function () {
      _skin.classList.remove('calcError');
    }, 300);
  };

  // Methods and variables private
  var _skin = document.querySelector(selector);
  var _input = _skin.querySelector('.input');
  var _output = _skin.querySelector('.output');
  var _parenthesesOpen = _skin.querySelector('.bracket[data-name=parenthesesOpen]');
  var _parenthesesClose = _skin.querySelector('.bracket[data-name=parenthesesClose]');
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
  var equality = _skin.querySelector('.operator[data-name=equality]');
  var _rulesForParenthesesOpen = function () {
    var formula = display.input.get();
    if (formula === '') {
      return display.input.concat(this.innerHTML);
    } else if (formula[formula.length - 1].search(/[)0-9]/) >= 0) {
      return display.input.concat('x' + this.innerHTML);
    } else if (formula[formula.length - 1].search(/[.]/) < 0) {
      return display.input.concat(this.innerHTML);
    }
    return showError();
  };
  var _rulesForParenthesesCloses = function () {
    var formula = display.input.get();
    var opens = formula.match(/[(]/g);
    var closes = formula.match(/[)]/g);
    if ((opens && closes && opens.length > closes.length) || (opens && !closes)) {
      if (formula[formula.length - 1].search(/[.+\-x÷(]/) < 0) {
        return display.input.concat(this.innerHTML);
      }
    }
    return showError();
  };
  var _rulesForNumbers = function () {
    var formula = display.input.get();
    if (formula === '') {
      return display.input.concat(this.innerHTML);
    } else if (formula[formula.length - 1].search(/[)]/) < 0) {
      return display.input.concat(this.innerHTML);
    }
    return showError();
  };
  var _rulesForDot = function () {
    var formula = display.input.get();
    if (formula) {
      formula = formula.split(/[+\-x÷]/).pop();
      if (formula && formula.search(/[.]/) < 0 && formula[formula.length - 1].search(/[()]/) < 0) {
        return display.input.concat(this.innerHTML);
      }
    }
    return showError();
  };
  var _rulesForAddition = function () {
    var formula = display.input.get();
    if (formula){
      if (formula[formula.length - 1].match(/[+\-x÷]/)) {
        return display.input.set(formula.substr(0, formula.length - 1) + '+');
      } else if (formula[formula.length - 1].search(/[.(]/) < 0) {
        return display.input.concat(this.innerHTML);
      }
    }
    return showError();
  };
  var _ruleForSubtraction = function () {
    var formula = display.input.get();
    if (formula){
      if (formula[formula.length - 1].match(/[+\-x÷]/)) {
        return display.input.set(formula.substr(0, formula.length - 1) + '-');
      } else if (formula[formula.length - 1].search(/[.]/) < 0) {
        return display.input.concat(this.innerHTML);
      }
    }
    return showError();
  };
  var _ruleForMultiplication = function () {
    var formula = display.input.get();
    if (formula){
      if (formula[formula.length - 1].match(/[+\-x÷]/)) {
        return display.input.set(formula.substr(0, formula.length - 1) + 'x');
      } else if (formula[formula.length - 1].search(/[.(]/) < 0) {
        return display.input.concat(this.innerHTML);
      }
    }
    return showError();
  };
  var _ruleForDivision = function () {
    var formula = display.input.get();
    if (formula){
      if (formula[formula.length - 1].match(/[+\-x÷]/)) {
        return display.input.set(formula.substr(0, formula.length - 1) + '÷');
      } else if (formula[formula.length - 1].search(/[.(]/) < 0) {
        return display.input.concat(this.innerHTML);
      }
    }
    return showError();
  };
  var isValid = function (formula) {
    var parenthesesOpens = formula.match(/[(]/g);
    var parenthesesCloses = formula.match(/[)]/g);
    if (
        (parenthesesOpens && parenthesesCloses && parenthesesOpens.length !== parenthesesCloses.length) ||
        (parenthesesOpens && !parenthesesCloses) || (!parenthesesOpens && parenthesesCloses)
      ) {
      return false;
    }
    return true;
  };
  var calculate = function () {
    var formula = display.input.get();
    if (!isValid(formula)) {
      showError();
    }
  };

  // Defining events
  _parenthesesOpen.addEventListener('click', _rulesForParenthesesOpen);
  _parenthesesClose.addEventListener('click', _rulesForParenthesesCloses);
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
  _clear.addEventListener('click', display.erase);
  _dot.addEventListener('click', _rulesForDot);
  _addition.addEventListener('click', _rulesForAddition);
  _subtraction.addEventListener('click', _ruleForSubtraction);
  _multiplication.addEventListener('click', _ruleForMultiplication);
  _division.addEventListener('click', _ruleForDivision);
  equality.addEventListener('click', calculate);

}

Calc.prototype.sum = function (a, b) {
  return typeof a === 'number' && typeof b === 'number' ? a + b : undefined;
};
Calc.prototype.subtract = function (a, b) {
  return typeof a === 'number' && typeof b === 'number' ? a - b : undefined;
};
Calc.prototype.multiply = function (a, b) {
  return typeof a === 'number' && typeof b === 'number' ? a * b : undefined;
};
Calc.prototype.divide = function (a, b) {
  return typeof a === 'number' && typeof b === 'number' && b !== 0 ? a / b : undefined;
};

var calc = new Calc();
