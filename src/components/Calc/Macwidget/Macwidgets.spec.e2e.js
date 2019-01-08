const config = require('../../../../config/puppeteer.config');


let custom = {};

const getText = element => page.evaluate(el => el.textContent, element);

beforeAll(async () => {
  await page.goto(`${config.appUrl}/calc/macwidget`);

  custom.display = await page.$('.Macwidget .display');
  custom.number1 = await page.$('.Macwidget .btn[data-name="number1"]');
  custom.number2 = await page.$('.Macwidget .btn[data-name="number2"]');
  custom.number3 = await page.$('.Macwidget .btn[data-name="number3"]');
  custom.number4 = await page.$('.Macwidget .btn[data-name="number4"]');
  custom.number5 = await page.$('.Macwidget .btn[data-name="number5"]');
  custom.number6 = await page.$('.Macwidget .btn[data-name="number6"]');
  custom.number7 = await page.$('.Macwidget .btn[data-name="number7"]');
  custom.number8 = await page.$('.Macwidget .btn[data-name="number8"]');
  custom.number9 = await page.$('.Macwidget .btn[data-name="number9"]');
  custom.number0 = await page.$('.Macwidget .btn[data-name="number0"]');
  custom.dot = await page.$('.Macwidget .btn[data-name="dot"]');
  custom.addition = await page.$('.Macwidget .btn[data-name="addition"]');
  custom.subtraction = await page.$('.Macwidget .btn[data-name="subtraction"]');
  custom.multiplication = await page.$('.Macwidget .btn[data-name="multiplication"]');
  custom.division = await page.$('.Macwidget .btn[data-name="division"]');
  custom.equality = await page.$('.Macwidget .btn[data-name="equality"]');
  custom.clear = await page.$('.Macwidget .btn[data-name="clear"]');
  custom.memoryAdd = await page.$('.Macwidget .btn[data-name="madd"]');
  custom.memorySubtract = await page.$('.Macwidget .btn[data-name="msubtract"]');
  custom.memoryClear = await page.$('.Macwidget .btn[data-name="mclear"]');
  custom.memoryRecall = await page.$('.Macwidget .btn[data-name="mrecall"]');
});

beforeEach(() => custom.clear.click());


