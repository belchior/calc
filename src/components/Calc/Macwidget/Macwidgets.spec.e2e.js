const config = require('../../../../config/puppeteer.config');


const macwidget = {};

const getText = element => page.evaluate(el => el.textContent, element);

beforeAll(async () => {
  await page.goto(config.appUrl);

  macwidget.calcLink = await page.$('.Sidebar .link-macwidget');
  await macwidget.calcLink.click();

  macwidget.display = await page.$('.Macwidget .display');
  macwidget.number1 = await page.$('.Macwidget .btn[data-name="number1"]');
  macwidget.number2 = await page.$('.Macwidget .btn[data-name="number2"]');
  macwidget.number3 = await page.$('.Macwidget .btn[data-name="number3"]');
  macwidget.number4 = await page.$('.Macwidget .btn[data-name="number4"]');
  macwidget.number5 = await page.$('.Macwidget .btn[data-name="number5"]');
  macwidget.number6 = await page.$('.Macwidget .btn[data-name="number6"]');
  macwidget.number7 = await page.$('.Macwidget .btn[data-name="number7"]');
  macwidget.number8 = await page.$('.Macwidget .btn[data-name="number8"]');
  macwidget.number9 = await page.$('.Macwidget .btn[data-name="number9"]');
  macwidget.number0 = await page.$('.Macwidget .btn[data-name="number0"]');
  macwidget.dot = await page.$('.Macwidget .btn[data-name="dot"]');
  macwidget.addition = await page.$('.Macwidget .btn[data-name="addition"]');
  macwidget.subtraction = await page.$('.Macwidget .btn[data-name="subtraction"]');
  macwidget.multiplication = await page.$('.Macwidget .btn[data-name="multiplication"]');
  macwidget.division = await page.$('.Macwidget .btn[data-name="division"]');
  macwidget.equality = await page.$('.Macwidget .btn[data-name="equality"]');
  macwidget.clear = await page.$('.Macwidget .btn[data-name="clear"]');
  macwidget.memoryAdd = await page.$('.Macwidget .btn[data-name="madd"]');
  macwidget.memorySubtract = await page.$('.Macwidget .btn[data-name="msubtract"]');
  macwidget.memoryClear = await page.$('.Macwidget .btn[data-name="mclear"]');
  macwidget.memoryRecall = await page.$('.Macwidget .btn[data-name="mrecall"]');
});

beforeEach(() => macwidget.clear.click());


