before(() => {
  cy.visit('http://localhost:3000/calc/custom');
});

beforeEach(() => {
  cy.get('.Custom .display').as('display');
  cy.get('.Custom .btn[data-name="number1"]').as('number1');
  cy.get('.Custom .btn[data-name="number2"]').as('number2');
  cy.get('.Custom .btn[data-name="number3"]').as('number3');
  cy.get('.Custom .btn[data-name="number4"]').as('number4');
  cy.get('.Custom .btn[data-name="number5"]').as('number5');
  cy.get('.Custom .btn[data-name="number6"]').as('number6');
  cy.get('.Custom .btn[data-name="number7"]').as('number7');
  cy.get('.Custom .btn[data-name="number8"]').as('number8');
  cy.get('.Custom .btn[data-name="number9"]').as('number9');
  cy.get('.Custom .btn[data-name="number0"]').as('number0');
  cy.get('.Custom .btn[data-name="dot"]').as('dot');
  cy.get('.Custom .btn[data-name="addition"]').as('addition');
  cy.get('.Custom .btn[data-name="subtraction"]').as('subtraction');
  cy.get('.Custom .btn[data-name="multiplication"]').as('multiplication');
  cy.get('.Custom .btn[data-name="division"]').as('division');
  cy.get('.Custom .btn[data-name="parenthesisOpen"]').as('parenthesisOpen');
  cy.get('.Custom .btn[data-name="parenthesisClose"]').as('parenthesisClose');
  cy.get('.Custom .btn[data-name="equality"]').as('equality');
  cy.get('.Custom .btn[data-name="delete"]').as('delete');
  cy.get('.Custom .btn[data-name="clear"]').as('clear');
  cy.get('.Custom .btn[data-name="madd"]').as('madd');
  cy.get('.Custom .btn[data-name="msubtract"]').as('msubtract');
  cy.get('.Custom .btn[data-name="mclear"]').as('mclear');
  cy.get('.Custom .btn[data-name="mrecall"]').as('mrecall');
  cy.get('.Custom .btn[data-name="percentage"]').as('percentage');
  cy.get('.Custom .btn[data-name="power"]').as('power');
  cy.get('.Custom .btn[data-name="sqrt"]').as('sqrt');
  cy.get('.Custom .btn[data-name="pi"]').as('pi');

  cy.get('@clear').click();
});

