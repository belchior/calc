function Calc() {

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

function Skin(selector) {
  selector = !selector || typeof selector !== 'string' ? '.calc' : selector;

  // Private methods and variables
  var _skin = document.querySelector(selector);
  var _input = _skin.querySelector('.input');
  var _output = _skin.querySelector('.output');
  var _parenthesesOpen = _skin.querySelector('.bracket[name=parenthesesOpen]');
  var _parenthesesClose = _skin.querySelector('.bracket[name=parenthesesClose]');
  var _number1 = _skin.querySelector('.number[name=number1]');
  var _number2 = _skin.querySelector('.number[name=number2]');
  var _number3 = _skin.querySelector('.number[name=number3]');
  var _number4 = _skin.querySelector('.number[name=number4]');
  var _number5 = _skin.querySelector('.number[name=number5]');
  var _number6 = _skin.querySelector('.number[name=number6]');
  var _number7 = _skin.querySelector('.number[name=number7]');
  var _number8 = _skin.querySelector('.number[name=number8]');
  var _number9 = _skin.querySelector('.number[name=number9]');
  var _number0 = _skin.querySelector('.number[name=number0]');
  var _clear = _skin.querySelector('.btn[name=clear]');
  var _dot = _skin.querySelector('.btn[name=dot]');
  var _addition = _skin.querySelector('.operator[name=addition]');
  var _subtraction = _skin.querySelector('.operator[name=subtraction]');
  var _multiplication = _skin.querySelector('.operator[name=multiplication]');
  var _division = _skin.querySelector('.operator[name=division]');
  var _equality = _skin.querySelector('.operator[name=equality]');
  var _rule = function () {
    var formula = input();
    if (formula === '') {
      input(this.innerHTML);

    } else if (formula[formula.length - 1].search(/[)]/) < 0) {
      input(this.innerHTML);
    }
  };

  // Public methods and variables
  var input = function () {
    if (typeof arguments[0] !== 'undefined') {
      _input.value += arguments[0];
    } else {
      return _input.value;
    }
  };
  var output = function () {
    if (arguments[0]) {
      _output.innerHTML = arguments[0];
    } else {
      return _output.innerHTML;
    }
  };
  var erase = function () {
    _input.value = '';
    output('0');
  };

  // Defining events
  _parenthesesOpen.addEventListener('click', function () {
    var formula = input();
    if (formula === '') {
      input(this.innerHTML);

    } else if (formula[formula.length - 1].search(/[.)0-9]/) < 0) {
      input(this.innerHTML);
    }
  });

  // @todo Add rules to open parantheses
  _parenthesesClose.addEventListener('click', function () {
    var formula = input();
    if (formula[formula.length - 1].search(/[.+\-x÷(]/) < 0) {
      input(this.innerHTML);
    }
  });
  _number1.addEventListener('click', _rule);
  _number2.addEventListener('click', _rule);
  _number3.addEventListener('click', _rule);
  _number4.addEventListener('click', _rule);
  _number5.addEventListener('click', _rule);
  _number6.addEventListener('click', _rule);
  _number7.addEventListener('click', _rule);
  _number8.addEventListener('click', _rule);
  _number9.addEventListener('click', _rule);
  _number0.addEventListener('click', _rule);
  _clear.addEventListener('click', erase);
  _dot.addEventListener('click', function () {
    var formula = input();
    if (formula) {
      formula = formula.split(/[+\-x÷]/).pop();
      if (formula && formula.search(/\./) < 0 && formula[formula.length - 1].search(/[()]/) < 0) {
        input(this.innerHTML);
      }
    }
  });
  _addition.addEventListener('click', function () { input(this.innerHTML); });
  _subtraction.addEventListener('click', function () { input(this.innerHTML); });
  _multiplication.addEventListener('click', function () { input(this.innerHTML); });
  _division.addEventListener('click', function () { input(this.innerHTML); });

  return {
    input: input,
    output: output,
    erase: erase
  };
}
Calc.prototype.skin = new Skin('.calc');
