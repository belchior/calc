import Calc from '../../components/Calc/Calc.js';

const initialState = {
  formula: '',
  error: false,
  startNewCalc: false,
  memory: 0,
};

const clearRule = state => ({
  ...state,
  formula: '',
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
    if (state.formula.slice(-2).search(/[(^√]/u) < 0) {
      return {
        ...state,
        formula: state.formula.slice(0, -1) + char,
        startNewCalc: false,
      };
    }

  } else if (state.formula && state.formula.slice(-1).search(/[(.^√]/u) < 0) {
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
    state.formula && state.formula.slice(-1).search(/[%^√π.+\-×÷()]/u) < 0 &&
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
      formula: result,
      startNewCalc: true,
    };

  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    return {
      ...state,
      error: true,
    };
  }
};

const memoryClearRule = (state) => {
  return {
    ...state,
    memory: 0,
    startNewCalc: false,
  };
};

const memoryMinusRule = (state) => {
  if (state.formula && state.formula.match(/^[+-]?\d+(?:\.\d+)?$/u)) {
    return {
      ...state,
      memory: state.memory - Number(state.formula),
      startNewCalc: true,
    };
  }
  return {
    ...state,
    error: true,
  };
};

const memoryPlusRule = (state) => {
  if (state.formula && state.formula.match(/^[+-]?\d+(?:\.\d+)?$/u)) {
    return {
      ...state,
      memory: state.memory + Number(state.formula),
      startNewCalc: true,
    };
  }
  return {
    ...state,
    error: true,
  };
};

const memoryRecallRule = (state) => {
  return {
    ...state,
    formula: String(state.memory),
    startNewCalc: false,
  };
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
    if (state.formula.slice(-2).search(/[(^√]/u) < 0) {
      return {
        ...state,
        formula: state.formula.slice(0, -1) + char,
        startNewCalc: false,
      };
    }

  } else if (state.formula && state.formula.slice(-1).search(/[(.^√]/u) < 0) {
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
  if (state.formula === '' || state.formula.slice(-1).search(/[)%π]/u) < 0) {
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

const macwidget = (state = initialState, action = {}) => {
  if (action.calc !== 'macwidget') {
    return state;
  }
  switch (action.type) {
    case 'CLEAR': return clearRule(state, action.payload);
    case 'DIVISION': return divisionRule(state, action.payload);
    case 'DOT': return dotRule(state, action.payload);
    case 'EQUALS': return equalsRule(state, action.payload);
    case 'ERROR': return disableError(state, action.payload);
    case 'MEMORY_CLEAR': return memoryClearRule(state);
    case 'MEMORY_MINUS': return memoryMinusRule(state);
    case 'MEMORY_PLUS': return memoryPlusRule(state);
    case 'MEMORY_RECALL': return memoryRecallRule(state);
    case 'MINUS': return minusRule(state, action.payload);
    case 'MULTIPLY': return multiplicationRule(state, action.payload);
    case 'NUMBER': return numberRule(state, action.payload);
    case 'PLUS': return plusRule(state, action.payload);
    default: return state;
  }
};

export default macwidget;