describe('Custom', () => {
  describe('number button', () => {
    it('button number0 should be clickable', () => {
      cy.get('@number0').click();
      cy.get('@display').should('have.text', '0');
    });

    it('button number1 should be clickable', () => {
      cy.get('@number1').click();
      cy.get('@display').should('have.text', '1');
    });

    it('button number2 should be clickable', () => {
      cy.get('@number2').click();
      cy.get('@display').should('have.text', '2');
    });

    it('button number3 should be clickable', () => {
      cy.get('@number3').click();
      cy.get('@display').should('have.text', '3');
    });

    it('button number4 should be clickable', () => {
      cy.get('@number4').click();
      cy.get('@display').should('have.text', '4');
    });

    it('button number5 should be clickable', () => {
      cy.get('@number5').click();
      cy.get('@display').should('have.text', '5');
    });

    it('button number6 should be clickable', () => {
      cy.get('@number6').click();
      cy.get('@display').should('have.text', '6');
    });

    it('button number7 should be clickable', () => {
      cy.get('@number7').click();
      cy.get('@display').should('have.text', '7');
    });

    it('button number8 should be clickable', () => {
      cy.get('@number8').click();
      cy.get('@display').should('have.text', '8');
    });

    it('button number9 should be clickable', () => {
      cy.get('@number9').click();
      cy.get('@display').should('have.text', '9');
    });

    it('numbers should not be added after parenthesis close', () => {
      cy.get('@parenthesisOpen').click();
      cy.get('@number0').click();
      cy.get('@parenthesisClose').click();
      cy.get('@number1').click();
      cy.get('@display').should('have.text', '(0)');
    });

    it('numbers should not be added after percentage', () => {
      cy.get('@number2').click();
      cy.get('@percentage').click();
      cy.get('@number3').click();
      cy.get('@display').should('have.text', '2%');
    });

    it('numbers should not be added after pi', () => {
      cy.get('@pi').click();
      cy.get('@number4').click();
      cy.get('@display').should('have.text', 'π');
    });
  });

  describe('dot button', () => {
    it('should be clickable', () => {
      cy.get('@number5').click();
      cy.get('@dot').click();
      cy.get('@display').should('have.text', '5.');
    });

    it('should be inserted after numbers', () => {
      cy.get('@number6').click();
      cy.get('@dot').click();
      cy.get('@display').should('have.text', '6.');
    });

    it('should not be inserted after another dot', () => {
      cy.get('@number6').click();
      cy.get('@dot').click();
      cy.get('@dot').click();
      cy.get('@display').should('have.text', '6.');
    });

    it('should not be inserted after a number that has dot', () => {
      cy.get('@number7').click();
      cy.get('@dot').click();
      cy.get('@number8').click();
      cy.get('@dot').click();
      cy.get('@display').should('have.text', '7.8');
    });

    it('should not be inserted after addition', () => {
      cy.get('@addition').click();
      cy.get('@dot').click();
      cy.get('@display').should('have.text', '+');
    });

    it('should not be inserted after subtraction', () => {
      cy.get('@subtraction').click();
      cy.get('@dot').click();
      cy.get('@display').should('have.text', '-');
    });

    it('should not be inserted after multiplication', () => {
      cy.get('@number9').click();
      cy.get('@multiplication').click();
      cy.get('@dot').click();
      cy.get('@display').should('have.text', '9×');
    });

    it('should not be inserted after division', () => {
      cy.get('@number0').click();
      cy.get('@division').click();
      cy.get('@dot').click();
      cy.get('@display').should('have.text', '0÷');
    });

    it('should not be inserted after parenthesisOpen', () => {
      cy.get('@parenthesisOpen').click();
      cy.get('@dot').click();
      cy.get('@display').should('have.text', '(');
    });

    it('should not be inserted after parenthesisClose', () => {
      cy.get('@parenthesisOpen').click();
      cy.get('@number1').click();
      cy.get('@parenthesisClose').click();
      cy.get('@dot').click();
      cy.get('@display').should('have.text', '(1)');
    });

    it('should not be inserted after percentage', () => {
      cy.get('@number2').click();
      cy.get('@percentage').click();
      cy.get('@dot').click();
      cy.get('@display').should('have.text', '2%');
    });

    it('should not be inserted after power', () => {
      cy.get('@number3').click();
      cy.get('@power').click();
      cy.get('@dot').click();
      cy.get('@display').should('have.text', '3^');
    });

    it('should not be inserted after square root', () => {
      cy.get('@sqrt').click();
      cy.get('@dot').click();
      cy.get('@display').should('have.text', '√');
    });

    it('should not be inserted after pi', () => {
      cy.get('@pi').click();
      cy.get('@dot').click();
      cy.get('@display').should('have.text', 'π');
    });
  });


  describe('addition button', () => {
    it('should be clickable', () => {
      cy.get('@addition').click();
      cy.get('@display').should('have.text', '+');
    });

    it('should be inserted after numbers', () => {
      cy.get('@number6').click();
      cy.get('@addition').click();
      cy.get('@display').should('have.text', '6+');
    });

    it('added after another addition should replace the old one', () => {
      cy.get('@addition').click();
      cy.get('@addition').click();
      cy.get('@display').should('have.text', '+');
    });

    it('should replace character subtraction to addition', () => {
      cy.get('@subtraction').click();
      cy.get('@addition').click();
      cy.get('@display').should('have.text', '+');
    });

    it('should replace character multiplication to addition', () => {
      cy.get('@number4').click();
      cy.get('@multiplication').click();
      cy.get('@addition').click();
      cy.get('@display').should('have.text', '4+');
    });

    it('should replace character division to addition', () => {
      cy.get('@number5').click();
      cy.get('@division').click();
      cy.get('@addition').click();
      cy.get('@display').should('have.text', '5+');
    });

    it('should be inserted after parenthesisOpen', () => {
      cy.get('@parenthesisOpen').click();
      cy.get('@addition').click();
      cy.get('@display').should('have.text', '(+');
    });

    it('should not be inserted after dot', () => {
      cy.get('@number7').click();
      cy.get('@dot').click();
      cy.get('@addition').click();
      cy.get('@display').should('have.text', '7.');
    });
  });


  describe('subtraction button', () => {
    it('should be clickable', () => {
      cy.get('@subtraction').click();
      cy.get('@display').should('have.text', '-');
    });

    it('should be inserted after numbers', () => {
      cy.get('@number6').click();
      cy.get('@subtraction').click();
      cy.get('@display').should('have.text', '6-');
    });

    it('added after another subtraction should replace the old one', () => {
      cy.get('@subtraction').click();
      cy.get('@subtraction').click();
      cy.get('@display').should('have.text', '-');
    });

    it('should replace character addition to subtraction', () => {
      cy.get('@addition').click();
      cy.get('@subtraction').click();
      cy.get('@display').should('have.text', '-');
    });

    it('should replace character multiplication to subtraction', () => {
      cy.get('@number4').click();
      cy.get('@multiplication').click();
      cy.get('@subtraction').click();
      cy.get('@display').should('have.text', '4-');
    });

    it('should replace character division to subtraction', () => {
      cy.get('@number5').click();
      cy.get('@division').click();
      cy.get('@subtraction').click();
      cy.get('@display').should('have.text', '5-');
    });

    it('should be inserted after parenthesisOpen', () => {
      cy.get('@parenthesisOpen').click();
      cy.get('@subtraction').click();
      cy.get('@display').should('have.text', '(-');
    });

    it('should not be inserted after dot', () => {
      cy.get('@number7').click();
      cy.get('@dot').click();
      cy.get('@subtraction').click();
      cy.get('@display').should('have.text', '7.');
    });
  });


  describe('multiplication button', () => {
    it('should be clickable', () => {
      cy.get('@number0').click();
      cy.get('@multiplication').click();
      cy.get('@display').should('have.text', '0×');
    });

    it('should be inserted after numbers', () => {
      cy.get('@number6').click();
      cy.get('@multiplication').click();
      cy.get('@display').should('have.text', '6×');
    });

    it('should not be inserted after dot', () => {
      cy.get('@number7').click();
      cy.get('@dot').click();
      cy.get('@multiplication').click();
      cy.get('@display').should('have.text', '7.');
    });

    it('should not be inserted after parenthesisOpen', () => {
      cy.get('@parenthesisOpen').click();
      cy.get('@multiplication').click();
      cy.get('@display').should('have.text', '(');
    });

    it('should not be inserted after power', () => {
      cy.get('@number8').click();
      cy.get('@power').click();
      cy.get('@multiplication').click();
      cy.get('@display').should('have.text', '8^');
    });

    it('should not be inserted after square root', () => {
      cy.get('@sqrt').click();
      cy.get('@multiplication').click();
      cy.get('@display').should('have.text', '√');
    });

    it('added after another multiplication should replace the old one', () => {
      cy.get('@number1').click();
      cy.get('@multiplication').click();
      cy.get('@multiplication').click();
      cy.get('@display').should('have.text', '1×');
    });

    it('should replace character addition to multiplication when the previous are preceded by a number', () => {
      cy.get('@number2').click();
      cy.get('@addition').click();
      cy.get('@multiplication').click();
      cy.get('@display').should('have.text', '2×');
    });

    it('should replace character subtraction to multiplication when the previous are preceded by a number', () => {
      cy.get('@number3').click();
      cy.get('@subtraction').click();
      cy.get('@multiplication').click();
      cy.get('@display').should('have.text', '3×');
    });

    it('should replace character division to multiplication', () => {
      cy.get('@number4').click();
      cy.get('@division').click();
      cy.get('@multiplication').click();
      cy.get('@display').should('have.text', '4×');
    });

    it('should not replace character addition to multiplication when the previous is the only character', () => {
      cy.get('@addition').click();
      cy.get('@multiplication').click();
      cy.get('@display').should('have.text', '+');
    });

    it('should not replace character addition to multiplication whe the previous is preceded by parenthesisOpen', () => {
      cy.get('@parenthesisOpen').click();
      cy.get('@addition').click();
      cy.get('@multiplication').click();
      cy.get('@display').should('have.text', '(+');
    });

    it('should not replace character addition to multiplication whe the previous is preceded by power', () => {
      cy.get('@number3').click();
      cy.get('@power').click();
      cy.get('@addition').click();
      cy.get('@multiplication').click();
      cy.get('@display').should('have.text', '3^+');
    });

    it('should not replace character addition to multiplication whe the previous is preceded by square root', () => {
      cy.get('@sqrt').click();
      cy.get('@addition').click();
      cy.get('@multiplication').click();
      cy.get('@display').should('have.text', '√+');
    });

    it('should not replace character subtraction to multiplication when the previous is the only character', () => {
      cy.get('@subtraction').click();
      cy.get('@multiplication').click();
      cy.get('@display').should('have.text', '-');
    });

    it('should not replace character subtraction to multiplication whe the previous is preceded by parenthesisOpen', () => {
      cy.get('@parenthesisOpen').click();
      cy.get('@subtraction').click();
      cy.get('@multiplication').click();
      cy.get('@display').should('have.text', '(-');
    });

    it('should not replace character subtraction to multiplication whe the previous is preceded by power', () => {
      cy.get('@number3').click();
      cy.get('@power').click();
      cy.get('@subtraction').click();
      cy.get('@multiplication').click();
      cy.get('@display').should('have.text', '3^-');
    });

    it('should not replace character subtraction to multiplication whe the previous is preceded by square root', () => {
      cy.get('@sqrt').click();
      cy.get('@subtraction').click();
      cy.get('@multiplication').click();
      cy.get('@display').should('have.text', '√-');
    });
  });


  describe('division button', () => {
    it('should be clickable', () => {
      cy.get('@number0').click();
      cy.get('@division').click();
      cy.get('@display').should('have.text', '0÷');
    });

    it('should be inserted after numbers', () => {
      cy.get('@number6').click();
      cy.get('@division').click();
      cy.get('@display').should('have.text', '6÷');
    });

    it('should not be inserted after dot', () => {
      cy.get('@number7').click();
      cy.get('@dot').click();
      cy.get('@division').click();
      cy.get('@display').should('have.text', '7.');
    });

    it('should not be inserted after parenthesisOpen', () => {
      cy.get('@parenthesisOpen').click();
      cy.get('@division').click();
      cy.get('@display').should('have.text', '(');
    });

    it('should not be inserted after power', () => {
      cy.get('@number8').click();
      cy.get('@power').click();
      cy.get('@division').click();
      cy.get('@display').should('have.text', '8^');
    });

    it('should not be inserted after square root', () => {
      cy.get('@sqrt').click();
      cy.get('@division').click();
      cy.get('@display').should('have.text', '√');
    });

    it('added after another division should replace the old one', () => {
      cy.get('@number1').click();
      cy.get('@division').click();
      cy.get('@division').click();
      cy.get('@display').should('have.text', '1÷');
    });

    it('should replace character addition to division when the previous are preceded by a number', () => {
      cy.get('@number2').click();
      cy.get('@addition').click();
      cy.get('@division').click();
      cy.get('@display').should('have.text', '2÷');
    });

    it('should replace character subtraction to division when the previous are preceded by a number', () => {
      cy.get('@number3').click();
      cy.get('@subtraction').click();
      cy.get('@division').click();
      cy.get('@display').should('have.text', '3÷');
    });

    it('should replace character multiplication to division', () => {
      cy.get('@number4').click();
      cy.get('@multiplication').click();
      cy.get('@division').click();
      cy.get('@display').should('have.text', '4÷');
    });

    it('should not replace character addition to division when the previous is the only character', () => {
      cy.get('@addition').click();
      cy.get('@division').click();
      cy.get('@display').should('have.text', '+');
    });

    it('should not replace character addition to division whe the previous is preceded by parenthesisOpen', () => {
      cy.get('@parenthesisOpen').click();
      cy.get('@addition').click();
      cy.get('@division').click();
      cy.get('@display').should('have.text', '(+');
    });

    it('should not replace character addition to division whe the previous is preceded by power', () => {
      cy.get('@number3').click();
      cy.get('@power').click();
      cy.get('@addition').click();
      cy.get('@division').click();
      cy.get('@display').should('have.text', '3^+');
    });

    it('should not replace character addition to division whe the previous is preceded by square root', () => {
      cy.get('@sqrt').click();
      cy.get('@addition').click();
      cy.get('@division').click();
      cy.get('@display').should('have.text', '√+');
    });

    it('should not replace character subtraction to division when the previous is the only character', () => {
      cy.get('@subtraction').click();
      cy.get('@division').click();
      cy.get('@display').should('have.text', '-');
    });

    it('should not replace character subtraction to division whe the previous is preceded by parenthesisOpen', () => {
      cy.get('@parenthesisOpen').click();
      cy.get('@subtraction').click();
      cy.get('@division').click();
      cy.get('@display').should('have.text', '(-');
    });

    it('should not replace character subtraction to division whe the previous is preceded by power', () => {
      cy.get('@number3').click();
      cy.get('@power').click();
      cy.get('@subtraction').click();
      cy.get('@division').click();
      cy.get('@display').should('have.text', '3^-');
    });

    it('should not replace character subtraction to division whe the previous is preceded by square root', () => {
      cy.get('@sqrt').click();
      cy.get('@subtraction').click();
      cy.get('@division').click();
      cy.get('@display').should('have.text', '√-');
    });
  });


  describe('parenthesisOpen button', () => {
    it('should be clickable', () => {
      cy.get('@parenthesisOpen').click();
      cy.get('@display').should('have.text', '(');
    });

    it('should include × when inserted after numbers', () => {
      cy.get('@number0').click();
      cy.get('@parenthesisOpen').click();
      cy.get('@display').should('have.text', '0×(');
    });

    it('should include × when inserted after parenthesisClose', () => {
      cy.get('@parenthesisOpen').click();
      cy.get('@number1').click();
      cy.get('@parenthesisClose').click();
      cy.get('@parenthesisOpen').click();
      cy.get('@display').should('have.text', '(1)×(');
    });

    it('should include × when inserted after percentage', () => {
      cy.get('@number2').click();
      cy.get('@percentage').click();
      cy.get('@parenthesisOpen').click();
      cy.get('@display').should('have.text', '2%×(');
    });

    it('should include × when inserted after pi', () => {
      cy.get('@pi').click();
      cy.get('@parenthesisOpen').click();
      cy.get('@display').should('have.text', 'π×(');
    });
  });


  describe('parenthesisClose button', () => {
    it('should be clickable', () => {
      cy.get('@parenthesisOpen').click();
      cy.get('@number0').click();
      cy.get('@parenthesisClose').click();
      cy.get('@display').should('have.text', '(0)');
    });

    it('should not be inserted without a parenthesisOpen available to match', () => {
      cy.get('@parenthesisClose').click();
      cy.get('@display').should('have.text', '');

      cy.get('@parenthesisOpen').click();
      cy.get('@number1').click();
      cy.get('@parenthesisClose').click();
      cy.get('@parenthesisClose').click();
      cy.get('@display').should('have.text', '(1)');
    });

    it('should not be inserted after parenthesisOpen', () => {
      cy.get('@parenthesisOpen').click();
      cy.get('@parenthesisClose').click();
      cy.get('@display').should('have.text', '(');
    });

    it('should not be inserted after dot', () => {
      cy.get('@parenthesisOpen').click();
      cy.get('@number1').click();
      cy.get('@dot').click();
      cy.get('@parenthesisClose').click();
      cy.get('@display').should('have.text', '(1.');
    });

    it('should not be inserted after addition', () => {
      cy.get('@parenthesisOpen').click();
      cy.get('@addition').click();
      cy.get('@parenthesisClose').click();
      cy.get('@display').should('have.text', '(+');
    });

    it('should not be inserted after subtraction', () => {
      cy.get('@parenthesisOpen').click();
      cy.get('@subtraction').click();
      cy.get('@parenthesisClose').click();
      cy.get('@display').should('have.text', '(-');
    });

    it('should not be inserted after multiplication', () => {
      cy.get('@parenthesisOpen').click();
      cy.get('@number2').click();
      cy.get('@multiplication').click();
      cy.get('@parenthesisClose').click();
      cy.get('@display').should('have.text', '(2×');
    });

    it('should not be inserted after division', () => {
      cy.get('@parenthesisOpen').click();
      cy.get('@number3').click();
      cy.get('@division').click();
      cy.get('@parenthesisClose').click();
      cy.get('@display').should('have.text', '(3÷');
    });

    it('should not be inserted after square root', () => {
      cy.get('@parenthesisOpen').click();
      cy.get('@sqrt').click();
      cy.get('@parenthesisClose').click();
      cy.get('@display').should('have.text', '(√');
    });
  });


  describe('equality button', () => {
    it('should be clickable', () => {
      cy.get('@number3').click();
      cy.get('@addition').click();
      cy.get('@number4').click();
      cy.get('@equality').click();
      cy.get('@display').should('have.text', '7');
    });

    it('should not calculate when the last character is addition', () => {
      cy.get('@addition').click();
      cy.get('@equality').click();
      cy.get('@display').should('have.text', '+');
    });

    it('should not calculate when the last character is subtraction', () => {
      cy.get('@subtraction').click();
      cy.get('@equality').click();
      cy.get('@display').should('have.text', '-');
    });

    it('should not calculate when the last character is multiplication', () => {
      cy.get('@number0').click();
      cy.get('@multiplication').click();
      cy.get('@equality').click();
      cy.get('@display').should('have.text', '0×');
    });

    it('should not calculate when the last character is division', () => {
      cy.get('@number1').click();
      cy.get('@division').click();
      cy.get('@equality').click();
      cy.get('@display').should('have.text', '1÷');
    });

    it('should not calculate when the last character is dot', () => {
      cy.get('@number2').click();
      cy.get('@dot').click();
      cy.get('@equality').click();
      cy.get('@display').should('have.text', '2.');
    });

    it('should not calculate when the last character is square root', () => {
      cy.get('@sqrt').click();
      cy.get('@equality').click();
      cy.get('@display').should('have.text', '√');
    });

    it('should not calculate when the last character is power', () => {
      cy.get('@number3').click();
      cy.get('@power').click();
      cy.get('@equality').click();
      cy.get('@display').should('have.text', '3^');
    });

    it('should not calculate when the last character is parenthesisOpen', () => {
      cy.get('@parenthesisOpen').click();
      cy.get('@equality').click();
      cy.get('@display').should('have.text', '(');
    });
  });


  describe('delete button', () => {
    it('should be clickable', () => {
      cy.get('@number0').click();
      cy.get('@number1').click();
      cy.get('@delete').click();
      cy.get('@display').should('have.text', '0');
    });

    it('should delete the last character at a time', () => {
      cy.get('@number2').click();
      cy.get('@number3').click();
      cy.get('@number4').click();
      cy.get('@display').should('have.text', '234');

      cy.get('@delete').click();
      cy.get('@display').should('have.text', '23');

      cy.get('@delete').click();
      cy.get('@display').should('have.text', '2');

      cy.get('@delete').click();
      cy.get('@display').should('have.text', '');
    });

    it('should do nothing when there is no character to delete', () => {
      cy.get('@number5').click();
      cy.get('@display').should('have.text', '5');

      cy.get('@delete').click();
      cy.get('@display').should('have.text', '');

      cy.get('@delete').click();
      cy.get('@display').should('have.text', '');
    });
  });


  describe('clear button', () => {
    it('should be clickable', () => {
      cy.get('@number9').click();
      cy.get('@clear').click();
      cy.get('@display').should('have.text', '');
    });

    it('should clear any formula inserted into display', () => {
      cy.get('@number9').click();
      cy.get('@addition').click();
      cy.get('@number8').click();
      cy.get('@clear').click();
      cy.get('@display').should('have.text', '');
    });
  });


  describe('percentage button', () => {
    it('should be clickable', () => {
      cy.get('@number9').click();
      cy.get('@percentage').click();
      cy.get('@display').should('have.text', '9%');
    });

    it('should not be inserted after dot', () => {
      cy.get('@number8').click();
      cy.get('@dot').click();
      cy.get('@percentage').click();
      cy.get('@display').should('have.text', '8.');
    });

    it('should not be inserted after addition', () => {
      cy.get('@addition').click();
      cy.get('@percentage').click();
      cy.get('@display').should('have.text', '+');
    });

    it('should not be inserted after subtraction', () => {
      cy.get('@subtraction').click();
      cy.get('@percentage').click();
      cy.get('@display').should('have.text', '-');
    });

    it('should not be inserted after multiplication', () => {
      cy.get('@number7').click();
      cy.get('@multiplication').click();
      cy.get('@percentage').click();
      cy.get('@display').should('have.text', '7×');
    });

    it('should not be inserted after division', () => {
      cy.get('@number6').click();
      cy.get('@division').click();
      cy.get('@percentage').click();
      cy.get('@display').should('have.text', '6÷');
    });

    it('should not be inserted after parenthesisOpen', () => {
      cy.get('@parenthesisOpen').click();
      cy.get('@percentage').click();
      cy.get('@display').should('have.text', '(');
    });

    it('should not be inserted after another percentage', () => {
      cy.get('@number7').click();
      cy.get('@percentage').click();
      cy.get('@percentage').click();
      cy.get('@display').should('have.text', '7%');
    });
  });


  describe('power button', () => {
    it('should be clickable', () => {
      cy.get('@number8').click();
      cy.get('@power').click();
      cy.get('@display').should('have.text', '8^');
    });

    it('should be inserted after numbers', () => {
      cy.get('@number7').click();
      cy.get('@power').click();
      cy.get('@display').should('have.text', '7^');
    });

    it('should be inserted after pi', () => {
      cy.get('@pi').click();
      cy.get('@power').click();
      cy.get('@display').should('have.text', 'π^');
    });
  });


  describe('square root button', () => {
    it('should be clickable', () => {
      cy.get('@sqrt').click();
      cy.get('@display').should('have.text', '√');
    });

    it('should be inserted after addition', () => {
      cy.get('@addition').click();
      cy.get('@sqrt').click();
      cy.get('@display').should('have.text', '+√');
    });

    it('should be inserted after subtraction', () => {
      cy.get('@subtraction').click();
      cy.get('@sqrt').click();
      cy.get('@display').should('have.text', '-√');
    });

    it('should be inserted after multiplication', () => {
      cy.get('@number6').click();
      cy.get('@multiplication').click();
      cy.get('@sqrt').click();
      cy.get('@display').should('have.text', '6×√');
    });

    it('should be inserted after division', () => {
      cy.get('@number5').click();
      cy.get('@division').click();
      cy.get('@sqrt').click();
      cy.get('@display').should('have.text', '5÷√');
    });

    it('should be inserted after parenthesisOpen', () => {
      cy.get('@parenthesisOpen').click();
      cy.get('@sqrt').click();
      cy.get('@display').should('have.text', '(√');
    });

    it('should be inserted after square root', () => {
      cy.get('@sqrt').click();
      cy.get('@sqrt').click();
      cy.get('@display').should('have.text', '√√');
    });

    it('should insert ×√ after numbers', () => {
      cy.get('@number1').click();
      cy.get('@sqrt').click();
      cy.get('@display').should('have.text', '1×√');
    });

    it('should insert ×√ after parenthesisClose', () => {
      cy.get('@parenthesisOpen').click();
      cy.get('@number2').click();
      cy.get('@parenthesisClose').click();
      cy.get('@sqrt').click();
      cy.get('@display').should('have.text', '(2)×√');
    });

    it('should insert ×√ after percentage', () => {
      cy.get('@number3').click();
      cy.get('@percentage').click();
      cy.get('@sqrt').click();
      cy.get('@display').should('have.text', '3%×√');
    });

    it('should insert ×√ after pi', () => {
      cy.get('@pi').click();
      cy.get('@sqrt').click();
      cy.get('@display').should('have.text', 'π×√');
    });
  });


  describe('pi button', () => {
    it('should be clickable', () => {
      cy.get('@pi').click();
      cy.get('@display').should('have.text', 'π');
    });

    it('should not be inserted after numbers', () => {
      cy.get('@number0').click();
      cy.get('@pi').click();
      cy.get('@display').should('have.text', '0');
    });

    it('should not be inserted after dot', () => {
      cy.get('@number0').click();
      cy.get('@dot').click();
      cy.get('@pi').click();
      cy.get('@display').should('have.text', '0.');
    });

    it('should not be inserted after percentage', () => {
      cy.get('@number2').click();
      cy.get('@percentage').click();
      cy.get('@pi').click();
      cy.get('@display').should('have.text', '2%');
    });

    it('should not be inserted after pi', () => {
      cy.get('@pi').click();
      cy.get('@pi').click();
      cy.get('@display').should('have.text', 'π');
    });
  });


  describe('memory add button', () => {
    it('should increase the value in memory with the value at display', () => {
      cy.get('@mclear').click();
      cy.get('@number1').click();
      cy.get('@madd').click();
      cy.get('@madd').click();
      cy.get('@mrecall').click();
      cy.get('@display').should('have.text', '2');
    });
  });


  describe('memory subtract button', () => {
    it('should decrease the value in memory with the value at display', () => {
      cy.get('@mclear').click();
      cy.get('@number9').click();
      cy.get('@madd').click();
      cy.get('@number5').click();
      cy.get('@msubtract').click();
      cy.get('@mrecall').click();
      cy.get('@display').should('have.text', '4');
    });
  });


  describe('memory recall button', () => {
    it('should get the value in memory and set at display', () => {
      cy.get('@mclear').click();
      cy.get('@number9').click();
      cy.get('@madd').click();
      cy.get('@madd').click();
      cy.get('@mrecall').click();
      cy.get('@display').should('have.text', '18');
    });
  });


  describe('memory clear button', () => {
    it('should set to 0 the value in memory', () => {
      cy.get('@mclear').click();
      cy.get('@number5').click();
      cy.get('@madd').click();
      cy.get('@madd').click();
      cy.get('@mrecall').click();
      cy.get('@display').should('have.text', '10');

      cy.get('@mclear').click();
      cy.get('@mrecall').click();
      cy.get('@display').should('have.text', '0');
    });
  });
});