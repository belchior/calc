/* eslint jest/valid-expect-in-promise: 0 */
describe ('Calc', function () {
  browser.ignoreSynchronization = true;
  browser.get('http://localhost:3000/');

  it('click on menu item Macwidget', function () {
    $('.link-macwidget').click();
  });

  describe('Macwidget', function () {

    var macwidget = {};
    macwidget.number0 = $('.Macwidget .btn[data-name=number0]');
    macwidget.number1 = $('.Macwidget .btn[data-name=number1]');
    macwidget.number2 = $('.Macwidget .btn[data-name=number2]');
    macwidget.number3 = $('.Macwidget .btn[data-name=number3]');
    macwidget.number4 = $('.Macwidget .btn[data-name=number4]');
    macwidget.number5 = $('.Macwidget .btn[data-name=number5]');
    macwidget.number6 = $('.Macwidget .btn[data-name=number6]');
    macwidget.number7 = $('.Macwidget .btn[data-name=number7]');
    macwidget.number8 = $('.Macwidget .btn[data-name=number8]');
    macwidget.number9 = $('.Macwidget .btn[data-name=number9]');
    macwidget.addition = $('.Macwidget .btn[data-name=addition]');
    macwidget.subtraction = $('.Macwidget .btn[data-name=subtraction]');
    macwidget.multiplication = $('.Macwidget .btn[data-name=multiplication]');
    macwidget.division = $('.Macwidget .btn[data-name=division]');
    macwidget.equality = $('.Macwidget .btn[data-name=equality]');
    macwidget.dot = $('.Macwidget .btn[data-name=dot]');
    macwidget.clear = $('.Macwidget .btn[data-name=clear]');
    macwidget.memoryAdd = $('.Macwidget .btn[data-name=madd]');
    macwidget.memorySubtract = $('.Macwidget .btn[data-name=msubtract]');
    macwidget.memoryClear = $('.Macwidget .btn[data-name=mclear]');
    macwidget.memoryRecall = $('.Macwidget .btn[data-name=mrecall]');
    macwidget.display = $('.Macwidget .display');

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

      // @TODO this test do not represent an aplication rule
      // it('Operator +', function () {
      //   macwidget.number1.click()
      //   .then(function () { macwidget.addition.click(); })
      //   .then(function () { macwidget.number2.click(); })
      //   .then(function () { macwidget.addition.click(); })
      //   .then(function () { return macwidget.display.getText(); })
      //   .then(function (text) { expect(text).toEqual('3'); });
      // });

      // @TODO this test do not represent an aplication rule
      // it('Operator -', function () {
      //   macwidget.number3.click()
      //   .then(function () { macwidget.subtraction.click(); })
      //   .then(function () { macwidget.number4.click(); })
      //   .then(function () { macwidget.subtraction.click(); })
      //   .then(function () { return macwidget.display.getText(); })
      //   .then(function (text) { expect(text).toEqual('-1'); });
      // });

      // @TODO this test do not represent an aplication rule
      // it('Operator ×', function () {
      //   macwidget.number5.click()
      //   .then(function () { macwidget.multiplication.click(); })
      //   .then(function () { macwidget.number6.click(); })
      //   .then(function () { macwidget.multiplication.click(); })
      //   .then(function () { return macwidget.display.getText(); })
      //   .then(function (text) { expect(text).toEqual('30'); });
      // });

      // @TODO this test do not represent an aplication rule
      // it('Operator ÷', function () {
      //   macwidget.number7.click()
      //   .then(function () { macwidget.division.click(); })
      //   .then(function () { macwidget.number8.click(); })
      //   .then(function () { macwidget.division.click(); })
      //   .then(function () { return macwidget.display.getText(); })
      //   .then(function (text) { expect(text).toEqual('0.875'); });
      // });
      it('Equal', function () {
        macwidget.number9.click()
        .then(function () { macwidget.addition.click(); })
        .then(function () { macwidget.number1.click(); })
        .then(function () { macwidget.equality.click(); })
        .then(function () { return macwidget.display.getText(); })
        .then(function (text) { expect(text).toEqual('10'); });
      });
      it('Dot', function () {
        macwidget.number3.click()
        .then(function () { macwidget.dot.click(); })
        .then(function () { macwidget.number4.click(); })
        .then(function () { return macwidget.display.getText(); })
        .then(function (text) { expect(text).toEqual('3.4'); });
      });
      it('Clear', function () {
        macwidget.number1.click()
        .then(function () { macwidget.number2.click(); })
        .then(function () { macwidget.number3.click(); })
        .then(function () { macwidget.clear.click(); })
        .then(function () { return macwidget.display.getText(); })
        .then(function (text) { expect(text).toEqual(''); });
        // The original value are 0
        // .then(function (text) { expect(text).toEqual('0'); });
      });
      // it('Memory Recall', function () {
      //   macwidget.number4.click()
      //   .then(function () { macwidget.memoryRecall.click(); })
      //   .then(function () { return macwidget.display.getText(); })
      //   .then(function (text) { expect(text).toEqual('0'); });
      // });
      // it('Memory Add', function () {
      //   macwidget.number5.click()
      //   .then(function () { macwidget.memoryAdd.click(); })
      //   .then(function () { macwidget.memoryAdd.click(); })
      //   .then(function () { macwidget.memoryRecall.click(); })
      //   .then(function () { return macwidget.display.getText(); })
      //   .then(function (text) { expect(text).toEqual('10'); });
      // });
      // it('Memory Subtract', function () {
      //   macwidget.number5.click()
      //   .then(function () { macwidget.memorySubtract.click(); })
      //   .then(function () { macwidget.memoryRecall.click(); })
      //   .then(function () { return macwidget.display.getText(); })
      //   .then(function (text) { expect(text).toEqual('5'); })
      //
      //   .then(function () { macwidget.number3.click(); })
      //   .then(function () { macwidget.memorySubtract.click(); })
      //   .then(function () { macwidget.memoryRecall.click(); })
      //   .then(function () { return macwidget.display.getText(); })
      //   .then(function (text) { expect(text).toEqual('2'); });
      // });
    });

  });
});
