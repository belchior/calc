import macwidget from './macwidget';

const initialState = {
  formula: '',
  error: false,
  startNewCalc: false,
  memory: 0
};

const state = (newState = {}) => ({
  ...initialState,
  ...newState
});

describe('reducer macwidget', () => {
  it('should return the initial state without calc specification', () => {
    expect(macwidget(undefined, undefined)).toEqual(initialState);
  });

  it('should return the initial state with calc specification', () => {
    const action = {calc: 'macwidget'};

    expect(macwidget(undefined, action)).toEqual(initialState);
  });

  it('should make formula empty with the action CLEAR', () => {
    const action = {type: 'CLEAR', calc: 'macwidget'};

    expect(macwidget(state({formula: '123'}), action)).toEqual(state({formula: ''}));
  });

  test('action DIVISION', () => {
    const action = {type: 'DIVISION', calc: 'macwidget'};

    expect(macwidget(state({formula: '2'}), action)).toEqual(state({formula: '2÷'}));
    expect(macwidget(state({formula: '2+'}), action)).toEqual(state({formula: '2÷'}));
    expect(macwidget(state({formula: '2-'}), action)).toEqual(state({formula: '2÷'}));
    expect(macwidget(state({formula: '2×'}), action)).toEqual(state({formula: '2÷'}));
    expect(macwidget(state({formula: '2÷'}), action)).toEqual(state({formula: '2÷'}));

    expect(macwidget(state(), action)).toEqual(state({error: true}));
    expect(macwidget(state({formula: '2^+'}), action)).toEqual(state({formula: '2^+', error: true}));
    expect(macwidget(state({formula: '2^-'}), action)).toEqual(state({formula: '2^-', error: true}));
    expect(macwidget(state({formula: '√+'}), action)).toEqual(state({formula: '√+', error: true}));
    expect(macwidget(state({formula: '√-'}), action)).toEqual(state({formula: '√-', error: true}));
    expect(macwidget(state({formula: '2.'}), action)).toEqual(state({formula: '2.', error: true}));
    expect(macwidget(state({formula: '2^'}), action)).toEqual(state({formula: '2^', error: true}));
    expect(macwidget(state({formula: '√'}), action)).toEqual(state({formula: '√', error: true}));
  });

  test('action DOT', () => {
    const action = {type: 'DOT', calc: 'macwidget'};

    expect(macwidget(state({formula: '1'}), action)).toEqual(state({formula: '1.'}));

    expect(macwidget(state(), action)).toEqual(state({error: true}));
    expect(macwidget(state({formula: '1.2'}), action)).toEqual(state({formula: '1.2', error: true}));
    expect(macwidget(state({formula: '%'}), action)).toEqual(state({formula: '%', error: true}));
    expect(macwidget(state({formula: '^'}), action)).toEqual(state({formula: '^', error: true}));
    expect(macwidget(state({formula: '√'}), action)).toEqual(state({formula: '√', error: true}));
    expect(macwidget(state({formula: 'π'}), action)).toEqual(state({formula: 'π', error: true}));
    expect(macwidget(state({formula: '.'}), action)).toEqual(state({formula: '.', error: true}));
    expect(macwidget(state({formula: '+'}), action)).toEqual(state({formula: '+', error: true}));
    expect(macwidget(state({formula: '-'}), action)).toEqual(state({formula: '-', error: true}));
    expect(macwidget(state({formula: '×'}), action)).toEqual(state({formula: '×', error: true}));
    expect(macwidget(state({formula: '÷'}), action)).toEqual(state({formula: '÷', error: true}));
    expect(macwidget(state({formula: '('}), action)).toEqual(state({formula: '(', error: true}));
    expect(macwidget(state({formula: ')'}), action)).toEqual(state({formula: ')', error: true}));
  });

  test('action EQUALS', () => {
    const action = {type: 'EQUALS', calc: 'macwidget'};

    let originalConsole = global.console;
    global.console = {error: jest.fn()};

    expect(macwidget(state(), action)).toEqual(state({error: true}));
    expect(macwidget(state({formula: '9+8-7×6÷5+((-4-3.2)+√25-2^2)'}), action)).toEqual(state({formula: '2.4', startNewCalc: true}));
    expect(macwidget(state({formula: 'π^2'}), action)).toEqual(state({formula: '9.86960438', startNewCalc: true}));
    expect(macwidget(state({formula: '100×5%+1'}), action)).toEqual(state({formula: '6', startNewCalc: true}));
    expect(macwidget(state({formula: 'π^'}), action)).toEqual(state({formula: 'NaN', startNewCalc: true}));

    expect(macwidget(state({formula: '10÷0'}), action)).toEqual(state({formula: '10÷0', error: true}));

    global.console = originalConsole;
  });

  it('should set error to false with the action ERROR', () => {
    const action = {type: 'ERROR', calc: 'macwidget'};

    expect(macwidget(state({error: true}), action)).toEqual(state({error: false}));
    expect(macwidget(state({error: false}), action)).toEqual(state({error: false}));
  });

  it('should set memory slot to 0 with the action MEMORY_CLEAR', () => {
    const action = {type: 'MEMORY_CLEAR', calc: 'macwidget'};

    expect(macwidget(state({memory: 42}), action)).toEqual(state({memory: 0}));
  });

  it('should subtract memory slot with the value of formula with the action MEMORY_MINUS', () => {
    const action = {type: 'MEMORY_MINUS', calc: 'macwidget'};

    expect(macwidget(state({formula: '12.5', memory: 42}), action)).toEqual(state({formula: '12.5', memory: 29.5, startNewCalc: true}));

    expect(macwidget(state({formula: '', memory: 42}), action)).toEqual(state({memory: 42, error: true}));
    expect(macwidget(state({formula: '1+2', memory: 42}), action)).toEqual(state({formula: '1+2', memory: 42, error: true}));
  });

  it('should add to memory slot with the value of formula with the action MEMORY_PLUS', () => {
    const action = {type: 'MEMORY_PLUS', calc: 'macwidget'};

    expect(macwidget(state({formula: '12.5', memory: 42}), action)).toEqual(state({formula: '12.5', memory: 54.5, startNewCalc: true}));

    expect(macwidget(state({formula: '', memory: 42}), action)).toEqual(state({memory: 42, error: true}));
    expect(macwidget(state({formula: '1+2', memory: 42}), action)).toEqual(state({formula: '1+2', memory: 42, error: true}));
  });

  it('should set to formula the value of memory slot with the action MEMORY_RECALL', () => {
    const action = {type: 'MEMORY_RECALL', calc: 'macwidget'};

    expect(macwidget(state({formula: '12.5', memory: 42}), action)).toEqual(state({formula: '42', memory: 42}));
  });

  test('action MINUS', () => {
    const action = {type: 'MINUS', calc: 'macwidget'};

    expect(macwidget(state(), action)).toEqual(state({formula: '-'}));
    expect(macwidget(state({formula: '4'}), action)).toEqual(state({formula: '4-'}));
    expect(macwidget(state({formula: '4+'}), action)).toEqual(state({formula: '4-'}));
    expect(macwidget(state({formula: '4-'}), action)).toEqual(state({formula: '4-'}));
    expect(macwidget(state({formula: '4×'}), action)).toEqual(state({formula: '4-'}));
    expect(macwidget(state({formula: '4÷'}), action)).toEqual(state({formula: '4-'}));

    expect(macwidget(state({formula: '.'}), action)).toEqual(state({formula: '.', error: true}));
  });

  test('action MULTIPLY', () => {
    const action = {type: 'MULTIPLY', calc: 'macwidget'};

    expect(macwidget(state({formula: '3'}), action)).toEqual(state({formula: '3×'}));
    expect(macwidget(state({formula: '3+'}), action)).toEqual(state({formula: '3×'}));
    expect(macwidget(state({formula: '3-'}), action)).toEqual(state({formula: '3×'}));
    expect(macwidget(state({formula: '3×'}), action)).toEqual(state({formula: '3×'}));
    expect(macwidget(state({formula: '3÷'}), action)).toEqual(state({formula: '3×'}));

    expect(macwidget(state(), action)).toEqual(state({error: true}));
    expect(macwidget(state({formula: '3^+'}), action)).toEqual(state({formula: '3^+', error: true}));
    expect(macwidget(state({formula: '3^-'}), action)).toEqual(state({formula: '3^-', error: true}));
    expect(macwidget(state({formula: '√+'}), action)).toEqual(state({formula: '√+', error: true}));
    expect(macwidget(state({formula: '√-'}), action)).toEqual(state({formula: '√-', error: true}));
    expect(macwidget(state({formula: '3.'}), action)).toEqual(state({formula: '3.', error: true}));
    expect(macwidget(state({formula: '3^'}), action)).toEqual(state({formula: '3^', error: true}));
    expect(macwidget(state({formula: '√'}), action)).toEqual(state({formula: '√', error: true}));
  });

  test('action NUMBER', () => {
    const action = {type: 'NUMBER', calc: 'macwidget'};

    expect(macwidget(state(), {...action, payload: undefined})).toEqual(state({formula: ''}));
    expect(macwidget(state(), {...action, payload: '0'})).toEqual(state({formula: '0'}));
    expect(macwidget(state(), {...action, payload: '1'})).toEqual(state({formula: '1'}));
    expect(macwidget(state(), {...action, payload: '2'})).toEqual(state({formula: '2'}));
    expect(macwidget(state(), {...action, payload: '3'})).toEqual(state({formula: '3'}));
    expect(macwidget(state(), {...action, payload: '4'})).toEqual(state({formula: '4'}));
    expect(macwidget(state(), {...action, payload: '5'})).toEqual(state({formula: '5'}));
    expect(macwidget(state(), {...action, payload: '6'})).toEqual(state({formula: '6'}));
    expect(macwidget(state(), {...action, payload: '7'})).toEqual(state({formula: '7'}));
    expect(macwidget(state(), {...action, payload: '8'})).toEqual(state({formula: '8'}));
    expect(macwidget(state(), {...action, payload: '9'})).toEqual(state({formula: '9'}));

    expect(macwidget(state({formula: '34', startNewCalc: true}), {...action, payload: '9'})).toEqual(state({formula: '9'}));

    expect(macwidget(state({formula: ')'}), {...action, payload: '1'})).toEqual(state({formula: ')', error: true}));
    expect(macwidget(state({formula: '%'}), {...action, payload: '2'})).toEqual(state({formula: '%', error: true}));
    expect(macwidget(state({formula: 'π'}), {...action, payload: '3'})).toEqual(state({formula: 'π', error: true}));
  });

  test('action PLUS', () => {
    const action = {type: 'PLUS', calc: 'macwidget'};

    expect(macwidget(state({formula: '1+'}), action)).toEqual(state({formula: '1+'}));
    expect(macwidget(state({formula: '1-'}), action)).toEqual(state({formula: '1+'}));
    expect(macwidget(state({formula: '1×'}), action)).toEqual(state({formula: '1+'}));
    expect(macwidget(state({formula: '1÷'}), action)).toEqual(state({formula: '1+'}));
    expect(macwidget(state(), action)).toEqual(state({formula: '+'}));

    expect(macwidget(state({formula: '12', startNewCalc: true}), action)).toEqual(state({formula: '+'}));

    expect(macwidget(state({formula: '.'}), action)).toEqual(state({formula: '.', error: true}));
  });

});
