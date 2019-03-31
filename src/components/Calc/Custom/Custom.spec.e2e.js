const config = require('../../../../config/puppeteer.config');

const custom = {};

const getText = element => page.evaluate(el => el.textContent, element);

beforeAll(async () => {
  await page.goto(config.appUrl);

  custom.calcLink = await page.$('.Sidebar .link-custom');
  await custom.calcLink.click();

  custom.display = await page.$('.Custom .display');
  custom.number1 = await page.$('.Custom .btn[data-name="number1"]');
  custom.number2 = await page.$('.Custom .btn[data-name="number2"]');
  custom.number3 = await page.$('.Custom .btn[data-name="number3"]');
  custom.number4 = await page.$('.Custom .btn[data-name="number4"]');
  custom.number5 = await page.$('.Custom .btn[data-name="number5"]');
  custom.number6 = await page.$('.Custom .btn[data-name="number6"]');
  custom.number7 = await page.$('.Custom .btn[data-name="number7"]');
  custom.number8 = await page.$('.Custom .btn[data-name="number8"]');
  custom.number9 = await page.$('.Custom .btn[data-name="number9"]');
  custom.number0 = await page.$('.Custom .btn[data-name="number0"]');
  custom.dot = await page.$('.Custom .btn[data-name="dot"]');
  custom.addition = await page.$('.Custom .btn[data-name="addition"]');
  custom.subtraction = await page.$('.Custom .btn[data-name="subtraction"]');
  custom.multiplication = await page.$('.Custom .btn[data-name="multiplication"]');
  custom.division = await page.$('.Custom .btn[data-name="division"]');
  custom.parenthesisOpen = await page.$('.Custom .btn[data-name="parenthesisOpen"]');
  custom.parenthesisClose = await page.$('.Custom .btn[data-name="parenthesisClose"]');
  custom.equality = await page.$('.Custom .btn[data-name="equality"]');
  custom.delete = await page.$('.Custom .btn[data-name="delete"]');
  custom.clear = await page.$('.Custom .btn[data-name="clear"]');
  custom.memoryAdd = await page.$('.Custom .btn[data-name="madd"]');
  custom.memorySubtract = await page.$('.Custom .btn[data-name="msubtract"]');
  custom.memoryClear = await page.$('.Custom .btn[data-name="mclear"]');
  custom.memoryRecall = await page.$('.Custom .btn[data-name="mrecall"]');
  custom.percentage = await page.$('.Custom .btn[data-name="percentage"]');
  custom.power = await page.$('.Custom .btn[data-name="power"]');
  custom.sqrt = await page.$('.Custom .btn[data-name="sqrt"]');
  custom.pi = await page.$('.Custom .btn[data-name="pi"]');
});

beforeEach(() => custom.clear.click());


