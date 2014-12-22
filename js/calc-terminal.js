var Terminal = function () {
  if (this instanceof Terminal) {
    Calc.call(this);
  } else {
    return new Terminal();
  }
};
Terminal.prototype = Object.create(Calc.prototype);
Terminal.prototype.constructor = Terminal;

Terminal.prototype.skin = function (selector) {
  selector = typeof selector !== 'string' ? '.calc' : selector;

  var _this = this;
  _this.skin = document.querySelector(selector);
  _this.number0 = _this.skin.querySelector('.btn[data-name=number0]');
  _this.number1 = _this.skin.querySelector('.btn[data-name=number1]');
  _this.number2 = _this.skin.querySelector('.btn[data-name=number2]');
  _this.number3 = _this.skin.querySelector('.btn[data-name=number3]');
  _this.number4 = _this.skin.querySelector('.btn[data-name=number4]');
  _this.number5 = _this.skin.querySelector('.btn[data-name=number5]');
  _this.number6 = _this.skin.querySelector('.btn[data-name=number6]');
  _this.number7 = _this.skin.querySelector('.btn[data-name=number7]');
  _this.number8 = _this.skin.querySelector('.btn[data-name=number8]');
  _this.number9 = _this.skin.querySelector('.btn[data-name=number9]');
  _this.addition = _this.skin.querySelector('.btn[data-name=addition]');
  _this.subtraction = _this.skin.querySelector('.btn[data-name=subtraction]');
  _this.multiplication = _this.skin.querySelector('.btn[data-name=multiplication]');
  _this.division = _this.skin.querySelector('.btn[data-name=division]');
  _this.equality = _this.skin.querySelector('.btn[data-name=equality]');
  _this.dot = _this.skin.querySelector('.btn[data-name=dot]');
  _this.clear = _this.skin.querySelector('.btn[data-name=clear]');
  _this.input = _this.skin.querySelector('.input');
  _this.output = _this.skin.querySelector('.output');
  _this.backspace = _this.skin.querySelector('.btn[data-name=backspace]');
  _this.parenthesisOpen = _this.skin.querySelector('.btn[data-name=parenthesisOpen]');
  _this.parenthesisClose = _this.skin.querySelector('.btn[data-name=parenthesisClose]');

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
    }
  };
  _this.showError = function () {
    var classArray = _this.skin.getAttribute('class').split(' ');
    classArray.push('calcError');
    _this.skin.setAttribute('class', classArray.join(' '));
    setTimeout(function () {
      classArray.pop('calcError');
      _this.skin.setAttribute('class', classArray.join(' '));
    }, 300);
  };

  _this.eventNumbers = function () {
    var formula = _this.display.input.get();
    if (formula === '') {
      return _this.display.input.concat(this.getAttribute('data-value'));
    } else if (formula[formula.length - 1].search(/[)]/) < 0) {
      return _this.display.input.concat(this.getAttribute('data-value'));
    }
    return _this.showError();
  };
  _this.eventAddition = function () {
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
  _this.eventSubtraction = function () {
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
  _this.eventMultiplication = function () {
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
  _this.eventDivision = function () {
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
  _this.eventEquality = function () {
    try {
      var formula = Terminal.prototype.parser(_this.display.input.get());
      if (!formula) {
        return _this.showError();
      }
      formula = Terminal.prototype.calculate(formula);
      var results = _this.display.output.get();
      _this.display.input.set('');
      _this.display.output.set(results + '<span class="result">' + formula + '</span>');
      _this.output.scrollTop = _this.output.scrollHeight;

    } catch (err) {
      console.error('Calc error: ' + err.message);
      _this.showError();
    }
  };
  _this.eventDot = function () {
    var formula = _this.display.input.get();
    if (formula) {
      formula = formula.split(/[+\-x÷]/).pop();
      if (formula && formula.search(/[.]/) < 0 && formula[formula.length - 1].search(/[()]/) < 0) {
        return _this.display.input.concat(this.getAttribute('data-value'));
      }
    }
    return _this.showError();
  };
  _this.eventClear = function () {
    _this.input.innerHTML = '';
    _this.output.innerHTML = '<span><br><br><br></span>';
    _this.output.scrollTop = _this.output.scrollHeight;
  };
  _this.eventBackspace = function () {
    var formula = _this.display.input.get();
    if (formula) {
      return _this.display.input.set(formula.slice(0, formula.length - 1));
    }
    return _this.showError();
  };
  _this.eventparenthesisOpen = function () {
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
  _this.eventparenthesisCloses = function () {
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

  // Defining events
  _this.number1.addEventListener('click', _this.eventNumbers);
  _this.number2.addEventListener('click', _this.eventNumbers);
  _this.number3.addEventListener('click', _this.eventNumbers);
  _this.number4.addEventListener('click', _this.eventNumbers);
  _this.number5.addEventListener('click', _this.eventNumbers);
  _this.number6.addEventListener('click', _this.eventNumbers);
  _this.number7.addEventListener('click', _this.eventNumbers);
  _this.number8.addEventListener('click', _this.eventNumbers);
  _this.number9.addEventListener('click', _this.eventNumbers);
  _this.number0.addEventListener('click', _this.eventNumbers);
  _this.addition.addEventListener('click', _this.eventAddition);
  _this.subtraction.addEventListener('click', _this.eventSubtraction);
  _this.multiplication.addEventListener('click', _this.eventMultiplication);
  _this.division.addEventListener('click', _this.eventDivision);
  _this.equality.addEventListener('click', _this.eventEquality);
  _this.dot.addEventListener('click', _this.eventDot);
  _this.clear.addEventListener('click', _this.eventClear);
  _this.backspace.addEventListener('click', _this.eventBackspace);
  _this.parenthesisOpen.addEventListener('click', _this.eventparenthesisOpen);
  _this.parenthesisClose.addEventListener('click', _this.eventparenthesisCloses);
  _this.skin.addEventListener('click', function () {
    _this.input.focus();
  });
  _this.eventClear();

};
