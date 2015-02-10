var Terminal = function (selector) {
  if (!(this instanceof Terminal)) {
    return new Terminal(selector);
  }

  var html = typeof selector !== 'string' ? document.querySelector('.calc-terminal') : document.querySelector(selector);
  var _this = this;
  _this.skin = {};
  var lastTabindex = parseInt(html.querySelector('[data-name="backspace"]').getAttribute('tabindex'));

  _this.skin.display = {
    input: {
      concat: function () {
        if (typeof arguments[0] !== 'undefined') {
          _this.skin.input.innerHTML += arguments[0];
        } else {
          return _this.skin.input.innerHTML;
        }
      },
      get: function () {
        return _this.skin.input.innerHTML;
      },
      set: function (formula) {
        _this.skin.input.innerHTML = formula;
      }
    },
    output: {
      get: function () {
        return _this.skin.output.innerHTML;
      },
      set: function (formula) {
        _this.skin.output.innerHTML = formula;
      }
    }
  };
  _this.skin.showError = function () {
    var attrClass = html.getAttribute('class').replace(' calcError', '');
    html.setAttribute('class', attrClass + ' calcError');
    setTimeout(function () {
      attrClass = html.getAttribute('class').replace(' calcError', '');
      html.setAttribute('class', attrClass);
    }, 300);
  };

  var eventNumbers = function () {
    var formula = _this.skin.display.input.get();
    if (formula === '') {
      return _this.skin.display.input.concat(this.getAttribute('data-value'));
    } else if (formula[formula.length - 1].search(/[)]/) < 0) {
      return _this.skin.display.input.concat(this.getAttribute('data-value'));
    }
    return _this.skin.showError();
  };
  var eventAddition = function () {
    var formula = _this.skin.display.input.get();
    if (formula){
      if (formula[formula.length - 1].match(/[+\-×÷]/)) {
        return _this.skin.display.input.set(formula.slice(0, formula.length - 1) + '+');
      } else if (formula[formula.length - 1].search(/[.(]/) < 0) {
        return _this.skin.display.input.concat(this.getAttribute('data-value'));
      }
    }
    return _this.skin.showError();
  };
  var eventSubtraction = function () {
    var formula = _this.skin.display.input.get();
    if (!formula){
      return _this.skin.display.input.concat(this.getAttribute('data-value'));
    }
    if (formula[formula.length - 1].match(/[+\-×÷]/)) {
      return _this.skin.display.input.set(formula.slice(0, formula.length - 1) + '-');
    }
    if (formula[formula.length - 1].search(/[.]/) < 0) {
      return _this.skin.display.input.concat(this.getAttribute('data-value'));
    }
    return _this.skin.showError();
  };
  var eventMultiplication = function () {
    var formula = _this.skin.display.input.get();
    if (formula){
      if (formula[formula.length - 1].match(/[+\-×÷]/)) {
        return _this.skin.display.input.set(formula.slice(0, formula.length - 1) + '×');
      } else if (formula[formula.length - 1].search(/[.(]/) < 0) {
        return _this.skin.display.input.concat(this.getAttribute('data-value'));
      }
    }
    return _this.skin.showError();
  };
  var eventDivision = function () {
    var formula = _this.skin.display.input.get();
    if (formula){
      if (formula[formula.length - 1].match(/[+\-×÷]/)) {
        return _this.skin.display.input.set(formula.slice(0, formula.length - 1) + '÷');
      } else if (formula[formula.length - 1].search(/[.(]/) < 0) {
        return _this.skin.display.input.concat(this.getAttribute('data-value'));
      }
    }
    return _this.skin.showError();
  };
  var eventEquality = function () {
    try {
      var formula = _this.parser(_this.skin.display.input.get());
      if (!formula) {
        return _this.skin.showError();
      }
      formula = _this.calculate(formula);
      var results = _this.skin.display.output.get();
      _this.skin.display.input.set('');
      _this.skin.display.output.set(results + '<output tabindex="' + lastTabindex + '" class="result">' + formula + '</output>');
      _this.skin.output.scrollTop = _this.skin.output.scrollHeight;
      html.querySelector('[tabindex="' + lastTabindex + '"]').focus();
      lastTabindex += 1;

    } catch (err) {
      console.error('Calc error: ' + err.message);
      _this.skin.showError();
    }
  };
  var eventDot = function () {
    var formula = _this.skin.display.input.get();
    if (formula) {
      formula = formula.split(/[+\-×÷]/).pop();
      if (formula && formula.search(/[.]/) < 0 && formula[formula.length - 1].search(/[()]/) < 0) {
        return _this.skin.display.input.concat(this.getAttribute('data-value'));
      }
    }
    return _this.skin.showError();
  };
  var eventClear = function () {
    _this.skin.input.innerHTML = '';
    _this.skin.output.innerHTML = '<br><br><br>';
    _this.skin.output.scrollTop = _this.skin.output.scrollHeight;
  };
  var eventBackspace = function () {
    var formula = _this.skin.display.input.get();
    if (formula) {
      return _this.skin.display.input.set(formula.slice(0, formula.length - 1));
    }
    return _this.skin.showError();
  };
  var eventparenthesisOpen = function () {
    var formula = _this.skin.display.input.get();
    if (formula === '') {
      return _this.skin.display.input.concat(this.getAttribute('data-value'));
    } else if (formula[formula.length - 1].search(/[)0-9]/) >= 0) {
      return _this.skin.display.input.concat('×' + this.getAttribute('data-value'));
    } else if (formula[formula.length - 1].search(/[.]/) < 0) {
      return _this.skin.display.input.concat(this.getAttribute('data-value'));
    }
    return _this.skin.showError();
  };
  var eventparenthesisCloses = function () {
    var formula = _this.skin.display.input.get();
    var opens = formula.match(/[(]/g);
    var closes = formula.match(/[)]/g);
    if ((opens && closes && opens.length > closes.length) || (opens && !closes)) {
      if (formula[formula.length - 1].search(/[.+\-×÷(]/) < 0) {
        return _this.skin.display.input.concat(this.getAttribute('data-value'));
      }
    }
    return _this.skin.showError();
  };
  _this.resultEvent = function (event) {
    if (event.target && event.target.getAttribute('class') === 'result') {
      _this.skin.display.input.concat(event.target.innerHTML);
    }
  };

  _this.skin.number0 = html.querySelector('.btn[data-name=number0]');
  _this.skin.number1 = html.querySelector('.btn[data-name=number1]');
  _this.skin.number2 = html.querySelector('.btn[data-name=number2]');
  _this.skin.number3 = html.querySelector('.btn[data-name=number3]');
  _this.skin.number4 = html.querySelector('.btn[data-name=number4]');
  _this.skin.number5 = html.querySelector('.btn[data-name=number5]');
  _this.skin.number6 = html.querySelector('.btn[data-name=number6]');
  _this.skin.number7 = html.querySelector('.btn[data-name=number7]');
  _this.skin.number8 = html.querySelector('.btn[data-name=number8]');
  _this.skin.number9 = html.querySelector('.btn[data-name=number9]');
  _this.skin.addition = html.querySelector('.btn[data-name=addition]');
  _this.skin.subtraction = html.querySelector('.btn[data-name=subtraction]');
  _this.skin.multiplication = html.querySelector('.btn[data-name=multiplication]');
  _this.skin.division = html.querySelector('.btn[data-name=division]');
  _this.skin.equality = html.querySelector('.btn[data-name=equality]');
  _this.skin.dot = html.querySelector('.btn[data-name=dot]');
  _this.skin.clear = html.querySelector('.btn[data-name=clear]');
  _this.skin.input = html.querySelector('.input');
  _this.skin.output = html.querySelector('.output');
  _this.skin.backspace = html.querySelector('.btn[data-name=backspace]');
  _this.skin.parenthesisOpen = html.querySelector('.btn[data-name=parenthesisOpen]');
  _this.skin.parenthesisClose = html.querySelector('.btn[data-name=parenthesisClose]');

  _this.skin.number1.addEventListener('click', eventNumbers);
  _this.skin.number2.addEventListener('click', eventNumbers);
  _this.skin.number3.addEventListener('click', eventNumbers);
  _this.skin.number4.addEventListener('click', eventNumbers);
  _this.skin.number5.addEventListener('click', eventNumbers);
  _this.skin.number6.addEventListener('click', eventNumbers);
  _this.skin.number7.addEventListener('click', eventNumbers);
  _this.skin.number8.addEventListener('click', eventNumbers);
  _this.skin.number9.addEventListener('click', eventNumbers);
  _this.skin.number0.addEventListener('click', eventNumbers);
  _this.skin.addition.addEventListener('click', eventAddition);
  _this.skin.subtraction.addEventListener('click', eventSubtraction);
  _this.skin.multiplication.addEventListener('click', eventMultiplication);
  _this.skin.division.addEventListener('click', eventDivision);
  _this.skin.equality.addEventListener('click', eventEquality);
  _this.skin.dot.addEventListener('click', eventDot);
  _this.skin.clear.addEventListener('click', eventClear);
  _this.skin.backspace.addEventListener('click', eventBackspace);
  _this.skin.parenthesisOpen.addEventListener('click', eventparenthesisOpen);
  _this.skin.parenthesisClose.addEventListener('click', eventparenthesisCloses);
  _this.skin.output.addEventListener('click', _this.resultEvent);
  _this.skin.addition.addEventListener('click', _this.resetFocus);
  _this.skin.subtraction.addEventListener('click', _this.resetFocus);
  _this.skin.multiplication.addEventListener('click', _this.resetFocus);

  eventClear();
};
Terminal.prototype = Object.create(Calc.prototype);
Terminal.prototype.constructor = Terminal;
