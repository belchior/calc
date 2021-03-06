/* eslint max-lines:off */

class Calc {
  static calculate(userFormula) {
    // eslint-disable-next-line
    const resolve = Object.create(null);

    resolve.parenthesis = (prevFormula, prevStack) => {
      const stack = prevStack.slice();
      const next = stack.pop();
      let formula = prevFormula;

      // obteins the most internal parenthesis
      const part = prevFormula.match(/\([^()]+\)/u);
      if (part) {
        // eslint-disable-next-line
        const result = next(part[0].replace(/[()]/ug, ''), stack);
        if (result < 0 && formula[part.index - 1] === '-') {
          formula = formula.replace(`-${part[0]}`, `+${Math.abs(result)}`);
        } else {
          formula = formula.replace(part[0], result);
        }
        stack.push(next);
        return resolve.parenthesis(formula, stack);
      }

      return next(formula, stack);
    };

    resolve.power = (prevFormula, prevStack) => {
      const stack = prevStack.slice();
      let formula = prevFormula;

      // get part to calculate power
      const part = formula.match(/(\d+(?:\.\d+)?)\^([+-]?\d+(?:\.\d+)?)/u);
      if (part) {
        part[1] = parseFloat(part[1]);
        part[2] = parseFloat(part[2]);
        const result = this.power(part[1], part[2]);
        formula = formula.replace(part[0], result);
        return resolve.power(formula, stack);
      }

      const next = stack.pop();
      return next(formula, stack);
    };

    resolve.sqrt = (prevFormula, prevStack) => {
      const stack = prevStack.slice();
      let formula = prevFormula;

      // get part to calculate sqrt
      const part = formula.match(/√([+]?\d+(?:\.\d+)?)/u);
      if (part) {
        part[1] = parseFloat(part[1]);
        const result = this.sqrt(part[1]);
        formula = formula.replace(part[0], result);
        return resolve.sqrt(formula, stack);
      }

      const next = stack.pop();
      return next(formula, stack);
    };

    resolve.percentage = (prevFormula, prevStack) => {
      const stack = prevStack.slice();
      let formula = prevFormula;
      // eslint-disable-next-line
      let part, result;

      /*
        Case 1
        50%    +50%    -50%
        50.2%  +50.2%  -50.2%
        50%...

        Case 2
        10+50%  10-50%
        +10+50%  +10-50%
        -10+50%  -10-50%
        2+10+50%  2+10-50%
        2-10+50%  2-10-50%

        Case 3
        1×100×50%  1×100÷50%
        1÷100×50%  1÷100÷50%


        1×100+50%  1÷100+50%
        1×100-50%  1÷100-50%
        1+100×50%  1-100×50%
        1+100÷50%  1-100÷50%
      */

      part = formula.match(/^([+-]?\d+(?:\.\d+)?)%/u);
      if (part) {
        result = part[1] / 100;
        formula = formula.replace(part[0], result);
        return resolve.percentage(formula, stack);
      }

      part = formula.match(/([+-]?)(\d+(?:\.\d+)?)([+-])(\d+(?:\.\d+)?)%/u);
      if (part) {
        part = [
          part[0],
          part[1],
          parseFloat(part[2]),
          part[3],
          parseFloat(part[4]),
        ];

        result = Calc.percentage(part[2], part[4]);
        result = part[3] === '+' ? part[2] + result : result;
        result = part[3] === '-' ? part[2] - result : result;
        result = String(part[1] + result);

        formula = formula.replace(part[0], result);
        return resolve.percentage(formula, stack);
      }

      part = formula.match(/([+-]?)(\d+(?:\.\d+)?)([×÷])([+-]?)(\d+(?:\.\d+)?)%/u);
      if (part) {
        part = [
          part[0],
          part[1],
          parseFloat(part[2]),
          part[3],
          part[4],
          parseFloat(part[5]),
        ];

        result = Calc.percentage(part[5]);
        result = String(part[1] + part[2] + part[3] + part[4] + result);
        formula = formula.replace(part[0], result);
        return resolve.percentage(formula, stack);
      }

      const next = stack.pop();
      return next(formula, stack);
    };

    resolve.multiplyOrDivide = (prevFormula, prevStack) => {
      const stack = prevStack.slice();
      let formula = prevFormula;

      // get parts to multiply or divide
      const part = formula.match(/([+-]?\d+(?:\.\d+)?)(×|÷)([+-]?\d+(?:\.\d+)?)/u);
      if (part) {
        part[1] = parseFloat(part[1]);
        part[3] = parseFloat(part[3]);
        const result = part[2] === '×' ? this.multiply(part[1], part[3]) : this.divide(part[1], part[3]);
        if (
          formula[part.index - 1] &&
          ((part[1] >= 0 && part[3] >= 0) || (part[1] < 0 && part[3] < 0))
        ) {
          formula = formula.replace(part[0], `+${result}`);
        }
        formula = formula.replace(part[0], result);
        return resolve.multiplyOrDivide(formula, stack);
      }

      const next = stack.pop();
      return next(formula, stack);
    };

    resolve.sumOrSubtract = (prevFormula, prevStack) => {
      const stack = prevStack.slice();
      let formula = prevFormula;
      // eslint-disable-next-line
      let part;

      // get parts to sum or subtract
      part = formula.match(/([+-]?\d+(?:\.\d+)?)(\+|-)([+-]?\d+(?:\.\d+)?)/u);
      if (part) {
        part = [ part[0], parseFloat(part[1]), part[2], parseFloat(part[3]) ];
        const result = part[2] === '+' ? this.sum(part[1], part[3]) : this.subtract(part[1], part[3]);
        formula = formula.replace(part[0], result);
        return resolve.sumOrSubtract(formula, stack);
      }

      const next = stack.pop();
      return next(formula, stack);
    };

    resolve.format = (formula) => {
      return this.format(formula);
    };

    const stack = [
      resolve.parenthesis,
      resolve.power,
      resolve.sqrt,
      resolve.percentage,
      resolve.multiplyOrDivide,
      resolve.sumOrSubtract,
      resolve.format,
    ].reverse();
    const next = stack.pop();

    return next(this.parse(userFormula), stack);
  }

