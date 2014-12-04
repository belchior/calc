describe ('Calc', function () {
  browser.ignoreSynchronization = true;
  browser.get('http://localhost/calc');

  describe('Macwidget', function () {
    var macwidget = {};
    macwidget.number0 = $('.calc-macwidget .btn[data-name=number0]');
    macwidget.number1 = $('.calc-macwidget .btn[data-name=number1]');
    macwidget.number2 = $('.calc-macwidget .btn[data-name=number2]');
    macwidget.number3 = $('.calc-macwidget .btn[data-name=number3]');
    macwidget.number4 = $('.calc-macwidget .btn[data-name=number4]');
    macwidget.number5 = $('.calc-macwidget .btn[data-name=number5]');
    macwidget.number6 = $('.calc-macwidget .btn[data-name=number6]');
    macwidget.number7 = $('.calc-macwidget .btn[data-name=number7]');
    macwidget.number8 = $('.calc-macwidget .btn[data-name=number8]');
    macwidget.number9 = $('.calc-macwidget .btn[data-name=number9]');
    // macwidget.addition = $('.calc-macwidget .btn[data-name=addition]');
    // macwidget.subtraction = $('.calc-macwidget .btn[data-name=subtraction]');
    // macwidget.multiplication = $('.calc-macwidget .btn[data-name=multiplication]');
    // macwidget.division = $('.calc-macwidget .btn[data-name=division]');
    // macwidget.equality = $('.calc-macwidget .btn[data-name=equality]');
    // macwidget.dot = $('.calc-macwidget .btn[data-name=dot]');
    macwidget.clear = $('.calc-macwidget .btn[data-name=clear]');
    // macwidget.madd = $('.calc-macwidget .btn[data-name=madd]');
    // macwidget.msubtract = $('.calc-macwidget .btn[data-name=msubtract]');
    // macwidget.mclear = $('.calc-macwidget .btn[data-name=mclear]');
    // macwidget.mrecall = $('.calc-macwidget .btn[data-name=mrecall]');
    macwidget.display = $('.calc-macwidget .display');

    beforeEach(function () {
      macwidget.clear.click();
    });

    describe('Click on button', function () {

      it('Number 0', function () {
        macwidget.number0.click()
        .then(function () { return macwidget.display.getText(); })
        .then(function (text) { expect(text).toEqual('0'); });
      });
      it('Number 1', function () {
        macwidget.number1.click()
        .then(function () { return macwidget.display.getText(); })
        .then(function (text) { expect(text).toEqual('1'); });
      });
      it('Number 2', function () {
        macwidget.number2.click()
        .then(function () { return macwidget.display.getText(); })
        .then(function (text) { expect(text).toEqual('2'); });
      });
      it('Number 3', function () {
        macwidget.number3.click()
        .then(function () { return macwidget.display.getText(); })
        .then(function (text) { expect(text).toEqual('3'); });
      });
      it('Number 4', function () {
        macwidget.number4.click()
        .then(function () { return macwidget.display.getText(); })
        .then(function (text) { expect(text).toEqual('4'); });
      });
      it('Number 5', function () {
        macwidget.number5.click()
        .then(function () { return macwidget.display.getText(); })
        .then(function (text) { expect(text).toEqual('5'); });
      });
      it('Number 6', function () {
        macwidget.number6.click()
        .then(function () { return macwidget.display.getText(); })
        .then(function (text) { expect(text).toEqual('6'); });
      });
      it('Number 7', function () {
        macwidget.number7.click()
        .then(function () { return macwidget.display.getText(); })
        .then(function (text) { expect(text).toEqual('7'); });
      });
      it('Number 8', function () {
        macwidget.number8.click()
        .then(function () { return macwidget.display.getText(); })
        .then(function (text) { expect(text).toEqual('8'); });
      });
      it('Number 9', function () {
        macwidget.number9.click()
        .then(function () { return macwidget.display.getText(); })
        .then(function (text) { expect(text).toEqual('9'); });
      });
      // it('Operator +', function () {
      //   macwidget.number1.click()
      //   .then(function () { macwidget.addition.click(); })
      //   .then(function () { macwidget.number2.click(); })
      //   .then(function () { return macwidget.input.getText(); })
      //   .then(function (text) { expect(text).toEqual('1+2'); });
      // });
      // it('Operator -', function () {
      //   macwidget.number3.click()
      //   .then(function () { macwidget.subtraction.click(); })
      //   .then(function () { macwidget.number4.click(); })
      //   .then(function () { return macwidget.input.getText(); })
      //   .then(function (text) { expect(text).toEqual('3-4'); });
      // });
      // it('Operator x', function () {
      //   macwidget.number5.click()
      //   .then(function () { macwidget.multiplication.click(); })
      //   .then(function () { macwidget.number6.click(); })
      //   .then(function () { return macwidget.input.getText(); })
      //   .then(function (text) { expect(text).toEqual('5x6'); });
      // });
      // it('Operator ÷', function () {
      //   macwidget.number7.click()
      //   .then(function () { macwidget.division.click(); })
      //   .then(function () { macwidget.number8.click(); })
      //   .then(function () { return macwidget.input.getText(); })
      //   .then(function (text) { expect(text).toEqual('7÷8'); });
      // });
      // it('Parenthesis Open', function () {
      //   macwidget.parenthesisOpen.click()
      //   .then(function () { return macwidget.input.getText(); })
      //   .then(function (text) { expect(text).toEqual('('); });
      // });
      // it('Parenthesis Close', function () {
      //   macwidget.parenthesisOpen.click()
      //   .then(function () { macwidget.number1.click(); })
      //   .then(function () { macwidget.parenthesisClose.click(); })
      //   .then(function () { return macwidget.input.getText(); })
      //   .then(function (text) { expect(text).toEqual('(1)'); });
      // });
      // it('Equal', function () {
      //   macwidget.number2.click()
      //   .then(function () { macwidget.equality.click(); })
      //   .then(function () { return macwidget.output.getText(); })
      //   .then(function (text) { expect(text).toEqual('2'); });
      // });
      // it('Dot', function () {
      //   macwidget.number3.click()
      //   .then(function () { macwidget.dot.click(); })
      //   .then(function () { macwidget.number4.click(); })
      //   .then(function () { return macwidget.input.getText(); })
      //   .then(function (text) { expect(text).toEqual('3.4'); });
      // });
      // it('Backspace', function () {
      //   macwidget.number5.click()
      //   .then(function () { macwidget.number2.click(); })
      //   .then(function () { macwidget.number6.click(); })
      //   .then(function () { macwidget.backspace.click(); })
      //   .then(function () { macwidget.backspace.click(); })
      //   .then(function () { return macwidget.input.getText(); })
      //   .then(function (text) { expect(text).toEqual('5'); });
      // });
      it('Clear', function () {
        macwidget.number1.click()
        .then(function () { macwidget.number2.click(); })
        .then(function () { macwidget.number3.click(); })
        .then(function () { macwidget.clear.click(); })
        .then(function () { return macwidget.display.getText(); })
        .then(function (text) { expect(text).toEqual(''); });
      });
    });

  });
});
