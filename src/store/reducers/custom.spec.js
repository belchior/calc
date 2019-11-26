/* eslint max-lines:off */
/* eslint max-len:off */

import custom from './custom';

const initialState = {
  formula: '',
  error: false,
  startNewCalc: false,
  memory: 0,
};

const state = (newState = {}) => ({
  ...initialState,
  ...newState,
});

describe('reducer custom', () => {
  it('should return the initial state without calc specification', () => {
    expect(custom(undefined, undefined)).toStrictEqual(initialState);
  });

  it('should return the initial state with calc specification', () => {
    const action = { calc: 'custom' };

    expect(custom(undefined, action)).toStrictEqual(initialState);
  });

  it('should make formula empty with the action CLEAR', () => {
    const action = { type: 'CLEAR', calc: 'custom' };

    expect(custom(state({ formula: '123' }), action)).toStrictEqual(state({ formula: '' }));
  });

  it('should remove the last char of the formula with the action DELETE', () => {
    const action = { type: 'DELETE', calc: 'custom' };

    expect(custom(state({ formula: '123' }), action)).toStrictEqual(state({ formula: '12' }));
  });

  it('action DIVISION', () => {
    const action = { type: 'DIVISION', calc: 'custom' };

    expect(custom(state({ formula: '2' }), action)).toStrictEqual(state({ formula: '2÷' }));
    expect(custom(state({ formula: '2+' }), action)).toStrictEqual(state({ formula: '2÷' }));
    expect(custom(state({ formula: '2-' }), action)).toStrictEqual(state({ formula: '2÷' }));
    expect(custom(state({ formula: '2×' }), action)).toStrictEqual(state({ formula: '2÷' }));
    expect(custom(state({ formula: '2÷' }), action)).toStrictEqual(state({ formula: '2÷' }));

    expect(custom(state(), action)).toStrictEqual(state({ error: true }));
    expect(custom(state({ formula: '2^+' }), action)).toStrictEqual(state({ formula: '2^+', error: true }));
    expect(custom(state({ formula: '2^-' }), action)).toStrictEqual(state({ formula: '2^-', error: true }));
    expect(custom(state({ formula: '√+' }), action)).toStrictEqual(state({ formula: '√+', error: true }));
    expect(custom(state({ formula: '√-' }), action)).toStrictEqual(state({ formula: '√-', error: true }));
    expect(custom(state({ formula: '2.' }), action)).toStrictEqual(state({ formula: '2.', error: true }));
    expect(custom(state({ formula: '2^' }), action)).toStrictEqual(state({ formula: '2^', error: true }));
    expect(custom(state({ formula: '√' }), action)).toStrictEqual(state({ formula: '√', error: true }));
  });

  it('action DOT', () => {
    const action = { type: 'DOT', calc: 'custom' };

    expect(custom(state({ formula: '1' }), action)).toStrictEqual(state({ formula: '1.' }));

    expect(custom(state(), action)).toStrictEqual(state({ error: true }));
    expect(custom(state({ formula: '1.2' }), action)).toStrictEqual(state({ formula: '1.2', error: true }));
    expect(custom(state({ formula: '%' }), action)).toStrictEqual(state({ formula: '%', error: true }));
    expect(custom(state({ formula: '^' }), action)).toStrictEqual(state({ formula: '^', error: true }));
    expect(custom(state({ formula: '√' }), action)).toStrictEqual(state({ formula: '√', error: true }));
    expect(custom(state({ formula: 'π' }), action)).toStrictEqual(state({ formula: 'π', error: true }));
    expect(custom(state({ formula: '.' }), action)).toStrictEqual(state({ formula: '.', error: true }));
    expect(custom(state({ formula: '+' }), action)).toStrictEqual(state({ formula: '+', error: true }));
    expect(custom(state({ formula: '-' }), action)).toStrictEqual(state({ formula: '-', error: true }));
    expect(custom(state({ formula: '×' }), action)).toStrictEqual(state({ formula: '×', error: true }));
    expect(custom(state({ formula: '÷' }), action)).toStrictEqual(state({ formula: '÷', error: true }));
    expect(custom(state({ formula: '(' }), action)).toStrictEqual(state({ formula: '(', error: true }));
    expect(custom(state({ formula: ')' }), action)).toStrictEqual(state({ formula: ')', error: true }));
  });

  it('action EQUALS', () => {
    const action = { type: 'EQUALS', calc: 'custom' };

    const originalConsole = global.console;
    global.console = { error: jest.fn() };

    expect(custom(state(), action)).toStrictEqual(state({ error: true }));
    expect(custom(state({ formula: '9+8-7×6÷5+((-4-3.2)+√25-2^2)' }), action)).toStrictEqual(state({ formula: '2.4', startNewCalc: true }));
    expect(custom(state({ formula: 'π^2' }), action)).toStrictEqual(state({ formula: '9.86960438', startNewCalc: true }));
    expect(custom(state({ formula: '100×5%+1' }), action)).toStrictEqual(state({ formula: '6', startNewCalc: true }));
    expect(custom(state({ formula: 'π^' }), action)).toStrictEqual(state({ formula: 'π^', error: true, startNewCalc: false }));

    expect(custom(state({ formula: '10÷0' }), action)).toStrictEqual(state({ formula: '10÷0', error: true }));

    global.console = originalConsole;
  });

  it('should set error to false with the action ERROR', () => {
    const action = { type: 'ERROR', calc: 'custom' };

    expect(custom(state({ error: true }), action)).toStrictEqual(state({ error: false }));
    expect(custom(state({ error: false }), action)).toStrictEqual(state({ error: false }));
  });

  it('should set memory slot to 0 with the action MEMORY_CLEAR', () => {
    const action = { type: 'MEMORY_CLEAR', calc: 'custom' };

    expect(custom(state({ memory: 42 }), action)).toStrictEqual(state({ memory: 0 }));
  });

  it('should subtract memory slot with the value of formula with the action MEMORY_MINUS', () => {
    const action = { type: 'MEMORY_MINUS', calc: 'custom' };

    expect(custom(state({ formula: '12.5', memory: 42 }), action)).toStrictEqual(state({ formula: '12.5', memory: 29.5, startNewCalc: true }));

    expect(custom(state({ formula: '', memory: 42 }), action)).toStrictEqual(state({ memory: 42, error: true }));
    expect(custom(state({ formula: '1+2', memory: 42 }), action)).toStrictEqual(state({ formula: '1+2', memory: 42, error: true }));
  });

  it('should add to memory slot with the value of formula with the action MEMORY_PLUS', () => {
    const action = { type: 'MEMORY_PLUS', calc: 'custom' };

    expect(custom(state({ formula: '12.5', memory: 42 }), action)).toStrictEqual(state({ formula: '12.5', memory: 54.5, startNewCalc: true }));
    expect(custom(state({ formula: '', memory: 42 }), action)).toStrictEqual(state({ memory: 42, error: true }));
    expect(custom(state({ formula: '1+2', memory: 42 }), action)).toStrictEqual(state({ formula: '1+2', memory: 42, error: true }));
  });

  it('should set to formula the value of memory slot with the action MEMORY_RECALL', () => {
    const action = { type: 'MEMORY_RECALL', calc: 'custom' };

    expect(custom(state({ formula: '12.5', memory: 42 }), action)).toStrictEqual(state({ formula: '42', memory: 42 }));
  });

  it('action MINUS', () => {
    const action = { type: 'MINUS', calc: 'custom' };

    expect(custom(state(), action)).toStrictEqual(state({ formula: '-' }));
    expect(custom(state({ formula: '4' }), action)).toStrictEqual(state({ formula: '4-' }));
    expect(custom(state({ formula: '4+' }), action)).toStrictEqual(state({ formula: '4-' }));
    expect(custom(state({ formula: '4-' }), action)).toStrictEqual(state({ formula: '4-' }));
    expect(custom(state({ formula: '4×' }), action)).toStrictEqual(state({ formula: '4-' }));
    expect(custom(state({ formula: '4÷' }), action)).toStrictEqual(state({ formula: '4-' }));

    expect(custom(state({ formula: '.' }), action)).toStrictEqual(state({ formula: '.', error: true }));
  });

  it('action MULTIPLY', () => {
    const action = { type: 'MULTIPLY', calc: 'custom' };

    expect(custom(state({ formula: '3' }), action)).toStrictEqual(state({ formula: '3×' }));
    expect(custom(state({ formula: '3+' }), action)).toStrictEqual(state({ formula: '3×' }));
    expect(custom(state({ formula: '3-' }), action)).toStrictEqual(state({ formula: '3×' }));
    expect(custom(state({ formula: '3×' }), action)).toStrictEqual(state({ formula: '3×' }));
    expect(custom(state({ formula: '3÷' }), action)).toStrictEqual(state({ formula: '3×' }));

    expect(custom(state(), action)).toStrictEqual(state({ error: true }));
    expect(custom(state({ formula: '3^+' }), action)).toStrictEqual(state({ formula: '3^+', error: true }));
    expect(custom(state({ formula: '3^-' }), action)).toStrictEqual(state({ formula: '3^-', error: true }));
    expect(custom(state({ formula: '√+' }), action)).toStrictEqual(state({ formula: '√+', error: true }));
    expect(custom(state({ formula: '√-' }), action)).toStrictEqual(state({ formula: '√-', error: true }));
    expect(custom(state({ formula: '3.' }), action)).toStrictEqual(state({ formula: '3.', error: true }));
    expect(custom(state({ formula: '3^' }), action)).toStrictEqual(state({ formula: '3^', error: true }));
    expect(custom(state({ formula: '√' }), action)).toStrictEqual(state({ formula: '√', error: true }));
  });

  it('action NUMBER', () => {
    const action = { type: 'NUMBER', calc: 'custom' };

    expect(custom(state(), { ...action, payload: undefined })).toStrictEqual(state({ formula: '' }));
    expect(custom(state(), { ...action, payload: '0' })).toStrictEqual(state({ formula: '0' }));
    expect(custom(state(), { ...action, payload: '1' })).toStrictEqual(state({ formula: '1' }));
    expect(custom(state(), { ...action, payload: '2' })).toStrictEqual(state({ formula: '2' }));
    expect(custom(state(), { ...action, payload: '3' })).toStrictEqual(state({ formula: '3' }));
    expect(custom(state(), { ...action, payload: '4' })).toStrictEqual(state({ formula: '4' }));
    expect(custom(state(), { ...action, payload: '5' })).toStrictEqual(state({ formula: '5' }));
    expect(custom(state(), { ...action, payload: '6' })).toStrictEqual(state({ formula: '6' }));
    expect(custom(state(), { ...action, payload: '7' })).toStrictEqual(state({ formula: '7' }));
    expect(custom(state(), { ...action, payload: '8' })).toStrictEqual(state({ formula: '8' }));
    expect(custom(state(), { ...action, payload: '9' })).toStrictEqual(state({ formula: '9' }));

    expect(custom(state({ formula: '34', startNewCalc: true }), { ...action, payload: '9' })).toStrictEqual(state({ formula: '9' }));

    expect(custom(state({ formula: ')' }), { ...action, payload: '1' })).toStrictEqual(state({ formula: ')', error: true }));
    expect(custom(state({ formula: '%' }), { ...action, payload: '2' })).toStrictEqual(state({ formula: '%', error: true }));
    expect(custom(state({ formula: 'π' }), { ...action, payload: '3' })).toStrictEqual(state({ formula: 'π', error: true }));
  });

  it('action PARENTHESIS_LEFT', () => {
    const action = { type: 'PARENTHESIS_LEFT', calc: 'custom' };

    expect(custom(state(), action)).toStrictEqual(state({ formula: '(' }));
    expect(custom(state({ formula: '0' }), action)).toStrictEqual(state({ formula: '0×(' }));
    expect(custom(state({ formula: '1' }), action)).toStrictEqual(state({ formula: '1×(' }));
    expect(custom(state({ formula: '2' }), action)).toStrictEqual(state({ formula: '2×(' }));
    expect(custom(state({ formula: '3' }), action)).toStrictEqual(state({ formula: '3×(' }));
    expect(custom(state({ formula: '4' }), action)).toStrictEqual(state({ formula: '4×(' }));
    expect(custom(state({ formula: '5' }), action)).toStrictEqual(state({ formula: '5×(' }));
    expect(custom(state({ formula: '6' }), action)).toStrictEqual(state({ formula: '6×(' }));
    expect(custom(state({ formula: '7' }), action)).toStrictEqual(state({ formula: '7×(' }));
    expect(custom(state({ formula: '8' }), action)).toStrictEqual(state({ formula: '8×(' }));
    expect(custom(state({ formula: '9' }), action)).toStrictEqual(state({ formula: '9×(' }));
    expect(custom(state({ formula: ')' }), action)).toStrictEqual(state({ formula: ')×(' }));
    expect(custom(state({ formula: '%' }), action)).toStrictEqual(state({ formula: '%×(' }));
    expect(custom(state({ formula: 'π' }), action)).toStrictEqual(state({ formula: 'π×(' }));
    expect(custom(state({ formula: '-' }), action)).toStrictEqual(state({ formula: '-(' }));

    expect(custom(state({ formula: '12', startNewCalc: true }), action)).toStrictEqual(state({ formula: '(' }));

    expect(custom(state({ formula: '.' }), action)).toStrictEqual(state({ formula: '.', error: true }));
  });

  it('action PARENTHESIS_RIGHT', () => {
    const action = { type: 'PARENTHESIS_RIGHT', calc: 'custom' };

    expect(custom(state({ formula: '(1' }), action)).toStrictEqual(state({ formula: '(1)' }));
    expect(custom(state({ formula: '(1%' }), action)).toStrictEqual(state({ formula: '(1%)' }));
    expect(custom(state({ formula: '((1' }), action)).toStrictEqual(state({ formula: '((1)' }));
    expect(custom(state({ formula: '((1)' }), action)).toStrictEqual(state({ formula: '((1))' }));

    expect(custom(state(), action)).toStrictEqual(state({ error: true }));
    expect(custom(state({ formula: '(' }), action)).toStrictEqual(state({ formula: '(', error: true }));
    expect(custom(state({ formula: '(+' }), action)).toStrictEqual(state({ formula: '(+', error: true }));
    expect(custom(state({ formula: '(-' }), action)).toStrictEqual(state({ formula: '(-', error: true }));
    expect(custom(state({ formula: '(1×' }), action)).toStrictEqual(state({ formula: '(1×', error: true }));
    expect(custom(state({ formula: '(1÷' }), action)).toStrictEqual(state({ formula: '(1÷', error: true }));
    expect(custom(state({ formula: '(1.' }), action)).toStrictEqual(state({ formula: '(1.', error: true }));
    expect(custom(state({ formula: '(1^' }), action)).toStrictEqual(state({ formula: '(1^', error: true }));
    expect(custom(state({ formula: '(√' }), action)).toStrictEqual(state({ formula: '(√', error: true }));
    expect(custom(state({ formula: '123' }), action)).toStrictEqual(state({ formula: '123', error: true }));
    expect(custom(state({ formula: '((1))' }), action)).toStrictEqual(state({ formula: '((1))', error: true }));
  });


  it('action PERCENTAGE', () => {
    const action = { type: 'PERCENTAGE', calc: 'custom' };

    expect(custom(state({ formula: '0' }), action)).toStrictEqual(state({ formula: '0%' }));
    expect(custom(state({ formula: '1' }), action)).toStrictEqual(state({ formula: '1%' }));
    expect(custom(state({ formula: '2' }), action)).toStrictEqual(state({ formula: '2%' }));
    expect(custom(state({ formula: '3' }), action)).toStrictEqual(state({ formula: '3%' }));
    expect(custom(state({ formula: '4' }), action)).toStrictEqual(state({ formula: '4%' }));
    expect(custom(state({ formula: '5' }), action)).toStrictEqual(state({ formula: '5%' }));
    expect(custom(state({ formula: '6' }), action)).toStrictEqual(state({ formula: '6%' }));
    expect(custom(state({ formula: '7' }), action)).toStrictEqual(state({ formula: '7%' }));
    expect(custom(state({ formula: '8' }), action)).toStrictEqual(state({ formula: '8%' }));
    expect(custom(state({ formula: '9' }), action)).toStrictEqual(state({ formula: '9%' }));
    expect(custom(state({ formula: '(9)' }), action)).toStrictEqual(state({ formula: '(9)%' }));

    expect(custom(state(), action)).toStrictEqual(state({ error: true }));
    expect(custom(state({ formula: '+' }), action)).toStrictEqual(state({ formula: '+', error: true }));
  });

  it('action PI', () => {
    const action = { type: 'PI', calc: 'custom' };

    expect(custom(state(), action)).toStrictEqual(state({ formula: 'π' }));
    expect(custom(state({ formula: '(' }), action)).toStrictEqual(state({ formula: '(π' }));
    expect(custom(state({ formula: '+' }), action)).toStrictEqual(state({ formula: '+π' }));
    expect(custom(state({ formula: '-' }), action)).toStrictEqual(state({ formula: '-π' }));
    expect(custom(state({ formula: '×' }), action)).toStrictEqual(state({ formula: '×π' }));
    expect(custom(state({ formula: '÷' }), action)).toStrictEqual(state({ formula: '÷π' }));
    expect(custom(state({ formula: '^' }), action)).toStrictEqual(state({ formula: '^π' }));
    expect(custom(state({ formula: '√' }), action)).toStrictEqual(state({ formula: '√π' }));

    expect(custom(state({ formula: '123', startNewCalc: true }), action)).toStrictEqual(state({ formula: 'π' }));

    expect(custom(state({ formula: '1' }), action)).toStrictEqual(state({ formula: '1', error: true }));
  });

  it('action PLUS', () => {
    const action = { type: 'PLUS', calc: 'custom' };

    expect(custom(state({ formula: '1+' }), action)).toStrictEqual(state({ formula: '1+' }));
    expect(custom(state({ formula: '1-' }), action)).toStrictEqual(state({ formula: '1+' }));
    expect(custom(state({ formula: '1×' }), action)).toStrictEqual(state({ formula: '1+' }));
    expect(custom(state({ formula: '1÷' }), action)).toStrictEqual(state({ formula: '1+' }));
    expect(custom(state(), action)).toStrictEqual(state({ formula: '+' }));

    expect(custom(state({ formula: '12', startNewCalc: true }), action)).toStrictEqual(state({ formula: '+' }));

    expect(custom(state({ formula: '.' }), action)).toStrictEqual(state({ formula: '.', error: true }));
  });

  it('action POWER', () => {
    const action = { type: 'POWER', calc: 'custom' };

    expect(custom(state({ formula: '0' }), action)).toStrictEqual(state({ formula: '0^' }));
    expect(custom(state({ formula: '1' }), action)).toStrictEqual(state({ formula: '1^' }));
    expect(custom(state({ formula: '2' }), action)).toStrictEqual(state({ formula: '2^' }));
    expect(custom(state({ formula: '3' }), action)).toStrictEqual(state({ formula: '3^' }));
    expect(custom(state({ formula: '4' }), action)).toStrictEqual(state({ formula: '4^' }));
    expect(custom(state({ formula: '5' }), action)).toStrictEqual(state({ formula: '5^' }));
    expect(custom(state({ formula: '6' }), action)).toStrictEqual(state({ formula: '6^' }));
    expect(custom(state({ formula: '7' }), action)).toStrictEqual(state({ formula: '7^' }));
    expect(custom(state({ formula: '8' }), action)).toStrictEqual(state({ formula: '8^' }));
    expect(custom(state({ formula: '9' }), action)).toStrictEqual(state({ formula: '9^' }));
    expect(custom(state({ formula: 'π' }), action)).toStrictEqual(state({ formula: 'π^' }));

    expect(custom(state(), action)).toStrictEqual(state({ error: true }));
  });

  it('action SQRT', () => {
    const action = { type: 'SQRT', calc: 'custom' };

    expect(custom(state(), action)).toStrictEqual(state({ formula: '√' }));
    expect(custom(state({ formula: '0' }), action)).toStrictEqual(state({ formula: '0×√' }));
    expect(custom(state({ formula: '1' }), action)).toStrictEqual(state({ formula: '1×√' }));
    expect(custom(state({ formula: '2' }), action)).toStrictEqual(state({ formula: '2×√' }));
    expect(custom(state({ formula: '3' }), action)).toStrictEqual(state({ formula: '3×√' }));
    expect(custom(state({ formula: '4' }), action)).toStrictEqual(state({ formula: '4×√' }));
    expect(custom(state({ formula: '5' }), action)).toStrictEqual(state({ formula: '5×√' }));
    expect(custom(state({ formula: '6' }), action)).toStrictEqual(state({ formula: '6×√' }));
    expect(custom(state({ formula: '7' }), action)).toStrictEqual(state({ formula: '7×√' }));
    expect(custom(state({ formula: '8' }), action)).toStrictEqual(state({ formula: '8×√' }));
    expect(custom(state({ formula: '9' }), action)).toStrictEqual(state({ formula: '9×√' }));
    expect(custom(state({ formula: ')' }), action)).toStrictEqual(state({ formula: ')×√' }));
    expect(custom(state({ formula: '1%' }), action)).toStrictEqual(state({ formula: '1%×√' }));
    expect(custom(state({ formula: 'π' }), action)).toStrictEqual(state({ formula: 'π×√' }));
    expect(custom(state({ formula: '+' }), action)).toStrictEqual(state({ formula: '+√' }));
    expect(custom(state({ formula: '-' }), action)).toStrictEqual(state({ formula: '-√' }));
    expect(custom(state({ formula: '×' }), action)).toStrictEqual(state({ formula: '×√' }));
    expect(custom(state({ formula: '÷' }), action)).toStrictEqual(state({ formula: '÷√' }));
    expect(custom(state({ formula: '(' }), action)).toStrictEqual(state({ formula: '(√' }));
    expect(custom(state({ formula: '√' }), action)).toStrictEqual(state({ formula: '√√' }));

    expect(custom(state({ formula: '.' }), action)).toStrictEqual(state({ formula: '.', error: true }));
  });
});
