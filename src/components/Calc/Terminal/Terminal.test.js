import React from 'react';
import {shallow} from 'enzyme';
import Terminal from './index';

describe('Terminal Calc', () => {
  let terminal;

  beforeEach(() => {
    terminal = shallow(<Terminal />).instance();
  });

  test('Instance method additionRule', () => {
    expect(terminal.additionRule('1+')).toBe('1+');
    expect(terminal.additionRule('1-')).toBe('1+');
    expect(terminal.additionRule('1×')).toBe('1+');
    expect(terminal.additionRule('1÷')).toBe('1+');

    expect(terminal.additionRule('')).toBe('+');
    expect(terminal.additionRule('.')).toBeUndefined();
  });

  test('Instance method clearRule', () => {
    expect(terminal.clearRule('')).toBe('');
    expect(terminal.clearRule('12345')).toBe('');
  });

  test('Instance method divisionRule', () => {
    expect(terminal.divisionRule('2')).toBe('2÷');
    expect(terminal.divisionRule('2+')).toBe('2÷');
    expect(terminal.divisionRule('2-')).toBe('2÷');
    expect(terminal.divisionRule('2×')).toBe('2÷');
    expect(terminal.divisionRule('2÷')).toBe('2÷');

    expect(terminal.divisionRule('')).toBeUndefined();
    expect(terminal.divisionRule('2.')).toBeUndefined();

  });

  test('Instance method dotRule', () => {
    expect(terminal.dotRule('1')).toBe('1.');
    expect(terminal.dotRule('1.2')).toBeUndefined();
    expect(terminal.dotRule('')).toBeUndefined();
    expect(terminal.dotRule('.')).toBeUndefined();
    expect(terminal.dotRule('+')).toBeUndefined();
    expect(terminal.dotRule('-')).toBeUndefined();
    expect(terminal.dotRule('×')).toBeUndefined();
    expect(terminal.dotRule('÷')).toBeUndefined();
    expect(terminal.dotRule('(')).toBeUndefined();
    expect(terminal.dotRule(')')).toBeUndefined();
  });

  test('Instance method equalityRule', () => {
    expect(terminal.equalityRule('')).toBeUndefined();

    // expect(terminal.equalityRule('10÷0')).toBeUndefined();
  });

  test('Instance method multiplicationRule', () => {
    expect(terminal.multiplicationRule('3')).toBe('3×');
    expect(terminal.multiplicationRule('3+')).toBe('3×');
    expect(terminal.multiplicationRule('3-')).toBe('3×');
    expect(terminal.multiplicationRule('3×')).toBe('3×');
    expect(terminal.multiplicationRule('3÷')).toBe('3×');

    expect(terminal.multiplicationRule('')).toBeUndefined();
    expect(terminal.multiplicationRule('3.')).toBeUndefined();
  });

  test('Instance method numberRule', () => {
    expect(terminal.numberRule('', '0')).toBe('0');
    expect(terminal.numberRule('', '1')).toBe('1');
    expect(terminal.numberRule('', '2')).toBe('2');
    expect(terminal.numberRule('', '3')).toBe('3');
    expect(terminal.numberRule('', '4')).toBe('4');
    expect(terminal.numberRule('', '5')).toBe('5');
    expect(terminal.numberRule('', '6')).toBe('6');
    expect(terminal.numberRule('', '7')).toBe('7');
    expect(terminal.numberRule('', '8')).toBe('8');
    expect(terminal.numberRule('', '9')).toBe('9');

    expect(terminal.numberRule(')', '1')).toBeUndefined();
  });

  test('Instance method parenthesisCloseRule', () => {
    expect(terminal.parenthesisCloseRule('(1')).toBe('(1)');
    expect(terminal.parenthesisCloseRule('((1')).toBe('((1)');
    expect(terminal.parenthesisCloseRule('((1)')).toBe('((1))');

    expect(terminal.parenthesisCloseRule('')).toBeUndefined();
    expect(terminal.parenthesisCloseRule('(')).toBeUndefined();
    expect(terminal.parenthesisCloseRule('(+')).toBeUndefined();
    expect(terminal.parenthesisCloseRule('(-')).toBeUndefined();
    expect(terminal.parenthesisCloseRule('(1×')).toBeUndefined();
    expect(terminal.parenthesisCloseRule('(1÷')).toBeUndefined();
    expect(terminal.parenthesisCloseRule('(1.')).toBeUndefined();
    expect(terminal.parenthesisCloseRule('123')).toBeUndefined();
    expect(terminal.parenthesisCloseRule('((1))')).toBeUndefined();
  });

  test('Instance method parenthesisOpenRule', () => {
    expect(terminal.parenthesisOpenRule('')).toBe('(');
    expect(terminal.parenthesisOpenRule('0')).toBe('0×(');
    expect(terminal.parenthesisOpenRule('1')).toBe('1×(');
    expect(terminal.parenthesisOpenRule('2')).toBe('2×(');
    expect(terminal.parenthesisOpenRule('3')).toBe('3×(');
    expect(terminal.parenthesisOpenRule('4')).toBe('4×(');
    expect(terminal.parenthesisOpenRule('5')).toBe('5×(');
    expect(terminal.parenthesisOpenRule('6')).toBe('6×(');
    expect(terminal.parenthesisOpenRule('7')).toBe('7×(');
    expect(terminal.parenthesisOpenRule('8')).toBe('8×(');
    expect(terminal.parenthesisOpenRule('9')).toBe('9×(');
    expect(terminal.parenthesisOpenRule(')')).toBe(')×(');
    expect(terminal.parenthesisOpenRule('-')).toBe('-(');

    expect(terminal.parenthesisOpenRule('.')).toBeUndefined();
  });

  test('Instance method subtractionRule', () => {
    expect(terminal.subtractionRule('')).toBe('-');
    expect(terminal.subtractionRule('4')).toBe('4-');
    expect(terminal.subtractionRule('4+')).toBe('4-');
    expect(terminal.subtractionRule('4-')).toBe('4-');
    expect(terminal.subtractionRule('4×')).toBe('4-');
    expect(terminal.subtractionRule('4÷')).toBe('4-');

    expect(terminal.subtractionRule('.')).toBeUndefined();
  });

  test('Instance method showError', () => {
    terminal.showError();
    expect(terminal.state.error).toBe(true);
    setTimeout(() => {expect(terminal.state.error).toBe(false);}, 400);
  });

  test('Instance method buttonClick', () => {
    const fn = terminal.buttonClick(terminal.subtractionRule);
    const e = {target: {dataset: {value: ''}}};

    expect(typeof fn).toBe('function');

    e.target.dataset.value = '-';
    terminal.setState({formula: ''});
    fn(e);
    expect(terminal.state.formula).toBe('-');

    terminal.setState({formula: '.'});
    fn(e);
    expect(terminal.state.formula).toBe('.');
  });

});
