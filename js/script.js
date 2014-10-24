var calc;
var term;

window.onload = function () {
  'use strict';

  term = new Terminal();
  term.skin('.calc-terminal');

  calc = new Calc();
  calc.skin('.calc');
};
