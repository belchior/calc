var assert = require('assert');
var Calc = require('../src/js/calc.js');

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

  describe('Function power', function () {
    it('should return 1 always that exponent is 0', function () {
      assert.strictEqual(calc.power(2, 0), 1);
      assert.strictEqual(calc.power(1, 0), 1);
      assert.strictEqual(calc.power(0, 0), 1);
      assert.strictEqual(calc.power(-1, 0), 1);
      assert.strictEqual(calc.power(-2, 0), 1);
    });
    it('should return 0 when base is 0 and exponent is great than 0', function () {
      assert.strictEqual(calc.power(0, 1), 0);
      assert.strictEqual(calc.power(0, 23), 0);
    });
    it('should return the base when exponent is 1', function () {
      assert.strictEqual(calc.power(2, 1), 2);
      assert.strictEqual(calc.power(1, 1), 1);
      assert.strictEqual(calc.power(0, 1), 0);
      assert.strictEqual(calc.power(-1, 1), -1);
      assert.strictEqual(calc.power(-2, 1), -2);
    });
    it('should return 64 when 8 to the power 2', function () {
      assert.strictEqual(calc.power(8, 2), 64);
    });
    it('should return 64 when -8 to the power 2', function () {
      assert.strictEqual(calc.power(-8, 2), 64);
    });
    it('should return 0.015625 when -8 to the power -2', function () {
      assert.strictEqual(calc.power(-8, -2), 0.015625);
    });
    it('should return 0.015625 when 8 to the power -2', function () {
      assert.strictEqual(calc.power(8, -2), 0.015625);
    });
    it('should return 15.58845727 when 3 to the power 2.5', function () {
      assert.strictEqual(calc.power(3, 2.5), 15.58845727);
    });
    it('should return 0.01184154 when 4 to the power -3.2', function () {
      assert.strictEqual(calc.power(4, -3.2), 0.01184154);
    });
    it('should throws an Error when the base is 0 and the exponent is less than 0', function () {
      assert.throws(
        function () {calc.power(0, -12);},
        SyntaxError, 'It\'s impossible calculate power of 0'
      );
    });
    it('should throws an Error when the base or exponent is not a number', function () {
      assert.throws(
        function () {calc.power('abc', 123);},
        SyntaxError, 'It\'s impossible calculate power of abc'
      );
      assert.throws(
        function () {calc.power(123, 'abc');},
        SyntaxError, 'It\'s impossible calculate power of 123'
      );
    });
  });

  describe('Function percentage', function () {
    it('should return 0.05 for 5%', function () {
      assert.strictEqual(calc.percentage(5), 0.05);
    });
    it('should return 21.6 for 27% of 80', function () {
      assert.strictEqual(calc.percentage(27, 80), 21.6);
    });
    it('should return -45.22 for -119% of 38', function () {
      assert.strictEqual(calc.percentage(-119, 38), -45.22);
    });
    it('should return -45.22 for 119% of -38', function () {
      assert.strictEqual(calc.percentage(119, -38), -45.22);
    });
    it('should return 7.79 for -20.5% of -38', function () {
      assert.strictEqual(calc.percentage(-20.5, -38), 7.79);
    });
    it('should throws an Error when are calculate 25% of "abc"', function () {
      assert.throws(
        function () {calc.percentage(25, 'abc');},
        SyntaxError, 'It\'s impossible calculate percentage of 25'
      );
    });
  });

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
    it('should throws an Error when are multiplied "abc" by "1"', function () {
      assert.throws(
        function () {calc.multiply('abc', '1');},
        SyntaxError, 'It\'s impossible multiply abc by 1'
      );
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
    it('should throws an Error when are multiplied "abc" by "1"', function () {
      assert.throws(
        function () {calc.divide('abc', '1');},
        SyntaxError, 'It\'s impossible divide abc by 1'
      );
    });
    it('should throws an Error when are divided 10 by 0', function () {
      assert.throws(
        function () {calc.divide(10, 0);},
        SyntaxError, 'It\'s impossible divide abc by 1'
      );
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
    it('should throws an Error when are summed null by undefined', function () {
      assert.throws(
        function () {calc.sum(null, undefined);},
        SyntaxError, 'It\'s impossible sum null by undefined'
      );
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
    it('should throws an Error when are subtracted "" by "12"', function () {
      assert.throws(
        function () {calc.subtract('', '12');},
        SyntaxError, 'It\'s impossible subtract  by 12'
      );
    });
  });

  describe('Function parser', function () {

    var errorMessage;
    var thrower = function (fn, param) {
      return function () {
        fn(param);
      };
    };
    var errorTester = function (errorMessage) {
      return function (error) {
        return error instanceof SyntaxError && error.message === errorMessage ? true : false;
      };
    };

    describe('should return a synta× error: divergence between parenthesis', function () {
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

    describe('should return a synta× error: invalid arithmetic combination of characters', function () {
      var errorMessage = 'invalid arithmetic combination of characters';

      it('when formula start with "×÷."', function () {
        assert.throws(
          thrower(calc.parser, '×1'),
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
      it('when formula has "+-×÷" followed by "×÷."', function () {
        ['+', '-', '×', '÷', '.'].forEach(function (char) {
          assert.throws(
            thrower(calc.parser, '1' + char + '×2'),
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
      it('when formula has "(" followed by "×÷)."', function () {
        assert.throws(
          thrower(calc.parser, '1+(×2)'),
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
    it('should return 0.45964912 when formula is 1+2-3×4÷5+(6)-((7×8)÷9.12)', function () {
      assert.strictEqual(calc.calculate('1+2-3×4÷5+(6)-((7×8)÷9.12)'), 0.45964912);
    });

    describe('power', function () {
      it('should return 9 when formula is 1+2^3', function () {
        assert.strictEqual(calc.calculate('1+2^3'), 9);
      });
      it('should return 15629 when formula is 4+5^+6', function () {
        assert.strictEqual(calc.calculate('4+5^+6'), 15629);
      });
      it('should return 7.00195313 when formula is 7+8^-3', function () {
        assert.strictEqual(calc.calculate('7+8^-3'), 7.00195313);
      });
      it('should return -1 when formula is 0-1^2', function () {
        assert.strictEqual(calc.calculate('0-1^2'), -1);
      });
      it('should return -1021 when formula is 3-4^+5', function () {
        assert.strictEqual(calc.calculate('3-4^+5'), -1021);
      });
      it('should return -5764795 when formula is 6-7^+8', function () {
        assert.strictEqual(calc.calculate('6-7^+8'), -5764795);
      });
      it('should return 5.65685425 when formula is 2^2.5', function () {
        assert.strictEqual(calc.calculate('2^2.5'), 5.65685425);
      });
      it('should return -5764607.09875 when formula is 1^2÷3^4×5^6-7^8+9^0', function () {
        assert.strictEqual(calc.calculate('1^2÷3^4×5^6-7^8+9^0'), -5764607.09875);
      });
      it('should throws an Error when the result is infinity', function () {
        assert.throws(
          function () {calc.calculate('9-0^-1');},
          SyntaxError, 'It\'s impossible calculate power of 0'
        );
      });
    });

    describe('percentage', function () {
      it('should return 1.392 when formula is 1+2%-3×4%÷5+6%', function () {
        assert.strictEqual(calc.calculate('1+2%-3×4%÷5+6%'), 1.392);
      });
    });

    describe('multiplication and division', function () {
      it('should return 4 when formula is +2×+2', function () {
        assert.strictEqual(calc.calculate('+2×+2'), 4);
      });
      it('should return 4 when formula is -2×-2', function () {
        assert.strictEqual(calc.calculate('-2×-2'), 4);
      });
      it('should return -4 when formula is +2×-2', function () {
        assert.strictEqual(calc.calculate('+2×-2'), -4);
      });
      it('should return -4 when formula is -2×+2', function () {
        assert.strictEqual(calc.calculate('-2×+2'), -4);
      });
      it('should return 4 when formula is +20÷+5', function () {
        assert.strictEqual(calc.calculate('+20÷+5'), 4);
      });
      it('should return 4 when formula is -20÷-5', function () {
        assert.strictEqual(calc.calculate('-20÷-5'), 4);
      });
      it('should return -4 when formula is +20÷-5', function () {
        assert.strictEqual(calc.calculate('+20÷-5'), -4);
      });
      it('should return -4 when formula is -20÷+5', function () {
        assert.strictEqual(calc.calculate('-20÷+5'), -4);
      });
      it('should return 10 when formula is 2+2×2×2', function () {
        assert.strictEqual(calc.calculate('2+2×2×2'), 10);
      });
      it('should return -6 when formula is 2+-2×2×2', function () {
        assert.strictEqual(calc.calculate('2+-2×2×2'), -6);
      });
      it('should return 4 when formula is 2+8÷2÷2', function () {
        assert.strictEqual(calc.calculate('2+8÷2÷2'), 4);
      });
      it('should return -6 when formula is 2-2×2×2', function () {
        assert.strictEqual(calc.calculate('2-2×2×2'), -6);
      });
      it('should return 0 when formula is 2-8÷2÷2', function () {
        assert.strictEqual(calc.calculate('2-8÷2÷2'), 0);
      });
    });

    describe('addition and subtraction', function () {
      it('should return 4 when formula is +2++2', function () {
        assert.strictEqual(calc.calculate('+2++2'), 4);
      });
      it('should return -4 when formula is -2+-2', function () {
        assert.strictEqual(calc.calculate('-2+-2'), -4);
      });
      it('should return 0 when formula is +2+-2', function () {
        assert.strictEqual(calc.calculate('+2+-2'), 0);
      });
      it('should return 0 when formula is -2++2', function () {
        assert.strictEqual(calc.calculate('-2++2'), 0);
      });
      it('should return 15 when formula is +20-+5', function () {
        assert.strictEqual(calc.calculate('+20-+5'), 15);
      });
      it('should return -15 when formula is -20--5', function () {
        assert.strictEqual(calc.calculate('-20--5'), -15);
      });
      it('should return 25 when formula is +20--5', function () {
        assert.strictEqual(calc.calculate('+20--5'), 25);
      });
      it('should return -25 when formula is -20-+5', function () {
        assert.strictEqual(calc.calculate('-20-+5'), -25);
      });
    });

    describe('parenthesis', function () {
      it('should return 1 when formula is (1)', function () {
        assert.strictEqual(calc.calculate('(1)'), 1);
      });
      it('should return 1 when formula is (+1)', function () {
        assert.strictEqual(calc.calculate('(+1)'), 1);
      });
      it('should return -2 when formula is (-2)', function () {
        assert.strictEqual(calc.calculate('(-2)'), -2);
      });
      it('should return 3 when formula is (+1+2)', function () {
        assert.strictEqual(calc.calculate('(+1+2)'), 3);
      });
      it('should return -3 when formula is (-1-2)', function () {
        assert.strictEqual(calc.calculate('(-1-2)'), -3);
      });
      it('should return 15 when formula is (10+50%)', function () {
        assert.strictEqual(calc.calculate('(10+50%)'), 15);
      });
      it('should return 256 when formula is (2^8)', function () {
        assert.strictEqual(calc.calculate('(2^8)'), 256);
      });
      it('should return 2.76 when formula is (1.2×2.3)', function () {
        assert.strictEqual(calc.calculate('(1.2×2.3)'), 2.76);
      });
      it('should return 0.52173913 when formula is (-1.2÷-2.3)', function () {
        assert.strictEqual(calc.calculate('(-1.2÷-2.3)'), 0.52173913);
      });
      it('should return 7 when formula is (2)+(3)-(-2)', function () {
        assert.strictEqual(calc.calculate('(2)+(3)-(-2)'), 7);
      });
      it('should return 5 when formula is ((-8)÷(-2))+1', function () {
        assert.strictEqual(calc.calculate('((-8)÷(-2))+1'), 5);
      });
      it('should return 4.4 when formula is 9+8-7×6÷5+(4-3×(2÷1)+0.1-2.3)', function () {
        assert.strictEqual(calc.calculate('9+8-7×6÷5+(4-3×(2÷1)+0.1-2.3)'), 4.4);
      });
      it('should return 1.392 when formula is 1+(2÷100×1)-3×(4÷100×-3)÷5+(6÷100×5)', function () {
        assert.strictEqual(calc.calculate('1+(2÷100×1)-3×(4÷100×-3)÷5+(6÷100×5)'), 1.392);
      });
    });

  });
});
