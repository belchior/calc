import Calc from '../../components/Calc/Calc.js';

const initialState = {
  formula: '',
  results: [],
  error: false,
  startNewCalc: false,
};

const clearRule = state => ({
  ...state,
  results: [],
  formula: '',
  startNewCalc: false,
});

const deleteRule = state => ({
  ...state,
  formula: state.formula.slice(0, -1),
  startNewCalc: false,
});

const disableError = state => ({
  ...state,
  error: false,
});

const divisionRule = (state, char = '÷') => {
  if (state.formula && state.formula.slice(-1).search(/[+\-×÷]/u) >= 0) {
    if (state.formula.length === 1) {
      return {
        ...state,
        error: true,
      };
    }
    if (state.formula.slice(-2).search(/[(]/u) < 0) {
      return {
        ...state,
        formula: state.formula.slice(0, -1) + char,
        startNewCalc: false,
      };
    }

  } else if (state.formula && state.formula.slice(-1).search(/[(.]/u) < 0) {
    return {
      ...state,
      formula: state.formula + char,
      startNewCalc: false,
    };
  }
  return {
    ...state,
    error: true,
  };
};

const dotRule = (state, char = '.') => {
  if (
    state.formula && state.formula.slice(-1).search(/[.+\-×÷()]/u) < 0 &&
    state.formula.search(/\d+\.\d+$/u) < 0 &&
    state.startNewCalc === false
  ) {
    return {
      ...state,
      formula: state.formula + char,
    };
  }
  return {
    ...state,
    error: true,
  };
};

const equalsRule = (state) => {
  if (state.formula === '') {
    return {
      ...state,
      error: true,
      startNewCalc: false,
    };
  }
  try {
    const result = String(Calc.calculate(state.formula));

    return {
      ...state,
      results: state.results.concat([ result ]),
      formula: result,
      startNewCalc: true,
    };

  } catch (err) {
    /* eslint no-console: 0 */
    console.error(err);
    return {
      ...state,
      error: true,
    };
  }
};

const minusRule = (state, char = '-') => {
  if (state.formula === '') {
    return {
      ...state,
      formula: state.formula + char,
      startNewCalc: false,
    };
  }
  if (state.formula.slice(-1).search(/[+\-×÷]/u) >= 0) {
    return {
      ...state,
      formula: state.formula.slice(0, -1) + char,
      startNewCalc: false,
    };
  }
  if (state.formula.slice(-1).search(/[.]/u) < 0) {
    return {
      ...state,
      formula: state.formula + char,
      startNewCalc: false,
    };
  }
  return {
    ...state,
    error: true,
  };
};

const multiplicationRule = (state, char = '×') => {
  if (state.formula && state.formula.slice(-1).search(/[+\-×÷]/u) >= 0) {
    if (state.formula.length === 1) {
      return {
        ...state,
        error: true,
      };
    }
    if (state.formula.slice(-2).search(/[(]/u) < 0) {
      return {
        ...state,
        formula: state.formula.slice(0, -1) + char,
        startNewCalc: false,
      };
    }

  } else if (state.formula && state.formula.slice(-1).search(/[(.]/u) < 0) {
    return {
      ...state,
      formula: state.formula + char,
      startNewCalc: false,
    };
  }
  return {
    ...state,
    error: true,
  };
};

const numberRule = (state, char = '') => {
  if (state.formula === '' || state.formula.slice(-1).search(/[)]/u) < 0) {
    return {
      ...state,
      formula: state.startNewCalc ? char : state.formula + char,
      startNewCalc: false,
    };
  }
  return {
    ...state,
    error: true,
  };
};

const parenthesisLeftRule = (state, char = '(') => {
  if (state.formula === '') {
    return {
      ...state,
      formula: state.formula + char,
      startNewCalc: false,
    };
  }
  if (state.formula.slice(-1).search(/[0-9)]/u) >= 0) {
    return {
      ...state,
      formula: state.startNewCalc ? char : `${state.formula}×${char}`,
      startNewCalc: false,
    };
  }
  if (state.formula.slice(-1).search(/[.]/u) < 0) {
    return {
      ...state,
      formula: state.formula + char,
      startNewCalc: false,
    };
  }
  return {
    ...state,
    error: true,
  };
};

const parenthesisRightRule = (state, char = ')') => {
  const opens = state.formula.match(/[(]/ug);
  const closes = state.formula.match(/[)]/ug);

  if ((opens && !closes) || (opens && closes && opens.length > closes.length)) {
    if (state.formula.slice(-1).search(/[(+\-×÷.]/u) < 0) {
      return {
        ...state,
        formula: state.formula + char,
        startNewCalc: false,
      };
    }
  }
  return {
    ...state,
    error: true,
  };
};

const plusRule = (state, char = '+') => {
  if (state.formula && state.formula.slice(-1).search(/[+\-×÷]/u) >= 0) {
    return {
      ...state,
      formula: state.formula.slice(0, -1) + char,
      startNewCalc: false,
    };
  }
  if (state.formula.slice(-1).search(/[.]/u) < 0) {
    return {
      ...state,
      formula: state.startNewCalc ? char : state.formula + char,
      startNewCalc: false,
    };
  }
  return {
    ...state,
    error: true,
  };
};

const terminal = (state = initialState, action = {}) => {
  if (action.calc !== 'terminal') {
    return state;
  }
  switch (action.type) {
    case 'CLEAR': return clearRule(state, action.payload);
    case 'DELETE': return deleteRule(state, action.payload);
    case 'DIVISION': return divisionRule(state, action.payload);
    case 'DOT': return dotRule(state, action.payload);
    case 'EQUALS': return equalsRule(state, action.payload);
    case 'ERROR': return disableError(state, action.payload);
    case 'MINUS': return minusRule(state, action.payload);
    case 'MULTIPLY': return multiplicationRule(state, action.payload);
    case 'NUMBER': return numberRule(state, action.payload);
    case 'PARENTHESIS_LEFT': return parenthesisLeftRule(state, action.payload);
    case 'PARENTHESIS_RIGHT': return parenthesisRightRule(state, action.payload);
    case 'PLUS': return plusRule(state, action.payload);
    default: return state;
  }
};

export default terminal;
