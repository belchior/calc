var Macwidget = function (selector) {
  if (!(this instanceof Macwidget)) {
    return new Macwidget(selector);
  }

  var html = typeof selector !== 'string' ? document.querySelector('.calc-macwidget') : document.querySelector(selector);
  var equalityWasClicked = false;
  _this = this;
  _this.skin = {};

  _this.skin.display = (function () {
    var content = html.querySelector('.display');
    var get = function (html) {
      if (html) { return content.innerHTML; }
      return Macwidget.prototype.format(content.innerHTML);
    };
    var set = function (value) {
      content.innerHTML = value;
      return _this;
    };
    var concat = function (value) {
      if (operatorIsActive()) {
        _this.skin.display.set(value);
        inactiveOperators();

      } else if (equalityWasClicked) {
        _this.skin.display.set(value);
        equalityWasClicked = false;

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

  var recorder = (function () {
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

  var memory = (function () {
    var slot = 0;

    var add = function () {
      slot = _this.sum(slot, _this.skin.display.get());
      inactiveOperators();
      equalityWasClicked = true;
    };

    var subtract = function () {
      slot = _this.subtract(slot, _this.skin.display.get());
      inactiveOperators();
      equalityWasClicked = true;
    };

    var clear = function () {
      slot = 0;
    };

    var recall = function () {
      _this.skin.display.set(slot);
      inactiveOperators();
      equalityWasClicked = true;
    };

    return {
      add: add,
      subtract: subtract,
      clear: clear,
      recall: recall,
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

  var operatorIsActive = function () {
    return html.querySelector('.btn.active') ? true : false;
  };

  var activeOperation = function (operation) {
    var attrClass = operation.getAttribute('class').replace(' active', '');

    inactiveOperators();
    operation.setAttribute('class', attrClass + ' active');
    return _this;
  };

  var inactiveOperators = function () {
    var i;
    var attrClass;
    var actives = html.querySelectorAll('.btn.active');
    if (actives) {
      for (i = 0; i < actives.length; i += 1) {
        attrClass = actives[i].getAttribute('class').replace(' active', '');
        actives[i].setAttribute('class', attrClass);
      }
    }
    return _this;
  };

  var calculateEvent = function () {
    var result;
    var operation = recorder.get('operation');
    var operand = _this.skin.display.get();

    if (!operation || !operand) {
      return _this.skin.showError();
    }

    if (equalityWasClicked) {
      result = _this[operation](operand, recorder.get('operand'));

    } else {
      result = _this[operation](recorder.get('operand'), operand);
      recorder.set('operand', operand);
    }

    _this.skin.display.set(result);
    equalityWasClicked = true;
    html.querySelector('.display').focus();
    return _this;
  };

  var numbersEvent = function () {
    if (equalityWasClicked) {
      recorder.set('operand', 0);
      recorder.set('operation', '');
    }
    _this.skin.display.concat(this.getAttribute('data-value'));
  };

  var operatorEvent = function () {
    var operand = _this.skin.display.get();
    if (!operand) {
      return _this.skin.showError();
    }

    if (recorder.get('operation') && recorder.get('operand') && equalityWasClicked === false) {
      calculateEvent()
      .recorder.set('operand', _this.skin.display.get());

    } else {
      recorder.set('operand', operand);
    }

    recorder.set('operation', this.getAttribute('data-action'));
    activeOperation(this);
    equalityWasClicked = false;
  };

  var dotEvent = function () {
    var operand = _this.skin.display.get('html');
    if (operand && operand === parseInt(operand).toString()) {
      return _this.skin.display.concat(this.getAttribute('data-value'));
    }
    return _this.skin.showError();
  };

  var clearEvent = function () {
    _this.skin.display.set(0);
    recorder.set('operation', '');
    recorder.set('operand', 0);
    inactiveOperators();
    equalityWasClicked = true;
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
  _this.skin.division = html.querySelector('.btn[data-name=division]');
  _this.skin.multiplication = html.querySelector('.btn[data-name=multiplication]');
  _this.skin.subtraction = html.querySelector('.btn[data-name=subtraction]');
  _this.skin.addition = html.querySelector('.btn[data-name=addition]');
  _this.skin.equality = html.querySelector('.btn[data-name=equality]');
  _this.skin.dot = html.querySelector('.btn[data-name=dot]');
  _this.skin.clear = html.querySelector('.btn[data-name=clear]');
  _this.skin.memoryAdd = html.querySelector('.btn[data-name=madd]');
  _this.skin.memorySubtract = html.querySelector('.btn[data-name=msubtract]');
  _this.skin.memoryClear = html.querySelector('.btn[data-name=mclear]');
  _this.skin.memoryRecall = html.querySelector('.btn[data-name=mrecall]');

  _this.skin.number0.addEventListener('click', numbersEvent);
  _this.skin.number1.addEventListener('click', numbersEvent);
  _this.skin.number2.addEventListener('click', numbersEvent);
  _this.skin.number3.addEventListener('click', numbersEvent);
  _this.skin.number4.addEventListener('click', numbersEvent);
  _this.skin.number5.addEventListener('click', numbersEvent);
  _this.skin.number6.addEventListener('click', numbersEvent);
  _this.skin.number7.addEventListener('click', numbersEvent);
  _this.skin.number8.addEventListener('click', numbersEvent);
  _this.skin.number9.addEventListener('click', numbersEvent);
  _this.skin.division.addEventListener('click', operatorEvent);
  _this.skin.multiplication.addEventListener('click', operatorEvent);
  _this.skin.subtraction.addEventListener('click', operatorEvent);
  _this.skin.addition.addEventListener('click', operatorEvent);
  _this.skin.equality.addEventListener('click', calculateEvent);
  _this.skin.dot.addEventListener('click', dotEvent);
  _this.skin.clear.addEventListener('click', clearEvent);
  _this.skin.memoryAdd.addEventListener('click', memory.add);
  _this.skin.memorySubtract.addEventListener('click', memory.subtract);
  _this.skin.memoryClear.addEventListener('click', memory.clear);
  _this.skin.memoryRecall.addEventListener('click', memory.recall);
};
Macwidget.prototype = Object.create(Calc.prototype);
Macwidget.prototype.constructor = Macwidget;