describe('Macwidget', () => {
  describe('number button', () => {
    it('button number0 should be clickable', async () => {
      await custom.number0.click();
      const display = await getText(custom.display);
      expect(display).toBe('0');
    });

    it('button number1 should be clickable', async () => {
      await custom.number1.click();
      const display = await getText(custom.display);
      expect(display).toBe('1');
    });

    it('button number2 should be clickable', async () => {
      await custom.number2.click();
      const display = await getText(custom.display);
      expect(display).toBe('2');
    });

    it('button number3 should be clickable', async () => {
      await custom.number3.click();
      const display = await getText(custom.display);
      expect(display).toBe('3');
    });

    it('button number4 should be clickable', async () => {
      await custom.number4.click();
      const display = await getText(custom.display);
      expect(display).toBe('4');
    });

    it('button number5 should be clickable', async () => {
      await custom.number5.click();
      const display = await getText(custom.display);
      expect(display).toBe('5');
    });

    it('button number6 should be clickable', async () => {
      await custom.number6.click();
      const display = await getText(custom.display);
      expect(display).toBe('6');
    });

    it('button number7 should be clickable', async () => {
      await custom.number7.click();
      const display = await getText(custom.display);
      expect(display).toBe('7');
    });

    it('button number8 should be clickable', async () => {
      await custom.number8.click();
      const display = await getText(custom.display);
      expect(display).toBe('8');
    });

    it('button number9 should be clickable', async () => {
      await custom.number9.click();
      const display = await getText(custom.display);
      expect(display).toBe('9');
    });
  });


  describe('dot button', () => {
    it('should be clickable', async () => {
      await custom.number5.click();
      await custom.dot.click();
      const display = await getText(custom.display);
      expect(display).toBe('5.');
    });

    it('should be inserted after numbers', async () => {
      await custom.number6.click();
      await custom.dot.click();
      const display = await getText(custom.display);
      expect(display).toBe('6.');
    });

    it('should not be inserted after another dot', async () => {
      await custom.number6.click();
      await custom.dot.click();
      await custom.dot.click();
      const display = await getText(custom.display);
      expect(display).toBe('6.');
    });

    it('should not be inserted after a number that has dot', async () => {
      await custom.number7.click();
      await custom.dot.click();
      await custom.number8.click();
      await custom.dot.click();
      const display = await getText(custom.display);
      expect(display).toBe('7.8');
    });

    it('should not be inserted after addition', async () => {
      await custom.addition.click();
      await custom.dot.click();
      const display = await getText(custom.display);
      expect(display).toBe('+');
    });

    it('should not be inserted after subtraction', async () => {
      await custom.subtraction.click();
      await custom.dot.click();
      const display = await getText(custom.display);
      expect(display).toBe('-');
    });

    it('should not be inserted after multiplication', async () => {
      await custom.number9.click();
      await custom.multiplication.click();
      await custom.dot.click();
      const display = await getText(custom.display);
      expect(display).toBe('9×');
    });

    it('should not be inserted after division', async () => {
      await custom.number0.click();
      await custom.division.click();
      await custom.dot.click();
      const display = await getText(custom.display);
      expect(display).toBe('0÷');
    });
  });


  describe('addition button', () => {
    it('should be clickable', async () => {
      await custom.addition.click();
      const display = await getText(custom.display);
      expect(display).toBe('+');
    });

    it('should be inserted after numbers', async () => {
      await custom.number6.click();
      await custom.addition.click();
      const display = await getText(custom.display);
      expect(display).toBe('6+');
    });

    it('added after another addition should replace the old one', async () => {
      await custom.addition.click();
      await custom.addition.click();
      const display = await getText(custom.display);
      expect(display).toBe('+');
    });

    it('should replace character subtraction to addition', async () => {
      await custom.subtraction.click();
      await custom.addition.click();
      const display = await getText(custom.display);
      expect(display).toBe('+');
    });

    it('should replace character multiplication to addition', async () => {
      await custom.number4.click();
      await custom.multiplication.click();
      await custom.addition.click();
      const display = await getText(custom.display);
      expect(display).toBe('4+');
    });

    it('should replace character division to addition', async () => {
      await custom.number5.click();
      await custom.division.click();
      await custom.addition.click();
      const display = await getText(custom.display);
      expect(display).toBe('5+');
    });

    it('should not be inserted after dot', async () => {
      await custom.number7.click();
      await custom.dot.click();
      await custom.addition.click();
      const display = await getText(custom.display);
      expect(display).toBe('7.');
    });
  });


  describe('subtraction button', () => {
    it('should be clickable', async () => {
      await custom.subtraction.click();
      const display = await getText(custom.display);
      expect(display).toBe('-');
    });

    it('should be inserted after numbers', async () => {
      await custom.number6.click();
      await custom.subtraction.click();
      const display = await getText(custom.display);
      expect(display).toBe('6-');
    });

    it('added after another subtraction should replace the old one', async () => {
      await custom.subtraction.click();
      await custom.subtraction.click();
      const display = await getText(custom.display);
      expect(display).toBe('-');
    });

    it('should replace character addition to subtraction', async () => {
      await custom.addition.click();
      await custom.subtraction.click();
      const display = await getText(custom.display);
      expect(display).toBe('-');
    });

    it('should replace character multiplication to subtraction', async () => {
      await custom.number4.click();
      await custom.multiplication.click();
      await custom.subtraction.click();
      const display = await getText(custom.display);
      expect(display).toBe('4-');
    });

    it('should replace character division to subtraction', async () => {
      await custom.number5.click();
      await custom.division.click();
      await custom.subtraction.click();
      const display = await getText(custom.display);
      expect(display).toBe('5-');
    });

    it('should not be inserted after dot', async () => {
      await custom.number7.click();
      await custom.dot.click();
      await custom.subtraction.click();
      const display = await getText(custom.display);
      expect(display).toBe('7.');
    });
  });


  describe('multiplication button', () => {
    it('should be clickable', async () => {
      await custom.number0.click();
      await custom.multiplication.click();
      const display = await getText(custom.display);
      expect(display).toBe('0×');
    });

    it('should be inserted after numbers', async () => {
      await custom.number6.click();
      await custom.multiplication.click();
      const display = await getText(custom.display);
      expect(display).toBe('6×');
    });

    it('should not be inserted after dot', async () => {
      await custom.number7.click();
      await custom.dot.click();
      await custom.multiplication.click();
      const display = await getText(custom.display);
      expect(display).toBe('7.');
    });

    it('added after another multiplication should replace the old one', async () => {
      await custom.number1.click();
      await custom.multiplication.click();
      await custom.multiplication.click();
      const display = await getText(custom.display);
      expect(display).toBe('1×');
    });

    it('should replace character addition to multiplication when the previous are preceded by a number', async () => {
      await custom.number2.click();
      await custom.addition.click();
      await custom.multiplication.click();
      const display = await getText(custom.display);
      expect(display).toBe('2×');
    });

    it('should replace character subtraction to multiplication when the previous are preceded by a number', async () => {
      await custom.number3.click();
      await custom.subtraction.click();
      await custom.multiplication.click();
      const display = await getText(custom.display);
      expect(display).toBe('3×');
    });

    it('should replace character division to multiplication', async () => {
      await custom.number4.click();
      await custom.division.click();
      await custom.multiplication.click();
      const display = await getText(custom.display);
      expect(display).toBe('4×');
    });

    it('should not replace character addition to multiplication when the previous is the only character', async () => {
      await custom.addition.click();
      await custom.multiplication.click();
      const display = await getText(custom.display);
      expect(display).toBe('+');
    });

    it('should not replace character subtraction to multiplication when the previous is the only character', async () => {
      await custom.subtraction.click();
      await custom.multiplication.click();
      const display = await getText(custom.display);
      expect(display).toBe('-');
    });
  });


  describe('division button', () => {
    it('should be clickable', async () => {
      await custom.number0.click();
      await custom.division.click();
      const display = await getText(custom.display);
      expect(display).toBe('0÷');
    });

    it('should be inserted after numbers', async () => {
      await custom.number6.click();
      await custom.division.click();
      const display = await getText(custom.display);
      expect(display).toBe('6÷');
    });

    it('should not be inserted after dot', async () => {
      await custom.number7.click();
      await custom.dot.click();
      await custom.division.click();
      const display = await getText(custom.display);
      expect(display).toBe('7.');
    });

    it('added after another division should replace the old one', async () => {
      await custom.number1.click();
      await custom.division.click();
      await custom.division.click();
      const display = await getText(custom.display);
      expect(display).toBe('1÷');
    });

    it('should replace character addition to division when the previous are preceded by a number', async () => {
      await custom.number2.click();
      await custom.addition.click();
      await custom.division.click();
      const display = await getText(custom.display);
      expect(display).toBe('2÷');
    });

    it('should replace character subtraction to division when the previous are preceded by a number', async () => {
      await custom.number3.click();
      await custom.subtraction.click();
      await custom.division.click();
      const display = await getText(custom.display);
      expect(display).toBe('3÷');
    });

    it('should replace character multiplication to division', async () => {
      await custom.number4.click();
      await custom.multiplication.click();
      await custom.division.click();
      const display = await getText(custom.display);
      expect(display).toBe('4÷');
    });

    it('should not replace character addition to division when the previous is the only character', async () => {
      await custom.addition.click();
      await custom.division.click();
      const display = await getText(custom.display);
      expect(display).toBe('+');
    });

    it('should not replace character subtraction to division when the previous is the only character', async () => {
      await custom.subtraction.click();
      await custom.division.click();
      const display = await getText(custom.display);
      expect(display).toBe('-');
    });
  });


  describe('equality button', () => {
    it('should be clickable', async () => {
      await custom.number3.click();
      await custom.addition.click();
      await custom.number4.click();
      await custom.equality.click();
      const display = await getText(custom.display);
      expect(display).toBe('7');
    });

    it('should not calculate when the last character is addition', async () => {
      await custom.addition.click();
      await custom.equality.click();
      const display = await getText(custom.display);
      expect(display).toBe('+');
    });

    it('should not calculate when the last character is subtraction', async () => {
      await custom.subtraction.click();
      await custom.equality.click();
      const display = await getText(custom.display);
      expect(display).toBe('-');
    });

    it('should not calculate when the last character is multiplication', async () => {
      await custom.number0.click();
      await custom.multiplication.click();
      await custom.equality.click();
      const display = await getText(custom.display);
      expect(display).toBe('0×');
    });

    it('should not calculate when the last character is division', async () => {
      await custom.number1.click();
      await custom.division.click();
      await custom.equality.click();
      const display = await getText(custom.display);
      expect(display).toBe('1÷');
    });

    it('should not calculate when the last character is dot', async () => {
      await custom.number2.click();
      await custom.dot.click();
      await custom.equality.click();
      const display = await getText(custom.display);
      expect(display).toBe('2.');
    });
  });


  describe('clear button', () => {
    it('should be clickable', async () => {
      await custom.number9.click();
      await custom.clear.click();
      const display = await getText(custom.display);
      expect(display).toBe('');
    });

    it('should clear any formula inserted into display', async () => {
      await custom.number9.click();
      await custom.addition.click();
      await custom.number8.click();
      await custom.clear.click();
      const display = await getText(custom.display);
      expect(display).toBe('');
    });
  });


  describe('memory add button', () => {
    it('should increase the value in memory with the value at display', async () => {
      await custom.memoryClear.click();
      await custom.number1.click();
      await custom.memoryAdd.click();
      await custom.memoryAdd.click();
      await custom.memoryRecall.click();
      const display = await getText(custom.display);
      expect(display).toBe('2');
    });
  });


  describe('memory subtract button', () => {
    it('should decrease the value in memory with the value at display', async () => {
      await custom.memoryClear.click();
      await custom.number9.click();
      await custom.memoryAdd.click();
      await custom.number5.click();
      await custom.memorySubtract.click();
      await custom.memoryRecall.click();
      const display = await getText(custom.display);
      expect(display).toBe('4');
    });
  });


  describe('memory recall button', () => {
    it('should get the value in memory and set at display', async () => {
      await custom.memoryClear.click();
      await custom.number9.click();
      await custom.memoryAdd.click();
      await custom.memoryAdd.click();
      await custom.memoryRecall.click();
      const display = await getText(custom.display);
      expect(display).toBe('18');
    });
  });


  describe('memory clear button', () => {
    it('should set to 0 the value in memory', async () => {
      await custom.memoryClear.click();
      await custom.number5.click();
      await custom.memoryAdd.click();
      await custom.memoryAdd.click();
      await custom.memoryRecall.click();
      expect(await getText(custom.display)).toBe('10');

      await custom.memoryClear.click();
      await custom.memoryRecall.click();
      expect(await getText(custom.display)).toBe('0');
    });
  });
});
