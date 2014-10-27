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
  selector = !selector || typeof selector !== 'string' ? '.calc-terminal' : selector;
  var _this = {};
  Calc.prototype.skin.call(_this, selector);
  _this.circleRed = _this.skin.querySelector('.bar .circle-red');
  _this.circleOrange = _this.skin.querySelector('.bar .circle-orange');
  _this.circleGreen = _this.skin.querySelector('.bar .circle-green');

  _this.clear.removeEventListener('click', _this.display.erase);
  _this.equality.removeEventListener('click', _this.showResult);

  _this.display.erase = function () {
    _this.input.value = '';
    _this.output.innerHTML = '<span><br><br><br></span>';
    _this.output.scrollTop = _this.output.scrollHeight;
  };

  _this.showResult = function () {
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

  _this.hideCalc = function (event) {
    event.stopPropagation();
    var display = _this.skin.querySelector('.display');
    var keyboard = _this.skin.querySelector('.keyboard');

    try {
      display.classList.remove('bounceInDown');
      keyboard.classList.remove('bounceInDown', 'bounceInUp', 'hinge');
      display.classList.add('animated', 'bounceOutUp');
      keyboard.classList.add('animated', 'bounceOutUp');
    } catch (err) { /* silence */ }
  };
  _this.showCalc = function () {
    var display = _this.skin.querySelector('.display');
    var keyboard = _this.skin.querySelector('.keyboard');

    try {
      if (display.classList.contains('bounceOutUp')) {
        display.classList.remove('bounceOutUp');
        display.classList.add('animated', 'bounceInDown');
      }
      if (keyboard.classList.contains('hinge')) {
        keyboard.classList.remove('bounceOutUp', 'bounceInDown', 'hinge');
        keyboard.classList.add('animated', 'bounceInUp');
      } else if (keyboard.classList.contains('bounceOutUp')) {
        keyboard.classList.remove('bounceOutUp', 'bounceInUp');
        keyboard.classList.add('animated', 'bounceInDown');
      }
    } catch (err) { /* silence */ }
  };
  _this.toggleKeyboard = function () {
    var display = _this.skin.querySelector('.display');
    var keyboard = _this.skin.querySelector('.keyboard');

    if (display.classList.contains('bounceOutUp')) {
      display.classList.remove('bounceOutUp');
      display.classList.add('animated', 'bounceInDown');
    }

    try {
      if (keyboard.classList.contains('bounceOutUp') || keyboard.classList.contains('hinge')) {
        keyboard.classList.remove('bounceOutUp', 'hinge');
        keyboard.classList.add('animated', 'bounceInUp');

      } else if (keyboard.classList.contains('bounceInDown') || keyboard.classList.contains('bounceInUp')) {
        keyboard.classList.remove('bounceInDown', 'bounceInUp');
        keyboard.classList.add('animated', 'hinge');
      } else {
        keyboard.classList.add('animated', 'hinge');
      }
    } catch (err) { /* silence */ }

  };

  _this.circleRed.addEventListener('click', _this.hideCalc);
  _this.circleOrange.addEventListener('click', _this.toggleKeyboard);
  _this.circleGreen.addEventListener('click', _this.showCalc);
  _this.equality.addEventListener('click', _this.showResult);
  _this.clear.addEventListener('click', _this.display.erase);

  _this.display.erase();
};
