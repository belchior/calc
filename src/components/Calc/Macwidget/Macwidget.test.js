import React from 'react';
import {shallow} from 'enzyme';
import Macwidget from './index';

describe('Macwidget Calc', () => {
  let macwidget;

  beforeEach(() => {
    macwidget = shallow(<Macwidget />).instance();
  });

  test('Instance method additionRule', () => {
    expect(macwidget.additionRule('1+')).toBe('1+');
    expect(macwidget.additionRule('1-')).toBe('1+');
    expect(macwidget.additionRule('1×')).toBe('1+');
    expect(macwidget.additionRule('1÷')).toBe('1+');

    expect(macwidget.additionRule('')).toBe('+');
    expect(macwidget.additionRule('.')).toBeUndefined();
  });

  test('Instance method clearRule', () => {
    expect(macwidget.clearRule('')).toBe('');
    expect(macwidget.clearRule('12345')).toBe('');
  });

  test('Instance method divisionRule', () => {
    expect(macwidget.divisionRule('2')).toBe('2÷');
    expect(macwidget.divisionRule('2+')).toBe('2÷');
    expect(macwidget.divisionRule('2-')).toBe('2÷');
    expect(macwidget.divisionRule('2×')).toBe('2÷');
    expect(macwidget.divisionRule('2÷')).toBe('2÷');

    expect(macwidget.divisionRule('')).toBeUndefined();
    expect(macwidget.divisionRule('2^+')).toBeUndefined();
    expect(macwidget.divisionRule('2^-')).toBeUndefined();
    expect(macwidget.divisionRule('2.')).toBeUndefined();

  });

  test('Instance method dotRule', () => {
    expect(macwidget.dotRule('1')).toBe('1.');
    expect(macwidget.dotRule('1.2')).toBeUndefined();
    expect(macwidget.dotRule('')).toBeUndefined();
    expect(macwidget.dotRule('.')).toBeUndefined();
    expect(macwidget.dotRule('+')).toBeUndefined();
    expect(macwidget.dotRule('-')).toBeUndefined();
    expect(macwidget.dotRule('×')).toBeUndefined();
    expect(macwidget.dotRule('÷')).toBeUndefined();
  });

  test('Instance method equalityRule', () => {
    expect(macwidget.equalityRule('')).toBeUndefined();

    // expect(macwidget.equalityRule('10÷0')).toBeUndefined();
  });

  test('Instance method mrecallRule must be executable', () => {
    expect(macwidget.mrecallRule()).toBe('0');
  });

  test('Instance method mclearRule must be executable', () => {
    expect(macwidget.mclearRule()).toBe('0');
  });

  test('Instance method maddRule', () => {
    macwidget.mclearRule();
    expect(macwidget.mrecallRule()).toBe('0');
    macwidget.maddRule('');
    expect(macwidget.mrecallRule()).toBe('0');
    macwidget.maddRule('7');
    expect(macwidget.mrecallRule()).toBe('7');
    macwidget.maddRule('4');
    expect(macwidget.mrecallRule()).toBe('11');
  });

  test('Instance method msubtractRule', () => {
    macwidget.mclearRule();
    expect(macwidget.mrecallRule()).toBe('0');
    macwidget.msubtractRule('');
    expect(macwidget.mrecallRule()).toBe('0');
    macwidget.maddRule('100');
    macwidget.msubtractRule('20');
    expect(macwidget.mrecallRule()).toBe('80');
    macwidget.msubtractRule('20');
    expect(macwidget.mrecallRule()).toBe('60');
    macwidget.msubtractRule('100');
    expect(macwidget.mrecallRule()).toBe('-40');
  });

  test('Instance method multiplicationRule', () => {
    expect(macwidget.multiplicationRule('3')).toBe('3×');
    expect(macwidget.multiplicationRule('3+')).toBe('3×');
    expect(macwidget.multiplicationRule('3-')).toBe('3×');
    expect(macwidget.multiplicationRule('3×')).toBe('3×');
    expect(macwidget.multiplicationRule('3÷')).toBe('3×');

    expect(macwidget.multiplicationRule('')).toBeUndefined();
    expect(macwidget.multiplicationRule('3.')).toBeUndefined();
  });

  test('Instance method numberRule', () => {
    expect(macwidget.numberRule('', '0')).toBe('0');
    expect(macwidget.numberRule('', '1')).toBe('1');
    expect(macwidget.numberRule('', '2')).toBe('2');
    expect(macwidget.numberRule('', '3')).toBe('3');
    expect(macwidget.numberRule('', '4')).toBe('4');
    expect(macwidget.numberRule('', '5')).toBe('5');
    expect(macwidget.numberRule('', '6')).toBe('6');
    expect(macwidget.numberRule('', '7')).toBe('7');
    expect(macwidget.numberRule('', '8')).toBe('8');
    expect(macwidget.numberRule('', '9')).toBe('9');
  });

  test('Instance method subtractionRule', () => {
    expect(macwidget.subtractionRule('')).toBe('-');
    expect(macwidget.subtractionRule('4')).toBe('4-');
    expect(macwidget.subtractionRule('4+')).toBe('4-');
    expect(macwidget.subtractionRule('4-')).toBe('4-');
    expect(macwidget.subtractionRule('4×')).toBe('4-');
    expect(macwidget.subtractionRule('4÷')).toBe('4-');

    expect(macwidget.subtractionRule('.')).toBeUndefined();
  });

  test('Instance method showError', () => {
    macwidget.showError();
    expect(macwidget.state.error).toBe(true);
    setTimeout(() => {expect(macwidget.state.error).toBe(false);}, 400);
  });

  test('Instance method buttonClick', () => {
    const fn = macwidget.buttonClick(macwidget.subtractionRule);
    const e = {target: {dataset: {value: ''}}};

    expect(typeof fn).toBe('function');

    e.target.dataset.value = '-';
    macwidget.setState({formula: ''});
    fn(e);
    expect(macwidget.state.formula).toBe('-');

    macwidget.setState({formula: '.'});
    fn(e);
    expect(macwidget.state.formula).toBe('.');
  });

});
