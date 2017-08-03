import Calc from './Calc';

describe('Calc', () => {
  describe('Function power', () => {
    test('should return 1 always that exponent is 0', () => {
      expect(Calc.power(2, 0)).toBe(1);
      expect(Calc.power(1, 0)).toBe(1);
      expect(Calc.power(0, 0)).toBe(1);
      expect(Calc.power(-1, 0)).toBe(1);
      expect(Calc.power(-2, 0)).toBe(1);
    });
    test('should return 0 when base is 0 and exponent is great than 0', () => {
      expect(Calc.power(0, 1)).toBe(0);
      expect(Calc.power(0, 23)).toBe(0);
    });
    test('should return the base when exponent is 1', () => {
      expect(Calc.power(2, 1)).toBe(2);
      expect(Calc.power(1, 1)).toBe(1);
      expect(Calc.power(0, 1)).toBe(0);
      expect(Calc.power(-1, 1)).toBe(-1);
      expect(Calc.power(-2, 1)).toBe(-2);
    });
    test('should return 64 when 8 to the power 2', () => {
      expect(Calc.power(8, 2)).toBe(64);
    });
    test('should return 64 when -8 to the power 2', () => {
      expect(Calc.power(-8, 2)).toBe(64);
    });
    test('should return 0.015625 when -8 to the power -2', () => {
      expect(Calc.power(-8, -2)).toBe(0.015625);
    });
    test('should return 0.015625 when 8 to the power -2', () => {
      expect(Calc.power(8, -2)).toBe(0.015625);
    });
    test('should return 15.58845727 when 3 to the power 2.5', () => {
      expect(Calc.power(3, 2.5)).toBe(15.58845727);
    });
    test('should return 0.01184154 when 4 to the power -3.2', () => {
      expect(Calc.power(4, -3.2)).toBe(0.01184154);
    });
    test('should throws an Error when the base is 0 and the exponent is less than 0', () => {
      // SyntaxError: It's impossible calculate power of 0
      expect(() => Calc.power(0, -12)).toThrow('It\'s impossible calculate power of 0');
    });
    test('should throws an Error when the base or exponent is not a number', () => {
      expect(() => Calc.power('abc', 123)).toThrow('It\'s impossible calculate power of abc');
      expect(() => Calc.power(123, 'abc')).toThrow('It\'s impossible calculate power of 123');
    });
  });

  describe('Function percentage', () => {
    test('should return 0.01 for 1%', () => { expect(Calc.percentage(1)).toBe(0.01); });
    test('should return 0.1 for 10', () => { expect(Calc.percentage(10)).toBe(0.1); });
    test('should return 1 for 100', () => { expect(Calc.percentage(100)).toBe(1); });
    test('should return -1.23 for -123', () => { expect(Calc.percentage(-123)).toBe(-1.23); });
    test('should return 1.5025 for 150.25', () => { expect(Calc.percentage(150.25)).toBe(1.5025); });
    test('should return 20 for 20% of 100', () => { expect(Calc.percentage(20, 100)).toBe(20); });
    test('should throws an Error when calculate percentage of "abc"', () => {
      expect(() => Calc.percentage('abc')).toThrow('It\'s impossible calculate percentage of abc');
    });
    test('should throws an Error when calculate of 20% of "abc"', () => {
      expect(() => Calc.percentage(20, 'abc')).toThrow('It\'s impossible calculate percentage of 20');
    });
  });

  describe('Function multiply', () => {
    test('should return 6 when are multiplied 2 by 3', () => {
      expect(Calc.multiply(2, 3)).toBe(6);
    });
    test('should return 6 when are multiplied -2 by -3', () => {
      expect(Calc.multiply(-2, -3)).toBe(6);
    });
    test('should return 8.5 when are multiplied 2.5 by 3.4', () => {
      expect(Calc.multiply(2.5, 3.4)).toBe(8.5);
    });
    test('should return 8.5 when are multiplied -2.5 by -3.4', () => {
      expect(Calc.multiply(-2.5, -3.4)).toBe(8.5);
    });
    test('should throws an Error when are multiplied "abc" by "1"', () => {
      expect(() => Calc.multiply('abc', '1')).toThrow('It\'s impossible multiply abc by 1');
    });
  });

  describe('Function divide', () => {
    test('should return 7 when are divided 21 by 3', () => {
      expect(Calc.divide(21, 3)).toBe(7);
    });
    test('should return 7 when are divided -21 by -3', () => {
      expect(Calc.divide(-21, -3)).toBe(7);
    });
    test('should return 6 when are divided 21.6 by 3.2.75', () => {
      expect(Calc.divide(21.6, 3.2)).toBe(6.75);
    });
    test('should return 6 when are divided -21.6 by -3.2.75', () => {
      expect(Calc.divide(-21.6, -3.2)).toBe(6.75);
    });
    test('should throws an Error when are multiplied "abc" by "1"', () => {
      expect(() => Calc.divide('abc', '1')).toThrow('It\'s impossible divide abc by 1');
    });
    test('should throws an Error when are divided 10 by 0', () => {
      expect(() => Calc.divide(10, 0)).toThrow('It\'s impossible divide 10 by 0');
    });
  });

  describe('Function sum', () => {
    test('should return 9 when are summed 5 by 4', () => {
      expect(Calc.sum(5, 4)).toBe(9);
    });
    test('should return -9 when are summed -5 by -4', () => {
      expect(Calc.sum(-5, -4)).toBe(-9);
    });
    test('should return 9.8 when are summed 5.1 by 4.7', () => {
      expect(Calc.sum(5.1, 4.7)).toBe(9.8);
    });
    test('should return -9.8 when are summed -5.1 by -4.7', () => {
      expect(Calc.sum(-5.1, -4.7)).toBe(-9.8);
    });
    test('should return 9 when are summed +5 by +4', () => {
      expect(Calc.sum(+5, +4)).toBe(9);
    });
    test('should return 9.8 when are summed +5.1 by +4.7', () => {
      expect(Calc.sum(+5.1, +4.7)).toBe(9.8);
    });
    test('should throws an Error when are summed null by undefined', () => {
      expect(() => Calc.sum(null, undefined)).toThrow('It\'s impossible sum null by undefined');
    });
  });

  describe('Function subtract', () => {
    test('should return 2 when are subtracted 8 by 6', () => {
      expect(Calc.subtract(8, 6)).toBe(2);
    });
    test('should return 2 when are subtracted +8 by +6', () => {
      expect(Calc.subtract(+8, +6)).toBe(2);
    });
    test('should return -2 when are subtracted -8 by -6', () => {
      expect(Calc.subtract(-8, -6)).toBe(-2);
    });
    test('should return 1.5 when are subtracted 8.2 by 6.7', () => {
      expect(Calc.subtract(8.2, 6.7)).toBe(1.5);
    });
    test('should return -1.5 when are subtracted -8.2 by -6.7', () => {
      expect(Calc.subtract(-8.2, -6.7)).toBe(-1.5);
    });
    test('should throws an Error when are subtracted "" by "12"', () => {
      expect(() => Calc.subtract('', '12')).toThrow('It\'s impossible subtract  by 12');
    });
  });

  describe('Function parser', () => {
    let errorMessage;
    let thrower = function (fn, param) {
      return () => {
        fn(param);
      };
    };
    let errorTester = function (errorMessage) {
      return function (error) {
        return error instanceof SyntaxError && error.message === errorMessage ? true : false;
      };
    };

    describe('should return a synta× error: divergence between parenthesis', () => {
      test('when formula has different amount of parenthesis', () => {
        const errorMessage = 'divergence between parenthesis';

        expect(() => Calc.parse('1+(2+3))')).toThrow(errorMessage);
        expect(() => Calc.parse('1+(((2+3)')).toThrow(errorMessage);
      });
      test('when formula has wrong sequence of parenthesis', () => {
        const errorMessage = 'divergence between parenthesis';

        expect(() => Calc.parse(')+1(')).toThrow(errorMessage);
        expect(() => Calc.parse('1)+(1')).toThrow(errorMessage);
      });
    });

    describe('should return a syntax error: invalid arithmetic combination of characters', () => {
      const errorMessage = 'invalid arithmetic combination of characters';

      test('when formula start with "×÷."', () => {
        expect(() => Calc.parse('×1')).toThrow(errorMessage);
        expect(() => Calc.parse('÷1')).toThrow(errorMessage);
        expect(() => Calc.parse('.1')).toThrow(errorMessage);
      });
      test('when formula has "+-×÷" followed by "×÷."', () => {
        ['+', '-', '×', '÷', '.'].forEach(function (char) {
          expect(() => Calc.parse('1' + char + '×2')).toThrow(errorMessage);
          expect(() => Calc.parse('1' + char + '÷2')).toThrow(errorMessage);
          expect(() => Calc.parse('1' + char + '.2')).toThrow(errorMessage);
        });
      });
      test('when formula has "." followed by "+-()"', () => {
        expect(() => Calc.parse('1.2.3')).toThrow(errorMessage);
        expect(() => Calc.parse('1.+2')).toThrow(errorMessage);
        expect(() => Calc.parse('1.-2')).toThrow(errorMessage);
        expect(() => Calc.parse('1.(2)')).toThrow(errorMessage);
        expect(() => Calc.parse('(1.)+2')).toThrow(errorMessage);
      });
      test('when formula has "(" followed by "×÷)."', () => {
        expect(() => Calc.parse('1+(×2)')).toThrow(errorMessage);
        expect(() => Calc.parse('1+(÷2)')).toThrow(errorMessage);
        expect(() => Calc.parse('1+(.2)')).toThrow(errorMessage);
        expect(() => Calc.parse('1+()-2')).toThrow(errorMessage);
      });
    });
  });

  describe('Function calculate', () => {

    test('should return NaN', () => {
      expect(Calc.calculate('')).toBeFalsy();
    });

    test('should return 0.45964912 when formula is 1+2-3×4÷5+(6)-((7×8)÷9.12)', () => {
      expect(Calc.calculate('1+2-3×4÷5+(6)-((7×8)÷9.12)')).toBe(0.45964912);
    });

    describe('power', () => {
      test('should return 9 when formula is 1+2^3', () => {
        expect(Calc.calculate('1+2^3')).toBe(9);
      });
      test('should return 15629 when formula is 4+5^+6', () => {
        expect(Calc.calculate('4+5^+6')).toBe(15629);
      });
      test('should return 7.00195313 when formula is 7+8^-3', () => {
        expect(Calc.calculate('7+8^-3')).toBe(7.00195313);
      });
      test('should return -1 when formula is 0-1^2', () => {
        expect(Calc.calculate('0-1^2')).toBe(-1);
      });
      test('should return -1021 when formula is 3-4^+5', () => {
        expect(Calc.calculate('3-4^+5')).toBe(-1021);
      });
      test('should return -5764795 when formula is 6-7^+8', () => {
        expect(Calc.calculate('6-7^+8')).toBe(-5764795);
      });
      test('should return 5.65685425 when formula is 2^2.5', () => {
        expect(Calc.calculate('2^2.5')).toBe(5.65685425);
      });
      test('should return -5764607.09875 when formula is 1^2÷3^4×5^6-7^8+9^0', () => {
        expect(Calc.calculate('1^2÷3^4×5^6-7^8+9^0')).toBe(-5764607.09875);
      });
      test('should throws an Error when the result is infinity', () => {
        expect(() => Calc.calculate('9-0^-1')).toThrow('It\'s impossible calculate power of 0');
      });
    });

    describe('percentage', () => {
      test('should return 5 for 10×50%', () => expect(Calc.calculate('10×50%')).toBe(5));
      test('should return 5 for 10×+50%', () => expect(Calc.calculate('10×+50%')).toBe(5));
      test('should return -5 for 10×-50%', () => expect(Calc.calculate('10×-50%')).toBe(-5));
      test('should return 5 for +10×+50%', () => expect(Calc.calculate('+10×+50%')).toBe(5));
      test('should return -5 for +10×-50%', () => expect(Calc.calculate('+10×-50%')).toBe(-5));
      test('should return -5 for -10×+50%', () => expect(Calc.calculate('-10×+50%')).toBe(-5));
      test('should return 5 for -10×-50%', () => expect(Calc.calculate('-10×-50%')).toBe(5));

      test('should return 5.1 for 10.2×50%', () => expect(Calc.calculate('10.2×50%')).toBe(5.1));
      test('should return 5.1 for 10.2×+50%', () => expect(Calc.calculate('10.2×+50%')).toBe(5.1));
      test('should return -5.1 for 10.2×-50%', () => expect(Calc.calculate('10.2×-50%')).toBe(-5.1));
      test('should return 5.1 for +10.2×+50%', () => expect(Calc.calculate('+10.2×+50%')).toBe(5.1));
      test('should return -5.1 for +10.2×-50%', () => expect(Calc.calculate('+10.2×-50%')).toBe(-5.1));
      test('should return -5.1 for -10.2×+50%', () => expect(Calc.calculate('-10.2×+50%')).toBe(-5.1));
      test('should return 5.1 for -10.2×-50%', () => expect(Calc.calculate('-10.2×-50%')).toBe(5.1));

      test('should return 5.02 for 10×50.2%', () => expect(Calc.calculate('10×50.2%')).toBe(5.02));
      test('should return 5.02 for 10×+50.2%', () => expect(Calc.calculate('10×+50.2%')).toBe(5.02));
      test('should return -5.02 for 10×-50.2%', () => expect(Calc.calculate('10×-50.2%')).toBe(-5.02));
      test('should return 5.02 for +10×+50.2%', () => expect(Calc.calculate('+10×+50.2%')).toBe(5.02));
      test('should return -5.02 for +10×-50.2%', () => expect(Calc.calculate('+10×-50.2%')).toBe(-5.02));
      test('should return -5.02 for -10×+50.2%', () => expect(Calc.calculate('-10×+50.2%')).toBe(-5.02));
      test('should return 5.02 for -10×-50.2%', () => expect(Calc.calculate('-10×-50.2%')).toBe(5.02));

      test('should return 5.1204 for 10.2×50.2%', () => expect(Calc.calculate('10.2×50.2%')).toBe(5.1204));
      test('should return 5.1204 for 10.2×+50.2%', () => expect(Calc.calculate('10.2×+50.2%')).toBe(5.1204));
      test('should return -5.1204 for 10.2×-50.2%', () => expect(Calc.calculate('10.2×-50.2%')).toBe(-5.1204));
      test('should return 5.1204 for +10.2×+50.2%', () => expect(Calc.calculate('+10.2×+50.2%')).toBe(5.1204));
      test('should return -5.1204 for +10.2×-50.2%', () => expect(Calc.calculate('+10.2×-50.2%')).toBe(-5.1204));
      test('should return -5.1204 for -10.2×+50.2%', () => expect(Calc.calculate('-10.2×+50.2%')).toBe(-5.1204));
      test('should return 5.1204 for -10.2×-50.2%', () => expect(Calc.calculate('-10.2×-50.2%')).toBe(5.1204));

      test('should return 20 for 10÷50%', () => expect(Calc.calculate('10÷50%')).toBe(20));
      test('should return 20 for 10÷+50%', () => expect(Calc.calculate('10÷+50%')).toBe(20));
      test('should return -20 for 10÷-50%', () => expect(Calc.calculate('10÷-50%')).toBe(-20));
      test('should return 20 for +10÷+50%', () => expect(Calc.calculate('+10÷+50%')).toBe(20));
      test('should return 20 for -10÷-50%', () => expect(Calc.calculate('-10÷-50%')).toBe(20));
      test('should return -20 for +10÷-50%', () => expect(Calc.calculate('+10÷-50%')).toBe(-20));
      test('should return -20 for -10÷+50%', () => expect(Calc.calculate('-10÷+50%')).toBe(-20));

      test('should return 20.4 for 10.2÷50%', () => expect(Calc.calculate('10.2÷50%')).toBe(20.4));
      test('should return 20.4 for 10.2÷+50%', () => expect(Calc.calculate('10.2÷+50%')).toBe(20.4));
      test('should return -20.4 for 10.2÷-50%', () => expect(Calc.calculate('10.2÷-50%')).toBe(-20.4));
      test('should return 20.4 for +10.2÷+50%', () => expect(Calc.calculate('+10.2÷+50%')).toBe(20.4));
      test('should return 20.4 for -10.2÷-50%', () => expect(Calc.calculate('-10.2÷-50%')).toBe(20.4));
      test('should return -20.4 for +10.2÷-50%', () => expect(Calc.calculate('+10.2÷-50%')).toBe(-20.4));
      test('should return -20.4 for -10.2÷+50%', () => expect(Calc.calculate('-10.2÷+50%')).toBe(-20.4));

      test('should return 19.92031873 for 10÷50.2%', () => expect(Calc.calculate('10÷50.2%')).toBe(19.92031873));
      test('should return 19.92031873 for 10÷+50.2%', () => expect(Calc.calculate('10÷+50.2%')).toBe(19.92031873));
      test('should return -19.92031873 for 10÷-50.2%', () => expect(Calc.calculate('10÷-50.2%')).toBe(-19.92031873));
      test('should return 19.92031873 for +10÷+50.2%', () => expect(Calc.calculate('+10÷+50.2%')).toBe(19.92031873));
      test('should return 19.92031873 for -10÷-50.2%', () => expect(Calc.calculate('-10÷-50.2%')).toBe(19.92031873));
      test('should return -19.92031873 for +10÷-50.2%', () => expect(Calc.calculate('+10÷-50.2%')).toBe(-19.92031873));
      test('should return -19.92031873 for -10÷+50.2%', () => expect(Calc.calculate('-10÷+50.2%')).toBe(-19.92031873));

      test('should return 20.31872510 for 10.2÷50.2%', () => expect(Calc.calculate('10.2÷50.2%')).toBe(20.31872510));
      test('should return 20.31872510 for 10.2÷+50.2%', () => expect(Calc.calculate('10.2÷+50.2%')).toBe(20.31872510));
      test('should return -20.31872510 for 10.2÷-50.2%', () => expect(Calc.calculate('10.2÷-50.2%')).toBe(-20.31872510));
      test('should return 20.31872510 for +10.2÷+50.2%', () => expect(Calc.calculate('+10.2÷+50.2%')).toBe(20.31872510));
      test('should return 20.31872510 for -10.2÷-50.2%', () => expect(Calc.calculate('-10.2÷-50.2%')).toBe(20.31872510));
      test('should return -20.31872510 for +10.2÷-50.2%', () => expect(Calc.calculate('+10.2÷-50.2%')).toBe(-20.31872510));
      test('should return -20.31872510 for -10.2÷+50.2%', () => expect(Calc.calculate('-10.2÷+50.2%')).toBe(-20.31872510));

      test('should return 15 for 10+50%', () => expect(Calc.calculate('10+50%')).toBe(15));
      test('should return 5 for 10-50%', () => expect(Calc.calculate('10-50%')).toBe(5));
      test('should return 15.3 for 10.2+50%', () => expect(Calc.calculate('10.2+50%')).toBe(15.3));
      test('should return 5.1 for 10.2-50%', () => expect(Calc.calculate('10.2-50%')).toBe(5.1));
      test('should return 15.02 for 10+50.2%', () => expect(Calc.calculate('10+50.2%')).toBe(15.02));
      test('should return 4.98 for 10-50.2%', () => expect(Calc.calculate('10-50.2%')).toBe(4.98));
      test('should return 15.3204 for 10.2+50.2%', () => expect(Calc.calculate('10.2+50.2%')).toBe(15.3204));
      test('should return 5.0796 for 10.2-50.2%', () => expect(Calc.calculate('10.2-50.2%')).toBe(5.0796));

      test('should return 15 for +10+50%', () => expect(Calc.calculate('+10+50%')).toBe(15));
      test('should return 5 for +10-50%', () => expect(Calc.calculate('+10-50%')).toBe(5));
      test('should return 15.3 for +10.2+50%', () => expect(Calc.calculate('+10.2+50%')).toBe(15.3));
      test('should return 5.1 for +10.2-50%', () => expect(Calc.calculate('+10.2-50%')).toBe(5.1));
      test('should return 15.02 for +10+50.2%', () => expect(Calc.calculate('+10+50.2%')).toBe(15.02));
      test('should return 4.98 for +10-50.2%', () => expect(Calc.calculate('+10-50.2%')).toBe(4.98));
      test('should return 15.3204 for +10.2+50.2%', () => expect(Calc.calculate('+10.2+50.2%')).toBe(15.3204));
      test('should return 5.0796 for +10.2-50.2%', () => expect(Calc.calculate('+10.2-50.2%')).toBe(5.0796));

      test('should return -15 for -10+50%', () => expect(Calc.calculate('-10+50%')).toBe(-15));
      test('should return -5 for -10-50%', () => expect(Calc.calculate('-10-50%')).toBe(-5));
      test('should return -15.3 for -10.2+50%', () => expect(Calc.calculate('-10.2+50%')).toBe(-15.3));
      test('should return -5.1 for -10.2-50%', () => expect(Calc.calculate('-10.2-50%')).toBe(-5.1));
      test('should return -15.02 for -10+50.2%', () => expect(Calc.calculate('-10+50.2%')).toBe(-15.02));
      test('should return -4.98 for -10-50.2%', () => expect(Calc.calculate('-10-50.2%')).toBe(-4.98));
      test('should return -15.3204 for -10.2+50.2%', () => expect(Calc.calculate('-10.2+50.2%')).toBe(-15.3204));
      test('should return -5.0796 for -10.2-50.2%', () => expect(Calc.calculate('-10.2-50.2%')).toBe(-5.0796));

      test('should return 0.5 for 50%', () => expect(Calc.calculate('50%')).toBe(0.5));
      test('should return 0.502 for 50.2%', () => expect(Calc.calculate('50.2%')).toBe(0.502));

      test('should return 0.5 for +50%', () => expect(Calc.calculate('+50%')).toBe(0.5));
      test('should return 0.502 for +50.2%', () => expect(Calc.calculate('+50.2%')).toBe(0.502));

      test('should return -0.5 for -50%', () => expect(Calc.calculate('-50%')).toBe(-0.5));
      test('should return -0.502 for -50.2%', () => expect(Calc.calculate('-50.2%')).toBe(-0.502));


      test('should return 16 for 1+10+50%', () => expect(Calc.calculate('1+10+50%')).toBe(16));
      test('should return 6 for 1+10-50%', () => expect(Calc.calculate('1+10-50%')).toBe(6));
      test('should return 6 for 1+10×50%', () => expect(Calc.calculate('1+10×50%')).toBe(6));
      test('should return 21 for 1+10÷50%', () => expect(Calc.calculate('1+10÷50%')).toBe(21));

      test('should return -14 for 1-10+50%', () => expect(Calc.calculate('1-10+50%')).toBe(-14));
      test('should return -4 for 1-10-50%', () => expect(Calc.calculate('1-10-50%')).toBe(-4));
      test('should return -4 for 1-10×50%', () => expect(Calc.calculate('1-10×50%')).toBe(-4));
      test('should return -19 for 1-10÷50%', () => expect(Calc.calculate('1-10÷50%')).toBe(-19));

      test('should return 15 for 1×10+50%', () => expect(Calc.calculate('1×10+50%')).toBe(15));
      test('should return 5 for 1×10-50%', () => expect(Calc.calculate('1×10-50%')).toBe(5));
      test('should return 5 for 1×10×50%', () => expect(Calc.calculate('1×10×50%')).toBe(5));
      test('should return 20 for 1×10÷50%', () => expect(Calc.calculate('1×10÷50%')).toBe(20));

      // test('should return 0.15 for 1÷10+50%', () => expect(Calc.calculate('1÷10+50%')).toBe(0.15));
      // test('should return 0.05 for 1÷10-50%', () => expect(Calc.calculate('1÷10-50%')).toBe(0.05));
      test('should return 0.05 for 1÷10×50%', () => expect(Calc.calculate('1÷10×50%')).toBe(0.05));
      test('should return 0.2 for 1÷10÷50%', () => expect(Calc.calculate('1÷10÷50%')).toBe(0.2));

    });

    describe('multiplication and division', () => {
      test('should return 4 when formula is +2×+2', () => {
        expect(Calc.calculate('+2×+2')).toBe(4);
      });
      test('should return 4 when formula is -2×-2', () => {
        expect(Calc.calculate('-2×-2')).toBe(4);
      });
      test('should return -4 when formula is +2×-2', () => {
        expect(Calc.calculate('+2×-2')).toBe(-4);
      });
      test('should return -4 when formula is -2×+2', () => {
        expect(Calc.calculate('-2×+2')).toBe(-4);
      });
      test('should return 4 when formula is +20÷+5', () => {
        expect(Calc.calculate('+20÷+5')).toBe(4);
      });
      test('should return 4 when formula is -20÷-5', () => {
        expect(Calc.calculate('-20÷-5')).toBe(4);
      });
      test('should return -4 when formula is +20÷-5', () => {
        expect(Calc.calculate('+20÷-5')).toBe(-4);
      });
      test('should return -4 when formula is -20÷+5', () => {
        expect(Calc.calculate('-20÷+5')).toBe(-4);
      });
      test('should return 10 when formula is 2+2×2×2', () => {
        expect(Calc.calculate('2+2×2×2')).toBe(10);
      });
      test('should return -6 when formula is 2+-2×2×2', () => {
        expect(Calc.calculate('2+-2×2×2')).toBe(-6);
      });
      test('should return 4 when formula is 2+8÷2÷2', () => {
        expect(Calc.calculate('2+8÷2÷2')).toBe(4);
      });
      test('should return -6 when formula is 2-2×2×2', () => {
        expect(Calc.calculate('2-2×2×2')).toBe(-6);
      });
      test('should return 0 when formula is 2-8÷2÷2', () => {
        expect(Calc.calculate('2-8÷2÷2')).toBe(0);
      });
    });

    describe('addition and subtraction', () => {
      test('should return 4 when formula is +2++2', () => {
        expect(Calc.calculate('+2++2')).toBe(4);
      });
      test('should return -4 when formula is -2+-2', () => {
        expect(Calc.calculate('-2+-2')).toBe(-4);
      });
      test('should return 0 when formula is +2+-2', () => {
        expect(Calc.calculate('+2+-2')).toBe(0);
      });
      test('should return 0 when formula is -2++2', () => {
        expect(Calc.calculate('-2++2')).toBe(0);
      });
      test('should return 15 when formula is +20-+5', () => {
        expect(Calc.calculate('+20-+5')).toBe(15);
      });
      test('should return -15 when formula is -20--5', () => {
        expect(Calc.calculate('-20--5')).toBe(-15);
      });
      test('should return 25 when formula is +20--5', () => {
        expect(Calc.calculate('+20--5')).toBe(25);
      });
      test('should return -25 when formula is -20-+5', () => {
        expect(Calc.calculate('-20-+5')).toBe(-25);
      });
    });

    describe('parenthesis', () => {
      test('should return 1 when formula is (1)', () => {
        expect(Calc.calculate('(1)')).toBe(1);
      });
      test('should return 1 when formula is (+1)', () => {
        expect(Calc.calculate('(+1)')).toBe(1);
      });
      test('should return -2 when formula is (-2)', () => {
        expect(Calc.calculate('(-2)')).toBe(-2);
      });
      test('should return 3 when formula is (+1+2)', () => {
        expect(Calc.calculate('(+1+2)')).toBe(3);
      });
      test('should return -3 when formula is (-1-2)', () => {
        expect(Calc.calculate('(-1-2)')).toBe(-3);
      });
      test('should return 15 when formula is (10+50%)', () => {
        expect(Calc.calculate('(10+50%)')).toBe(15);
      });
      test('should return 256 when formula is (2^8)', () => {
        expect(Calc.calculate('(2^8)')).toBe(256);
      });
      test('should return 2.76 when formula is (1.2×2.3)', () => {
        expect(Calc.calculate('(1.2×2.3)')).toBe(2.76);
      });
      test('should return 0.52173913 when formula is (-1.2÷-2.3)', () => {
        expect(Calc.calculate('(-1.2÷-2.3)')).toBe(0.52173913);
      });
      test('should return 7 when formula is (2)+(3)-(-2)', () => {
        expect(Calc.calculate('(2)+(3)-(-2)')).toBe(7);
      });
      test('should return 5 when formula is ((-8)÷(-2))+1', () => {
        expect(Calc.calculate('((-8)÷(-2))+1')).toBe(5);
      });
      test('should return 4.4 when formula is 9+8-7×6÷5+(4-3×(2÷1)+0.1-2.3)', () => {
        expect(Calc.calculate('9+8-7×6÷5+(4-3×(2÷1)+0.1-2.3)')).toBe(4.4);
      });
      test('should return 1.392 when formula is 1+(2÷100×1)-3×(4÷100×-3)÷5+(6÷100×5)', () => {
        expect(Calc.calculate('1+(2÷100×1)-3×(4÷100×-3)÷5+(6÷100×5)')).toBe(1.392);
      });
    });
  });

  describe('Function format', () => {
    test('should return exactly the same number', () => {
      expect(Calc.format(10, 3)).toBe(10);
      expect(Calc.format(10.012, 3)).toBe(10.012);
      expect(Calc.format(10.01234567)).toBe(10.01234567);
    });

    test('should return a rounded number', () => {
      expect(Calc.format(10.01238, 4)).toBe(10.0124);
      expect(Calc.format(10.012345678)).toBe(10.01234568);
    });

    test('should return NaN when called with no param', () => {
      expect(Calc.format()).toBeFalsy();
    });
    test('should return 0 when called with 0', () => {
      expect(Calc.format(0)).toBe(0);
    });
  });
});
