var Custom = function (selector) {
  if (!(this instanceof Custom)) {
    return new Custom(selector);
  }

  var html = typeof selector !== 'string' ? document.querySelector('.calc-custom') : document.querySelector(selector);
  var _this = this;
  _this.skin = {};
  _this.skin.display = (function () {
    var content = html.querySelector('.display');
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
  _this.skin.showError = function () {
    var attrClass = html.getAttribute('class').replace(' calcError', '');
    html.setAttribute('class', attrClass + ' calcError');
    setTimeout(function () {
      attrClass = html.getAttribute('class').replace(' calcError', '');
      html.setAttribute('class', attrClass);
    }, 300);
  };

  var memory = (function () {
    var slot = 0;
    var get = function () {
      return slot;
    };
    var set = function (value) {
      slot = value;
      return _this;
    };
    var sum = function (value) {
      slot = _this.sum(slot, value);
      return _this;
    };
    var subtract = function (value) {
      slot = _this.subtract(slot, value);
      return _this;
    };

    return {
      get: get,
      set: set,
      sum: sum,
      subtract: subtract,
    };
  })();

  var startNewCalc = false;
  var calcEvent = function (buttonEvent) {
    return function (event) {
      var cb = buttonEvent.call(this, event);
      if (typeof cb !== 'string') {
        return _this.skin.showError();
      }
      if (startNewCalc) {
        if (cb.search(/[)×÷%.\^]/) >= 0) {
          return _this.skin.showError();
        }
        _this.skin.display.set(cb);
        startNewCalc = false;

      } else {
        _this.skin.display.concat(cb);
      }
    };
  };

  var numberEvent = calcEvent(function () {
    var formula = _this.skin.display.get();
    if (formula === '' || formula[formula.length - 1].search(/[)%π]/) < 0) {
      return this.getAttribute('data-value');
    }
    return undefined;
  });

  var dotEvent = calcEvent(function () {
    var formula = _this.skin.display.get();
    formula = formula.split(/[+\-×÷]/).pop();
    if (formula && formula.search(/[.]/) < 0 && formula[formula.length - 1].search(/[()%\^√π]/) < 0) {
      return this.getAttribute('data-value');
    }
    return undefined;
  });

  var additionEvent = calcEvent(function () {
    var formula = _this.skin.display.get();
    if (formula && formula[formula.length - 1].match(/[+\-×÷]/)) {
      _this.skin.display.set(formula.slice(0, formula.length - 1) + '+');
      return '';
    }
    if (formula[formula.length - 1].search(/[.]/) < 0) {
      return this.getAttribute('data-value');
    }
    return undefined;
  });

  var subtractionEvent = calcEvent(function () {
    var formula = _this.skin.display.get();
    if (!formula) {
      return this.getAttribute('data-value');
    }
    if (formula[formula.length - 1].match(/[+\-×÷]/)) {
      _this.skin.display.set(formula.slice(0, formula.length - 1) + '-');
      return '';
    }
    if (formula[formula.length - 1].search(/[.]/) < 0) {
      return this.getAttribute('data-value');
    }
    return undefined;
  });

  var multiplicationEvent = calcEvent(function () {
    var formula = _this.skin.display.get();
    if (formula && formula[formula.length - 1].match(/[+\-×÷]/)) {
      if (formula[formula.length - 2].search(/[(\^√]/) < 0) {
        _this.skin.display.set(formula.slice(0, formula.length - 1) + '×');
        return '';
      }

    } else if (formula && formula[formula.length - 1].search(/[(.\^√]/) < 0) {
      return this.getAttribute('data-value');
    }
    return undefined;
  });

  var divisionEvent = calcEvent(function () {
    var formula = _this.skin.display.get();
    if (formula && formula[formula.length - 1].match(/[+\-×÷]/)) {
      if (formula[formula.length - 2].search(/[(\^√]/) < 0) {
        _this.skin.display.set(formula.slice(0, formula.length - 1) + '÷');
        return '';
      }

    } else if (formula && formula[formula.length - 1].search(/[(.\^√]/) < 0) {
      return this.getAttribute('data-value');
    }
    return undefined;
  });

  var parenthesisOpenEvent = calcEvent(function () {
    var formula = _this.skin.display.get();
    if (formula === '') {
      return this.getAttribute('data-value');
    }
    if (formula[formula.length - 1].search(/[0-9)%π]/) >= 0) {
      return '×' + this.getAttribute('data-value');
    }
    if (formula[formula.length - 1].search(/[.]/) < 0) {
      return this.getAttribute('data-value');
    }
    return undefined;
  });

  var parenthesisCloseEvent = calcEvent(function () {
    var formula = _this.skin.display.get();
    var opens = formula.match(/[(]/g);
    var closes = formula.match(/[)]/g);
    if ((opens && closes && opens.length > closes.length) || (opens && !closes)) {
      if (formula[formula.length - 1].search(/[(+\-×÷.\^√]/) < 0) {
        return this.getAttribute('data-value');
      }
    }
    return undefined;
  });

  var equalityEvent = function () {
    try {
      var formula = _this.calculate(_this.skin.display.get());
      if (!formula || !isFinite(formula) || isNaN(formula)) {
        return undefined;
      }
      _this.skin.display.set(formula);
      startNewCalc = true;

    } catch (err) {
      if (err.name === 'SyntaxError') {
        _this.skin.display.set('Syntax Error');
        startNewCalc = true;
      }
      console.error('Calc ' + err.name + ': ' + err.message);
      return undefined;
    }
  };

  var deleteEvent = calcEvent(function () {
    var formula = _this.skin.display.get();
    if (formula) {
      _this.skin.display.set(formula.slice(0, formula.length - 1));
    }
    return '';
  });

  var clearEvent = calcEvent(function () {
    startNewCalc = true;
    _this.skin.display.set('');
    return '';
  });

  var memoryAddEvent = function () {
    var number = _this.skin.display.get();
    if (number.match(/^[+\-]?\d+(?:\.\d+)?$/)) {
      startNewCalc = true;
      return memory.sum(parseFloat(number));
    }
    return _this.skin.showError();
  };

  var memorySubtractEvent = function () {
    var number = _this.skin.display.get();
    if (number.match(/^[+\-]?\d+(?:\.\d+)?$/)) {
      startNewCalc = true;
      return memory.subtract(parseFloat(number));
    }
    return _this.skin.showError();
  };

  var memoryClearEvent = function () {
    return memory.set(0);
  };

  var memoryRecallEvent = function () {
    return _this.skin.display.set(memory.get());
  };

  var percentageEvent = calcEvent(function () {
    var formula = _this.skin.display.get();
    if (formula && formula[formula.length - 1].search(/[0-9)]/) >= 0) {
      return this.getAttribute('data-value');
    }
    return undefined;
  });

  var powerEvent = calcEvent(function () {
    var formula = _this.skin.display.get();
    if (formula && formula[formula.length - 1].search(/[0-9]/) >= 0) {
      return this.getAttribute('data-value');
    }
    return undefined;
  });

  var sqrtEvent = calcEvent(function () {
    var formula = _this.skin.display.get();
    if (formula === '') {
      return this.getAttribute('data-value');
    }
    if (formula && formula[formula.length - 1].search(/[+\-×÷(√]/) >= 0) {
      return this.getAttribute('data-value');
    }
    if (formula && formula[formula.length - 1].search(/[0-9)%π]/) >= 0) {
      return '×' + this.getAttribute('data-value');
    }
    return undefined;
  });

  var piEvent = calcEvent(function () {
    var formula = _this.skin.display.get();
    if (formula === '' || formula && formula[formula.length - 1].search(/[(+\-×÷\^√]/) >= 0) {
      return this.getAttribute('data-value');
    }
    return undefined;
  });

  _this.skin.number1 = html.querySelector('.btn[data-name="number1"]');
  _this.skin.number2 = html.querySelector('.btn[data-name="number2"]');
  _this.skin.number3 = html.querySelector('.btn[data-name="number3"]');
  _this.skin.number4 = html.querySelector('.btn[data-name="number4"]');
  _this.skin.number5 = html.querySelector('.btn[data-name="number5"]');
  _this.skin.number6 = html.querySelector('.btn[data-name="number6"]');
  _this.skin.number7 = html.querySelector('.btn[data-name="number7"]');
  _this.skin.number8 = html.querySelector('.btn[data-name="number8"]');
  _this.skin.number9 = html.querySelector('.btn[data-name="number9"]');
  _this.skin.number0 = html.querySelector('.btn[data-name="number0"]');
  _this.skin.dot = html.querySelector('.btn[data-name="dot"]');
  _this.skin.addition = html.querySelector('.btn[data-name="addition"]');
  _this.skin.subtraction = html.querySelector('.btn[data-name="subtraction"]');
  _this.skin.multiplication = html.querySelector('.btn[data-name="multiplication"]');
  _this.skin.division = html.querySelector('.btn[data-name="division"]');
  _this.skin.parenthesisOpen = html.querySelector('.btn[data-name="parenthesisOpen"]');
  _this.skin.parenthesisClose = html.querySelector('.btn[data-name="parenthesisClose"]');
  _this.skin.equality = html.querySelector('.btn[data-name="equality"]');
  _this.skin.delete = html.querySelector('.btn[data-name="delete"]');
  _this.skin.clear = html.querySelector('.btn[data-name="clear"]');
  _this.skin.memoryAdd = html.querySelector('.btn[data-name="madd"]');
  _this.skin.memorySubtract = html.querySelector('.btn[data-name="msubtract"]');
  _this.skin.memoryClear = html.querySelector('.btn[data-name="mclear"]');
  _this.skin.memoryRecall = html.querySelector('.btn[data-name="mrecall"]');
  _this.skin.percentage = html.querySelector('.btn[data-name="percentage"]');
  _this.skin.power = html.querySelector('.btn[data-name="power"]');
  _this.skin.sqrt = html.querySelector('.btn[data-name="sqrt"]');
  _this.skin.pi = html.querySelector('.btn[data-name="pi"]');

  _this.skin.number1.addEventListener('click', numberEvent);
  _this.skin.number2.addEventListener('click', numberEvent);
  _this.skin.number3.addEventListener('click', numberEvent);
  _this.skin.number4.addEventListener('click', numberEvent);
  _this.skin.number5.addEventListener('click', numberEvent);
  _this.skin.number6.addEventListener('click', numberEvent);
  _this.skin.number7.addEventListener('click', numberEvent);
  _this.skin.number8.addEventListener('click', numberEvent);
  _this.skin.number9.addEventListener('click', numberEvent);
  _this.skin.number0.addEventListener('click', numberEvent);
  _this.skin.dot.addEventListener('click', dotEvent);
  _this.skin.addition.addEventListener('click', additionEvent);
  _this.skin.subtraction.addEventListener('click', subtractionEvent);
  _this.skin.multiplication.addEventListener('click', multiplicationEvent);
  _this.skin.division.addEventListener('click', divisionEvent);
  _this.skin.parenthesisOpen.addEventListener('click', parenthesisOpenEvent);
  _this.skin.parenthesisClose.addEventListener('click', parenthesisCloseEvent);
  _this.skin.equality.addEventListener('click', equalityEvent);
  _this.skin.delete.addEventListener('click', deleteEvent);
  _this.skin.clear.addEventListener('click', clearEvent);
  _this.skin.memoryAdd.addEventListener('click', memoryAddEvent);
  _this.skin.memorySubtract.addEventListener('click', memorySubtractEvent);
  _this.skin.memoryClear.addEventListener('click', memoryClearEvent);
  _this.skin.memoryRecall.addEventListener('click', memoryRecallEvent);
  _this.skin.percentage.addEventListener('click', percentageEvent);
  _this.skin.power.addEventListener('click', powerEvent);
  _this.skin.sqrt.addEventListener('click', sqrtEvent);
  _this.skin.pi.addEventListener('click', piEvent);
};

Custom.prototype = Object.create(Calc.prototype);
Custom.prototype.constructor = Custom;
