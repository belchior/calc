var assert = require('assert');
var Calc = require('../js/calc.js');

describe('Calc', function () {
  var calc;

  it('should be instantiable with operator new', function () {
    calc = new Calc();
    assert.ok(calc instanceof Calc);
  });

  it('should be instantiable without operator new', function () {
    calc = Calc();
    assert.ok(calc instanceof Calc);
  });

  calc = new Calc();

  describe('Function multiply', function () {
    it('should return 6 when are multiplied 2 by 3', function () {
      assert.strictEqual(calc.multiply(2, 3), 6);
    });
    it('should return 6 when are multiplied -2 by -3', function () {
      assert.strictEqual(calc.multiply(-2, -3), 6);
    });
    it('should return 8.5 when are multiplied 2.5 by 3.4', function () {
      assert.strictEqual(calc.multiply(2.5, 3.4), 8.5);
    });
    it('should return 8.5 when are multiplied -2.5 by -3.4', function () {
      assert.strictEqual(calc.multiply(-2.5, -3.4), 8.5);
    });
    it('should return NaN when are multiplied "abc" by "1"', function () {
      assert(Number.isNaN(calc.multiply('abc', '1')));
    });
  });

  describe('Function divide', function () {
    it('should return 7 when are divided 21 by 3', function () {
      assert.strictEqual(calc.divide(21, 3), 7);
    });

    it('should return 7 when are divided -21 by -3', function () {
      assert.strictEqual(calc.divide(-21, -3), 7);
    });

    it('should return 6 when are divided 21.6 by 3.2.75', function () {
      assert.strictEqual(calc.divide(21.6, 3.2), 6.75);
    });

    it('should return 6 when are divided -21.6 by -3.2.75', function () {
      assert.strictEqual(calc.divide(-21.6, -3.2), 6.75);
    });

    it('should return NaN when are divided "abc" by "1"', function () {
      assert(Number.isNaN(calc.divide('abc', '1')));
    });

    it('should return Infinity when are divided 10 by 0', function () {
      assert(!Number.isFinite(calc.divide(10, 0)));
    });

  });

  describe('Function sum', function () {
    it('should return 9 when are summed 5 by 4', function () {
      assert.strictEqual(calc.sum(5, 4), 9);
    });
    it('should return -9 when are summed -5 by -4', function () {
      assert.strictEqual(calc.sum(-5, -4), -9);
    });
    it('should return 9.8 when are summed 5.1 by 4.7', function () {
      assert.strictEqual(calc.sum(5.1, 4.7), 9.8);
    });
    it('should return -9.8 when are summed -5.1 by -4.7', function () {
      assert.strictEqual(calc.sum(-5.1, -4.7), -9.8);
    });
    it('should return 9 when are summed +5 by +4', function () {
      assert.strictEqual(calc.sum(+5, +4), 9);
    });
    it('should return 9.8 when are summed +5.1 by +4.7', function () {
      assert.strictEqual(calc.sum(+5.1, +4.7), 9.8);
    });
    it('should return NaN when are summed null by undefined', function () {
      assert(Number.isNaN(calc.sum(null, undefined)));
    });
  });

  describe('Function subtract', function () {
    it('should return 2 when are subtracted 8 by 6', function () {
      assert.strictEqual(calc.subtract(8, 6), 2);
    });
    it('should return 2 when are subtracted +8 by +6', function () {
      assert.strictEqual(calc.subtract(+8, +6), 2);
    });
    it('should return -2 when are subtracted -8 by -6', function () {
      assert.strictEqual(calc.subtract(-8, -6), -2);
    });
    it('should return 1.5 when are subtracted 8.2 by 6.7', function () {
      assert.strictEqual(calc.subtract(8.2, 6.7), 1.5);
    });
    it('should return -1.5 when are subtracted -8.2 by -6.7', function () {
      assert.strictEqual(calc.subtract(-8.2, -6.7), -1.5);
    });
    it('should return NaN when are subtracted "" by "12"', function () {
      assert(Number.isNaN(calc.subtract('', '12')));
    });
  });

  describe('Function parser', function () {

    var errorMessage;
    var thrower = function (func, param) {
      return function () {
        func(param);
      };
    };
    var errorTester = function (errorMessage) {
      return function (error) {
        return error instanceof SyntaxError && error.message === errorMessage ? true : false;
      };
    };

    describe('should return a syntax error: divergence between parenthesis', function () {
      it('when formula has different amount of parenthesis', function () {
        var errorMessage = 'divergence between parenthesis';

        assert.throws(
          thrower(calc.parser, '1+(2+3))'),
          errorTester(errorMessage)
        );
        assert.throws(
          thrower(calc.parser, '1+(((2+3)'),
          errorTester(errorMessage)
        );
      });

      it('when formula has wrong sequence of parenthesis', function () {
        var errorMessage = 'divergence between parenthesis';

        assert.throws(
          thrower(calc.parser, ')+1('),
          errorTester(errorMessage)
        );
        assert.throws(
          thrower(calc.parser, '1)+(1'),
          errorTester(errorMessage)
        );
      });
    });

    describe('should return a syntax error: invalid arithmetic combination of characters', function () {
      var errorMessage = 'invalid arithmetic combination of characters';

      it('when formula start with "x÷."', function () {
        assert.throws(
          thrower(calc.parser, 'x1'),
          errorTester(errorMessage)
        );
        assert.throws(
          thrower(calc.parser, '÷1'),
          errorTester(errorMessage)
        );
        assert.throws(
          thrower(calc.parser, '.1'),
          errorTester(errorMessage)
        );
      });

      it('when formula has "+-x÷" followed by "x÷."', function () {
        ['+', '-', 'x', '÷', '.'].forEach(function (char) {
          assert.throws(
            thrower(calc.parser, '1' + char + 'x2'),
            errorTester(errorMessage)
          );
          assert.throws(
            thrower(calc.parser, '1' + char + '÷2'),
            errorTester(errorMessage)
          );
          assert.throws(
            thrower(calc.parser, '1' + char + '.2'),
            errorTester(errorMessage)
          );
        });
      });

      it('when formula has "." followed by "+-()"', function () {
        assert.throws(
          thrower(calc.parser, '1.2.3'),
          errorTester(errorMessage)
        );
        assert.throws(
          thrower(calc.parser, '1.+2'),
          errorTester(errorMessage)
        );
        assert.throws(
          thrower(calc.parser, '1.-2'),
          errorTester(errorMessage)
        );
        assert.throws(
          thrower(calc.parser, '1.(2)'),
          errorTester(errorMessage)
        );
        assert.throws(
          thrower(calc.parser, '(1.)+2'),
          errorTester(errorMessage)
        );
      });

      it('when formula has "(" followed by "x÷)."', function () {
        assert.throws(
          thrower(calc.parser, '1+(x2)'),
          errorTester(errorMessage)
        );
        assert.throws(
          thrower(calc.parser, '1+(÷2)'),
          errorTester(errorMessage)
        );
        assert.throws(
          thrower(calc.parser, '1+(.2)'),
          errorTester(errorMessage)
        );
        assert.throws(
          thrower(calc.parser, '1+()-2'),
          errorTester(errorMessage)
        );
      });
    });
  });

  describe('Function calculate', function () {
    it('should return 0.45964912 when formula is 1+2-3x4÷5+(6)-((7x8)÷9.12)', function () {
      assert.strictEqual(calc.calculate('1+2-3x4÷5+(6)-((7x8)÷9.12)'), 0.45964912);
    });
  });
});
