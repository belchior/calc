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
  _this.memoryAdd = _this.html.querySelector('.btn[data-name=madd]');
  _this.memorySubtract = _this.html.querySelector('.btn[data-name=msubtract]');
  _this.memoryClear = _this.html.querySelector('.btn[data-name=mclear]');
  _this.memoryRecall = _this.html.querySelector('.btn[data-name=mrecall]');

  _this.display = (function () {
    var content = _this.html.querySelector('.display');
    var html = function () {
      return content.innerHTML;
    };
    var get = function () {
      return Macwidget.prototype.format(content.innerHTML);
    };
    var set = function (value) {
      content.innerHTML = value;
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

  _this.recorder = (function () {
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

  _this.memory = (function () {
    var slot = 0;

    var add = function () {
      slot = _this.sum(slot, _this.display.get());
      _this.inactiveOperators();
      _this.equalityWasClicked = true;
    };

    var subtract = function () {
      slot = _this.subtract(slot, _this.display.get());
      _this.inactiveOperators();
      _this.equalityWasClicked = true;
    };

    var clear = function () {
      slot = 0;
    };

    var recall = function () {
      _this.display.set(slot);
      _this.inactiveOperators();
      _this.equalityWasClicked = true;
    };

    return {
      add: add,
      subtract: subtract,
      clear: clear,
      recall: recall,
    };
  })();

  _this.showError = function () {
    var classArray = _this.html.getAttribute('class').split(' ');
    classArray.push('calcError');
    _this.html.setAttribute('class', classArray.join(' '));
    setTimeout(function () {
      classArray.pop('calcError');
      _this.html.setAttribute('class', classArray.join(' '));
    }, 300);
  };

  _this.operatorIsActive = function () {
    return _this.html.querySelector('.btn.active') ? true : false;
  };

  _this.activeOperation = function (operation) {
    var classArray = operation.getAttribute('class').split(' ');
    classArray.push('active');

    _this.inactiveOperators();
    operation.setAttribute('class', classArray.join(' '));
    return _this;
  };

  _this.inactiveOperators = function () {
    var i;
    var classArray;
    var actives = _this.html.querySelectorAll('.btn.active');
    if (actives) {
      for (i = 0; i < actives.length; i += 1) {
        classArray = actives[i].getAttribute('class').split(' ');
        classArray.pop('active');
        actives[i].setAttribute('class', classArray.join(' '));
      }
    }
    return _this;
  };

  _this.calculateEvent = function () {
    var result;
    var operation = _this.recorder.get('operation');
    var operand = _this.display.get();

    if (!operation || !operand) {
      return _this.showError();
    }

    if (_this.equalityWasClicked) {
      result = _this[operation](operand, _this.recorder.get('operand'));

    } else {
      result = _this[operation](_this.recorder.get('operand'), operand);
      _this.recorder.set('operand', operand);
    }

    _this.display.set(result);
    _this.equalityWasClicked = true;
    return _this;
  };

  _this.numbersEvent = function () {
    if (_this.equalityWasClicked) {
      _this.recorder.set('operand', 0);
      _this.recorder.set('operation', '');
    }
    _this.display.concat(this.getAttribute('data-value'));
  };

  _this.operatorEvent = function () {
    var operand = _this.display.get();
    if (!operand) {
      return _this.showError();
    }

    if (_this.recorder.get('operation') && _this.recorder.get('operand') && _this.equalityWasClicked === false) {
      _this.calculateEvent()
      .recorder.set('operand', _this.display.get());

    } else {
      _this.recorder.set('operand', operand);
    }

    _this.recorder.set('operation', this.getAttribute('data-action'));
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
    _this.display.set(0);
    _this.recorder.set('operation', '');
    _this.recorder.set('operand', 0);
    _this.inactiveOperators();
    _this.equalityWasClicked = true;
  };

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
  _this.memoryAdd.addEventListener('click', _this.memory.add);
  _this.memorySubtract.addEventListener('click', _this.memory.subtract);
  _this.memoryClear.addEventListener('click', _this.memory.clear);
  _this.memoryRecall.addEventListener('click', _this.memory.recall);

};
