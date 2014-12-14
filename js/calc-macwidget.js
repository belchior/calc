var Macwidget = function () {
  if (!(this instanceof Macwidget)) {
    return new Macwidget();
  }
};
Macwidget.prototype = Object.create(Calc.prototype);
Macwidget.prototype.constructor = Macwidget;

Macwidget.prototype.skin = function (selector) {
  selector = typeof selector !== 'string' ? '.calc-terminal' : selector;

  var _this = this;
  _this.equalityWasClicked = false;
  _this.html = document.querySelector(selector);
  _this.number0 = _this.html.querySelector('.btn[data-name=number0]');
  _this.number1 = _this.html.querySelector('.btn[data-name=number1]');
  _this.number2 = _this.html.querySelector('.btn[data-name=number2]');
  _this.number3 = _this.html.querySelector('.btn[data-name=number3]');
  _this.number4 = _this.html.querySelector('.btn[data-name=number4]');
  _this.number5 = _this.html.querySelector('.btn[data-name=number5]');
  _this.number6 = _this.html.querySelector('.btn[data-name=number6]');
  _this.number7 = _this.html.querySelector('.btn[data-name=number7]');
  _this.number8 = _this.html.querySelector('.btn[data-name=number8]');
  _this.number9 = _this.html.querySelector('.btn[data-name=number9]');
  _this.division = _this.html.querySelector('.btn[data-name=division]');
  _this.multiplication = _this.html.querySelector('.btn[data-name=multiplication]');
  _this.subtraction = _this.html.querySelector('.btn[data-name=subtraction]');
  _this.addition = _this.html.querySelector('.btn[data-name=addition]');
  _this.equality = _this.html.querySelector('.btn[data-name=equality]');
  _this.dot = _this.html.querySelector('.btn[data-name=dot]');
  _this.clear = _this.html.querySelector('.btn[data-name=clear]');
  _this.madd = _this.html.querySelector('.btn[data-name=madd]');
  _this.msubtract = _this.html.querySelector('.btn[data-name=msubtract]');
  _this.mclear = _this.html.querySelector('.btn[data-name=mclear]');
  _this.mrecall = _this.html.querySelector('.btn[data-name=mrecall]');

  _this.memory = (function () {
    var operation = '';
    var operand = 0;
    var get = function (op) {
      if (op === 'operation') {
        return operation;
      } else if (op === 'operand') {
        return operand;
      }
      return;
    };
    var set = function () {
      if (arguments[0] === 'operation') {
        operation = arguments[1] || '';
      } else if (arguments[0] === 'operand') {
        operand = arguments[1] || 0;
      }
      return _this;
    };
    return {
      get: get,
      set: set
    };
  })();

  _this.display = (function () {
    var content = _this.html.querySelector('.display');
    var html = function () {
      return content.innerHTML;
    };
    var get = function () {
      return Macwidget.prototype.format(content.innerHTML);
    };
    var set = function (value) {
      content.innerHTML = value || '';
      return _this;
    };
    var concat = function (value) {
      if (_this.operatorIsActive()) {
        _this.display.set(value);
        _this.inactiveOperators();

      } else if (_this.equalityWasClicked) {
        _this.display.set(value);
        _this.equalityWasClicked = false;

      } else {
        content.innerHTML = content.innerHTML + value;
      }
    };
    return {
      html: html,
      get: get,
      set: set,
      concat: concat
    };
  })();

  _this.showError = function () {
    _this.html.classList.add('calcError');
    setTimeout(function () {
      _this.html.classList.remove('calcError');
    }, 300);
  };

  _this.operatorIsActive = function () {
    return _this.html.querySelector('.btn.active') ? true : false;
  };

  _this.activeOperation = function (operation) {
    _this.inactiveOperators();
    operation.classList.add('active');
    return _this;
  };

  _this.inactiveOperators = function () {
    var i;
    var actives = _this.html.querySelectorAll('.btn.active');
    if (actives) {
      for (i = 0; i < actives.length; i += 1) {
        actives[i].classList.remove('active');
      }
    }
    return _this;
  };

  _this.calculateEvent = function () {
    var result;
    var operation = _this.memory.get('operation');
    var operand = _this.display.get();

    if (!operation || !operand) {
      return _this.showError();
    }

    if (_this.equalityWasClicked) {
      result = _this[operation](operand, _this.memory.get('operand'));

    } else {
      result = _this[operation](_this.memory.get('operand'), operand);
      _this.memory.set('operand', operand);
    }

    _this.display.set(result);
    _this.equalityWasClicked = true;
    return _this;
  };

  _this.numbersEvent = function () {
    _this.display.concat(this.getAttribute('data-value'));
  };

  _this.operatorEvent = function () {
    var operand = _this.display.get();
    if (!operand) {
      return _this.showError();
    }

    if (_this.memory.get('operation') && _this.memory.get('operand') && _this.equalityWasClicked === false) {
      _this.calculateEvent()
      .memory.set('operand', _this.display.get());

    } else {
      _this.memory.set('operand', operand);
    }

    _this.memory.set('operation', this.getAttribute('data-action'));
    _this.activeOperation(this);
    _this.equalityWasClicked = false;
  };

  _this.dotEvent = function () {
    var operand = _this.display.html();
    if (operand && operand === parseInt(operand).toString()) {
      return _this.display.concat(this.getAttribute('data-value'));
    }
    return _this.showError();
  };
  _this.clearEvent = function () {
    _this.display.set('');
    _this.memory.set('operation', '');
    _this.memory.set('operand', 0);
    _this.inactiveOperators();
  };
  // _this.maddEvent = function () {
  //   _this.memory = Macwidget.prototype.sum(
  //     _this.memory,
  //     Macwidget.prototype.format(_this.display.get())
  //   );
  //   console.log(_this.memory);
  // };
  // _this.msubtractEvent = function () {
  //   _this.memory = Macwidget.prototype.subtract(
  //     _this.memory,
  //     Macwidget.prototype.format(_this.display.get())
  //   );
  //   console.log(_this.memory);
  // };
  // _this.mclearEvent = function () {
  //   _this.memory = 0;
  //   console.log(_this.memory);
  // };
  // _this.mrecallEvent = function () {
  //   _this.display.set(_this.memory);
  //   _this.display.output.set('');
  //   console.log(_this.memory);
  // };

  _this.number0.addEventListener('click', _this.numbersEvent);
  _this.number1.addEventListener('click', _this.numbersEvent);
  _this.number2.addEventListener('click', _this.numbersEvent);
  _this.number3.addEventListener('click', _this.numbersEvent);
  _this.number4.addEventListener('click', _this.numbersEvent);
  _this.number5.addEventListener('click', _this.numbersEvent);
  _this.number6.addEventListener('click', _this.numbersEvent);
  _this.number7.addEventListener('click', _this.numbersEvent);
  _this.number8.addEventListener('click', _this.numbersEvent);
  _this.number9.addEventListener('click', _this.numbersEvent);
  _this.division.addEventListener('click', _this.operatorEvent);
  _this.multiplication.addEventListener('click', _this.operatorEvent);
  _this.subtraction.addEventListener('click', _this.operatorEvent);
  _this.addition.addEventListener('click', _this.operatorEvent);
  _this.equality.addEventListener('click', _this.calculateEvent);
  _this.dot.addEventListener('click', _this.dotEvent);
  _this.clear.addEventListener('click', _this.clearEvent);
  // _this.madd.addEventListener('click', _this.maddEvent);
  // _this.msubtract.addEventListener('click', _this.msubtractEvent);
  // _this.mclear.addEventListener('click', _this.mclearEvent);
  // _this.mrecall.addEventListener('click', _this.mrecallEvent);

  // return _this;
};
