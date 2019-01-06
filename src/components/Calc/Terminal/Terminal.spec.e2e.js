const puppeteer = require('puppeteer');
const pti = require('puppeteer-to-istanbul');

const config = require('../../../../e2e.config');


let browser;
let page;
let terminal = {};

const getText = element => page.evaluate(el => el.textContent, element);
const lastOutput = () => page.$('.Terminal output:last-child');
const textFromLastOutput = async () => await getText(await lastOutput());

beforeAll(async () => {
  browser = await puppeteer.launch(config.launchOptions);
  page = await browser.newPage();
  await Promise.all([
    page.coverage.startJSCoverage(),
  ]);

  await page.goto(`${config.appUrl}/calc/terminal`);

  terminal.display = await page.$('.Terminal .display');
  terminal.input = await page.$('.Terminal .display .input');
  terminal.number1 = await page.$('.Terminal .btn[data-name="number1"]');
  terminal.number2 = await page.$('.Terminal .btn[data-name="number2"]');
  terminal.number3 = await page.$('.Terminal .btn[data-name="number3"]');
  terminal.number4 = await page.$('.Terminal .btn[data-name="number4"]');
  terminal.number5 = await page.$('.Terminal .btn[data-name="number5"]');
  terminal.number6 = await page.$('.Terminal .btn[data-name="number6"]');
  terminal.number7 = await page.$('.Terminal .btn[data-name="number7"]');
  terminal.number8 = await page.$('.Terminal .btn[data-name="number8"]');
  terminal.number9 = await page.$('.Terminal .btn[data-name="number9"]');
  terminal.number0 = await page.$('.Terminal .btn[data-name="number0"]');
  terminal.dot = await page.$('.Terminal .btn[data-name="dot"]');
  terminal.addition = await page.$('.Terminal .btn[data-name="addition"]');
  terminal.subtraction = await page.$('.Terminal .btn[data-name="subtraction"]');
  terminal.multiplication = await page.$('.Terminal .btn[data-name="multiplication"]');
  terminal.division = await page.$('.Terminal .btn[data-name="division"]');
  terminal.parenthesisOpen = await page.$('.Terminal .btn[data-name="parenthesisOpen"]');
  terminal.parenthesisClose = await page.$('.Terminal .btn[data-name="parenthesisClose"]');
  terminal.equality = await page.$('.Terminal .btn[data-name="equality"]');
  terminal.delete = await page.$('.Terminal .btn[data-name="delete"]');
  terminal.clear = await page.$('.Terminal .btn[data-name="clear"]');
});

beforeEach(() => terminal.clear.click());

afterAll(async () => {
  const [ jsCoverage ] = await Promise.all([
    page.coverage.stopJSCoverage(),
  ]);
  pti.write(jsCoverage);
  console.log(jsCoverage);
  await browser.close();
});


