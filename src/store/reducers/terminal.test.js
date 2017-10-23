import terminal from './terminal';

const initialState = {
  formula: '',
  results: [],
  error: false,
  startNewCalc: false
};

const state = (newState = {}) => ({
  ...initialState,
  ...newState
});

describe('reducer terminal', () => {
  it('should return the initial state without calc specification', () => {
    expect(terminal(undefined, undefined)).toEqual(initialState);
  });

  it('should return the initial state with calc specification', () => {
    const action = {calc: 'terminal'};

    expect(terminal(undefined, action)).toEqual(initialState);
  });

  it('should make formula empty with the action CLEAR', () => {
    const action = {type: 'CLEAR', calc: 'terminal'};

    expect(terminal(state({formula: '123'}), action)).toEqual(state({formula: ''}));
  });

  it('should remove the last char of the formula with the action DELETE', () => {
    const action = {type: 'DELETE', calc: 'terminal'};

    expect(terminal(state({formula: '123'}), action)).toEqual(state({formula: '12'}));
  });

  test('action DIVISION', () => {
    const action = {type: 'DIVISION', calc: 'terminal'};

    expect(terminal(state({formula: '2'}), action)).toEqual(state({formula: '2÷'}));
    expect(terminal(state({formula: '2+'}), action)).toEqual(state({formula: '2÷'}));
    expect(terminal(state({formula: '2-'}), action)).toEqual(state({formula: '2÷'}));
    expect(terminal(state({formula: '2×'}), action)).toEqual(state({formula: '2÷'}));
    expect(terminal(state({formula: '2÷'}), action)).toEqual(state({formula: '2÷'}));

    expect(terminal(state(), action)).toEqual(state({error: true}));
    expect(terminal(state({formula: '(+'}), action)).toEqual(state({formula: '(+', error: true}));
    expect(terminal(state({formula: '(-'}), action)).toEqual(state({formula: '(-', error: true}));
    expect(terminal(state({formula: '2.'}), action)).toEqual(state({formula: '2.', error: true}));
  });

  test('action DOT', () => {
    const action = {type: 'DOT', calc: 'terminal'};

    expect(terminal(state({formula: '1'}), action)).toEqual(state({formula: '1.'}));

    expect(terminal(state({formula: '1.2'}), action)).toEqual(state({formula: '1.2', error: true}));
    expect(terminal(state(), action)).toEqual(state({error: true}));
    expect(terminal(state({formula: '.'}), action)).toEqual(state({formula: '.', error: true}));
    expect(terminal(state({formula: '+'}), action)).toEqual(state({formula: '+', error: true}));
    expect(terminal(state({formula: '-'}), action)).toEqual(state({formula: '-', error: true}));
    expect(terminal(state({formula: '×'}), action)).toEqual(state({formula: '×', error: true}));
    expect(terminal(state({formula: '÷'}), action)).toEqual(state({formula: '÷', error: true}));
    expect(terminal(state({formula: '('}), action)).toEqual(state({formula: '(', error: true}));
    expect(terminal(state({formula: ')'}), action)).toEqual(state({formula: ')', error: true}));
  });

  test('action EQUALS', () => {
    const action = {type: 'EQUALS', calc: 'terminal'};

    let originalConsole = global.console;
    global.console = {error: jest.fn()};

    expect(terminal(state(), action)).toEqual(state({error: true}));
    expect(terminal(state({formula: '9+8-7×6÷5+((-4-3.2))'}), action)).toEqual(state({formula: '1.4', results: ['1.4'], startNewCalc: true}));
    expect(terminal(state({formula: '100×5%+1'}), action)).toEqual(state({formula: '6', results: ['6'], startNewCalc: true}));

    expect(terminal(state({formula: '10÷0'}), action)).toEqual(state({formula: '10÷0', error: true}));

    global.console = originalConsole;
  });

  it('should set error to false with the action ERROR', () => {
    const action = {type: 'ERROR', calc: 'terminal'};

    expect(terminal(state({error: true}), action)).toEqual(state({error: false}));
    expect(terminal(state({error: false}), action)).toEqual(state({error: false}));
  });

  test('action MINUS', () => {
    const action = {type: 'MINUS', calc: 'terminal'};

    expect(terminal(state(), action)).toEqual(state({formula: '-'}));
    expect(terminal(state({formula: '4'}), action)).toEqual(state({formula: '4-'}));
    expect(terminal(state({formula: '4+'}), action)).toEqual(state({formula: '4-'}));
    expect(terminal(state({formula: '4-'}), action)).toEqual(state({formula: '4-'}));
    expect(terminal(state({formula: '4×'}), action)).toEqual(state({formula: '4-'}));
    expect(terminal(state({formula: '4÷'}), action)).toEqual(state({formula: '4-'}));

    expect(terminal(state({formula: '.'}), action)).toEqual(state({formula: '.', error: true}));
  });

  test('action MULTIPLY', () => {
    const action = {type: 'MULTIPLY', calc: 'terminal'};

    expect(terminal(state({formula: '3'}), action)).toEqual(state({formula: '3×'}));
    expect(terminal(state({formula: '3+'}), action)).toEqual(state({formula: '3×'}));
    expect(terminal(state({formula: '3-'}), action)).toEqual(state({formula: '3×'}));
    expect(terminal(state({formula: '3×'}), action)).toEqual(state({formula: '3×'}));
    expect(terminal(state({formula: '3÷'}), action)).toEqual(state({formula: '3×'}));

    expect(terminal(state(), action)).toEqual(state({error: true}));
    expect(terminal(state({formula: '(+'}), action)).toEqual(state({formula: '(+', error: true}));
    expect(terminal(state({formula: '(-'}), action)).toEqual(state({formula: '(-', error: true}));
    expect(terminal(state({formula: '3.'}), action)).toEqual(state({formula: '3.', error: true}));
  });

  test('action NUMBER', () => {
    const action = {type: 'NUMBER', calc: 'terminal'};

    expect(terminal(state(), {...action, payload: undefined})).toEqual(state({formula: ''}));
    expect(terminal(state(), {...action, payload: '0'})).toEqual(state({formula: '0'}));
    expect(terminal(state(), {...action, payload: '1'})).toEqual(state({formula: '1'}));
    expect(terminal(state(), {...action, payload: '2'})).toEqual(state({formula: '2'}));
    expect(terminal(state(), {...action, payload: '3'})).toEqual(state({formula: '3'}));
    expect(terminal(state(), {...action, payload: '4'})).toEqual(state({formula: '4'}));
    expect(terminal(state(), {...action, payload: '5'})).toEqual(state({formula: '5'}));
    expect(terminal(state(), {...action, payload: '6'})).toEqual(state({formula: '6'}));
    expect(terminal(state(), {...action, payload: '7'})).toEqual(state({formula: '7'}));
    expect(terminal(state(), {...action, payload: '8'})).toEqual(state({formula: '8'}));
    expect(terminal(state(), {...action, payload: '9'})).toEqual(state({formula: '9'}));

    expect(terminal(state({formula: '34', startNewCalc: true}), {...action, payload: '9'})).toEqual(state({formula: '9'}));

    expect(terminal(state({formula: ')'}), {...action, payload: '1'})).toEqual(state({formula: ')', error: true}));
  });

  test('action PARENTHESIS_LEFT', () => {
    const action = {type: 'PARENTHESIS_LEFT', calc: 'terminal'};

    expect(terminal(state(), action)).toEqual(state({formula: '('}));
    expect(terminal(state({formula: '0'}), action)).toEqual(state({formula: '0×('}));
    expect(terminal(state({formula: '1'}), action)).toEqual(state({formula: '1×('}));
    expect(terminal(state({formula: '2'}), action)).toEqual(state({formula: '2×('}));
    expect(terminal(state({formula: '3'}), action)).toEqual(state({formula: '3×('}));
    expect(terminal(state({formula: '4'}), action)).toEqual(state({formula: '4×('}));
    expect(terminal(state({formula: '5'}), action)).toEqual(state({formula: '5×('}));
    expect(terminal(state({formula: '6'}), action)).toEqual(state({formula: '6×('}));
    expect(terminal(state({formula: '7'}), action)).toEqual(state({formula: '7×('}));
    expect(terminal(state({formula: '8'}), action)).toEqual(state({formula: '8×('}));
    expect(terminal(state({formula: '9'}), action)).toEqual(state({formula: '9×('}));
    expect(terminal(state({formula: ')'}), action)).toEqual(state({formula: ')×('}));
    expect(terminal(state({formula: '-'}), action)).toEqual(state({formula: '-('}));

    expect(terminal(state({formula: '12', startNewCalc: true}), action)).toEqual(state({formula: '('}));

    expect(terminal(state({formula: '.'}), action)).toEqual(state({formula: '.', error: true}));
  });

  test('action PARENTHESIS_RIGHT', () => {
    const action = {type: 'PARENTHESIS_RIGHT', calc: 'terminal'};

    expect(terminal(state({formula: '(1'}), action)).toEqual(state({formula: '(1)'}));
    expect(terminal(state({formula: '(1'}), action)).toEqual(state({formula: '(1)'}));
    expect(terminal(state({formula: '((1'}), action)).toEqual(state({formula: '((1)'}));
    expect(terminal(state({formula: '((1)'}), action)).toEqual(state({formula: '((1))'}));

    expect(terminal(state(), action)).toEqual(state({error: true}));
    expect(terminal(state({formula: '('}), action)).toEqual(state({formula: '(', error: true}));
    expect(terminal(state({formula: '(+'}), action)).toEqual(state({formula: '(+', error: true}));
    expect(terminal(state({formula: '(-'}), action)).toEqual(state({formula: '(-', error: true}));
    expect(terminal(state({formula: '(1×'}), action)).toEqual(state({formula: '(1×', error: true}));
    expect(terminal(state({formula: '(1÷'}), action)).toEqual(state({formula: '(1÷', error: true}));
    expect(terminal(state({formula: '(1.'}), action)).toEqual(state({formula: '(1.', error: true}));
    expect(terminal(state({formula: '123'}), action)).toEqual(state({formula: '123', error: true}));
    expect(terminal(state({formula: '((1))'}), action)).toEqual(state({formula: '((1))', error: true}));
  });

  test('action PLUS', () => {
    const action = {type: 'PLUS', calc: 'terminal'};

    expect(terminal(state({formula: '1+'}), action)).toEqual(state({formula: '1+'}));
    expect(terminal(state({formula: '1-'}), action)).toEqual(state({formula: '1+'}));
    expect(terminal(state({formula: '1×'}), action)).toEqual(state({formula: '1+'}));
    expect(terminal(state({formula: '1÷'}), action)).toEqual(state({formula: '1+'}));
    expect(terminal(state(), action)).toEqual(state({formula: '+'}));

    expect(terminal(state({formula: '12', startNewCalc: true}), action)).toEqual(state({formula: '+'}));

    expect(terminal(state({formula: '.'}), action)).toEqual(state({formula: '.', error: true}));
  });
});
