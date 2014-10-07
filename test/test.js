var assert = require('assert');
var Calc = require('../js/script.js');

describe('Calc', function () {
  var calc;

  it('deve ser instanciavel com operador new', function () {
    calc = new Calc();
    assert.ok(calc instanceof Calc);
  });

  it('deve ser instanciavel sem operador new', function () {
    calc = Calc();
    assert.ok(calc instanceof Calc);
  });

  calc = new Calc();

  describe('Function multiply', function () {

    it('2x3 deve retornar 6', function () {
      assert.strictEqual(calc.multiply(2, 3), 6);
    });

    it('-2x-3 deve retornar 6', function () {
      assert.strictEqual(calc.multiply(-2, -3), 6);
    });

    it('2.5x3.4 deve retornar 8.5', function () {
      assert.strictEqual(calc.multiply(2.5, 3.4), 8.5);
    });

    it('-2.5x-3.4 deve retornar 8.5', function () {
      assert.strictEqual(calc.multiply(-2.5, -3.4), 8.5);
    });

    it('"abc" x "1" deve retornar NaN', function () {
      assert(Number.isNaN(calc.multiply('abc', '1')));
    });

  });

  describe('Function divide', function () {
    it('21÷3 deve retornar 7', function () {
      assert.strictEqual(calc.divide(21, 3), 7);
    });

    it('-21÷-3 deve retornar 7', function () {
      assert.strictEqual(calc.divide(-21, -3), 7);
    });

    it('21.6÷3.2 deve retornar 6.75', function () {
      assert.strictEqual(calc.divide(21.6, 3.2), 6.75);
    });

    it('-21.6÷-3.2 deve retornar 6.75', function () {
      assert.strictEqual(calc.divide(-21.6, -3.2), 6.75);
    });

    it('"abc" ÷ "1" deve retornar NaN', function () {
      assert(Number.isNaN(calc.divide('abc', '1')));
    });

    it('10 ÷ 0 deve retornar Infinity', function () {
      assert(!Number.isFinite(calc.divide(10, 0)));
    });

  });

  describe('Function sum', function () {
    it('5+4 deve retornar 9', function () {
      assert.strictEqual(calc.sum(5, 4), 9);
    });

    it('-5+-4 deve retornar -9', function () {
      assert.strictEqual(calc.sum(-5, -4), -9);
    });

    it('5.1+4.7 deve retornar 9.8', function () {
      assert.strictEqual(calc.sum(5.1, 4.7), 9.8);
    });

    it('-5.1+-4.7 deve retornar -9.8', function () {
      assert.strictEqual(calc.sum(-5.1, -4.7), -9.8);
    });

    it('+5++4 deve retornar 9', function () {
      assert.strictEqual(calc.sum(+5, +4), 9);
    });

    it('+5.1++4.7 deve retornar 9.8', function () {
      assert.strictEqual(calc.sum(+5.1, +4.7), 9.8);
    });

    it('null + undefined deve retornar NaN', function () {
      assert(Number.isNaN(calc.sum(null, undefined)));
    });
  });

  describe('Function subtract', function () {
    it('8-6 deve retornar 2', function () {
      assert.strictEqual(calc.subtract(8, 6), 2);
    });

    it('+8-+6 deve retornar 2', function () {
      assert.strictEqual(calc.subtract(+8, +6), 2);
    });

    it('-8--6 deve retornar -2', function () {
      assert.strictEqual(calc.subtract(-8, -6), -2);
    });

    it('8.2-6.7 deve retornar 1.5', function () {
      assert.strictEqual(calc.subtract(8.2, 6.7), 1.5);
    });

    it('-8.2--6.7 deve retornar -1.5', function () {
      assert.strictEqual(calc.subtract(-8.2, -6.7), -1.5);
    });

    it('"" - "12" deve retornar NaN', function () {
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

    errorMessage = 'divergence between parentheses';
    it('deve retornar o erro de sintaxe: ' + errorMessage, function () {
      assert.throws(
        thrower(calc.parser, '1+(2+3))'),
        errorTester(errorMessage)
      );
    });

  });

});
