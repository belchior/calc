import React, { Component } from 'react';
import Calc from '../Calc';
import './Custom.css';

class Custom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formula: '',
      error: false,
      startNewCalc: false,
      slot: 0
    };

    this.memory = {
      get: () => {
        return this.state.slot;
      },
      set: (value) => {
        this.setState({slot: value});
        return this;
      },
      sum: (value) => {
        this.setState({slot: Calc.sum(this.state.slot, value)});
        return this;
      },
      subtract: (value) => {
        this.setState({slot: Calc.subtract(this.state.slot, value)});
        return this;
      }
    };

    this.additionRule = this.additionRule.bind(this);
    this.clearRule = this.clearRule.bind(this);
    this.deleteRule = this.deleteRule.bind(this);
    this.divisionRule = this.divisionRule.bind(this);
    this.dotRule = this.dotRule.bind(this);
    this.equalityRule = this.equalityRule.bind(this);
    this.percentageRule = this.percentageRule.bind(this);
    this.maddRule = this.maddRule.bind(this);
    this.mclearRule = this.mclearRule.bind(this);
    this.mrecallRule = this.mrecallRule.bind(this);
    this.msubtractRule = this.msubtractRule.bind(this);
    this.multiplicationRule = this.multiplicationRule.bind(this);
    this.numberRule = this.numberRule.bind(this);
    this.parenthesisCloseRule = this.parenthesisCloseRule.bind(this);
    this.parenthesisOpenRule = this.parenthesisOpenRule.bind(this);
    this.piRule = this.piRule.bind(this);
    this.powerRule = this.powerRule.bind(this);
    this.sqrtRule = this.sqrtRule.bind(this);
    this.subtractionRule = this.subtractionRule.bind(this);

    this.showError = this.showError.bind(this);
    this.buttonClick = this.buttonClick.bind(this);
  }

  additionRule(formula, char = '+') {
    if (formula && formula.slice(-1).search(/[+\-×÷]/) >= 0) {
      this.setState({startNewCalc: false});
      return formula.slice(0, -1) + char;
    }
    if (formula.slice(-1).search(/[.]/) < 0) {
      this.setState({startNewCalc: false});
      return formula + char;
    }
  }

  clearRule() {
    this.setState({formula: '', startNewCalc: false});
    return '';
  }

  deleteRule(formula) {
    return formula.slice(0, -1);
  }

  divisionRule(formula, char = '÷') {
    if (formula && formula.slice(-1).search(/[+\-×÷]/) >= 0) {
      if (formula.length > 1 && formula.slice(-2).search(/[(^√]/) < 0) {
        return formula.slice(0, -1) + char;
      }

    } else if (formula && formula.slice(-1).search(/[(.^√]/) < 0) {
      return formula + char;
    }
  }

  dotRule(formula, char = '.') {
    if (
      formula && formula.slice(-1).search(/[%^√π.+\-×÷()]/) < 0 &&
      formula.search(/\d+\.\d+$/) < 0
    ) {
      return formula + char;
    }
  }

  equalityRule(formula) {
    if (formula === '') {
      return NaN;
    }
    try {
      let result = String(Calc.calculate(formula));
      this.setState({startNewCalc: true});
      return result;

    } catch (err) {
      console.error(err);
      return NaN;
    }
  }

  maddRule(formula) {
    if (formula && formula.match(/^[+-]?\d+(?:\.\d+)?$/)) {
      this.memory.sum(parseFloat(formula));
    }
    return false;
  }

  mclearRule() {
    this.memory.set(0);
    return false;
  }

  mrecallRule() {
    this.setState({startNewCalc: false});
    return this.memory.get().toString();
  }

  msubtractRule(formula) {
    if (formula && formula.match(/^[+-]?\d+(?:\.\d+)?$/)) {
      this.memory.subtract(parseFloat(formula));
    }
    return false;
  }

  multiplicationRule(formula, char = '×') {
    if (formula && formula.slice(-1).search(/[+\-×÷]/) >= 0) {
      if (formula.length > 1 && formula.slice(-2).search(/[(^√]/) < 0) {
        return formula.slice(0, -1) + char;
      }

    } else if (formula && formula.slice(-1).search(/[(.^√]/) < 0) {
      return formula + char;
    }
  }

  numberRule(formula, char = '') {
    if (formula === '' || formula.slice(-1).search(/[)%π]/) < 0) {
      return formula + char;
    }
  }

  parenthesisCloseRule(formula, char = ')') {
    const opens = formula.match(/[(]/g);
    const closes = formula.match(/[)]/g);

    if ((opens && !closes) || (opens && closes && opens.length > closes.length)) {
      if (formula.slice(-1).search(/[(+\-×÷.^√]/) < 0) {
        return formula + char;
      }
    }
  }

  parenthesisOpenRule(formula, char = '(') {
    if (formula === '') {
      return formula + char;
    }
    if (formula.slice(-1).search(/[0-9)%π]/) >= 0) {
      return formula + '×' + char;
    }
    if (formula.slice(-1).search(/[.]/) < 0) {
      return formula + char;
    }
  }

  percentageRule(formula, char = '%') {
    if (formula && formula.slice(-1).search(/[0-9)]/) >= 0) {
      return formula + char;
    }
  }

  piRule(formula, char = 'π') {
    if (formula === '' || (formula && formula.slice(-1).search(/[(+\-×÷^√]/) >= 0)) {
      return formula + char;
    }
  }

  powerRule(formula, char = '^') {
    if (formula && formula.slice(-1).search(/[0-9π]/) >= 0) {
      return formula + char;
    }
  }

  sqrtRule(formula, char = '√') {
    if (formula === '') {
      return formula + char;
    }
    if (formula && formula.slice(-1).search(/[+\-×÷(√]/) >= 0) {
      return formula + char;
    }
    if (formula && formula.slice(-1).search(/[0-9)%π]/) >= 0) {
      return formula + '×' + char;
    }
  }

  subtractionRule(formula, char = '-') {
    if (formula === '') {
      return formula + char;
    }
    if (formula.slice(-1).search(/[+\-×÷]/) >= 0) {
      return formula.slice(0, -1) + char;
    }
    if (formula.slice(-1).search(/[.]/) < 0) {
      return formula + char;
    }
  }

  showError() {
    this.setState({error: true});
    setTimeout(() => this.setState({error: false}), 400);
  }

  buttonClick(buttonRule) {
    return (e) => {
      let formula = this.state.formula;

      if (this.state.startNewCalc) {
        this.clearRule();
        formula = '';
      }

      formula = buttonRule(formula, e.target.dataset.value);
      if (formula === false) {
        return;
      }

      if (typeof formula !== 'string') {
        return this.showError();
      }
      this.setState({formula: formula});
    }
  }

  render() {
    return (
      <form className={this.state.error ? 'Custom shake-horizontal' : 'Custom'}>
        <p className="display">{this.state.formula}</p>
        <div className="keyboard">
          <div className="functions">
            <button onClick={this.buttonClick(this.percentageRule)} type="button" className="btn" title="percentage" data-name="percentage" data-value="%">%</button>
            <button onClick={this.buttonClick(this.maddRule)} type="button" className="btn" title="memory add" data-name="madd">m+</button>
            <button onClick={this.buttonClick(this.msubtractRule)} type="button" className="btn" title="memory subtract" data-name="msubtract">m−</button>
            <button onClick={this.buttonClick(this.powerRule)} type="button" className="btn" title="power" data-name="power" data-value="^">x<span>Y</span></button>
            <button onClick={this.buttonClick(this.mrecallRule)} type="button" className="btn" title="memory recall" data-name="mrecall">mr</button>
            <button onClick={this.buttonClick(this.mclearRule)} type="button" className="btn" title="memory clear" data-name="mclear">mc</button>
            <button onClick={this.buttonClick(this.sqrtRule)} type="button" className="btn" title="square root" data-name="sqrt" data-value="√">√</button>
            <button onClick={this.buttonClick(this.deleteRule)} type="button" className="btn double" title="delete" data-name="delete">delete</button>
            <button onClick={this.buttonClick(this.piRule)} type="button" className="btn" title="constant PI" data-name="pi" data-value="π">π</button>
            <button onClick={this.clearRule} type="button" className="btn double" title="clear" data-name="clear">clear</button>
          </div>
          <div className="arithmetic">
            <button onClick={this.buttonClick(this.numberRule)} type="button" className="btn" title="number 7" data-name="number7" data-value="7">7</button>
            <button onClick={this.buttonClick(this.numberRule)} type="button" className="btn" title="number 8" data-name="number8" data-value="8">8</button>
            <button onClick={this.buttonClick(this.numberRule)} type="button" className="btn" title="number 9" data-name="number9" data-value="9">9</button>
            <button onClick={this.buttonClick(this.additionRule)} type="button" className="btn" title="plus" data-name="addition" data-value="+">+</button>
            <button onClick={this.buttonClick(this.multiplicationRule)} type="button" className="btn" title="times" data-name="multiplication" data-value="×">×</button>
            <button onClick={this.buttonClick(this.numberRule)} type="button" className="btn" title="number 4" data-name="number4" data-value="4">4</button>
            <button onClick={this.buttonClick(this.numberRule)} type="button" className="btn" title="number 5" data-name="number5" data-value="5">5</button>
            <button onClick={this.buttonClick(this.numberRule)} type="button" className="btn" title="number 6" data-name="number6" data-value="6">6</button>
            <button onClick={this.buttonClick(this.subtractionRule)} type="button" className="btn" title="minus" data-name="subtraction" data-value="-">−</button>
            <button onClick={this.buttonClick(this.divisionRule)} type="button" className="btn" title="divided" data-name="division" data-value="÷">÷</button>
            <button onClick={this.buttonClick(this.numberRule)} type="button" className="btn" title="number 1" data-name="number1" data-value="1">1</button>
            <button onClick={this.buttonClick(this.numberRule)} type="button" className="btn" title="number 2" data-name="number2" data-value="2">2</button>
            <button onClick={this.buttonClick(this.numberRule)} type="button" className="btn" title="number 3" data-name="number3" data-value="3">3</button>
            <button onClick={this.buttonClick(this.parenthesisOpenRule)} type="button" className="btn" title="parenthesis opening" data-name="parenthesisOpen" data-value="(">(</button>
            <button onClick={this.buttonClick(this.parenthesisCloseRule)} type="button" className="btn" title="parenthesis closing" data-name="parenthesisClose" data-value=")">)</button>
            <button onClick={this.buttonClick(this.numberRule)} type="button" className="btn double" title="number 0" data-name="number0" data-value="0">0</button>
            <button onClick={this.buttonClick(this.dotRule)} type="button" className="btn" title="dot" data-name="dot" data-value=".">.</button>
            <button onClick={this.buttonClick(this.equalityRule)} type="button" className="btn double" title="equals" data-name="equality">=</button>
          </div>
        </div>
      </form>
    );
  }
}

export default Custom;
