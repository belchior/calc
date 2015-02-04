var Custom = function () {
  if (!(this instanceof Custom)) {
    return new Custom();
  }
};
Custom.prototype = Object.create(Calc.prototype);
Custom.prototype.constructor = Custom;

Custom.prototype.skin = function (selector) {
  selector = typeof selector !== 'string' ? '.calc-custom' : selector;

  var _this = this;
  _this.isCalculated = false;
  _this.html = document.querySelector(selector);
  _this.number1 = _this.html.querySelector('.btn[data-name="number1"]');
  _this.number2 = _this.html.querySelector('.btn[data-name="number2"]');
  _this.number3 = _this.html.querySelector('.btn[data-name="number3"]');
  _this.number4 = _this.html.querySelector('.btn[data-name="number4"]');
  _this.number5 = _this.html.querySelector('.btn[data-name="number5"]');
  _this.number6 = _this.html.querySelector('.btn[data-name="number6"]');
  _this.number7 = _this.html.querySelector('.btn[data-name="number7"]');
  _this.number8 = _this.html.querySelector('.btn[data-name="number8"]');
  _this.number9 = _this.html.querySelector('.btn[data-name="number9"]');
  _this.number0 = _this.html.querySelector('.btn[data-name="number0"]');
  _this.dot = _this.html.querySelector('.btn[data-name="dot"]');
  _this.addition = _this.html.querySelector('.btn[data-name="addition"]');
  _this.subtraction = _this.html.querySelector('.btn[data-name="subtraction"]');
  _this.multiplication = _this.html.querySelector('.btn[data-name="multiplication"]');
  _this.division = _this.html.querySelector('.btn[data-name="division"]');
  _this.parenthesisOpen = _this.html.querySelector('.btn[data-name="parenthesisOpen"]');
  _this.parenthesisClose = _this.html.querySelector('.btn[data-name="parenthesisClose"]');
  _this.equality = _this.html.querySelector('.btn[data-name="equality"]');
  _this.delete = _this.html.querySelector('.btn[data-name="delete"]');
  _this.clear = _this.html.querySelector('.btn[data-name="clear"]');
  _this.memoryAdd = _this.html.querySelector('.btn[data-name="madd"]');
  _this.memorySubtract = _this.html.querySelector('.btn[data-name="msubtract"]');
  _this.memoryClear = _this.html.querySelector('.btn[data-name="mclear"]');
  _this.memoryRecall = _this.html.querySelector('.btn[data-name="mrecall"]');
  _this.percentage = _this.html.querySelector('.btn[data-name="percentage"]');
  _this.sin = _this.html.querySelector('.btn[data-name="sin"]');
  _this.cos = _this.html.querySelector('.btn[data-name="cos"]');
  _this.tan = _this.html.querySelector('.btn[data-name="tan"]');

  _this.memory = (function () {
    var slot = 0;
    var get = function () {
      return slot;
    };
    var set = function (value) {
      slot = value;
      return _this;
    };
    var sum = function (value) {
      slot = Custom.prototype.sum(slot, value);
      return _this;
    };
    var subtract = function (value) {
      slot = Custom.prototype.subtract(slot, value);
      return _this;
    };

    return {
      get: get,
      set: set,
      sum: sum,
      subtract: subtract,
    };
  })();

  _this.display = (function () {
    var content = _this.html.querySelector('.display');
    var get = function () {
      return content.innerHTML;
    };
    var set = function (value) {
      content.innerHTML = value;
      return _this;
    };
    var concat = function (value) {
      content.innerHTML += value;
      return _this;
    };
    return {
      get: get,
      set: set,
      concat: concat
    };
  })();

  _this.showError = function () {
    var attrClass = _this.html.getAttribute('class').replace(' calcError', '');
    _this.html.setAttribute('class', attrClass + ' calcError');
    setTimeout(function () {
      attrClass = _this.html.getAttribute('class').replace(' calcError', '');
      _this.html.setAttribute('class', attrClass);
    }, 300);
  };

  _this.numberEvent = function () {
    var formula = _this.display.get();
    if (!formula || formula[formula.length - 1].search(/[)%]/) < 0) {
      if (_this.isCalculated) {
        _this.isCalculated = false;
        return _this.display.set(this.getAttribute('data-value'));
      }
      return _this.display.concat(this.getAttribute('data-value'));
    }
    _this.showError();
  };

  _this.dotEvent = function () {
    var formula = _this.display.get();
    if (formula) {
      formula = formula.split(/[+\-×÷]/).pop();
      if (formula && formula.search(/[.]/) < 0 && formula[formula.length - 1].search(/[()%]/) < 0) {
        return _this.display.concat(this.getAttribute('data-value'));
      }
    }
    return _this.showError();
  };

  _this.additionEvent = function () {
    var formula = _this.display.get();
    if (formula){
      if (formula[formula.length - 1].match(/[+\-×÷]/)) {
        return _this.display.set(formula.slice(0, formula.length - 1) + '+');
      } else if (formula[formula.length - 1].search(/[.]/) < 0) {
        return _this.display.concat(this.getAttribute('data-value'));
      }
    }
    return _this.showError();
  };

  _this.subtractionEvent = function () {
    var formula = _this.display.get();
    if (!formula){
      return _this.display.concat(this.getAttribute('data-value'));
    }
    if (formula[formula.length - 1].match(/[+\-×÷]/)) {
      return _this.display.set(formula.slice(0, formula.length - 1) + '-');
    }
    if (formula[formula.length - 1].search(/[.]/) < 0) {
      return _this.display.concat(this.getAttribute('data-value'));
    }
    return _this.showError();
  };

  _this.multiplicationEvent = function () {
    var formula = _this.display.get();
    if (formula){
      if (formula[formula.length - 1].match(/[+\-×÷]/)) {
        if (formula[formula.length - 2] !== '(') {
          return _this.display.set(formula.slice(0, formula.length - 1) + '×');
        }

      } else if (formula[formula.length - 1].search(/[.(]/) < 0) {
        return _this.display.concat(this.getAttribute('data-value'));
      }
    }
    return _this.showError();
  };

  _this.divisionEvent = function () {
    var formula = _this.display.get();
    if (formula){
      if (formula[formula.length - 1].match(/[+\-×÷]/)) {
        if (formula[formula.length - 2] !== '(') {
          return _this.display.set(formula.slice(0, formula.length - 1) + '÷');
        }

      } else if (formula[formula.length - 1].search(/[.(]/) < 0) {
        return _this.display.concat(this.getAttribute('data-value'));
      }
    }
    return _this.showError();
  };

  _this.parenthesisOpenEvent = function () {
    var formula = _this.display.get();
    if (formula === '') {
      return _this.display.concat(this.getAttribute('data-value'));
    } else if (formula[formula.length - 1].search(/[0-9)%]/) >= 0) {
      return _this.display.concat('×' + this.getAttribute('data-value'));
    } else if (formula[formula.length - 1].search(/[.]/) < 0) {
      return _this.display.concat(this.getAttribute('data-value'));
    }
    return _this.showError();
  };

  _this.parenthesisCloseEvent = function () {
    var formula = _this.display.get();
    var opens = formula.match(/[(]/g);
    var closes = formula.match(/[)]/g);
    if ((opens && closes && opens.length > closes.length) || (opens && !closes)) {
      if (formula[formula.length - 1].search(/[.+\-×÷(]/) < 0) {
        return _this.display.concat(this.getAttribute('data-value'));
      }
    }
    return _this.showError();
  };

  _this.equalityEvent = function () {
    try {
      var formula = Custom.prototype.calculate(_this.display.get());
      if (!formula || !isFinite(formula) || isNaN(formula)) {
        return _this.showError();
      }
      _this.display.set(formula);
      _this.isCalculated = true;

    } catch (err) {
      if (err.name === 'SyntaxError') {
        _this.display.set('Syntax Error');
        _this.isCalculated = true;
      }
      console.error('Calc ' + err.name + ': ' + err.message);
      _this.showError();
    }
  };

  _this.deleteEvent = function () {
    var formula = _this.display.get();
    if (formula) { _this.display.set(formula.slice(0, formula.length - 1)); }
  };

  _this.clearEvent = function () {
    _this.display.set('');
  };

  _this.memoryAddEvent = function () {
    var number = _this.display.get();
    if (number.match(/^[+\-]?\d+(?:\.\d+)?$/)) {
      _this.isCalculated = true;
      return _this.memory.sum(parseFloat(number));
    }
    _this.showError();
  };

  _this.memorySubtractEvent = function () {
    var number = _this.display.get();
    if (number.match(/^[+\-]?\d+(?:\.\d+)?$/)) {
      _this.isCalculated = true;
      return _this.memory.subtract(parseFloat(number));
    }
    _this.showError();
  };

  _this.memoryClearEvent = function () {
    return _this.memory.set(0);
  };

  _this.memoryRecallEvent = function () {
    return _this.display.set(_this.memory.get());
  };

  _this.percentageEvent = function () {
    var formula = _this.display.get();
    if (formula && formula[formula.length - 1].search(/[0-9)]/) >= 0) {
      return _this.display.concat(this.getAttribute('data-value'));
    }
    _this.showError();
  };

  _this.sinEvent = function () {

  };

  _this.cosEvent = function () {

  };

  _this.tanEvent = function () {

  };

  _this.number1.addEventListener('click', _this.numberEvent);
  _this.number2.addEventListener('click', _this.numberEvent);
  _this.number3.addEventListener('click', _this.numberEvent);
  _this.number4.addEventListener('click', _this.numberEvent);
  _this.number5.addEventListener('click', _this.numberEvent);
  _this.number6.addEventListener('click', _this.numberEvent);
  _this.number7.addEventListener('click', _this.numberEvent);
  _this.number8.addEventListener('click', _this.numberEvent);
  _this.number9.addEventListener('click', _this.numberEvent);
  _this.number0.addEventListener('click', _this.numberEvent);
  _this.dot.addEventListener('click', _this.dotEvent);
  _this.addition.addEventListener('click', _this.additionEvent);
  _this.subtraction.addEventListener('click', _this.subtractionEvent);
  _this.multiplication.addEventListener('click', _this.multiplicationEvent);
  _this.division.addEventListener('click', _this.divisionEvent);
  _this.parenthesisOpen.addEventListener('click', _this.parenthesisOpenEvent);
  _this.parenthesisClose.addEventListener('click', _this.parenthesisCloseEvent);
  _this.equality.addEventListener('click', _this.equalityEvent);
  _this.delete.addEventListener('click', _this.deleteEvent);
  _this.clear.addEventListener('click', _this.clearEvent);
  _this.memoryAdd.addEventListener('click', _this.memoryAddEvent);
  _this.memorySubtract.addEventListener('click', _this.memorySubtractEvent);
  _this.memoryClear.addEventListener('click', _this.memoryClearEvent);
  _this.memoryRecall.addEventListener('click', _this.memoryRecallEvent);
  _this.percentage.addEventListener('click', _this.percentageEvent);
  _this.sin.addEventListener('click', _this.sinEvent);
  _this.cos.addEventListener('click', _this.cosEvent);
  _this.tan.addEventListener('click', _this.tanEvent);

};
