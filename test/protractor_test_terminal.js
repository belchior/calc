describe ('Calc', function () {
  browser.ignoreSynchronization = true;
  browser.get('http://localhost/calc');

  describe('Terminal', function () {

    var terminal = {};
    terminal.input = $('.calc-terminal .input');
    terminal.output = $('.calc-terminal .output');
    terminal.addition = $('.calc-terminal .btn[data-name=addition]');
    terminal.subtraction = $('.calc-terminal .btn[data-name=subtraction]');
    terminal.multiplication = $('.calc-terminal .btn[data-name=multiplication]');
    terminal.division = $('.calc-terminal .btn[data-name=division]');
    terminal.equality = $('.calc-terminal .btn[data-name=equality]');
    terminal.number0 = $('.calc-terminal .btn[data-name=number0]');
    terminal.number1 = $('.calc-terminal .btn[data-name=number1]');
    terminal.number2 = $('.calc-terminal .btn[data-name=number2]');
    terminal.number3 = $('.calc-terminal .btn[data-name=number3]');
    terminal.number4 = $('.calc-terminal .btn[data-name=number4]');
    terminal.number5 = $('.calc-terminal .btn[data-name=number5]');
    terminal.number6 = $('.calc-terminal .btn[data-name=number6]');
    terminal.number7 = $('.calc-terminal .btn[data-name=number7]');
    terminal.number8 = $('.calc-terminal .btn[data-name=number8]');
    terminal.number9 = $('.calc-terminal .btn[data-name=number9]');
    terminal.backspace = $('.calc-terminal .btn[data-name=backspace]');
    terminal.clear = $('.calc-terminal .btn[data-name=clear]');
    terminal.dot = $('.calc-terminal .btn[data-name=dot]');
    terminal.backspace = $('.calc-terminal .btn[data-name=backspace]');
    terminal.parenthesisOpen = $('.calc-terminal .btn[data-name=parenthesisOpen]');
    terminal.parenthesisClose = $('.calc-terminal .btn[data-name=parenthesisClose]');

    beforeEach(function () {
      terminal.clear.click();
    });

    describe('Click on button', function () {
      it('Number 0', function () {
        terminal.number0.click()
        .then(function () { return terminal.input.getText(); })
        .then(function (text) { expect(text).toEqual('0'); });
      });
      it('Number 1', function () {
        terminal.number1.click()
        .then(function () { return terminal.input.getText(); })
        .then(function (text) { expect(text).toEqual('1'); });
      });
      it('Number 2', function () {
        terminal.number2.click()
        .then(function () { return terminal.input.getText(); })
        .then(function (text) { expect(text).toEqual('2'); });
      });
      it('Number 3', function () {
        terminal.number3.click()
        .then(function () { return terminal.input.getText(); })
        .then(function (text) { expect(text).toEqual('3'); });
      });
      it('Number 4', function () {
        terminal.number4.click()
        .then(function () { return terminal.input.getText(); })
        .then(function (text) { expect(text).toEqual('4'); });
      });
      it('Number 5', function () {
        terminal.number5.click()
        .then(function () { return terminal.input.getText(); })
        .then(function (text) { expect(text).toEqual('5'); });
      });
      it('Number 6', function () {
        terminal.number6.click()
        .then(function () { return terminal.input.getText(); })
        .then(function (text) { expect(text).toEqual('6'); });
      });
      it('Number 7', function () {
        terminal.number7.click()
        .then(function () { return terminal.input.getText(); })
        .then(function (text) { expect(text).toEqual('7'); });
      });
      it('Number 8', function () {
        terminal.number8.click()
        .then(function () { return terminal.input.getText(); })
        .then(function (text) { expect(text).toEqual('8'); });
      });
      it('Number 9', function () {
        terminal.number9.click()
        .then(function () { return terminal.input.getText(); })
        .then(function (text) { expect(text).toEqual('9'); });
      });
      it('Operator +', function () {
        terminal.number1.click()
        .then(function () { terminal.addition.click(); })
        .then(function () { terminal.number2.click(); })
        .then(function () { return terminal.input.getText(); })
        .then(function (text) { expect(text).toEqual('1+2'); });
      });
      it('Operator -', function () {
        terminal.number3.click()
        .then(function () { terminal.subtraction.click(); })
        .then(function () { terminal.number4.click(); })
        .then(function () { return terminal.input.getText(); })
        .then(function (text) { expect(text).toEqual('3-4'); });
      });
      it('Operator ×', function () {
        terminal.number5.click()
        .then(function () { terminal.multiplication.click(); })
        .then(function () { terminal.number6.click(); })
        .then(function () { return terminal.input.getText(); })
        .then(function (text) { expect(text).toEqual('5×6'); });
      });
      it('Operator ÷', function () {
        terminal.number7.click()
        .then(function () { terminal.division.click(); })
        .then(function () { terminal.number8.click(); })
        .then(function () { return terminal.input.getText(); })
        .then(function (text) { expect(text).toEqual('7÷8'); });
      });
      it('Parenthesis Open', function () {
        terminal.parenthesisOpen.click()
        .then(function () { return terminal.input.getText(); })
        .then(function (text) { expect(text).toEqual('('); });
      });
      it('Parenthesis Close', function () {
        terminal.parenthesisOpen.click()
        .then(function () { terminal.number1.click(); })
        .then(function () { terminal.parenthesisClose.click(); })
        .then(function () { return terminal.input.getText(); })
        .then(function (text) { expect(text).toEqual('(1)'); });
      });
      it('Equal', function () {
        terminal.number2.click()
        .then(function () { terminal.equality.click(); })
        .then(function () { return terminal.output.getText(); })
        .then(function (text) { expect(text).toEqual('2'); });
      });
      it('Dot', function () {
        terminal.number3.click()
        .then(function () { terminal.dot.click(); })
        .then(function () { terminal.number4.click(); })
        .then(function () { return terminal.input.getText(); })
        .then(function (text) { expect(text).toEqual('3.4'); });
      });
      it('Backspace', function () {
        terminal.number5.click()
        .then(function () { terminal.number2.click(); })
        .then(function () { terminal.number6.click(); })
        .then(function () { terminal.backspace.click(); })
        .then(function () { terminal.backspace.click(); })
        .then(function () { return terminal.input.getText(); })
        .then(function (text) { expect(text).toEqual('5'); });
      });
      it('Clear', function () {
        terminal.number1.click()
        .then(function () { terminal.addition.click(); })
        .then(function () { terminal.number2.click(); })
        .then(function () { terminal.equality.click(); })
        .then(function () { terminal.number2.click(); })
        .then(function () { terminal.clear.click(); })
        .then(function () { return terminal.input.getText(); })
        .then(function (text) { expect(text).toEqual(''); })

        .then(function () { return terminal.output.getInnerHtml(); })
        .then(function (text) { expect(text).toEqual('<br><br><br>'); });
      });
    });

    describe('Rules for the number buttons', function () {
      it('Must return a error when try to insert a number after Parenthesis Close', function () {
        terminal.parenthesisOpen.click()
        .then(function () { terminal.number2.click(); })
        .then(function () { terminal.parenthesisClose.click(); })
        .then(function () { terminal.number3.click(); })
        .then(function () { return terminal.input.getText(); })
        .then(function (text) { expect(text).toEqual('(2)'); });
      });
    });

    describe('Rules for the dot button', function () {
      it('Must return a error when is clicked on button dot with empty display', function () {
        terminal.dot.click()
        .then(function () { return terminal.input.getText(); })
        .then(function (text) { expect(text).toEqual(''); });
      });
      it('Must return a error when is clicked on button dot after .+-×÷()', function () {
        terminal.number4.click()
        .then(function () { terminal.dot.click(); })
        .then(function () { terminal.dot.click(); })
        .then(function () { return terminal.input.getText(); })
        .then(function (text) { expect(text).toEqual('4.'); })

        .then(function () { terminal.clear.click(); })
        .then(function () { terminal.number4.click(); })
        .then(function () { terminal.addition.click(); })
        .then(function () { terminal.dot.click(); })
        .then(function () { return terminal.input.getText(); })
        .then(function (text) { expect(text).toEqual('4+'); })

        .then(function () { terminal.clear.click(); })
        .then(function () { terminal.number4.click(); })
        .then(function () { terminal.subtraction.click(); })
        .then(function () { terminal.dot.click(); })
        .then(function () { return terminal.input.getText(); })
        .then(function (text) { expect(text).toEqual('4-'); })

        .then(function () { terminal.clear.click(); })
        .then(function () { terminal.number4.click(); })
        .then(function () { terminal.multiplication.click(); })
        .then(function () { terminal.dot.click(); })
        .then(function () { return terminal.input.getText(); })
        .then(function (text) { expect(text).toEqual('4×'); })

        .then(function () { terminal.clear.click(); })
        .then(function () { terminal.number4.click(); })
        .then(function () { terminal.division.click(); })
        .then(function () { terminal.dot.click(); })
        .then(function () { return terminal.input.getText(); })
        .then(function (text) { expect(text).toEqual('4÷'); })

        .then(function () { terminal.clear.click(); })
        .then(function () { terminal.parenthesisOpen.click(); })
        .then(function () { terminal.dot.click(); })
        .then(function () { return terminal.input.getText(); })
        .then(function (text) { expect(text).toEqual('('); })

        .then(function () { terminal.number4.click(); })
        .then(function () { terminal.parenthesisClose.click(); })
        .then(function () { terminal.dot.click(); })
        .then(function () { return terminal.input.getText(); })
        .then(function (text) { expect(text).toEqual('(4)'); });
      });
    });

    describe('Rules for the addition button', function () {
      it('Must replace the following characters +-×÷ by +', function () {
        terminal.number5.click()
        .then(function () { terminal.addition.click(); })
        .then(function () { terminal.addition.click(); })
        .then(function () { return terminal.input.getText(); })
        .then(function (text) { expect(text).toEqual('5+'); })

        .then(function () { terminal.clear.click(); })
        .then(function () { terminal.number5.click(); })
        .then(function () { terminal.subtraction.click(); })
        .then(function () { terminal.addition.click(); })
        .then(function () { return terminal.input.getText(); })
        .then(function (text) { expect(text).toEqual('5+'); })

        .then(function () { terminal.clear.click(); })
        .then(function () { terminal.number5.click(); })
        .then(function () { terminal.multiplication.click(); })
        .then(function () { terminal.addition.click(); })
        .then(function () { return terminal.input.getText(); })
        .then(function (text) { expect(text).toEqual('5+'); })

        .then(function () { terminal.clear.click(); })
        .then(function () { terminal.number5.click(); })
        .then(function () { terminal.division.click(); })
        .then(function () { terminal.addition.click(); })
        .then(function () { return terminal.input.getText(); })
        .then(function (text) { expect(text).toEqual('5+'); });
      });
      it('Must be a error when inserted after dot', function () {
        terminal.number5.click()
        .then(function () { terminal.dot.click(); })
        .then(function () { terminal.addition.click(); })
        .then(function () { return terminal.input.getText(); })
        .then(function (text) { expect(text).toEqual('5.'); });
      });
    });

    describe('Rules for the subtraction button', function () {
      it('Must replace the following characters +-×÷ by -', function () {
        terminal.number6.click()
        .then(function () { terminal.addition.click(); })
        .then(function () { terminal.subtraction.click(); })
        .then(function () { return terminal.input.getText(); })
        .then(function (text) { expect(text).toEqual('6-'); })

        .then(function () { terminal.clear.click(); })
        .then(function () { terminal.number6.click(); })
        .then(function () { terminal.subtraction.click(); })
        .then(function () { terminal.subtraction.click(); })
        .then(function () { return terminal.input.getText(); })
        .then(function (text) { expect(text).toEqual('6-'); })

        .then(function () { terminal.clear.click(); })
        .then(function () { terminal.number6.click(); })
        .then(function () { terminal.multiplication.click(); })
        .then(function () { terminal.subtraction.click(); })
        .then(function () { return terminal.input.getText(); })
        .then(function (text) { expect(text).toEqual('6-'); })

        .then(function () { terminal.clear.click(); })
        .then(function () { terminal.number6.click(); })
        .then(function () { terminal.division.click(); })
        .then(function () { terminal.subtraction.click(); })
        .then(function () { return terminal.input.getText(); })
        .then(function (text) { expect(text).toEqual('6-'); });
      });
      it('Must be a error when is inserted after dot', function () {
        terminal.number6.click()
        .then(function () { terminal.dot.click(); })
        .then(function () { terminal.subtraction.click(); })
        .then(function () { return terminal.input.getText(); })
        .then(function (text) { expect(text).toEqual('6.'); });
      });
    });

    describe('Rules for the multiplication button', function () {
      it('Must be a error when is inserted in an empty input', function () {
        terminal.multiplication.click()
        .then(function () { return terminal.input.getText(); })
        .then(function (text) { expect(text).toEqual(''); });
      });
      it('Must replace the following characters +-×÷ by ×', function () {
        terminal.number7.click()
        .then(function () { terminal.addition.click(); })
        .then(function () { terminal.multiplication.click(); })
        .then(function () { return terminal.input.getText(); })
        .then(function (text) { expect(text).toEqual('7×'); })

        .then(function () { terminal.clear.click(); })
        .then(function () { terminal.number7.click(); })
        .then(function () { terminal.subtraction.click(); })
        .then(function () { terminal.multiplication.click(); })
        .then(function () { return terminal.input.getText(); })
        .then(function (text) { expect(text).toEqual('7×'); })

        .then(function () { terminal.clear.click(); })
        .then(function () { terminal.number7.click(); })
        .then(function () { terminal.multiplication.click(); })
        .then(function () { terminal.multiplication.click(); })
        .then(function () { return terminal.input.getText(); })
        .then(function (text) { expect(text).toEqual('7×'); })

        .then(function () { terminal.clear.click(); })
        .then(function () { terminal.number7.click(); })
        .then(function () { terminal.division.click(); })
        .then(function () { terminal.multiplication.click(); })
        .then(function () { return terminal.input.getText(); })
        .then(function (text) { expect(text).toEqual('7×'); });
      });
      it('Must be a error when is inserted after .(', function () {
        terminal.number7.click()
        .then(function () { terminal.dot.click(); })
        .then(function () { terminal.multiplication.click(); })
        .then(function () { return terminal.input.getText(); })
        .then(function (text) { expect(text).toEqual('7.'); })

        .then(function () { terminal.clear.click(); })
        .then(function () { terminal.number7.click(); })
        .then(function () { terminal.parenthesisOpen.click(); })
        .then(function () { terminal.multiplication.click(); })
        .then(function () { return terminal.input.getText(); })
        .then(function (text) { expect(text).toEqual('7×('); });
      });
    });

    describe('Rules for the division button', function () {
      it('Must be a error when is inserted in an empty input', function () {
        terminal.division.click()
        .then(function () { return terminal.input.getText(); })
        .then(function (text) { expect(text).toEqual(''); });
      });
      it('Must replace the following characters +-×÷ by ÷', function () {
        terminal.number8.click()
        .then(function () { terminal.addition.click(); })
        .then(function () { terminal.division.click(); })
        .then(function () { return terminal.input.getText(); })
        .then(function (text) { expect(text).toEqual('8÷'); })

        .then(function () { terminal.clear.click(); })
        .then(function () { terminal.number8.click(); })
        .then(function () { terminal.subtraction.click(); })
        .then(function () { terminal.division.click(); })
        .then(function () { return terminal.input.getText(); })
        .then(function (text) { expect(text).toEqual('8÷'); })

        .then(function () { terminal.clear.click(); })
        .then(function () { terminal.number8.click(); })
        .then(function () { terminal.multiplication.click(); })
        .then(function () { terminal.division.click(); })
        .then(function () { return terminal.input.getText(); })
        .then(function (text) { expect(text).toEqual('8÷'); })

        .then(function () { terminal.clear.click(); })
        .then(function () { terminal.number8.click(); })
        .then(function () { terminal.division.click(); })
        .then(function () { terminal.division.click(); })
        .then(function () { return terminal.input.getText(); })
        .then(function (text) { expect(text).toEqual('8÷'); });
      });
      it('Must be a error when is inserted after .(', function () {
        terminal.number8.click()
        .then(function () { terminal.dot.click(); })
        .then(function () { terminal.division.click(); })
        .then(function () { return terminal.input.getText(); })
        .then(function (text) { expect(text).toEqual('8.'); })

        .then(function () { terminal.clear.click(); })
        .then(function () { terminal.number8.click(); })
        .then(function () { terminal.parenthesisOpen.click(); })
        .then(function () { terminal.division.click(); })
        .then(function () { return terminal.input.getText(); })
        .then(function (text) { expect(text).toEqual('8×('); });
      });
    });

    describe('Rules for the dot button', function () {
      it('Must be a error when is inserted in an empty input', function () {
        terminal.dot.click()
        .then(function () { return terminal.input.getText(); })
        .then(function (text) { expect(text).toEqual(''); });
      });
      it('Must be a error when is inserted after .+-×÷()', function () {
        terminal.number9.click()
        .then(function () { terminal.dot.click(); })
        .then(function () { terminal.dot.click(); })
        .then(function () { return terminal.input.getText(); })
        .then(function (text) { expect(text).toEqual('9.'); })

        .then(function () { terminal.clear.click(); })
        .then(function () { terminal.number9.click(); })
        .then(function () { terminal.addition.click(); })
        .then(function () { terminal.dot.click(); })
        .then(function () { return terminal.input.getText(); })
        .then(function (text) { expect(text).toEqual('9+'); })

        .then(function () { terminal.clear.click(); })
        .then(function () { terminal.number9.click(); })
        .then(function () { terminal.subtraction.click(); })
        .then(function () { terminal.dot.click(); })
        .then(function () { return terminal.input.getText(); })
        .then(function (text) { expect(text).toEqual('9-'); })

        .then(function () { terminal.clear.click(); })
        .then(function () { terminal.number9.click(); })
        .then(function () { terminal.multiplication.click(); })
        .then(function () { terminal.dot.click(); })
        .then(function () { return terminal.input.getText(); })
        .then(function (text) { expect(text).toEqual('9×'); })

        .then(function () { terminal.clear.click(); })
        .then(function () { terminal.number9.click(); })
        .then(function () { terminal.division.click(); })
        .then(function () { terminal.dot.click(); })
        .then(function () { return terminal.input.getText(); })
        .then(function (text) { expect(text).toEqual('9÷'); })

        .then(function () { terminal.clear.click(); })
        .then(function () { terminal.parenthesisOpen.click(); })
        .then(function () { terminal.dot.click(); })
        .then(function () { return terminal.input.getText(); })
        .then(function (text) { expect(text).toEqual('('); })

        .then(function () { terminal.clear.click(); })
        .then(function () { terminal.parenthesisOpen.click(); })
        .then(function () { terminal.number9.click(); })
        .then(function () { terminal.parenthesisClose.click(); })
        .then(function () { terminal.dot.click(); })
        .then(function () { return terminal.input.getText(); })
        .then(function (text) { expect(text).toEqual('(9)'); });
      });
      it('Must be a error when is inserted a dot in an operand that has a dot', function () {
        terminal.number0.click()
        .then(function () { terminal.dot.click(); })
        .then(function () { terminal.number1.click(); })
        .then(function () { terminal.dot.click(); })
        .then(function () { return terminal.input.getText(); })
        .then(function (text) { expect(text).toEqual('0.1'); });
      });
    });

    describe('Rules for the parenthesis open button', function () {
      it('Must be a error when is inserted after a dot', function () {
        terminal.number1.click()
        .then(function () { terminal.dot.click(); })
        .then(function () { terminal.parenthesisOpen.click(); })
        .then(function () { return terminal.input.getText(); })
        .then(function (text) { expect(text).toEqual('1.'); });
      });
      it('Must be inserted a x( when the last digit are 0-9 or )', function () {
        terminal.number1.click()
        .then(function () { terminal.parenthesisOpen.click(); })
        .then(function () { return terminal.input.getText(); })
        .then(function (text) { expect(text).toEqual('1×('); })

        .then(function () { terminal.number1.click(); })
        .then(function () { terminal.parenthesisClose.click(); })
        .then(function () { terminal.parenthesisOpen.click(); })
        .then(function () { return terminal.input.getText(); })
        .then(function (text) { expect(text).toEqual('1×(1)×('); });
      });
    });

    describe('Rules for the parenthesis close button', function () {
      it('Must insert a parenthesis close after a number like (2', function () {
        terminal.parenthesisOpen.click()
        .then(function () { terminal.number2.click(); })
        .then(function () { terminal.parenthesisClose.click(); })
        .then(function () { return terminal.input.getText(); })
        .then(function (text) { expect(text).toEqual('(2)'); });
      });
      it('Must return a error when is inserted after .+-×÷(', function () {
        terminal.parenthesisOpen.click()
        .then(function () { terminal.number2.click(); })
        .then(function () { terminal.dot.click(); })
        .then(function () { terminal.parenthesisClose.click(); })
        .then(function () { return terminal.input.getText(); })
        .then(function (text) { expect(text).toEqual('(2.'); })

        .then(function () { terminal.clear.click(); })
        .then(function () { terminal.parenthesisOpen.click(); })
        .then(function () { terminal.number2.click(); })
        .then(function () { terminal.addition.click(); })
        .then(function () { terminal.parenthesisClose.click(); })
        .then(function () { return terminal.input.getText(); })
        .then(function (text) { expect(text).toEqual('(2+'); })

        .then(function () { terminal.clear.click(); })
        .then(function () { terminal.parenthesisOpen.click(); })
        .then(function () { terminal.number2.click(); })
        .then(function () { terminal.subtraction.click(); })
        .then(function () { terminal.parenthesisClose.click(); })
        .then(function () { return terminal.input.getText(); })
        .then(function (text) { expect(text).toEqual('(2-'); })

        .then(function () { terminal.clear.click(); })
        .then(function () { terminal.parenthesisOpen.click(); })
        .then(function () { terminal.number2.click(); })
        .then(function () { terminal.multiplication.click(); })
        .then(function () { terminal.parenthesisClose.click(); })
        .then(function () { return terminal.input.getText(); })
        .then(function (text) { expect(text).toEqual('(2×'); })

        .then(function () { terminal.clear.click(); })
        .then(function () { terminal.parenthesisOpen.click(); })
        .then(function () { terminal.number2.click(); })
        .then(function () { terminal.division.click(); })
        .then(function () { terminal.parenthesisClose.click(); })
        .then(function () { return terminal.input.getText(); })
        .then(function (text) { expect(text).toEqual('(2÷'); })

        .then(function () { terminal.clear.click(); })
        .then(function () { terminal.parenthesisOpen.click(); })
        .then(function () { terminal.number2.click(); })
        .then(function () { terminal.parenthesisOpen.click(); })
        .then(function () { terminal.parenthesisClose.click(); })
        .then(function () { return terminal.input.getText(); })
        .then(function (text) { expect(text).toEqual('(2×('); });
      });
      it('Must return a error when is inserted in a empty input', function () {
        terminal.parenthesisClose.click()
        .then(function () { return terminal.input.getText(); })
        .then(function (text) { expect(text).toEqual(''); });
      });
      it('Must return a error when is inserted and didn\'t have a parenthesis open before', function () {
        terminal.number2.click()
        .then(function () { terminal.parenthesisClose.click(); })
        .then(function () { return terminal.input.getText(); })
        .then(function (text) { expect(text).toEqual('2'); });
      });
      it('Must return a error when is inserted more than parenthesis open', function () {
        terminal.parenthesisOpen.click()
        .then(function () { terminal.number2.click(); })
        .then(function () { terminal.multiplication.click(); })
        .then(function () { terminal.parenthesisOpen.click(); })
        .then(function () { terminal.number2.click(); })
        .then(function () { terminal.parenthesisClose.click(); })
        .then(function () { terminal.parenthesisClose.click(); })
        .then(function () { terminal.parenthesisClose.click(); })
        .then(function () { return terminal.input.getText(); })
        .then(function (text) { expect(text).toEqual('(2×(2))'); });
      });
    });
  });
});
