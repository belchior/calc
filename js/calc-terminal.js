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

  _this.clear.removeEventListener('click', _this.display.erase);
  _this.equality.removeEventListener('click', _this.showResult);

  _this.display.erase = function () {
    _this.input.innerHTML = '';
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

  _this.clear.addEventListener('click', _this.display.erase);
  _this.equality.addEventListener('click', _this.showResult);

  _this.display.erase();
};
