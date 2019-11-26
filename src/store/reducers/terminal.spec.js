/* eslint max-lines:off */
/* eslint max-len:off */

import terminal from './terminal';

const initialState = {
  formula: '',
  results: [],
  error: false,
  startNewCalc: false,
};

const state = (newState = {}) => ({
  ...initialState,
  ...newState,
});

describe('reducer terminal', () => {
  it('should return the initial state without calc specification', () => {
    expect(terminal(undefined, undefined)).toStrictEqual(initialState);
  });

  it('should return the initial state with calc specification', () => {
    const action = { calc: 'terminal' };

    expect(terminal(undefined, action)).toStrictEqual(initialState);
  });

  it('should make formula empty with the action CLEAR', () => {
    const action = { type: 'CLEAR', calc: 'terminal' };

    expect(terminal(state({ formula: '123' }), action)).toStrictEqual(state({ formula: '' }));
  });

  it('should remove the last char of the formula with the action DELETE', () => {
    const action = { type: 'DELETE', calc: 'terminal' };

    expect(terminal(state({ formula: '123' }), action)).toStrictEqual(state({ formula: '12' }));
  });

  it('action DIVISION', () => {
    const action = { type: 'DIVISION', calc: 'terminal' };

    expect(terminal(state({ formula: '2' }), action)).toStrictEqual(state({ formula: '2÷' }));
    expect(terminal(state({ formula: '2+' }), action)).toStrictEqual(state({ formula: '2÷' }));
    expect(terminal(state({ formula: '2-' }), action)).toStrictEqual(state({ formula: '2÷' }));
    expect(terminal(state({ formula: '2×' }), action)).toStrictEqual(state({ formula: '2÷' }));
    expect(terminal(state({ formula: '2÷' }), action)).toStrictEqual(state({ formula: '2÷' }));

    expect(terminal(state(), action)).toStrictEqual(state({ error: true }));
    expect(terminal(state({ formula: '(+' }), action)).toStrictEqual(state({ formula: '(+', error: true }));
    expect(terminal(state({ formula: '(-' }), action)).toStrictEqual(state({ formula: '(-', error: true }));
    expect(terminal(state({ formula: '2.' }), action)).toStrictEqual(state({ formula: '2.', error: true }));
  });

  it('action DOT', () => {
    const action = { type: 'DOT', calc: 'terminal' };

    expect(terminal(state({ formula: '1' }), action)).toStrictEqual(state({ formula: '1.' }));

    expect(terminal(state({ formula: '1.2' }), action)).toStrictEqual(state({ formula: '1.2', error: true }));
    expect(terminal(state(), action)).toStrictEqual(state({ error: true }));
    expect(terminal(state({ formula: '.' }), action)).toStrictEqual(state({ formula: '.', error: true }));
    expect(terminal(state({ formula: '+' }), action)).toStrictEqual(state({ formula: '+', error: true }));
    expect(terminal(state({ formula: '-' }), action)).toStrictEqual(state({ formula: '-', error: true }));
    expect(terminal(state({ formula: '×' }), action)).toStrictEqual(state({ formula: '×', error: true }));
    expect(terminal(state({ formula: '÷' }), action)).toStrictEqual(state({ formula: '÷', error: true }));
    expect(terminal(state({ formula: '(' }), action)).toStrictEqual(state({ formula: '(', error: true }));
    expect(terminal(state({ formula: ')' }), action)).toStrictEqual(state({ formula: ')', error: true }));
  });

  it('action EQUALS', () => {
    const action = { type: 'EQUALS', calc: 'terminal' };

    const originalConsole = global.console;
    global.console = { error: jest.fn() };

    expect(terminal(state(), action)).toStrictEqual(state({ error: true }));
    expect(terminal(state({ formula: '9+8-7×6÷5+((-4-3.2))' }), action)).toStrictEqual(state({ formula: '1.4', results: [ '1.4' ], startNewCalc: true }));
    expect(terminal(state({ formula: '100×5%+1' }), action)).toStrictEqual(state({ formula: '6', results: [ '6' ], startNewCalc: true }));

    expect(terminal(state({ formula: '10÷0' }), action)).toStrictEqual(state({ formula: '10÷0', error: true }));

    global.console = originalConsole;
  });

  it('should set error to false with the action ERROR', () => {
    const action = { type: 'ERROR', calc: 'terminal' };

    expect(terminal(state({ error: true }), action)).toStrictEqual(state({ error: false }));
    expect(terminal(state({ error: false }), action)).toStrictEqual(state({ error: false }));
  });

  it('action MINUS', () => {
    const action = { type: 'MINUS', calc: 'terminal' };

    expect(terminal(state(), action)).toStrictEqual(state({ formula: '-' }));
    expect(terminal(state({ formula: '4' }), action)).toStrictEqual(state({ formula: '4-' }));
    expect(terminal(state({ formula: '4+' }), action)).toStrictEqual(state({ formula: '4-' }));
    expect(terminal(state({ formula: '4-' }), action)).toStrictEqual(state({ formula: '4-' }));
    expect(terminal(state({ formula: '4×' }), action)).toStrictEqual(state({ formula: '4-' }));
    expect(terminal(state({ formula: '4÷' }), action)).toStrictEqual(state({ formula: '4-' }));

    expect(terminal(state({ formula: '.' }), action)).toStrictEqual(state({ formula: '.', error: true }));
  });

  it('action MULTIPLY', () => {
    const action = { type: 'MULTIPLY', calc: 'terminal' };

    expect(terminal(state({ formula: '3' }), action)).toStrictEqual(state({ formula: '3×' }));
    expect(terminal(state({ formula: '3+' }), action)).toStrictEqual(state({ formula: '3×' }));
    expect(terminal(state({ formula: '3-' }), action)).toStrictEqual(state({ formula: '3×' }));
    expect(terminal(state({ formula: '3×' }), action)).toStrictEqual(state({ formula: '3×' }));
    expect(terminal(state({ formula: '3÷' }), action)).toStrictEqual(state({ formula: '3×' }));

    expect(terminal(state(), action)).toStrictEqual(state({ error: true }));
    expect(terminal(state({ formula: '(+' }), action)).toStrictEqual(state({ formula: '(+', error: true }));
    expect(terminal(state({ formula: '(-' }), action)).toStrictEqual(state({ formula: '(-', error: true }));
    expect(terminal(state({ formula: '3.' }), action)).toStrictEqual(state({ formula: '3.', error: true }));
  });

  it('action NUMBER', () => {
    const action = { type: 'NUMBER', calc: 'terminal' };

    expect(terminal(state(), { ...action, payload: undefined })).toStrictEqual(state({ formula: '' }));
    expect(terminal(state(), { ...action, payload: '0' })).toStrictEqual(state({ formula: '0' }));
    expect(terminal(state(), { ...action, payload: '1' })).toStrictEqual(state({ formula: '1' }));
    expect(terminal(state(), { ...action, payload: '2' })).toStrictEqual(state({ formula: '2' }));
    expect(terminal(state(), { ...action, payload: '3' })).toStrictEqual(state({ formula: '3' }));
    expect(terminal(state(), { ...action, payload: '4' })).toStrictEqual(state({ formula: '4' }));
    expect(terminal(state(), { ...action, payload: '5' })).toStrictEqual(state({ formula: '5' }));
    expect(terminal(state(), { ...action, payload: '6' })).toStrictEqual(state({ formula: '6' }));
    expect(terminal(state(), { ...action, payload: '7' })).toStrictEqual(state({ formula: '7' }));
    expect(terminal(state(), { ...action, payload: '8' })).toStrictEqual(state({ formula: '8' }));
    expect(terminal(state(), { ...action, payload: '9' })).toStrictEqual(state({ formula: '9' }));

    expect(terminal(state({ formula: '34', startNewCalc: true }), { ...action, payload: '9' })).toStrictEqual(state({ formula: '9' }));

    expect(terminal(state({ formula: ')' }), { ...action, payload: '1' })).toStrictEqual(state({ formula: ')', error: true }));
  });

  it('action PARENTHESIS_LEFT', () => {
    const action = { type: 'PARENTHESIS_LEFT', calc: 'terminal' };

    expect(terminal(state(), action)).toStrictEqual(state({ formula: '(' }));
    expect(terminal(state({ formula: '0' }), action)).toStrictEqual(state({ formula: '0×(' }));
    expect(terminal(state({ formula: '1' }), action)).toStrictEqual(state({ formula: '1×(' }));
    expect(terminal(state({ formula: '2' }), action)).toStrictEqual(state({ formula: '2×(' }));
    expect(terminal(state({ formula: '3' }), action)).toStrictEqual(state({ formula: '3×(' }));
    expect(terminal(state({ formula: '4' }), action)).toStrictEqual(state({ formula: '4×(' }));
    expect(terminal(state({ formula: '5' }), action)).toStrictEqual(state({ formula: '5×(' }));
    expect(terminal(state({ formula: '6' }), action)).toStrictEqual(state({ formula: '6×(' }));
    expect(terminal(state({ formula: '7' }), action)).toStrictEqual(state({ formula: '7×(' }));
    expect(terminal(state({ formula: '8' }), action)).toStrictEqual(state({ formula: '8×(' }));
    expect(terminal(state({ formula: '9' }), action)).toStrictEqual(state({ formula: '9×(' }));
    expect(terminal(state({ formula: ')' }), action)).toStrictEqual(state({ formula: ')×(' }));
    expect(terminal(state({ formula: '-' }), action)).toStrictEqual(state({ formula: '-(' }));

    expect(terminal(state({ formula: '12', startNewCalc: true }), action)).toStrictEqual(state({ formula: '(' }));

    expect(terminal(state({ formula: '.' }), action)).toStrictEqual(state({ formula: '.', error: true }));
  });

  it('action PARENTHESIS_RIGHT', () => {
    const action = { type: 'PARENTHESIS_RIGHT', calc: 'terminal' };

    expect(terminal(state({ formula: '(1' }), action)).toStrictEqual(state({ formula: '(1)' }));
    expect(terminal(state({ formula: '(1' }), action)).toStrictEqual(state({ formula: '(1)' }));
    expect(terminal(state({ formula: '((1' }), action)).toStrictEqual(state({ formula: '((1)' }));
    expect(terminal(state({ formula: '((1)' }), action)).toStrictEqual(state({ formula: '((1))' }));

    expect(terminal(state(), action)).toStrictEqual(state({ error: true }));
    expect(terminal(state({ formula: '(' }), action)).toStrictEqual(state({ formula: '(', error: true }));
    expect(terminal(state({ formula: '(+' }), action)).toStrictEqual(state({ formula: '(+', error: true }));
    expect(terminal(state({ formula: '(-' }), action)).toStrictEqual(state({ formula: '(-', error: true }));
    expect(terminal(state({ formula: '(1×' }), action)).toStrictEqual(state({ formula: '(1×', error: true }));
    expect(terminal(state({ formula: '(1÷' }), action)).toStrictEqual(state({ formula: '(1÷', error: true }));
    expect(terminal(state({ formula: '(1.' }), action)).toStrictEqual(state({ formula: '(1.', error: true }));
    expect(terminal(state({ formula: '123' }), action)).toStrictEqual(state({ formula: '123', error: true }));
    expect(terminal(state({ formula: '((1))' }), action)).toStrictEqual(state({ formula: '((1))', error: true }));
  });

  it('action PLUS', () => {
    const action = { type: 'PLUS', calc: 'terminal' };

    expect(terminal(state({ formula: '1+' }), action)).toStrictEqual(state({ formula: '1+' }));
    expect(terminal(state({ formula: '1-' }), action)).toStrictEqual(state({ formula: '1+' }));
    expect(terminal(state({ formula: '1×' }), action)).toStrictEqual(state({ formula: '1+' }));
    expect(terminal(state({ formula: '1÷' }), action)).toStrictEqual(state({ formula: '1+' }));
    expect(terminal(state(), action)).toStrictEqual(state({ formula: '+' }));

    expect(terminal(state({ formula: '12', startNewCalc: true }), action)).toStrictEqual(state({ formula: '+' }));

    expect(terminal(state({ formula: '.' }), action)).toStrictEqual(state({ formula: '.', error: true }));
  });
});