describe('Terminal', () => {
  describe('number button', () => {
    it('button number0 should be clickable', async () => {
      await terminal.number0.click();
      const input = await getText(terminal.input);
      expect(input).toBe('0');
    });

    it('button number1 should be clickable', async () => {
      await terminal.number1.click();
      const input = await getText(terminal.input);
      expect(input).toBe('1');
    });

    it('button number2 should be clickable', async () => {
      await terminal.number2.click();
      const input = await getText(terminal.input);
      expect(input).toBe('2');
    });

    it('button number3 should be clickable', async () => {
      await terminal.number3.click();
      const input = await getText(terminal.input);
      expect(input).toBe('3');
    });

    it('button number4 should be clickable', async () => {
      await terminal.number4.click();
      const input = await getText(terminal.input);
      expect(input).toBe('4');
    });

    it('button number5 should be clickable', async () => {
      await terminal.number5.click();
      const input = await getText(terminal.input);
      expect(input).toBe('5');
    });

    it('button number6 should be clickable', async () => {
      await terminal.number6.click();
      const input = await getText(terminal.input);
      expect(input).toBe('6');
    });

    it('button number7 should be clickable', async () => {
      await terminal.number7.click();
      const input = await getText(terminal.input);
      expect(input).toBe('7');
    });

    it('button number8 should be clickable', async () => {
      await terminal.number8.click();
      const input = await getText(terminal.input);
      expect(input).toBe('8');
    });

    it('button number9 should be clickable', async () => {
      await terminal.number9.click();
      const input = await getText(terminal.input);
      expect(input).toBe('9');
    });

    it('numbers should not be added after parenthesis close', async () => {
      await terminal.parenthesisOpen.click();
      await terminal.number0.click();
      await terminal.parenthesisClose.click();
      await terminal.number1.click();
      const input = await getText(terminal.input);
      expect(input).toBe('(0)');
    });
  });


  describe('dot button', () => {
    it('should be clickable', async () => {
      await terminal.number5.click();
      await terminal.dot.click();
      const input = await getText(terminal.input);
      expect(input).toBe('5.');
    });

    it('should be inserted after numbers', async () => {
      await terminal.number6.click();
      await terminal.dot.click();
      const input = await getText(terminal.input);
      expect(input).toBe('6.');
    });

    it('should not be inserted after another dot', async () => {
      await terminal.number6.click();
      await terminal.dot.click();
      await terminal.dot.click();
      const input = await getText(terminal.input);
      expect(input).toBe('6.');
    });

    it('should not be inserted after a number that has dot', async () => {
      await terminal.number7.click();
      await terminal.dot.click();
      await terminal.number8.click();
      await terminal.dot.click();
      const input = await getText(terminal.input);
      expect(input).toBe('7.8');
    });

    it('should not be inserted after addition', async () => {
      await terminal.addition.click();
      await terminal.dot.click();
      const input = await getText(terminal.input);
      expect(input).toBe('+');
    });

    it('should not be inserted after subtraction', async () => {
      await terminal.subtraction.click();
      await terminal.dot.click();
      const input = await getText(terminal.input);
      expect(input).toBe('-');
    });

    it('should not be inserted after multiplication', async () => {
      await terminal.number9.click();
      await terminal.multiplication.click();
      await terminal.dot.click();
      const input = await getText(terminal.input);
      expect(input).toBe('9×');
    });

    it('should not be inserted after division', async () => {
      await terminal.number0.click();
      await terminal.division.click();
      await terminal.dot.click();
      const input = await getText(terminal.input);
      expect(input).toBe('0÷');
    });

    it('should not be inserted after parenthesisOpen', async () => {
      await terminal.parenthesisOpen.click();
      await terminal.dot.click();
      const input = await getText(terminal.input);
      expect(input).toBe('(');
    });

    it('should not be inserted after parenthesisClose', async () => {
      await terminal.parenthesisOpen.click();
      await terminal.number1.click();
      await terminal.parenthesisClose.click();
      await terminal.dot.click();
      const input = await getText(terminal.input);
      expect(input).toBe('(1)');
    });
  });


  describe('addition button', () => {
    it('should be clickable', async () => {
      await terminal.addition.click();
      const input = await getText(terminal.input);
      expect(input).toBe('+');
    });

    it('should be inserted after numbers', async () => {
      await terminal.number6.click();
      await terminal.addition.click();
      const input = await getText(terminal.input);
      expect(input).toBe('6+');
    });

    it('added after another addition should replace the old one', async () => {
      await terminal.addition.click();
      await terminal.addition.click();
      const input = await getText(terminal.input);
      expect(input).toBe('+');
    });

    it('should replace character subtraction to addition', async () => {
      await terminal.subtraction.click();
      await terminal.addition.click();
      const input = await getText(terminal.input);
      expect(input).toBe('+');
    });

    it('should replace character multiplication to addition', async () => {
      await terminal.number4.click();
      await terminal.multiplication.click();
      await terminal.addition.click();
      const input = await getText(terminal.input);
      expect(input).toBe('4+');
    });

    it('should replace character division to addition', async () => {
      await terminal.number5.click();
      await terminal.division.click();
      await terminal.addition.click();
      const input = await getText(terminal.input);
      expect(input).toBe('5+');
    });

    it('should be inserted after parenthesisOpen', async () => {
      await terminal.parenthesisOpen.click();
      await terminal.addition.click();
      const input = await getText(terminal.input);
      expect(input).toBe('(+');
    });

    it('should not be inserted after dot', async () => {
      await terminal.number7.click();
      await terminal.dot.click();
      await terminal.addition.click();
      const input = await getText(terminal.input);
      expect(input).toBe('7.');
    });
  });


  describe('subtraction button', () => {
    it('should be clickable', async () => {
      await terminal.subtraction.click();
      const input = await getText(terminal.input);
      expect(input).toBe('-');
    });

    it('should be inserted after numbers', async () => {
      await terminal.number6.click();
      await terminal.subtraction.click();
      const input = await getText(terminal.input);
      expect(input).toBe('6-');
    });

    it('added after another subtraction should replace the old one', async () => {
      await terminal.subtraction.click();
      await terminal.subtraction.click();
      const input = await getText(terminal.input);
      expect(input).toBe('-');
    });

    it('should replace character addition to subtraction', async () => {
      await terminal.addition.click();
      await terminal.subtraction.click();
      const input = await getText(terminal.input);
      expect(input).toBe('-');
    });

    it('should replace character multiplication to subtraction', async () => {
      await terminal.number4.click();
      await terminal.multiplication.click();
      await terminal.subtraction.click();
      const input = await getText(terminal.input);
      expect(input).toBe('4-');
    });

    it('should replace character division to subtraction', async () => {
      await terminal.number5.click();
      await terminal.division.click();
      await terminal.subtraction.click();
      const input = await getText(terminal.input);
      expect(input).toBe('5-');
    });

    it('should be inserted after parenthesisOpen', async () => {
      await terminal.parenthesisOpen.click();
      await terminal.subtraction.click();
      const input = await getText(terminal.input);
      expect(input).toBe('(-');
    });

    it('should not be inserted after dot', async () => {
      await terminal.number7.click();
      await terminal.dot.click();
      await terminal.subtraction.click();
      const input = await getText(terminal.input);
      expect(input).toBe('7.');
    });
  });


  describe('multiplication button', () => {
    it('should be clickable', async () => {
      await terminal.number0.click();
      await terminal.multiplication.click();
      const input = await getText(terminal.input);
      expect(input).toBe('0×');
    });

    it('should be inserted after numbers', async () => {
      await terminal.number6.click();
      await terminal.multiplication.click();
      const input = await getText(terminal.input);
      expect(input).toBe('6×');
    });

    it('should not be inserted after dot', async () => {
      await terminal.number7.click();
      await terminal.dot.click();
      await terminal.multiplication.click();
      const input = await getText(terminal.input);
      expect(input).toBe('7.');
    });

    it('should not be inserted after parenthesisOpen', async () => {
      await terminal.parenthesisOpen.click();
      await terminal.multiplication.click();
      const input = await getText(terminal.input);
      expect(input).toBe('(');
    });

    it('added after another multiplication should replace the old one', async () => {
      await terminal.number1.click();
      await terminal.multiplication.click();
      await terminal.multiplication.click();
      const input = await getText(terminal.input);
      expect(input).toBe('1×');
    });

    it('should replace character addition to multiplication when the previous are preceded by a number', async () => {
      await terminal.number2.click();
      await terminal.addition.click();
      await terminal.multiplication.click();
      const input = await getText(terminal.input);
      expect(input).toBe('2×');
    });

    it('should replace character subtraction to multiplication when the previous are preceded by a number', async () => {
      await terminal.number3.click();
      await terminal.subtraction.click();
      await terminal.multiplication.click();
      const input = await getText(terminal.input);
      expect(input).toBe('3×');
    });

    it('should replace character division to multiplication', async () => {
      await terminal.number4.click();
      await terminal.division.click();
      await terminal.multiplication.click();
      const input = await getText(terminal.input);
      expect(input).toBe('4×');
    });

    it('should not replace character addition to multiplication when the previous is the only character', async () => {
      await terminal.addition.click();
      await terminal.multiplication.click();
      const input = await getText(terminal.input);
      expect(input).toBe('+');
    });

    it('should not replace character addition to multiplication whe the previous is preceded by parenthesisOpen', async () => {
      await terminal.parenthesisOpen.click();
      await terminal.addition.click();
      await terminal.multiplication.click();
      const input = await getText(terminal.input);
      expect(input).toBe('(+');
    });

    it('should not replace character subtraction to multiplication when the previous is the only character', async () => {
      await terminal.subtraction.click();
      await terminal.multiplication.click();
      const input = await getText(terminal.input);
      expect(input).toBe('-');
    });

    it('should not replace character subtraction to multiplication whe the previous is preceded by parenthesisOpen', async () => {
      await terminal.parenthesisOpen.click();
      await terminal.subtraction.click();
      await terminal.multiplication.click();
      const input = await getText(terminal.input);
      expect(input).toBe('(-');
    });
  });


  describe('division button', () => {
    it('should be clickable', async () => {
      await terminal.number0.click();
      await terminal.division.click();
      const input = await getText(terminal.input);
      expect(input).toBe('0÷');
    });

    it('should be inserted after numbers', async () => {
      await terminal.number6.click();
      await terminal.division.click();
      const input = await getText(terminal.input);
      expect(input).toBe('6÷');
    });

    it('should not be inserted after dot', async () => {
      await terminal.number7.click();
      await terminal.dot.click();
      await terminal.division.click();
      const input = await getText(terminal.input);
      expect(input).toBe('7.');
    });

    it('should not be inserted after parenthesisOpen', async () => {
      await terminal.parenthesisOpen.click();
      await terminal.division.click();
      const input = await getText(terminal.input);
      expect(input).toBe('(');
    });

    it('added after another division should replace the old one', async () => {
      await terminal.number1.click();
      await terminal.division.click();
      await terminal.division.click();
      const input = await getText(terminal.input);
      expect(input).toBe('1÷');
    });

    it('should replace character addition to division when the previous are preceded by a number', async () => {
      await terminal.number2.click();
      await terminal.addition.click();
      await terminal.division.click();
      const input = await getText(terminal.input);
      expect(input).toBe('2÷');
    });

    it('should replace character subtraction to division when the previous are preceded by a number', async () => {
      await terminal.number3.click();
      await terminal.subtraction.click();
      await terminal.division.click();
      const input = await getText(terminal.input);
      expect(input).toBe('3÷');
    });

    it('should replace character multiplication to division', async () => {
      await terminal.number4.click();
      await terminal.multiplication.click();
      await terminal.division.click();
      const input = await getText(terminal.input);
      expect(input).toBe('4÷');
    });

    it('should not replace character addition to division when the previous is the only character', async () => {
      await terminal.addition.click();
      await terminal.division.click();
      const input = await getText(terminal.input);
      expect(input).toBe('+');
    });

    it('should not replace character addition to division whe the previous is preceded by parenthesisOpen', async () => {
      await terminal.parenthesisOpen.click();
      await terminal.addition.click();
      await terminal.division.click();
      const input = await getText(terminal.input);
      expect(input).toBe('(+');
    });

    it('should not replace character subtraction to division when the previous is the only character', async () => {
      await terminal.subtraction.click();
      await terminal.division.click();
      const input = await getText(terminal.input);
      expect(input).toBe('-');
    });

    it('should not replace character subtraction to division whe the previous is preceded by parenthesisOpen', async () => {
      await terminal.parenthesisOpen.click();
      await terminal.subtraction.click();
      await terminal.division.click();
      const input = await getText(terminal.input);
      expect(input).toBe('(-');
    });
  });


  describe('parenthesisOpen button', () => {
    it('should be clickable', async () => {
      await terminal.parenthesisOpen.click();
      const input = await getText(terminal.input);
      expect(input).toBe('(');
    });

    it('should include × when inserted after numbers', async () => {
      await terminal.number0.click();
      await terminal.parenthesisOpen.click();
      const input = await getText(terminal.input);
      expect(input).toBe('0×(');
    });

    it('should include × when inserted after parenthesisClose', async () => {
      await terminal.parenthesisOpen.click();
      await terminal.number1.click();
      await terminal.parenthesisClose.click();
      await terminal.parenthesisOpen.click();
      const input = await getText(terminal.input);
      expect(input).toBe('(1)×(');
    });
  });


  describe('parenthesisClose button', () => {
    it('should be clickable', async () => {
      await terminal.parenthesisOpen.click();
      await terminal.number0.click();
      await terminal.parenthesisClose.click();
      const input = await getText(terminal.input);
      expect(input).toBe('(0)');
    });

    it('should not be inserted without a parenthesisOpen available to match', async () => {
      await terminal.parenthesisClose.click();
      expect(await getText(terminal.input)).toBe('');

      await terminal.parenthesisOpen.click();
      await terminal.number1.click();
      await terminal.parenthesisClose.click();
      await terminal.parenthesisClose.click();
      expect(await getText(terminal.input)).toBe('(1)');
    });

    it('should not be inserted after parenthesisOpen', async () => {
      await terminal.parenthesisOpen.click();
      await terminal.parenthesisClose.click();
      const input = await getText(terminal.input);
      expect(input).toBe('(');
    });

    it('should not be inserted after dot', async () => {
      await terminal.parenthesisOpen.click();
      await terminal.number1.click();
      await terminal.dot.click();
      await terminal.parenthesisClose.click();
      const input = await getText(terminal.input);
      expect(input).toBe('(1.');
    });

    it('should not be inserted after addition', async () => {
      await terminal.parenthesisOpen.click();
      await terminal.addition.click();
      await terminal.parenthesisClose.click();
      const input = await getText(terminal.input);
      expect(input).toBe('(+');
    });

    it('should not be inserted after subtraction', async () => {
      await terminal.parenthesisOpen.click();
      await terminal.subtraction.click();
      await terminal.parenthesisClose.click();
      const input = await getText(terminal.input);
      expect(input).toBe('(-');
    });

    it('should not be inserted after multiplication', async () => {
      await terminal.parenthesisOpen.click();
      await terminal.number2.click();
      await terminal.multiplication.click();
      await terminal.parenthesisClose.click();
      const input = await getText(terminal.input);
      expect(input).toBe('(2×');
    });

    it('should not be inserted after division', async () => {
      await terminal.parenthesisOpen.click();
      await terminal.number3.click();
      await terminal.division.click();
      await terminal.parenthesisClose.click();
      const input = await getText(terminal.input);
      expect(input).toBe('(3÷');
    });
  });


  describe('equality button', () => {
    it('should be clickable', async () => {
      await terminal.number3.click();
      await terminal.addition.click();
      await terminal.number4.click();
      await terminal.equality.click();
      const input = await getText(terminal.input);
      expect(input).toBe('');

      const output = await getText(await lastOutput());
      expect(output).toBe('7');
    });

    it('should not calculate when the last character is addition', async () => {
      await terminal.addition.click();
      await terminal.equality.click();

      const input = await getText(terminal.input);
      expect(input).toBe('+');

      const output = await lastOutput();
      expect(output).toBeNull();
    });

    it('should not calculate when the last character is subtraction', async () => {
      await terminal.subtraction.click();
      await terminal.equality.click();

      const input = await getText(terminal.input);
      expect(input).toBe('-');

      const output = await lastOutput();
      expect(output).toBeNull();
    });

    it('should not calculate when the last character is multiplication', async () => {
      await terminal.number0.click();
      await terminal.multiplication.click();
      await terminal.equality.click();

      const input = await getText(terminal.input);
      expect(input).toBe('0×');

      const output = await lastOutput();
      expect(output).toBeNull();
    });

    it('should not calculate when the last character is division', async () => {
      await terminal.number1.click();
      await terminal.division.click();
      await terminal.equality.click();

      const input = await getText(terminal.input);
      expect(input).toBe('1÷');

      const output = await lastOutput();
      expect(output).toBeNull();
    });

    it('should not calculate when the last character is dot', async () => {
      await terminal.number2.click();
      await terminal.dot.click();
      await terminal.equality.click();

      const input = await getText(terminal.input);
      expect(input).toBe('2.');

      const output = await lastOutput();
      expect(output).toBeNull();
    });

    it('should not calculate when the last character is parenthesisOpen', async () => {
      await terminal.parenthesisOpen.click();
      await terminal.equality.click();

      const input = await getText(terminal.input);
      expect(input).toBe('(');

      const output = await lastOutput();
      expect(output).toBeNull();
    });
  });


  describe('delete button', () => {
    it('should be clickable', async () => {
      await terminal.number0.click();
      await terminal.number1.click();
      await terminal.delete.click();
      const input = await getText(terminal.input);
      expect(input).toBe('0');
    });

    it('should delete the last character at a time', async () => {
      await terminal.number2.click();
      await terminal.number3.click();
      await terminal.number4.click();
      expect(await getText(terminal.input)).toBe('234');

      await terminal.delete.click();
      expect(await getText(terminal.input)).toBe('23');

      await terminal.delete.click();
      expect(await getText(terminal.input)).toBe('2');

      await terminal.delete.click();
      expect(await getText(terminal.input)).toBe('');
    });

    it('should do nothing when there is no character to delete', async () => {
      await terminal.number5.click();
      expect(await getText(terminal.input)).toBe('5');

      await terminal.delete.click();
      expect(await getText(terminal.input)).toBe('');

      await terminal.delete.click();
      expect(await getText(terminal.input)).toBe('');
    });
  });


  describe('clear button', () => {
    it('should be clickable', async () => {
      await terminal.number9.click();
      await terminal.clear.click();
      const input = await getText(terminal.input);
      expect(input).toBe('');
    });

    it('should clear any formula inserted into input', async () => {
      await terminal.number9.click();
      await terminal.addition.click();
      await terminal.number8.click();
      await terminal.clear.click();
      const input = await getText(terminal.input);
      expect(input).toBe('');
    });
  });
});