describe('Custom', () => {
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

    it('numbers should not be added after parenthesis close', async () => {
      await custom.parenthesisOpen.click();
      await custom.number0.click();
      await custom.parenthesisClose.click();
      await custom.number1.click();
      const display = await getText(custom.display);
      expect(display).toBe('(0)');
    });

    it('numbers should not be added after percentage', async () => {
      await custom.number2.click();
      await custom.percentage.click();
      await custom.number3.click();
      const display = await getText(custom.display);
      expect(display).toBe('2%');
    });

    it('numbers should not be added after pi', async () => {
      await custom.pi.click();
      await custom.number4.click();
      const display = await getText(custom.display);
      expect(display).toBe('π');
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

    it('should not be inserted after parenthesisOpen', async () => {
      await custom.parenthesisOpen.click();
      await custom.dot.click();
      const display = await getText(custom.display);
      expect(display).toBe('(');
    });

    it('should not be inserted after parenthesisClose', async () => {
      await custom.parenthesisOpen.click();
      await custom.number1.click();
      await custom.parenthesisClose.click();
      await custom.dot.click();
      const display = await getText(custom.display);
      expect(display).toBe('(1)');
    });

    it('should not be inserted after percentage', async () => {
      await custom.number2.click();
      await custom.percentage.click();
      await custom.dot.click();
      const display = await getText(custom.display);
      expect(display).toBe('2%');
    });

    it('should not be inserted after power', async () => {
      await custom.number3.click();
      await custom.power.click();
      await custom.dot.click();
      const display = await getText(custom.display);
      expect(display).toBe('3^');
    });

    it('should not be inserted after square root', async () => {
      await custom.sqrt.click();
      await custom.dot.click();
      const display = await getText(custom.display);
      expect(display).toBe('√');
    });

    it('should not be inserted after pi', async () => {
      await custom.pi.click();
      await custom.dot.click();
      const display = await getText(custom.display);
      expect(display).toBe('π');
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

    it('should be inserted after parenthesisOpen', async () => {
      await custom.parenthesisOpen.click();
      await custom.addition.click();
      const display = await getText(custom.display);
      expect(display).toBe('(+');
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

    it('should be inserted after parenthesisOpen', async () => {
      await custom.parenthesisOpen.click();
      await custom.subtraction.click();
      const display = await getText(custom.display);
      expect(display).toBe('(-');
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

    it('should not be inserted after parenthesisOpen', async () => {
      await custom.parenthesisOpen.click();
      await custom.multiplication.click();
      const display = await getText(custom.display);
      expect(display).toBe('(');
    });

    it('should not be inserted after power', async () => {
      await custom.number8.click();
      await custom.power.click();
      await custom.multiplication.click();
      const display = await getText(custom.display);
      expect(display).toBe('8^');
    });

    it('should not be inserted after square root', async () => {
      await custom.sqrt.click();
      await custom.multiplication.click();
      const display = await getText(custom.display);
      expect(display).toBe('√');
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

    it('should not replace character addition to multiplication whe the previous is preceded by parenthesisOpen', async () => {
      await custom.parenthesisOpen.click();
      await custom.addition.click();
      await custom.multiplication.click();
      const display = await getText(custom.display);
      expect(display).toBe('(+');
    });

    it('should not replace character addition to multiplication whe the previous is preceded by power', async () => {
      await custom.number3.click();
      await custom.power.click();
      await custom.addition.click();
      await custom.multiplication.click();
      const display = await getText(custom.display);
      expect(display).toBe('3^+');
    });

    it('should not replace character addition to multiplication whe the previous is preceded by square root', async () => {
      await custom.sqrt.click();
      await custom.addition.click();
      await custom.multiplication.click();
      const display = await getText(custom.display);
      expect(display).toBe('√+');
    });

    it('should not replace character subtraction to multiplication when the previous is the only character', async () => {
      await custom.subtraction.click();
      await custom.multiplication.click();
      const display = await getText(custom.display);
      expect(display).toBe('-');
    });

    it('should not replace character subtraction to multiplication whe the previous is preceded by parenthesisOpen', async () => {
      await custom.parenthesisOpen.click();
      await custom.subtraction.click();
      await custom.multiplication.click();
      const display = await getText(custom.display);
      expect(display).toBe('(-');
    });

    it('should not replace character subtraction to multiplication whe the previous is preceded by power', async () => {
      await custom.number3.click();
      await custom.power.click();
      await custom.subtraction.click();
      await custom.multiplication.click();
      const display = await getText(custom.display);
      expect(display).toBe('3^-');
    });

    it('should not replace character subtraction to multiplication whe the previous is preceded by square root', async () => {
      await custom.sqrt.click();
      await custom.subtraction.click();
      await custom.multiplication.click();
      const display = await getText(custom.display);
      expect(display).toBe('√-');
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

    it('should not be inserted after parenthesisOpen', async () => {
      await custom.parenthesisOpen.click();
      await custom.division.click();
      const display = await getText(custom.display);
      expect(display).toBe('(');
    });

    it('should not be inserted after power', async () => {
      await custom.number8.click();
      await custom.power.click();
      await custom.division.click();
      const display = await getText(custom.display);
      expect(display).toBe('8^');
    });

    it('should not be inserted after square root', async () => {
      await custom.sqrt.click();
      await custom.division.click();
      const display = await getText(custom.display);
      expect(display).toBe('√');
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

    it('should not replace character addition to division whe the previous is preceded by parenthesisOpen', async () => {
      await custom.parenthesisOpen.click();
      await custom.addition.click();
      await custom.division.click();
      const display = await getText(custom.display);
      expect(display).toBe('(+');
    });

    it('should not replace character addition to division whe the previous is preceded by power', async () => {
      await custom.number3.click();
      await custom.power.click();
      await custom.addition.click();
      await custom.division.click();
      const display = await getText(custom.display);
      expect(display).toBe('3^+');
    });

    it('should not replace character addition to division whe the previous is preceded by square root', async () => {
      await custom.sqrt.click();
      await custom.addition.click();
      await custom.division.click();
      const display = await getText(custom.display);
      expect(display).toBe('√+');
    });

    it('should not replace character subtraction to division when the previous is the only character', async () => {
      await custom.subtraction.click();
      await custom.division.click();
      const display = await getText(custom.display);
      expect(display).toBe('-');
    });

    it('should not replace character subtraction to division whe the previous is preceded by parenthesisOpen', async () => {
      await custom.parenthesisOpen.click();
      await custom.subtraction.click();
      await custom.division.click();
      const display = await getText(custom.display);
      expect(display).toBe('(-');
    });

    it('should not replace character subtraction to division whe the previous is preceded by power', async () => {
      await custom.number3.click();
      await custom.power.click();
      await custom.subtraction.click();
      await custom.division.click();
      const display = await getText(custom.display);
      expect(display).toBe('3^-');
    });

    it('should not replace character subtraction to division whe the previous is preceded by square root', async () => {
      await custom.sqrt.click();
      await custom.subtraction.click();
      await custom.division.click();
      const display = await getText(custom.display);
      expect(display).toBe('√-');
    });
  });


  describe('parenthesisOpen button', () => {
    it('should be clickable', async () => {
      await custom.parenthesisOpen.click();
      const display = await getText(custom.display);
      expect(display).toBe('(');
    });

    it('should include × when inserted after numbers', async () => {
      await custom.number0.click();
      await custom.parenthesisOpen.click();
      const display = await getText(custom.display);
      expect(display).toBe('0×(');
    });

    it('should include × when inserted after parenthesisClose', async () => {
      await custom.parenthesisOpen.click();
      await custom.number1.click();
      await custom.parenthesisClose.click();
      await custom.parenthesisOpen.click();
      const display = await getText(custom.display);
      expect(display).toBe('(1)×(');
    });

    it('should include × when inserted after percentage', async () => {
      await custom.number2.click();
      await custom.percentage.click();
      await custom.parenthesisOpen.click();
      const display = await getText(custom.display);
      expect(display).toBe('2%×(');
    });

    it('should include × when inserted after pi', async () => {
      await custom.pi.click();
      await custom.parenthesisOpen.click();
      const display = await getText(custom.display);
      expect(display).toBe('π×(');
    });
  });


  describe('parenthesisClose button', () => {
    it('should be clickable', async () => {
      await custom.parenthesisOpen.click();
      await custom.number0.click();
      await custom.parenthesisClose.click();
      const display = await getText(custom.display);
      expect(display).toBe('(0)');
    });

    it('should not be inserted without a parenthesisOpen available to match', async () => {
      await custom.parenthesisClose.click();
      expect(await getText(custom.display)).toBe('');

      await custom.parenthesisOpen.click();
      await custom.number1.click();
      await custom.parenthesisClose.click();
      await custom.parenthesisClose.click();
      expect(await getText(custom.display)).toBe('(1)');
    });

    it('should not be inserted after parenthesisOpen', async () => {
      await custom.parenthesisOpen.click();
      await custom.parenthesisClose.click();
      const display = await getText(custom.display);
      expect(display).toBe('(');
    });

    it('should not be inserted after dot', async () => {
      await custom.parenthesisOpen.click();
      await custom.number1.click();
      await custom.dot.click();
      await custom.parenthesisClose.click();
      const display = await getText(custom.display);
      expect(display).toBe('(1.');
    });

    it('should not be inserted after addition', async () => {
      await custom.parenthesisOpen.click();
      await custom.addition.click();
      await custom.parenthesisClose.click();
      const display = await getText(custom.display);
      expect(display).toBe('(+');
    });

    it('should not be inserted after subtraction', async () => {
      await custom.parenthesisOpen.click();
      await custom.subtraction.click();
      await custom.parenthesisClose.click();
      const display = await getText(custom.display);
      expect(display).toBe('(-');
    });

    it('should not be inserted after multiplication', async () => {
      await custom.parenthesisOpen.click();
      await custom.number2.click();
      await custom.multiplication.click();
      await custom.parenthesisClose.click();
      const display = await getText(custom.display);
      expect(display).toBe('(2×');
    });

    it('should not be inserted after division', async () => {
      await custom.parenthesisOpen.click();
      await custom.number3.click();
      await custom.division.click();
      await custom.parenthesisClose.click();
      const display = await getText(custom.display);
      expect(display).toBe('(3÷');
    });

    it('should not be inserted after square root', async () => {
      await custom.parenthesisOpen.click();
      await custom.sqrt.click();
      await custom.parenthesisClose.click();
      const display = await getText(custom.display);
      expect(display).toBe('(√');
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

    it('should not calculate when the last character is square root', async () => {
      await custom.sqrt.click();
      await custom.equality.click();
      const display = await getText(custom.display);
      expect(display).toBe('√');
    });

    it('should not calculate when the last character is power', async () => {
      await custom.number3.click();
      await custom.power.click();
      await custom.equality.click();
      const display = await getText(custom.display);
      expect(display).toBe('3^');
    });

    it('should not calculate when the last character is parenthesisOpen', async () => {
      await custom.parenthesisOpen.click();
      await custom.equality.click();
      const display = await getText(custom.display);
      expect(display).toBe('(');
    });
  });


  describe('delete button', () => {
    it('should be clickable', async () => {
      await custom.number0.click();
      await custom.number1.click();
      await custom.delete.click();
      const display = await getText(custom.display);
      expect(display).toBe('0');
    });

    it('should delete the last character at a time', async () => {
      await custom.number2.click();
      await custom.number3.click();
      await custom.number4.click();
      expect(await getText(custom.display)).toBe('234');

      await custom.delete.click();
      expect(await getText(custom.display)).toBe('23');

      await custom.delete.click();
      expect(await getText(custom.display)).toBe('2');

      await custom.delete.click();
      expect(await getText(custom.display)).toBe('');
    });

    it('should do nothing when there is no character to delete', async () => {
      await custom.number5.click();
      expect(await getText(custom.display)).toBe('5');

      await custom.delete.click();
      expect(await getText(custom.display)).toBe('');

      await custom.delete.click();
      expect(await getText(custom.display)).toBe('');
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


  describe('percentage button', () => {
    it('should be clickable', async () => {
      await custom.number9.click();
      await custom.percentage.click();
      const display = await getText(custom.display);
      expect(display).toBe('9%');
    });

    it('should not be inserted after dot', async () => {
      await custom.number8.click();
      await custom.dot.click();
      await custom.percentage.click();
      const display = await getText(custom.display);
      expect(display).toBe('8.');
    });

    it('should not be inserted after addition', async () => {
      await custom.addition.click();
      await custom.percentage.click();
      const display = await getText(custom.display);
      expect(display).toBe('+');
    });

    it('should not be inserted after subtraction', async () => {
      await custom.subtraction.click();
      await custom.percentage.click();
      const display = await getText(custom.display);
      expect(display).toBe('-');
    });

    it('should not be inserted after multiplication', async () => {
      await custom.number7.click();
      await custom.multiplication.click();
      await custom.percentage.click();
      const display = await getText(custom.display);
      expect(display).toBe('7×');
    });

    it('should not be inserted after division', async () => {
      await custom.number6.click();
      await custom.division.click();
      await custom.percentage.click();
      const display = await getText(custom.display);
      expect(display).toBe('6÷');
    });

    it('should not be inserted after parenthesisOpen', async () => {
      await custom.parenthesisOpen.click();
      await custom.percentage.click();
      const display = await getText(custom.display);
      expect(display).toBe('(');
    });

    it('should not be inserted after another percentage', async () => {
      await custom.number7.click();
      await custom.percentage.click();
      await custom.percentage.click();
      const display = await getText(custom.display);
      expect(display).toBe('7%');
    });
  });


  describe('power button', () => {
    it('should be clickable', async () => {
      await custom.number8.click();
      await custom.power.click();
      const display = await getText(custom.display);
      expect(display).toBe('8^');
    });

    it('should be inserted after numbers', async () => {
      await custom.number7.click();
      await custom.power.click();
      const display = await getText(custom.display);
      expect(display).toBe('7^');
    });

    it('should be inserted after pi', async () => {
      await custom.pi.click();
      await custom.power.click();
      const display = await getText(custom.display);
      expect(display).toBe('π^');
    });
  });


  describe('square root button', () => {
    it('should be clickable', async () => {
      await custom.sqrt.click();
      const display = await getText(custom.display);
      expect(display).toBe('√');
    });

    it('should be inserted after addition', async () => {
      await custom.addition.click();
      await custom.sqrt.click();
      const display = await getText(custom.display);
      expect(display).toBe('+√');
    });

    it('should be inserted after subtraction', async () => {
      await custom.subtraction.click();
      await custom.sqrt.click();
      const display = await getText(custom.display);
      expect(display).toBe('-√');
    });

    it('should be inserted after multiplication', async () => {
      await custom.number6.click();
      await custom.multiplication.click();
      await custom.sqrt.click();
      const display = await getText(custom.display);
      expect(display).toBe('6×√');
    });

    it('should be inserted after division', async () => {
      await custom.number5.click();
      await custom.division.click();
      await custom.sqrt.click();
      const display = await getText(custom.display);
      expect(display).toBe('5÷√');
    });

    it('should be inserted after parenthesisOpen', async () => {
      await custom.parenthesisOpen.click();
      await custom.sqrt.click();
      const display = await getText(custom.display);
      expect(display).toBe('(√');
    });

    it('should be inserted after square root', async () => {
      await custom.sqrt.click();
      await custom.sqrt.click();
      const display = await getText(custom.display);
      expect(display).toBe('√√');
    });

    it('should insert ×√ after numbers', async () => {
      await custom.number1.click();
      await custom.sqrt.click();
      const display = await getText(custom.display);
      expect(display).toBe('1×√');
    });

    it('should insert ×√ after parenthesisClose', async () => {
      await custom.parenthesisOpen.click();
      await custom.number2.click();
      await custom.parenthesisClose.click();
      await custom.sqrt.click();
      const display = await getText(custom.display);
      expect(display).toBe('(2)×√');
    });

    it('should insert ×√ after percentage', async () => {
      await custom.number3.click();
      await custom.percentage.click();
      await custom.sqrt.click();
      const display = await getText(custom.display);
      expect(display).toBe('3%×√');
    });

    it('should insert ×√ after pi', async () => {
      await custom.pi.click();
      await custom.sqrt.click();
      const display = await getText(custom.display);
      expect(display).toBe('π×√');
    });
  });


  describe('pi button', () => {
    it('should be clickable', async () => {
      await custom.pi.click();
      const display = await getText(custom.display);
      expect(display).toBe('π');
    });

    it('should not be inserted after numbers', async () => {
      await custom.number0.click();
      await custom.pi.click();
      const display = await getText(custom.display);
      expect(display).toBe('0');
    });

    it('should not be inserted after dot', async () => {
      await custom.number0.click();
      await custom.dot.click();
      await custom.pi.click();
      const display = await getText(custom.display);
      expect(display).toBe('0.');
    });

    it('should not be inserted after percentage', async () => {
      await custom.number2.click();
      await custom.percentage.click();
      await custom.pi.click();
      const display = await getText(custom.display);
      expect(display).toBe('2%');
    });

    it('should not be inserted after pi', async () => {
      await custom.pi.click();
      await custom.pi.click();
      const display = await getText(custom.display);
      expect(display).toBe('π');
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
