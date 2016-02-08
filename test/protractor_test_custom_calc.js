describe('Calc', function () {
  browser.ignoreSynchronization = true;
  browser.get('http://localhost:3000/');

  it('click on menu item Custom', function () {
    $('.link-custom').click();
  });

  describe('Custom', function () {

    var custom = {};
    custom.display = $('.calc-custom .display');
    custom.number1 = $('.calc-custom .btn[data-name="number1"]');
    custom.number2 = $('.calc-custom .btn[data-name="number2"]');
    custom.number3 = $('.calc-custom .btn[data-name="number3"]');
    custom.number4 = $('.calc-custom .btn[data-name="number4"]');
    custom.number5 = $('.calc-custom .btn[data-name="number5"]');
    custom.number6 = $('.calc-custom .btn[data-name="number6"]');
    custom.number7 = $('.calc-custom .btn[data-name="number7"]');
    custom.number8 = $('.calc-custom .btn[data-name="number8"]');
    custom.number9 = $('.calc-custom .btn[data-name="number9"]');
    custom.number0 = $('.calc-custom .btn[data-name="number0"]');
    custom.dot = $('.calc-custom .btn[data-name="dot"]');
    custom.addition = $('.calc-custom .btn[data-name="addition"]');
    custom.subtraction = $('.calc-custom .btn[data-name="subtraction"]');
    custom.multiplication = $('.calc-custom .btn[data-name="multiplication"]');
    custom.division = $('.calc-custom .btn[data-name="division"]');
    custom.parenthesisOpen = $('.calc-custom .btn[data-name="parenthesisOpen"]');
    custom.parenthesisClose = $('.calc-custom .btn[data-name="parenthesisClose"]');
    custom.equality = $('.calc-custom .btn[data-name="equality"]');
    custom.delete = $('.calc-custom .btn[data-name="delete"]');
    custom.clear = $('.calc-custom .btn[data-name="clear"]');
    custom.memoryAdd = $('.calc-custom .btn[data-name="madd"]');
    custom.memorySubtract = $('.calc-custom .btn[data-name="msubtract"]');
    custom.memoryClear = $('.calc-custom .btn[data-name="mclear"]');
    custom.memoryRecall = $('.calc-custom .btn[data-name="mrecall"]');
    custom.percentage = $('.calc-custom .btn[data-name="percentage"]');
    custom.power = $('.calc-custom .btn[data-name="power"]');
    custom.sqrt = $('.calc-custom .btn[data-name="sqrt"]');
    custom.pi = $('.calc-custom .btn[data-name="pi"]');

    beforeEach(function () {
      custom.clear.click();
    });

    describe('Click on button', function () {
      it('number 1', function () {
        custom.number1.click()
        .then(function () { return custom.display.getText(); })
        .then(function (text) { expect(text).toEqual('1'); });
      });
      it('number 2', function () {
        custom.number2.click()
        .then(function () { return custom.display.getText(); })
        .then(function (text) { expect(text).toEqual('2'); });
      });
      it('number 3', function () {
        custom.number3.click()
        .then(function () { return custom.display.getText(); })
        .then(function (text) { expect(text).toEqual('3'); });
      });
      it('number 4', function () {
        custom.number4.click()
        .then(function () { return custom.display.getText(); })
        .then(function (text) { expect(text).toEqual('4'); });
      });
      it('number 5', function () {
        custom.number5.click()
        .then(function () { return custom.display.getText(); })
        .then(function (text) { expect(text).toEqual('5'); });
      });
      it('number 6', function () {
        custom.number6.click()
        .then(function () { return custom.display.getText(); })
        .then(function (text) { expect(text).toEqual('6'); });
      });
      it('number 7', function () {
        custom.number7.click()
        .then(function () { return custom.display.getText(); })
        .then(function (text) { expect(text).toEqual('7'); });
      });
      it('number 8', function () {
        custom.number8.click()
        .then(function () { return custom.display.getText(); })
        .then(function (text) { expect(text).toEqual('8'); });
      });
      it('number 9', function () {
        custom.number9.click()
        .then(function () { return custom.display.getText(); })
        .then(function (text) { expect(text).toEqual('9'); });
      });
      it('number 0', function () {
        custom.number0.click()
        .then(function () { return custom.display.getText(); })
        .then(function (text) { expect(text).toEqual('0'); });
      });
      it('dot', function () {
        custom.number1.click()
        .then(function () { custom.dot.click(); })
        .then(function () { return custom.display.getText(); })
        .then(function (text) { expect(text).toEqual('1.'); });
      });
      it('addition', function () {
        custom.number2.click()
        .then(function () { custom.addition.click(); })
        .then(function () { return custom.display.getText(); })
        .then(function (text) { expect(text).toEqual('2+'); });
      });
      it('parenthesis open', function () {
        custom.number2.click()
        .then(function () { custom.parenthesisOpen.click(); })
        .then(function () { return custom.display.getText(); })
        .then(function (text) { expect(text).toEqual('2×('); });
      });
      it('parenthesis close', function () {
        custom.parenthesisOpen.click()
        .then(function () { custom.number2.click(); })
        .then(function () { custom.parenthesisClose.click(); })
        .then(function () { return custom.display.getText(); })
        .then(function (text) { expect(text).toEqual('(2)'); });
      });
      it('clear', function () {
        custom.number3.click()
        .then(function () { custom.clear.click(); })
        .then(function () { return custom.display.getText(); })
        .then(function (text) { expect(text).toEqual(''); });
      });
      it('delete', function () {
        custom.number4.click()
        .then(function () { custom.number4.click(); })
        .then(function () { custom.delete.click(); })
        .then(function () { return custom.display.getText(); })
        .then(function (text) { expect(text).toEqual('4'); });
      });
      it('percentage', function () {
        custom.number5.click()
        .then(function () { custom.percentage.click(); })
        .then(function () { return custom.display.getText(); })
        .then(function (text) { expect(text).toEqual('5%'); });
      });
    });

    describe('Rules to insert dot', function () {
      it('is an error insert a dot after another dot', function () {
        custom.number1.click()
        .then(function () { custom.dot.click(); })
        .then(function () { custom.dot.click(); })
        .then(function () { return custom.display.getText(); })
        .then(function (text) { expect(text).toEqual('1.'); });
      });
      it('is an error insert a dot in a number that has a dot', function () {
        custom.number1.click()
        .then(function () { custom.dot.click(); })
        .then(function () { custom.number2.click(); })
        .then(function () { custom.number3.click(); })
        .then(function () { custom.dot.click(); })
        .then(function () { return custom.display.getText(); })
        .then(function (text) { expect(text).toEqual('1.23'); });
      });
      it('is an error insert a dot after addition', function () {
        custom.number1.click()
        .then(function () { custom.addition.click(); })
        .then(function () { custom.dot.click(); })
        .then(function () { return custom.display.getText(); })
        .then(function (text) { expect(text).toEqual('1+'); });
      });
      it('is an error insert a dot after subtraction', function () {
        custom.number1.click()
        .then(function () { custom.subtraction.click(); })
        .then(function () { custom.dot.click(); })
        .then(function () { return custom.display.getText(); })
        .then(function (text) { expect(text).toEqual('1-'); });
      });
      it('is an error insert a dot after multiplication', function () {
        custom.number1.click()
        .then(function () { custom.multiplication.click(); })
        .then(function () { custom.dot.click(); })
        .then(function () { return custom.display.getText(); })
        .then(function (text) { expect(text).toEqual('1×'); });
      });
      it('is an error insert a dot after division', function () {
        custom.number1.click()
        .then(function () { custom.division.click(); })
        .then(function () { custom.dot.click(); })
        .then(function () { return custom.display.getText(); })
        .then(function (text) { expect(text).toEqual('1÷'); });
      });
      it('is an error insert a dot after parenthesis open', function () {
        custom.parenthesisOpen.click()
        .then(function () { custom.dot.click(); })
        .then(function () { return custom.display.getText(); })
        .then(function (text) { expect(text).toEqual('('); });
      });
      it('is an error insert a dot after parenthesis close', function () {
        custom.parenthesisOpen.click()
        .then(function () { custom.number2.click(); })
        .then(function () { custom.parenthesisClose.click(); })
        .then(function () { custom.dot.click(); })
        .then(function () { return custom.display.getText(); })
        .then(function (text) { expect(text).toEqual('(2)'); });
      });
      it('is an error insert a dot after percentage', function () {
        custom.number3.click()
        .then(function () { custom.percentage.click(); })
        .then(function () { custom.dot.click(); })
        .then(function () { return custom.display.getText(); })
        .then(function (text) { expect(text).toEqual('3%'); });
      });
      it('is an error insert a dot after power symbol', function () {
        custom.number4.click()
        .then(function () { custom.power.click(); })
        .then(function () { custom.dot.click(); })
        .then(function () { return custom.display.getText(); })
        .then(function (text) { expect(text).toEqual('4^'); });
      });
      it('is an error insert a dot after square root', function () {
        custom.number5.click()
        .then(function () { custom.sqrt.click(); })
        .then(function () { custom.dot.click(); })
        .then(function () { return custom.display.getText(); })
        .then(function (text) { expect(text).toEqual('5×√'); });
      });
      it('is an error insert a dot after PI', function () {
        custom.pi.click()
        .then(function () { custom.dot.click(); })
        .then(function () { return custom.display.getText(); })
        .then(function (text) { expect(text).toEqual('π'); });
      });
    });

    describe('Rules to insert addition', function () {
      it('should replace character subtraction to addition', function () {
        custom.number2.click()
        .then(function () { custom.subtraction.click(); })
        .then(function () { custom.addition.click(); })
        .then(function () { return custom.display.getText(); })
        .then(function (text) { expect(text).toEqual('2+'); });
      });
      it('should replace character multiplication to addition', function () {
        custom.number2.click()
        .then(function () { custom.multiplication.click(); })
        .then(function () { custom.addition.click(); })
        .then(function () { return custom.display.getText(); })
        .then(function (text) { expect(text).toEqual('2+'); });
      });
      it('should replace character division to addition', function () {
        custom.number2.click()
        .then(function () { custom.division.click(); })
        .then(function () { custom.addition.click(); })
        .then(function () { return custom.display.getText(); })
        .then(function (text) { expect(text).toEqual('2+'); });
      });
      it('insert addition after another addition should replace the old one', function () {
        custom.number2.click()
        .then(function () { custom.addition.click(); })
        .then(function () { custom.addition.click(); })
        .then(function () { return custom.display.getText(); })
        .then(function (text) { expect(text).toEqual('2+'); });
      });
      it('should insert addition after parenthesis open', function () {
        custom.parenthesisOpen.click()
        .then(function () { custom.addition.click(); })
        .then(function () { return custom.display.getText(); })
        .then(function (text) { expect(text).toEqual('(+'); });
      });
      it('is an error insert addition after dot', function () {
        custom.number2.click()
        .then(function () { custom.dot.click(); })
        .then(function () { custom.addition.click(); })
        .then(function () { return custom.display.getText(); })
        .then(function (text) { expect(text).toEqual('2.'); });
      });
    });

    describe('Rules to insert subtraction', function () {
      it('should insert subtraction after parenthesis open', function () {
        custom.parenthesisOpen.click()
        .then(function () { custom.subtraction.click(); })
        .then(function () { return custom.display.getText(); })
        .then(function (text) { expect(text).toEqual('(-'); });
      });
      it('should replace character addition to subtraction', function () {
        custom.number3.click()
        .then(function () { custom.addition.click(); })
        .then(function () { custom.subtraction.click(); })
        .then(function () { return custom.display.getText(); })
        .then(function (text) { expect(text).toEqual('3-'); });
      });
      it('should replace character multiplication to subtraction', function () {
        custom.number3.click()
        .then(function () { custom.multiplication.click(); })
        .then(function () { custom.subtraction.click(); })
        .then(function () { return custom.display.getText(); })
        .then(function (text) { expect(text).toEqual('3-'); });
      });
      it('should replace character division to subtraction', function () {
        custom.number3.click()
        .then(function () { custom.division.click(); })
        .then(function () { custom.subtraction.click(); })
        .then(function () { return custom.display.getText(); })
        .then(function (text) { expect(text).toEqual('3-'); });
      });
      it('insert subtraction after another subtraction should replace the old one', function () {
        custom.number3.click()
        .then(function () { custom.subtraction.click(); })
        .then(function () { custom.subtraction.click(); })
        .then(function () { return custom.display.getText(); })
        .then(function (text) { expect(text).toEqual('3-'); });
      });
      it('is an error insert subtraction after dot', function () {
        custom.number3.click()
        .then(function () { custom.dot.click(); })
        .then(function () { custom.subtraction.click(); })
        .then(function () { return custom.display.getText(); })
        .then(function (text) { expect(text).toEqual('3.'); });
      });
    });

    describe('Rules to insert multiplication', function () {
      it('should replace character addition to multiplication', function () {
        custom.number4.click()
        .then(function () { custom.addition.click(); })
        .then(function () { custom.multiplication.click(); })
        .then(function () { return custom.display.getText(); })
        .then(function (text) { expect(text).toEqual('4×'); });
      });
      it('should replace character subtraction to multiplication', function () {
        custom.number4.click()
        .then(function () { custom.subtraction.click(); })
        .then(function () { custom.multiplication.click(); })
        .then(function () { return custom.display.getText(); })
        .then(function (text) { expect(text).toEqual('4×'); });
      });
      it('should replace character division to multiplication', function () {
        custom.number4.click()
        .then(function () { custom.division.click(); })
        .then(function () { custom.multiplication.click(); })
        .then(function () { return custom.display.getText(); })
        .then(function (text) { expect(text).toEqual('4×'); });
      });
      it('insert multiplication after another multiplication should replace the old one', function () {
        custom.number4.click()
        .then(function () { custom.multiplication.click(); })
        .then(function () { custom.multiplication.click(); })
        .then(function () { return custom.display.getText(); })
        .then(function (text) { expect(text).toEqual('4×'); });
      });
      it('is an error insert multiplication after parenthesis open', function () {
        custom.parenthesisOpen.click()
        .then(function () { custom.multiplication.click(); })
        .then(function () { return custom.display.getText(); })
        .then(function (text) { expect(text).toEqual('('); });
      });
      it('is an error insert multiplication after dot', function () {
        custom.number4.click()
        .then(function () { custom.dot.click(); })
        .then(function () { custom.multiplication.click(); })
        .then(function () { return custom.display.getText(); })
        .then(function (text) { expect(text).toEqual('4.'); });
      });
      it('is an error insert multiplication after power', function () {
        custom.number4.click()
        .then(function () { custom.power.click(); })
        .then(function () { custom.multiplication.click(); })
        .then(function () { return custom.display.getText(); })
        .then(function (text) { expect(text).toEqual('4^'); });
      });
      it('is an error insert multiplication after square root', function () {
        custom.sqrt.click()
        .then(function () { custom.multiplication.click(); })
        .then(function () { return custom.display.getText(); })
        .then(function (text) { expect(text).toEqual('√'); });
      });
      it('is an error replace character addition to multiplication when before addition has a parenthesis open', function () {
        custom.parenthesisOpen.click()
        .then(function () { custom.addition.click(); })
        .then(function () { custom.multiplication.click(); })
        .then(function () { return custom.display.getText(); })
        .then(function (text) { expect(text).toEqual('(+'); });
      });
      it('is an error replace character addition to multiplication when before addition has a power symbol', function () {
        custom.number4.click()
        .then(function () { custom.power.click(); })
        .then(function () { custom.addition.click(); })
        .then(function () { custom.multiplication.click(); })
        .then(function () { return custom.display.getText(); })
        .then(function (text) { expect(text).toEqual('4^+'); });
      });
      it('is an error replace character addition to multiplication when before addition has a square root symbol', function () {
        custom.sqrt.click()
        .then(function () { custom.addition.click(); })
        .then(function () { custom.multiplication.click(); })
        .then(function () { return custom.display.getText(); })
        .then(function (text) { expect(text).toEqual('√+'); });
      });
      it('is an error replace character subtraction to multiplication when before subtraction has a parenthesis open', function () {
        custom.parenthesisOpen.click()
        .then(function () { custom.subtraction.click(); })
        .then(function () { custom.multiplication.click(); })
        .then(function () { return custom.display.getText(); })
        .then(function (text) { expect(text).toEqual('(-'); });
      });
      it('is an error replace character subtraction to multiplication when before subtraction has a power symbol', function () {
        custom.number4.click()
        .then(function () { custom.power.click(); })
        .then(function () { custom.subtraction.click(); })
        .then(function () { custom.multiplication.click(); })
        .then(function () { return custom.display.getText(); })
        .then(function (text) { expect(text).toEqual('4^-'); });
      });
      it('is an error replace character subtraction to multiplication when before subtraction has a square root symbol', function () {
        custom.sqrt.click()
        .then(function () { custom.subtraction.click(); })
        .then(function () { custom.multiplication.click(); })
        .then(function () { return custom.display.getText(); })
        .then(function (text) { expect(text).toEqual('√-'); });
      });
    });

    describe('Rules to insert division', function () {
      it('should replace character addition to division', function () {
        custom.number5.click()
        .then(function () { custom.addition.click(); })
        .then(function () { custom.division.click(); })
        .then(function () { return custom.display.getText(); })
        .then(function (text) { expect(text).toEqual('5÷'); });
      });
      it('should replace character subtraction to division', function () {
        custom.number5.click()
        .then(function () { custom.subtraction.click(); })
        .then(function () { custom.division.click(); })
        .then(function () { return custom.display.getText(); })
        .then(function (text) { expect(text).toEqual('5÷'); });
      });
      it('should replace character division to division', function () {
        custom.number5.click()
        .then(function () { custom.division.click(); })
        .then(function () { custom.division.click(); })
        .then(function () { return custom.display.getText(); })
        .then(function (text) { expect(text).toEqual('5÷'); });
      });
      it('insert division after another division should replace the old one', function () {
        custom.number5.click()
        .then(function () { custom.division.click(); })
        .then(function () { custom.division.click(); })
        .then(function () { return custom.display.getText(); })
        .then(function (text) { expect(text).toEqual('5÷'); });
      });
      it('is an error insert division after parenthesis open', function () {
        custom.parenthesisOpen.click()
        .then(function () { custom.division.click(); })
        .then(function () { return custom.display.getText(); })
        .then(function (text) { expect(text).toEqual('('); });
      });
      it('is an error insert division after dot', function () {
        custom.number5.click()
        .then(function () { custom.dot.click(); })
        .then(function () { custom.division.click(); })
        .then(function () { return custom.display.getText(); })
        .then(function (text) { expect(text).toEqual('5.'); });
      });
      it('is an error insert division after power', function () {
        custom.number5.click()
        .then(function () { custom.power.click(); })
        .then(function () { custom.division.click(); })
        .then(function () { return custom.display.getText(); })
        .then(function (text) { expect(text).toEqual('5^'); });
      });
      it('is an error insert division after square root', function () {
        custom.sqrt.click()
        .then(function () { custom.division.click(); })
        .then(function () { return custom.display.getText(); })
        .then(function (text) { expect(text).toEqual('√'); });
      });
      it('is an error replace character addition to division when before addition has a parenthesis open', function () {
        custom.parenthesisOpen.click()
        .then(function () { custom.addition.click(); })
        .then(function () { custom.division.click(); })
        .then(function () { return custom.display.getText(); })
        .then(function (text) { expect(text).toEqual('(+'); });
      });
      it('is an error replace character subtraction to division when before subtraction has a parenthesis open', function () {
        custom.parenthesisOpen.click()
        .then(function () { custom.subtraction.click(); })
        .then(function () { custom.division.click(); })
        .then(function () { return custom.display.getText(); })
        .then(function (text) { expect(text).toEqual('(-'); });
      });
      it('is an error replace character subtraction to division when before subtraction has a power symbol', function () {
        custom.number5.click()
        .then(function () { custom.power.click(); })
        .then(function () { custom.subtraction.click(); })
        .then(function () { custom.division.click(); })
        .then(function () { return custom.display.getText(); })
        .then(function (text) { expect(text).toEqual('5^-'); });
      });
      it('is an error replace character subtraction to division when before subtraction has a square root symbol', function () {
        custom.sqrt.click()
        .then(function () { custom.subtraction.click(); })
        .then(function () { custom.division.click(); })
        .then(function () { return custom.display.getText(); })
        .then(function (text) { expect(text).toEqual('√-'); });
      });
    });

    describe('Rules to insert parenthesis open', function () {
      it('is an error insert parenthesis after dot', function () {
        custom.number6.click()
        .then(function () { custom.dot.click(); })
        .then(function () { custom.parenthesisOpen.click(); })
        .then(function () { return custom.display.getText(); })
        .then(function (text) { expect(text).toEqual('6.'); });
      });
      it('should include ×( when inserted after a number', function () {
        custom.number6.click()
        .then(function () { custom.parenthesisOpen.click(); })
        .then(function () { return custom.display.getText(); })
        .then(function (text) { expect(text).toEqual('6×('); });
      });
      it('should include ×( when inserted after a parenthesis close', function () {
        custom.parenthesisOpen.click()
        .then(function () { custom.number6.click(); })
        .then(function () { custom.parenthesisClose.click(); })
        .then(function () { custom.parenthesisOpen.click(); })
        .then(function () { return custom.display.getText(); })
        .then(function (text) { expect(text).toEqual('(6)×('); });
      });
      it('should include ×( when inserted after percentage', function () {
        custom.number6.click()
        .then(function () { custom.percentage.click(); })
        .then(function () { custom.parenthesisOpen.click(); })
        .then(function () { return custom.display.getText(); })
        .then(function (text) { expect(text).toEqual('6%×('); });
      });
      it('should include ×( when inserted after pi', function () {
        custom.pi.click()
        .then(function () { custom.parenthesisOpen.click(); })
        .then(function () { return custom.display.getText(); })
        .then(function (text) { expect(text).toEqual('π×('); });
      });
    });

    describe('Rules to insert parenthesis close', function () {
      it('is an error insert parenthesis after dot', function () {
        custom.number7.click()
        .then(function () { custom.dot.click(); })
        .then(function () { custom.parenthesisClose.click(); })
        .then(function () { return custom.display.getText(); })
        .then(function (text) { expect(text).toEqual('7.'); });
      });
      it('is an error insert parenthesis close after addition', function () {
        custom.parenthesisOpen.click()
        .then(function () { custom.number7.click(); })
        .then(function () { custom.addition.click(); })
        .then(function () { custom.parenthesisClose.click(); })
        .then(function () { return custom.display.getText(); })
        .then(function (text) { expect(text).toEqual('(7+'); });
      });
      it('is an error insert parenthesis close after subtraction', function () {
        custom.parenthesisOpen.click()
        .then(function () { custom.number7.click(); })
        .then(function () { custom.subtraction.click(); })
        .then(function () { custom.parenthesisClose.click(); })
        .then(function () { return custom.display.getText(); })
        .then(function (text) { expect(text).toEqual('(7-'); });
      });
      it('is an error insert parenthesis close after multiplication', function () {
        custom.parenthesisOpen.click()
        .then(function () { custom.number7.click(); })
        .then(function () { custom.multiplication.click(); })
        .then(function () { custom.parenthesisClose.click(); })
        .then(function () { return custom.display.getText(); })
        .then(function (text) { expect(text).toEqual('(7×'); });
      });
      it('is an error insert parenthesis close after division', function () {
        custom.parenthesisOpen.click()
        .then(function () { custom.number7.click(); })
        .then(function () { custom.division.click(); })
        .then(function () { custom.parenthesisClose.click(); })
        .then(function () { return custom.display.getText(); })
        .then(function (text) { expect(text).toEqual('(7÷'); });
      });
      it('is an error insert a parenthesis close after a parenthesis open', function () {
        custom.parenthesisOpen.click()
        .then(function () { custom.parenthesisClose.click(); })
        .then(function () { return custom.display.getText(); })
        .then(function (text) { expect(text).toEqual('('); });
      });
      it('is an error insert a parenthesis close after power', function () {
        custom.parenthesisOpen.click()
        .then(function () { custom.number7.click(); })
        .then(function () { custom.power.click(); })
        .then(function () { custom.parenthesisClose.click(); })
        .then(function () { return custom.display.getText(); })
        .then(function (text) { expect(text).toEqual('(7^'); });
      });
      it('is an error insert a parenthesis close after square root', function () {
        custom.parenthesisOpen.click()
        .then(function () { custom.sqrt.click(); })
        .then(function () { custom.parenthesisClose.click(); })
        .then(function () { return custom.display.getText(); })
        .then(function (text) { expect(text).toEqual('(√'); });
      });
      it('is an error insert a parenthesis close that no have a parenthesis open corresponding', function () {
        custom.parenthesisOpen.click()
        .then(function () { custom.number7.click(); })
        .then(function () { custom.parenthesisClose.click(); })
        .then(function () { custom.parenthesisClose.click(); })
        .then(function () { return custom.display.getText(); })
        .then(function (text) { expect(text).toEqual('(7)'); });
      });
    });

    describe('Click on button equality', function () {
      it('expected that 5+5×2×2 by equal to 25', function () {
        custom.number5.click()
        .then(function () { custom.addition.click(); })
        .then(function () { custom.number5.click(); })
        .then(function () { custom.multiplication.click(); })
        .then(function () { custom.number2.click(); })
        .then(function () { custom.multiplication.click(); })
        .then(function () { custom.number2.click(); })
        .then(function () { custom.equality.click(); })
        .then(function () { return custom.display.getText(); })
        .then(function (text) { expect(text).toEqual('25'); });
      });
      it('expected that 10+12÷2÷2 by equal to 13', function () {
        custom.number1.click()
        .then(function () { custom.number0.click(); })
        .then(function () { custom.addition.click(); })
        .then(function () { custom.number1.click(); })
        .then(function () { custom.number2.click(); })
        .then(function () { custom.division.click(); })
        .then(function () { custom.number2.click(); })
        .then(function () { custom.division.click(); })
        .then(function () { custom.number2.click(); })
        .then(function () { custom.equality.click(); })
        .then(function () { return custom.display.getText(); })
        .then(function (text) { expect(text).toEqual('13'); });
      });
      it('expected that 10-2×4÷2×3÷2+1 by equal to 5', function () {
        custom.number1.click()
        .then(function () { custom.number0.click(); })
        .then(function () { custom.subtraction.click(); })
        .then(function () { custom.number2.click(); })
        .then(function () { custom.multiplication.click(); })
        .then(function () { custom.number4.click(); })
        .then(function () { custom.division.click(); })
        .then(function () { custom.number2.click(); })
        .then(function () { custom.multiplication.click(); })
        .then(function () { custom.number3.click(); })
        .then(function () { custom.division.click(); })
        .then(function () { custom.number2.click(); })
        .then(function () { custom.addition.click(); })
        .then(function () { custom.number1.click(); })
        .then(function () { custom.equality.click(); })
        .then(function () { return custom.display.getText(); })
        .then(function (text) { expect(text).toEqual('5'); });
      });
      it('expected that 9+8-7×6÷5+(4-3×(2÷1)+0.1-2.3) by equal to 4.4', function () {
        custom.number9.click()
        .then(function () { custom.addition.click(); })
        .then(function () { custom.number8.click(); })
        .then(function () { custom.subtraction.click(); })
        .then(function () { custom.number7.click(); })
        .then(function () { custom.multiplication.click(); })
        .then(function () { custom.number6.click(); })
        .then(function () { custom.division.click(); })
        .then(function () { custom.number5.click(); })
        .then(function () { custom.addition.click(); })
        .then(function () { custom.parenthesisOpen.click(); })
        .then(function () { custom.number4.click(); })
        .then(function () { custom.subtraction.click(); })
        .then(function () { custom.number3.click(); })
        .then(function () { custom.multiplication.click(); })
        .then(function () { custom.parenthesisOpen.click(); })
        .then(function () { custom.number2.click(); })
        .then(function () { custom.division.click(); })
        .then(function () { custom.number1.click(); })
        .then(function () { custom.parenthesisClose.click(); })
        .then(function () { custom.addition.click(); })
        .then(function () { custom.number0.click(); })
        .then(function () { custom.dot.click(); })
        .then(function () { custom.number1.click(); })
        .then(function () { custom.subtraction.click(); })
        .then(function () { custom.number2.click(); })
        .then(function () { custom.dot.click(); })
        .then(function () { custom.number3.click(); })
        .then(function () { custom.parenthesisClose.click(); })
        .then(function () { custom.equality.click(); })
        .then(function () { return custom.display.getText(); })
        .then(function (text) { expect(text).toEqual('4.4'); });
      });
    });

    describe('Memory buttons', function () {
      it('button memoryRecall should print 0 on screen', function () {
        custom.memoryRecall.click()
        .then(function () { return custom.display.getText(); })
        .then(function (text) { expect(text).toEqual('0'); });
      });
      it('button memoryAdd should sum 10+2 and return 12', function () {
        custom.number1.click()
        .then(function () { custom.number0.click(); })
        .then(function () { custom.memoryAdd.click(); })
        .then(function () { custom.number2.click(); })
        .then(function () { custom.memoryAdd.click(); })
        .then(function () { custom.memoryRecall.click(); })
        .then(function () { return custom.display.getText(); })
        .then(function (text) { expect(text).toEqual('12'); });
      });
      it('button memorySubtract should subtract 12-3 and return 9', function () {
        custom.number3.click()
        .then(function () { custom.memorySubtract.click(); })
        .then(function () { custom.memoryRecall.click(); })
        .then(function () { return custom.display.getText(); })
        .then(function (text) { expect(text).toEqual('9'); });
      });
      it('button memoryClear should print 0 on screen', function () {
        custom.memoryClear.click()
        .then(function () { custom.memoryRecall.click(); })
        .then(function () { return custom.display.getText(); })
        .then(function (text) { expect(text).toEqual('0'); });
      });
      it('button memoryAdd should return an error when is added a formula', function () {
        custom.memoryClear.click()
        .then(function () { custom.clear.click(); })
        .then(function () { custom.number1.click(); })
        .then(function () { custom.number0.click(); })
        .then(function () { custom.memoryAdd.click(); })
        .then(function () { custom.number2.click(); })
        .then(function () { custom.addition.click(); })
        .then(function () { custom.number2.click(); })
        .then(function () { custom.memoryAdd.click(); })
        .then(function () { return custom.display.getText(); })
        .then(function (text) { expect(text).toEqual('2+2'); })
        .then(function () { custom.memoryRecall.click(); })
        .then(function () { return custom.display.getText(); })
        .then(function (text) { expect(text).toEqual('10'); });
      });
      it('button memorySubtract should return an error when is subtracted a formula', function () {
        custom.memoryClear.click()
        .then(function () { custom.clear.click(); })
        .then(function () { custom.number5.click(); })
        .then(function () { custom.memorySubtract.click(); })
        .then(function () { custom.number8.click(); })
        .then(function () { custom.subtraction.click(); })
        .then(function () { custom.number3.click(); })
        .then(function () { custom.memorySubtract.click(); })
        .then(function () { return custom.display.getText(); })
        .then(function (text) { expect(text).toEqual('8-3'); })
        .then(function () { custom.memoryRecall.click(); })
        .then(function () { return custom.display.getText(); })
        .then(function (text) { expect(text).toEqual('-5'); });
      });
    });

    describe('Percentage buttons', function () {
      it('is an error insert percentage after dot', function () {
        custom.number3.click()
        .then(function () { custom.dot.click(); })
        .then(function () { custom.percentage.click(); })
        .then(function () { return custom.display.getText(); })
        .then(function (text) { expect(text).toEqual('3.'); });
      });
      it('is an error insert percentage after another percentage', function () {
        custom.number3.click()
        .then(function () { custom.percentage.click(); })
        .then(function () { custom.percentage.click(); })
        .then(function () { return custom.display.getText(); })
        .then(function (text) { expect(text).toEqual('3%'); });
      });
      it('is an error insert percentage after parenthesis open', function () {
        custom.parenthesisOpen.click()
        .then(function () { custom.percentage.click(); })
        .then(function () { return custom.display.getText(); })
        .then(function (text) { expect(text).toEqual('('); });
      });
      it('is an error insert percentage after addition', function () {
        custom.number3.click()
        .then(function () { custom.addition.click(); })
        .then(function () { custom.percentage.click(); })
        .then(function () { return custom.display.getText(); })
        .then(function (text) { expect(text).toEqual('3+'); });
      });
      it('is an error insert percentage after subtract', function () {
        custom.number3.click()
        .then(function () { custom.subtraction.click(); })
        .then(function () { custom.percentage.click(); })
        .then(function () { return custom.display.getText(); })
        .then(function (text) { expect(text).toEqual('3-'); });
      });
      it('is an error insert percentage after multiplication', function () {
        custom.number3.click()
        .then(function () { custom.multiplication.click(); })
        .then(function () { custom.percentage.click(); })
        .then(function () { return custom.display.getText(); })
        .then(function (text) { expect(text).toEqual('3×'); });
      });
      it('is an error insert percentage after division', function () {
        custom.number3.click()
        .then(function () { custom.division.click(); })
        .then(function () { custom.percentage.click(); })
        .then(function () { return custom.display.getText(); })
        .then(function (text) { expect(text).toEqual('3÷'); });
      });
    });

  });
});
