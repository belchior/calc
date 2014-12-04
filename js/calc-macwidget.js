var Macwidget = function () {
  if (this instanceof Macwidget) {
    Calc.call(this);
  } else {
    return new Macwidget();
  }
};
Macwidget.prototype = Object.create(Calc.prototype);
Macwidget.prototype.constructor = Macwidget;

Macwidget.prototype.skin = function (selector) {
  selector = typeof selector !== 'string' ? '.calc-terminal' : selector;

  var _this = this;
  _this.memory = 0;
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
  // _this.addition = _this.skin.querySelector('.btn[data-name=addition]');
  // _this.subtraction = _this.skin.querySelector('.btn[data-name=subtraction]');
  // _this.multiplication = _this.skin.querySelector('.btn[data-name=multiplication]');
  // _this.division = _this.skin.querySelector('.btn[data-name=division]');
  // _this.equality = _this.skin.querySelector('.btn[data-name=equality]');
  // _this.dot = _this.skin.querySelector('.btn[data-name=dot]');
  _this.clear = _this.skin.querySelector('.btn[data-name=clear]');
  // _this.madd = _this.skin.querySelector('.btn[data-name=madd]');
  // _this.msubtract = _this.skin.querySelector('.btn[data-name=msubtract]');
  // _this.mclear = _this.skin.querySelector('.btn[data-name=mclear]');
  // _this.mrecall = _this.skin.querySelector('.btn[data-name=mrecall]');

  _this.display = (function () {
    var content = _this.skin.querySelector('.display');
    var get = function () {
      return content.innerHTML;
    };
    var set = function (value) {
      content.innerHTML = value;
    };
    var concat = function (value) {
      content.innerHTML = content.innerHTML + value;
    };
    return {
      get: get,
      set: set,
      concat: concat
    };
  })();
  _this.showError = function () {
    _this.skin.classList.add('calcError');
    setTimeout(function () {
      _this.skin.classList.remove('calcError');
    }, 300);
  };

  _this.eventNumbers = function () {
    var formula = _this.display.get();
    if (formula === '' || formula[formula.length - 1].search(/[)]/) < 0) {
      return _this.display.concat(this.getAttribute('data-value'));
    }
    return _this.showError();
  };
  // _this.eventAddition = function () {
  //   var formula = _this.display.input.get();
  //   if (formula){
  //     if (formula[formula.length - 1].match(/[+\-x÷]/)) {
  //       return _this.display.input.set(formula.slice(0, formula.length - 1) + '+');
  //     } else if (formula[formula.length - 1].search(/[.(]/) < 0) {
  //       return _this.display.input.concat(this.getAttribute('data-value'));
  //     }
  //   }
  //   return _this.showError();
  // };
  // _this.eventSubtraction = function () {
  //   var formula = _this.display.input.get();
  //   if (!formula){
  //     return _this.display.input.concat(this.getAttribute('data-value'));
  //   }
  //   if (formula[formula.length - 1].match(/[+\-x÷]/)) {
  //     return _this.display.input.set(formula.slice(0, formula.length - 1) + '-');
  //   }
  //   if (formula[formula.length - 1].search(/[.]/) < 0) {
  //     return _this.display.input.concat(this.getAttribute('data-value'));
  //   }
  //   return _this.showError();
  // };
  // _this.eventMultiplication = function () {
  //   var formula = _this.display.input.get();
  //   if (formula){
  //     if (formula[formula.length - 1].match(/[+\-x÷]/)) {
  //       return _this.display.input.set(formula.slice(0, formula.length - 1) + 'x');
  //     } else if (formula[formula.length - 1].search(/[.(]/) < 0) {
  //       return _this.display.input.concat(this.getAttribute('data-value'));
  //     }
  //   }
  //   return _this.showError();
  // };
  // _this.eventDivision = function () {
  //   var formula = _this.display.input.get();
  //   if (formula){
  //     if (formula[formula.length - 1].match(/[+\-x÷]/)) {
  //       return _this.display.input.set(formula.slice(0, formula.length - 1) + '÷');
  //     } else if (formula[formula.length - 1].search(/[.(]/) < 0) {
  //       return _this.display.input.concat(this.getAttribute('data-value'));
  //     }
  //   }
  //   return _this.showError();
  // };
  // _this.eventEquality = function () {
  //   try {
  //     var formula = Terminal.prototype.parser(_this.display.input.get());
  //     if (!formula) {
  //       return _this.showError();
  //     }
  //     formula = Terminal.prototype.calculate(formula);
  //     var results = _this.display.output.get();
  //     _this.display.input.set('');
  //     _this.display.output.set(results + '<span class="result">' + formula + '</span>');
  //     _this.output.scrollTop = _this.output.scrollHeight;
  //
  //   } catch (err) {
  //     console.error('Calc error: ' + err.message);
  //     _this.showError();
  //   }
  // };
  // _this.eventDot = function () {
  //   var formula = _this.display.input.get();
  //   if (formula) {
  //     formula = formula.split(/[+\-x÷]/).pop();
  //     if (formula && formula.search(/[.]/) < 0 && formula[formula.length - 1].search(/[()]/) < 0) {
  //       return _this.display.input.concat(this.getAttribute('data-value'));
  //     }
  //   }
  //   return _this.showError();
  // };
  _this.eventClear = function () {
    _this.display.set('');
  };
  // _this.eventMadd = function () {
  //   _this.memory = Macwidget.prototype.sum(
  //     _this.memory,
  //     Macwidget.prototype.format(_this.display.input.get())
  //   );
  //   console.log(_this.memory);
  // };
  // _this.eventMsubtract = function () {
  //   _this.memory = Macwidget.prototype.subtract(
  //     _this.memory,
  //     Macwidget.prototype.format(_this.display.input.get())
  //   );
  //   console.log(_this.memory);
  // };
  // _this.eventMclear = function () {
  //   _this.memory = 0;
  //   console.log(_this.memory);
  // };
  // _this.eventMrecall = function () {
  //   _this.display.input.set(_this.memory);
  //   _this.display.output.set('');
  //   console.log(_this.memory);
  // };

  _this.number0.addEventListener('click', _this.eventNumbers);
  _this.number1.addEventListener('click', _this.eventNumbers);
  _this.number2.addEventListener('click', _this.eventNumbers);
  _this.number3.addEventListener('click', _this.eventNumbers);
  _this.number4.addEventListener('click', _this.eventNumbers);
  _this.number5.addEventListener('click', _this.eventNumbers);
  _this.number6.addEventListener('click', _this.eventNumbers);
  _this.number7.addEventListener('click', _this.eventNumbers);
  _this.number8.addEventListener('click', _this.eventNumbers);
  _this.number9.addEventListener('click', _this.eventNumbers);
  // _this.addition.addEventListener('click', _this.eventAddition);
  // _this.subtraction.addEventListener('click', _this.eventSubtraction);
  // _this.multiplication.addEventListener('click', _this.eventMultiplication);
  // _this.division.addEventListener('click', _this.eventDivision);
  // _this.equality.addEventListener('click', _this.eventEquality);
  // _this.dot.addEventListener('click', _this.eventDot);
  _this.clear.addEventListener('click', _this.eventClear);
  // _this.madd.addEventListener('click', _this.eventMadd);
  // _this.msubtract.addEventListener('click', _this.eventMsubtract);
  // _this.mclear.addEventListener('click', _this.eventMclear);
  // _this.mrecall.addEventListener('click', _this.eventMrecall);

  return _this;
};