describe('Macwidget', () => {
  describe('number button', () => {
    it('button number0 should be clickable', async () => {
      await macwidget.number0.click();
      const display = await getText(macwidget.display);
      expect(display).toBe('0');
    });

    it('button number1 should be clickable', async () => {
      await macwidget.number1.click();
      const display = await getText(macwidget.display);
      expect(display).toBe('1');
    });

    it('button number2 should be clickable', async () => {
      await macwidget.number2.click();
      const display = await getText(macwidget.display);
      expect(display).toBe('2');
    });

    it('button number3 should be clickable', async () => {
      await macwidget.number3.click();
      const display = await getText(macwidget.display);
      expect(display).toBe('3');
    });

    it('button number4 should be clickable', async () => {
      await macwidget.number4.click();
      const display = await getText(macwidget.display);
      expect(display).toBe('4');
    });

    it('button number5 should be clickable', async () => {
      await macwidget.number5.click();
      const display = await getText(macwidget.display);
      expect(display).toBe('5');
    });

    it('button number6 should be clickable', async () => {
      await macwidget.number6.click();
      const display = await getText(macwidget.display);
      expect(display).toBe('6');
    });

    it('button number7 should be clickable', async () => {
      await macwidget.number7.click();
      const display = await getText(macwidget.display);
      expect(display).toBe('7');
    });

    it('button number8 should be clickable', async () => {
      await macwidget.number8.click();
      const display = await getText(macwidget.display);
      expect(display).toBe('8');
    });

    it('button number9 should be clickable', async () => {
      await macwidget.number9.click();
      const display = await getText(macwidget.display);
      expect(display).toBe('9');
    });
  });


  describe('dot button', () => {
    it('should be clickable', async () => {
      await macwidget.number5.click();
      await macwidget.dot.click();
      const display = await getText(macwidget.display);
      expect(display).toBe('5.');
    });

    it('should be inserted after numbers', async () => {
      await macwidget.number6.click();
      await macwidget.dot.click();
      const display = await getText(macwidget.display);
      expect(display).toBe('6.');
    });

    it('should not be inserted after another dot', async () => {
      await macwidget.number6.click();
      await macwidget.dot.click();
      await macwidget.dot.click();
      const display = await getText(macwidget.display);
      expect(display).toBe('6.');
    });

    it('should not be inserted after a number that has dot', async () => {
      await macwidget.number7.click();
      await macwidget.dot.click();
      await macwidget.number8.click();
      await macwidget.dot.click();
      const display = await getText(macwidget.display);
      expect(display).toBe('7.8');
    });

    it('should not be inserted after addition', async () => {
      await macwidget.addition.click();
      await macwidget.dot.click();
      const display = await getText(macwidget.display);
      expect(display).toBe('+');
    });

    it('should not be inserted after subtraction', async () => {
      await macwidget.subtraction.click();
      await macwidget.dot.click();
      const display = await getText(macwidget.display);
      expect(display).toBe('-');
    });

    it('should not be inserted after multiplication', async () => {
      await macwidget.number9.click();
      await macwidget.multiplication.click();
      await macwidget.dot.click();
      const display = await getText(macwidget.display);
      expect(display).toBe('9×');
    });

    it('should not be inserted after division', async () => {
      await macwidget.number0.click();
      await macwidget.division.click();
      await macwidget.dot.click();
      const display = await getText(macwidget.display);
      expect(display).toBe('0÷');
    });
  });


  describe('addition button', () => {
    it('should be clickable', async () => {
      await macwidget.addition.click();
      const display = await getText(macwidget.display);
      expect(display).toBe('+');
    });

    it('should be inserted after numbers', async () => {
      await macwidget.number6.click();
      await macwidget.addition.click();
      const display = await getText(macwidget.display);
      expect(display).toBe('6+');
    });

    it('added after another addition should replace the old one', async () => {
      await macwidget.addition.click();
      await macwidget.addition.click();
      const display = await getText(macwidget.display);
      expect(display).toBe('+');
    });

    it('should replace character subtraction to addition', async () => {
      await macwidget.subtraction.click();
      await macwidget.addition.click();
      const display = await getText(macwidget.display);
      expect(display).toBe('+');
    });

    it('should replace character multiplication to addition', async () => {
      await macwidget.number4.click();
      await macwidget.multiplication.click();
      await macwidget.addition.click();
      const display = await getText(macwidget.display);
      expect(display).toBe('4+');
    });

    it('should replace character division to addition', async () => {
      await macwidget.number5.click();
      await macwidget.division.click();
      await macwidget.addition.click();
      const display = await getText(macwidget.display);
      expect(display).toBe('5+');
    });

    it('should not be inserted after dot', async () => {
      await macwidget.number7.click();
      await macwidget.dot.click();
      await macwidget.addition.click();
      const display = await getText(macwidget.display);
      expect(display).toBe('7.');
    });
  });


  describe('subtraction button', () => {
    it('should be clickable', async () => {
      await macwidget.subtraction.click();
      const display = await getText(macwidget.display);
      expect(display).toBe('-');
    });

    it('should be inserted after numbers', async () => {
      await macwidget.number6.click();
      await macwidget.subtraction.click();
      const display = await getText(macwidget.display);
      expect(display).toBe('6-');
    });

    it('added after another subtraction should replace the old one', async () => {
      await macwidget.subtraction.click();
      await macwidget.subtraction.click();
      const display = await getText(macwidget.display);
      expect(display).toBe('-');
    });

    it('should replace character addition to subtraction', async () => {
      await macwidget.addition.click();
      await macwidget.subtraction.click();
      const display = await getText(macwidget.display);
      expect(display).toBe('-');
    });

    it('should replace character multiplication to subtraction', async () => {
      await macwidget.number4.click();
      await macwidget.multiplication.click();
      await macwidget.subtraction.click();
      const display = await getText(macwidget.display);
      expect(display).toBe('4-');
    });

    it('should replace character division to subtraction', async () => {
      await macwidget.number5.click();
      await macwidget.division.click();
      await macwidget.subtraction.click();
      const display = await getText(macwidget.display);
      expect(display).toBe('5-');
    });

    it('should not be inserted after dot', async () => {
      await macwidget.number7.click();
      await macwidget.dot.click();
      await macwidget.subtraction.click();
      const display = await getText(macwidget.display);
      expect(display).toBe('7.');
    });
  });


  describe('multiplication button', () => {
    it('should be clickable', async () => {
      await macwidget.number0.click();
      await macwidget.multiplication.click();
      const display = await getText(macwidget.display);
      expect(display).toBe('0×');
    });

    it('should be inserted after numbers', async () => {
      await macwidget.number6.click();
      await macwidget.multiplication.click();
      const display = await getText(macwidget.display);
      expect(display).toBe('6×');
    });

    it('should not be inserted after dot', async () => {
      await macwidget.number7.click();
      await macwidget.dot.click();
      await macwidget.multiplication.click();
      const display = await getText(macwidget.display);
      expect(display).toBe('7.');
    });

    it('added after another multiplication should replace the old one', async () => {
      await macwidget.number1.click();
      await macwidget.multiplication.click();
      await macwidget.multiplication.click();
      const display = await getText(macwidget.display);
      expect(display).toBe('1×');
    });

    it('should replace character addition to multiplication when the previous are preceded by a number', async () => {
      await macwidget.number2.click();
      await macwidget.addition.click();
      await macwidget.multiplication.click();
      const display = await getText(macwidget.display);
      expect(display).toBe('2×');
    });

    it('should replace character subtraction to multiplication when the previous are preceded by a number', async () => {
      await macwidget.number3.click();
      await macwidget.subtraction.click();
      await macwidget.multiplication.click();
      const display = await getText(macwidget.display);
      expect(display).toBe('3×');
    });

    it('should replace character division to multiplication', async () => {
      await macwidget.number4.click();
      await macwidget.division.click();
      await macwidget.multiplication.click();
      const display = await getText(macwidget.display);
      expect(display).toBe('4×');
    });

    it('should not replace character addition to multiplication when the previous is the only character', async () => {
      await macwidget.addition.click();
      await macwidget.multiplication.click();
      const display = await getText(macwidget.display);
      expect(display).toBe('+');
    });

    it('should not replace character subtraction to multiplication when the previous is the only character', async () => {
      await macwidget.subtraction.click();
      await macwidget.multiplication.click();
      const display = await getText(macwidget.display);
      expect(display).toBe('-');
    });
  });


  describe('division button', () => {
    it('should be clickable', async () => {
      await macwidget.number0.click();
      await macwidget.division.click();
      const display = await getText(macwidget.display);
      expect(display).toBe('0÷');
    });

    it('should be inserted after numbers', async () => {
      await macwidget.number6.click();
      await macwidget.division.click();
      const display = await getText(macwidget.display);
      expect(display).toBe('6÷');
    });

    it('should not be inserted after dot', async () => {
      await macwidget.number7.click();
      await macwidget.dot.click();
      await macwidget.division.click();
      const display = await getText(macwidget.display);
      expect(display).toBe('7.');
    });

    it('added after another division should replace the old one', async () => {
      await macwidget.number1.click();
      await macwidget.division.click();
      await macwidget.division.click();
      const display = await getText(macwidget.display);
      expect(display).toBe('1÷');
    });

    it('should replace character addition to division when the previous are preceded by a number', async () => {
      await macwidget.number2.click();
      await macwidget.addition.click();
      await macwidget.division.click();
      const display = await getText(macwidget.display);
      expect(display).toBe('2÷');
    });

    it('should replace character subtraction to division when the previous are preceded by a number', async () => {
      await macwidget.number3.click();
      await macwidget.subtraction.click();
      await macwidget.division.click();
      const display = await getText(macwidget.display);
      expect(display).toBe('3÷');
    });

    it('should replace character multiplication to division', async () => {
      await macwidget.number4.click();
      await macwidget.multiplication.click();
      await macwidget.division.click();
      const display = await getText(macwidget.display);
      expect(display).toBe('4÷');
    });

    it('should not replace character addition to division when the previous is the only character', async () => {
      await macwidget.addition.click();
      await macwidget.division.click();
      const display = await getText(macwidget.display);
      expect(display).toBe('+');
    });

    it('should not replace character subtraction to division when the previous is the only character', async () => {
      await macwidget.subtraction.click();
      await macwidget.division.click();
      const display = await getText(macwidget.display);
      expect(display).toBe('-');
    });
  });


  describe('equality button', () => {
    it('should be clickable', async () => {
      await macwidget.number3.click();
      await macwidget.addition.click();
      await macwidget.number4.click();
      await macwidget.equality.click();
      const display = await getText(macwidget.display);
      expect(display).toBe('7');
    });

    it('should not calculate when the last character is addition', async () => {
      await macwidget.addition.click();
      await macwidget.equality.click();
      const display = await getText(macwidget.display);
      expect(display).toBe('+');
    });

    it('should not calculate when the last character is subtraction', async () => {
      await macwidget.subtraction.click();
      await macwidget.equality.click();
      const display = await getText(macwidget.display);
      expect(display).toBe('-');
    });

    it('should not calculate when the last character is multiplication', async () => {
      await macwidget.number0.click();
      await macwidget.multiplication.click();
      await macwidget.equality.click();
      const display = await getText(macwidget.display);
      expect(display).toBe('0×');
    });

    it('should not calculate when the last character is division', async () => {
      await macwidget.number1.click();
      await macwidget.division.click();
      await macwidget.equality.click();
      const display = await getText(macwidget.display);
      expect(display).toBe('1÷');
    });

    it('should not calculate when the last character is dot', async () => {
      await macwidget.number2.click();
      await macwidget.dot.click();
      await macwidget.equality.click();
      const display = await getText(macwidget.display);
      expect(display).toBe('2.');
    });
  });


  describe('clear button', () => {
    it('should be clickable', async () => {
      await macwidget.number9.click();
      await macwidget.clear.click();
      const display = await getText(macwidget.display);
      expect(display).toBe('');
    });

    it('should clear any formula inserted into display', async () => {
      await macwidget.number9.click();
      await macwidget.addition.click();
      await macwidget.number8.click();
      await macwidget.clear.click();
      const display = await getText(macwidget.display);
      expect(display).toBe('');
    });
  });


  describe('memory add button', () => {
    it('should increase the value in memory with the value at display', async () => {
      await macwidget.memoryClear.click();
      await macwidget.number1.click();
      await macwidget.memoryAdd.click();
      await macwidget.memoryAdd.click();
      await macwidget.memoryRecall.click();
      const display = await getText(macwidget.display);
      expect(display).toBe('2');
    });
  });


  describe('memory subtract button', () => {
    it('should decrease the value in memory with the value at display', async () => {
      await macwidget.memoryClear.click();
      await macwidget.number9.click();
      await macwidget.memoryAdd.click();
      await macwidget.number5.click();
      await macwidget.memorySubtract.click();
      await macwidget.memoryRecall.click();
      const display = await getText(macwidget.display);
      expect(display).toBe('4');
    });
  });


  describe('memory recall button', () => {
    it('should get the value in memory and set at display', async () => {
      await macwidget.memoryClear.click();
      await macwidget.number9.click();
      await macwidget.memoryAdd.click();
      await macwidget.memoryAdd.click();
      await macwidget.memoryRecall.click();
      const display = await getText(macwidget.display);
      expect(display).toBe('18');
    });
  });


  describe('memory clear button', () => {
    it('should set to 0 the value in memory', async () => {
      await macwidget.memoryClear.click();
      await macwidget.number5.click();
      await macwidget.memoryAdd.click();
      await macwidget.memoryAdd.click();
      await macwidget.memoryRecall.click();
      expect(await getText(macwidget.display)).toBe('10');

      await macwidget.memoryClear.click();
      await macwidget.memoryRecall.click();
      expect(await getText(macwidget.display)).toBe('0');
    });
  });
});
