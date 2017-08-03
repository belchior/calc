import React from 'react';
import {shallow} from 'enzyme';
import Custom from './index';

describe('Custom Calc', () => {
  let custom;

  beforeEach(() => {
    custom = shallow(<Custom />).instance();
  });

  test('Instance method additionRule', () => {
    expect(custom.additionRule('1+')).toBe('1+');
    expect(custom.additionRule('1-')).toBe('1+');
    expect(custom.additionRule('1×')).toBe('1+');
    expect(custom.additionRule('1÷')).toBe('1+');

    expect(custom.additionRule('')).toBe('+');
    expect(custom.additionRule('.')).toBeUndefined();
  });

  test('Instance method clearRule', () => {
    expect(custom.clearRule('')).toBe('');
    expect(custom.clearRule('12345')).toBe('');
  });

  test('Instance method deleteRule', () => {
    expect(custom.deleteRule('')).toBe('');
    expect(custom.deleteRule('12345')).toBe('1234');
  });

  test('Instance method divisionRule', () => {
    expect(custom.divisionRule('2')).toBe('2÷');
    expect(custom.divisionRule('2+')).toBe('2÷');
    expect(custom.divisionRule('2-')).toBe('2÷');
    expect(custom.divisionRule('2×')).toBe('2÷');
    expect(custom.divisionRule('2÷')).toBe('2÷');

    expect(custom.divisionRule('')).toBeUndefined();
    expect(custom.divisionRule('2^+')).toBeUndefined();
    expect(custom.divisionRule('2^-')).toBeUndefined();
    expect(custom.divisionRule('√+')).toBeUndefined();
    expect(custom.divisionRule('√-')).toBeUndefined();
    expect(custom.divisionRule('2.')).toBeUndefined();
    expect(custom.divisionRule('2^')).toBeUndefined();
    expect(custom.divisionRule('√')).toBeUndefined();

  });

  test('Instance method dotRule', () => {
    expect(custom.dotRule('1')).toBe('1.');
    expect(custom.dotRule('1.2')).toBeUndefined();
    expect(custom.dotRule('')).toBeUndefined();
    expect(custom.dotRule('%')).toBeUndefined();
    expect(custom.dotRule('^')).toBeUndefined();
    expect(custom.dotRule('√')).toBeUndefined();
    expect(custom.dotRule('π')).toBeUndefined();
    expect(custom.dotRule('.')).toBeUndefined();
    expect(custom.dotRule('+')).toBeUndefined();
    expect(custom.dotRule('-')).toBeUndefined();
    expect(custom.dotRule('×')).toBeUndefined();
    expect(custom.dotRule('÷')).toBeUndefined();
    expect(custom.dotRule('(')).toBeUndefined();
    expect(custom.dotRule(')')).toBeUndefined();
  });

  test('Instance method equalityRule', () => {
    let originalConsole = global.console;
    global.console = {error: jest.fn()};

    expect(custom.equalityRule('')).toBeFalsy();
    expect(custom.equalityRule('9+8-7×6÷5+((-4-3.2)+√25-2^2)')).toBe('2.4');
    expect(custom.equalityRule('π^2')).toBe('9.86960438');
    expect(custom.equalityRule('100×5%+1')).toBe('6');
    expect(custom.equalityRule('π^')).toBe('NaN');
    expect(custom.equalityRule('10÷0')).toBeFalsy();

    global.console = originalConsole;
  });

  test('Instance method mrecallRule must be executable', () => {
    expect(custom.mrecallRule()).toBe('0');
  });

  test('Instance method mclearRule must be executable', () => {
    expect(custom.mclearRule()).toBe('0');
  });

  test('Instance method maddRule', () => {
    custom.mclearRule();
    expect(custom.mrecallRule()).toBe('0');
    custom.maddRule('');
    expect(custom.mrecallRule()).toBe('0');
    custom.maddRule('7');
    expect(custom.mrecallRule()).toBe('7');
    custom.maddRule('4');
    expect(custom.mrecallRule()).toBe('11');
  });

  test('Instance method msubtractRule', () => {
    custom.mclearRule();
    expect(custom.mrecallRule()).toBe('0');
    custom.msubtractRule('');
    expect(custom.mrecallRule()).toBe('0');
    custom.maddRule('100');
    custom.msubtractRule('20');
    expect(custom.mrecallRule()).toBe('80');
    custom.msubtractRule('20');
    expect(custom.mrecallRule()).toBe('60');
    custom.msubtractRule('100');
    expect(custom.mrecallRule()).toBe('-40');
  });

  test('Instance method multiplicationRule', () => {
    expect(custom.multiplicationRule('3')).toBe('3×');
    expect(custom.multiplicationRule('3+')).toBe('3×');
    expect(custom.multiplicationRule('3-')).toBe('3×');
    expect(custom.multiplicationRule('3×')).toBe('3×');
    expect(custom.multiplicationRule('3÷')).toBe('3×');

    expect(custom.multiplicationRule('')).toBeUndefined();
    expect(custom.multiplicationRule('3^+')).toBeUndefined();
    expect(custom.multiplicationRule('3^-')).toBeUndefined();
    expect(custom.multiplicationRule('√+')).toBeUndefined();
    expect(custom.multiplicationRule('√-')).toBeUndefined();
    expect(custom.multiplicationRule('3.')).toBeUndefined();
    expect(custom.multiplicationRule('3^')).toBeUndefined();
    expect(custom.multiplicationRule('√')).toBeUndefined();
  });

  test('Instance method numberRule', () => {
    expect(custom.numberRule('', '0')).toBe('0');
    expect(custom.numberRule('', '1')).toBe('1');
    expect(custom.numberRule('', '2')).toBe('2');
    expect(custom.numberRule('', '3')).toBe('3');
    expect(custom.numberRule('', '4')).toBe('4');
    expect(custom.numberRule('', '5')).toBe('5');
    expect(custom.numberRule('', '6')).toBe('6');
    expect(custom.numberRule('', '7')).toBe('7');
    expect(custom.numberRule('', '8')).toBe('8');
    expect(custom.numberRule('', '9')).toBe('9');

    expect(custom.numberRule(')', '1')).toBeUndefined();
    expect(custom.numberRule('%', '2')).toBeUndefined();
    expect(custom.numberRule('π', '3')).toBeUndefined();
  });

  test('Instance method parenthesisCloseRule', () => {
    expect(custom.parenthesisCloseRule('(1')).toBe('(1)');
    expect(custom.parenthesisCloseRule('(1%')).toBe('(1%)');
    expect(custom.parenthesisCloseRule('((1')).toBe('((1)');
    expect(custom.parenthesisCloseRule('((1)')).toBe('((1))');

    expect(custom.parenthesisCloseRule('')).toBeUndefined();
    expect(custom.parenthesisCloseRule('(')).toBeUndefined();
    expect(custom.parenthesisCloseRule('(+')).toBeUndefined();
    expect(custom.parenthesisCloseRule('(-')).toBeUndefined();
    expect(custom.parenthesisCloseRule('(1×')).toBeUndefined();
    expect(custom.parenthesisCloseRule('(1÷')).toBeUndefined();
    expect(custom.parenthesisCloseRule('(1.')).toBeUndefined();
    expect(custom.parenthesisCloseRule('(1^')).toBeUndefined();
    expect(custom.parenthesisCloseRule('(√')).toBeUndefined();
    expect(custom.parenthesisCloseRule('123')).toBeUndefined();
    expect(custom.parenthesisCloseRule('((1))')).toBeUndefined();
  });

  test('Instance method parenthesisOpenRule', () => {
    expect(custom.parenthesisOpenRule('')).toBe('(');
    expect(custom.parenthesisOpenRule('0')).toBe('0×(');
    expect(custom.parenthesisOpenRule('1')).toBe('1×(');
    expect(custom.parenthesisOpenRule('2')).toBe('2×(');
    expect(custom.parenthesisOpenRule('3')).toBe('3×(');
    expect(custom.parenthesisOpenRule('4')).toBe('4×(');
    expect(custom.parenthesisOpenRule('5')).toBe('5×(');
    expect(custom.parenthesisOpenRule('6')).toBe('6×(');
    expect(custom.parenthesisOpenRule('7')).toBe('7×(');
    expect(custom.parenthesisOpenRule('8')).toBe('8×(');
    expect(custom.parenthesisOpenRule('9')).toBe('9×(');
    expect(custom.parenthesisOpenRule(')')).toBe(')×(');
    expect(custom.parenthesisOpenRule('%')).toBe('%×(');
    expect(custom.parenthesisOpenRule('π')).toBe('π×(');
    expect(custom.parenthesisOpenRule('-')).toBe('-(');

    expect(custom.parenthesisOpenRule('.')).toBeUndefined();
  });

  test('Instance method percentageRule', () => {
    expect(custom.percentageRule('0')).toBe('0%');
    expect(custom.percentageRule('1')).toBe('1%');
    expect(custom.percentageRule('2')).toBe('2%');
    expect(custom.percentageRule('3')).toBe('3%');
    expect(custom.percentageRule('4')).toBe('4%');
    expect(custom.percentageRule('5')).toBe('5%');
    expect(custom.percentageRule('6')).toBe('6%');
    expect(custom.percentageRule('7')).toBe('7%');
    expect(custom.percentageRule('8')).toBe('8%');
    expect(custom.percentageRule('9')).toBe('9%');
    expect(custom.percentageRule('(9)')).toBe('(9)%');

    expect(custom.percentageRule('')).toBeUndefined();
    expect(custom.percentageRule('+')).toBeUndefined();
  });

  test('Instance method piRule', () => {
    expect(custom.piRule('')).toBe('π');
    expect(custom.piRule('(')).toBe('(π');
    expect(custom.piRule('+')).toBe('+π');
    expect(custom.piRule('-')).toBe('-π');
    expect(custom.piRule('×')).toBe('×π');
    expect(custom.piRule('÷')).toBe('÷π');
    expect(custom.piRule('^')).toBe('^π');
    expect(custom.piRule('√')).toBe('√π');

    expect(custom.piRule('1')).toBeUndefined();
  });

  test('Instance method powerRule', () => {
    expect(custom.powerRule('0')).toBe('0^');
    expect(custom.powerRule('1')).toBe('1^');
    expect(custom.powerRule('2')).toBe('2^');
    expect(custom.powerRule('3')).toBe('3^');
    expect(custom.powerRule('4')).toBe('4^');
    expect(custom.powerRule('5')).toBe('5^');
    expect(custom.powerRule('6')).toBe('6^');
    expect(custom.powerRule('7')).toBe('7^');
    expect(custom.powerRule('8')).toBe('8^');
    expect(custom.powerRule('9')).toBe('9^');
    expect(custom.powerRule('π')).toBe('π^');

    expect(custom.powerRule('')).toBeUndefined();
  });

  test('Instance method sqrtRule', () => {
    expect(custom.sqrtRule('')).toBe('√');
    expect(custom.sqrtRule('0')).toBe('0×√');
    expect(custom.sqrtRule('1')).toBe('1×√');
    expect(custom.sqrtRule('2')).toBe('2×√');
    expect(custom.sqrtRule('3')).toBe('3×√');
    expect(custom.sqrtRule('4')).toBe('4×√');
    expect(custom.sqrtRule('5')).toBe('5×√');
    expect(custom.sqrtRule('6')).toBe('6×√');
    expect(custom.sqrtRule('7')).toBe('7×√');
    expect(custom.sqrtRule('8')).toBe('8×√');
    expect(custom.sqrtRule('9')).toBe('9×√');
    expect(custom.sqrtRule(')')).toBe(')×√');
    expect(custom.sqrtRule('1%')).toBe('1%×√');
    expect(custom.sqrtRule('π')).toBe('π×√');
    expect(custom.sqrtRule('+')).toBe('+√');
    expect(custom.sqrtRule('-')).toBe('-√');
    expect(custom.sqrtRule('×')).toBe('×√');
    expect(custom.sqrtRule('÷')).toBe('÷√');
    expect(custom.sqrtRule('(')).toBe('(√');
    expect(custom.sqrtRule('√')).toBe('√√');

    expect(custom.sqrtRule('.')).toBeUndefined();
  });

  test('Instance method subtractionRule', () => {
    expect(custom.subtractionRule('')).toBe('-');
    expect(custom.subtractionRule('4')).toBe('4-');
    expect(custom.subtractionRule('4+')).toBe('4-');
    expect(custom.subtractionRule('4-')).toBe('4-');
    expect(custom.subtractionRule('4×')).toBe('4-');
    expect(custom.subtractionRule('4÷')).toBe('4-');

    expect(custom.subtractionRule('.')).toBeUndefined();
  });

  test('Instance method showError', () => {
    custom.showError();
    expect(custom.state.error).toBe(true);
    setTimeout(() => {expect(custom.state.error).toBe(false);}, 400);
  });

  test('Instance method buttonClick', () => {
    const fn = custom.buttonClick(custom.subtractionRule);
    const e = {target: {dataset: {value: ''}}};

    expect(typeof fn).toBe('function');

    e.target.dataset.value = '-';
    custom.setState({formula: ''});
    fn(e);
    expect(custom.state.formula).toBe('-');

    custom.setState({formula: '.'});
    fn(e);
    expect(custom.state.formula).toBe('.');
  });

});