  static divide(a, b) {
    if (this.isNumber(a) === true && this.isNumber(b) === true && b !== 0) {
      return parseFloat((a / b).toFixed(8));
    }
    throw new SyntaxError(`It's impossible divide ${a} by ${b}`);
  }

  static format(prevNumber, prevDecimal) {
    const number = prevNumber || prevNumber === 0 ? prevNumber : NaN;
    const decimal = prevDecimal || 8;
    return parseFloat(Number(number).toFixed(decimal));
  }

  static isNumber(number) {
    let answer = true;
    if (isNaN(number) || (typeof number !== 'number')) {
      answer = NaN;
    }
    if (!isFinite(number)) {
      answer = Infinity;
    }
    return answer;
  }

  static multiply(a, b) {
    if (this.isNumber(a) === true && this.isNumber(b) === true) {
      return parseFloat((a * b).toFixed(8));
    }
    throw new SyntaxError(`It's impossible multiply ${a} by ${b}`);
  }

  static parse(prevFormula) {
    let formula = prevFormula;
    if (typeof formula !== 'string' || formula === '') {
      throw new SyntaxError('Calc.parse: Invalid parameter');
    }

    if (formula.search(/[^0-9()+\-×÷%.^√π]/ug) >= 0) {
      throw new SyntaxError(`Calc.parse: Formula has invalid characters ${formula.replace(/[0-9()+\-×÷%.^√π]/ug, '')}`);
    }

    let parenthesisOpens = formula.match(/[(]/ug);
    let parenthesisCloses = formula.match(/[)]/ug);

    if (
      (parenthesisOpens && parenthesisCloses && parenthesisOpens.length !== parenthesisCloses.length) ||
      (parenthesisOpens && !parenthesisCloses) || (!parenthesisOpens && parenthesisCloses)
    ) {
      throw new SyntaxError('Calc.parse: Divergence between parenthesis');
    }

    parenthesisOpens = 0;
    parenthesisCloses = 0;
    for (const index in formula) {
      if (formula[index] === '(') {
        parenthesisOpens += 1;
      } else if (formula[index] === ')') {
        parenthesisCloses += 1;
        if (parenthesisOpens < parenthesisCloses) {
          throw new SyntaxError('Calc.parse: Divergence between parenthesis');
        }
      }
    }

    // Replacing symbol π to number
    formula = formula.replace(/π/ug, this.format(Math.PI));

    // get errors of arithmetic combination of characters
    // eslint-disable-next-line
    if (formula.match(/^[×÷%).]|\+[×÷%).]|-[×÷%).]|×[×÷%).]|÷[×÷%).]|%[0-9%(.]|\([×÷%).]|\)[.]|\.[+\-×÷%().]|\.\d+\.|[+\-×÷(.]$/ug)) {
      throw new SyntaxError('invalid arithmetic combination of characters');
    }

    return formula;
  }

  static percentage(a, b = 1) {
    // b = this.isNumber(b) === true ? b : b;
    if (this.isNumber(a) === true && this.isNumber(b) === true) {
      return parseFloat((a / 100 * b).toFixed(8));
    }
    throw new SyntaxError(`It's impossible calculate percentage of ${a}`);
  }

  static power(a, b) {
    let result = a;
    let times = Math.abs(b);

    if (this.isNumber(a) !== true || this.isNumber(b) !== true || (a === 0 && b < 0)) {
      throw new SyntaxError(`It's impossible calculate power of ${a}`);
    }

    // b is float?
    if (b % 1 !== 0) return this.format(a ** b);
    if (a === 0 && b > 0) return 0;
    if (b === 0) return 1;
    if (b === 1) return a;

    while (times > 1) {
      result = this.multiply(result, a);
      times -= 1;
    }

    if (b < 0) {
      result = this.divide(1, result);
    }
    return this.format(result);
  }

  static sqrt(number) {
    return this.format(Math.sqrt(number));
  }

  static subtract(a, b) {
    if (this.isNumber(a) === true && this.isNumber(b) === true) {
      return parseFloat((a - b).toFixed(8));
    }
    throw new SyntaxError(`It's impossible subtract ${a} by ${b}`);
  }

  static sum(a, b) {
    if (this.isNumber(a) === true && this.isNumber(b) === true) {
      return parseFloat((a + b).toFixed(8));
    }
    throw new SyntaxError(`It's impossible sum ${a} by ${b}`);
  }
}

export default Calc;
