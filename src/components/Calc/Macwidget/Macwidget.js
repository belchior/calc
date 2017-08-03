import React, { Component } from 'react';
import Calc from '../Calc';
import './Macwidget.css';

class Macwidget extends Component {
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
    this.divisionRule = this.divisionRule.bind(this);
    this.dotRule = this.dotRule.bind(this);
    this.equalityRule = this.equalityRule.bind(this);
    this.maddRule = this.maddRule.bind(this);
    this.mclearRule = this.mclearRule.bind(this);
    this.mrecallRule = this.mrecallRule.bind(this);
    this.msubtractRule = this.msubtractRule.bind(this);
    this.multiplicationRule = this.multiplicationRule.bind(this);
    this.numberRule = this.numberRule.bind(this);
    this.subtractionRule = this.subtractionRule.bind(this);

    this.showError = this.showError.bind(this);
    this.buttonClick = this.buttonClick.bind(this);
  }

  additionRule(formula, char = '+') {
    if (formula && formula.slice(-1).search(/[+\-×÷]/) >= 0) {
      return formula.slice(0, -1) + char;
    }
    if (formula.slice(-1).search(/[.]/) < 0) {
      return formula + char;
    }
  }

  clearRule(formula) {
    this.setState({startNewCalc: true});
    return '';
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
      return;
    }
    try {
      let result = String(Calc.calculate(formula));
      this.setState({startNewCalc: true});
      return result;

    } catch (err) {
      console.error(err);
    }
  }

  maddRule(formula) {
    if (formula.match(/^[+-]?\d+(?:\.\d+)?$/)) {
      this.memory.sum(parseFloat(formula));
      return false;
    }
  }

  mclearRule(formula) {
    this.memory.set(0);
    return '0';
  }

  mrecallRule(formula) {
    return this.memory.get().toString();
  }

  msubtractRule(formula) {
    if (formula.match(/^[+-]?\d+(?:\.\d+)?$/)) {
      this.memory.subtract(parseFloat(formula));
      return false;
    }
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
      const startNewCalc = this.state.startNewCalc;
      let formula = this.state.formula;

      if (startNewCalc) {
        formula = '';
        this.setState({startNewCalc: false});
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
      <form className={this.state.error ? 'Macwidget shake-horizontal' : 'Macwidget'}>
        <output className="display">{this.state.formula}</output>
        <div className="keyboard">
          <div className="brackets">
            <button onClick={this.maddRule} type="button" className="btn small" data-name="madd" data-value="" title="memory add">m+</button>
            <button onClick={this.msubtractRule} type="button" className="btn small" data-name="msubtract" data-value="" title="memory subtract">m−</button>
            <button onClick={this.mclearRule} type="button" className="btn small" data-name="mclear" title="memory clear">mc</button>
            <button onClick={this.mrecallRule} type="button" className="btn small" data-name="mrecall" title="memory recall">mr</button>
            <button onClick={this.buttonClick(this.divisionRule)} type="button" className="btn small" data-name="division" data-value="÷" data-action="divide" title="divide">÷</button>
          </div>
          <div className="numbers">
            <button onClick={this.buttonClick(this.numberRule)} type="button" className="btn" data-name="number7" data-value="7" title="number 7">7</button>
            <button onClick={this.buttonClick(this.numberRule)} type="button" className="btn" data-name="number8" data-value="8" title="number 8">8</button>
            <button onClick={this.buttonClick(this.numberRule)} type="button" className="btn" data-name="number9" data-value="9" title="number 9">9</button>
            <button onClick={this.buttonClick(this.numberRule)} type="button" className="btn" data-name="number4" data-value="4" title="number 4">4</button>
            <button onClick={this.buttonClick(this.numberRule)} type="button" className="btn" data-name="number5" data-value="5" title="number 5">5</button>
            <button onClick={this.buttonClick(this.numberRule)} type="button" className="btn" data-name="number6" data-value="6" title="number 6">6</button>
            <button onClick={this.buttonClick(this.numberRule)} type="button" className="btn" data-name="number1" data-value="1" title="number 1">1</button>
            <button onClick={this.buttonClick(this.numberRule)} type="button" className="btn" data-name="number2" data-value="2" title="number 2">2</button>
            <button onClick={this.buttonClick(this.numberRule)} type="button" className="btn" data-name="number3" data-value="3" title="number 3">3</button>
            <button onClick={this.buttonClick(this.numberRule)} type="button" className="btn" data-name="number0" data-value="0" title="number 0">0</button>
            <button onClick={this.buttonClick(this.dotRule)} type="button" className="btn" data-name="dot" data-value="." title="dot">.</button>
            <button onClick={this.buttonClick(this.clearRule)} type="button" className="btn" data-name="clear" title="clear">c</button>
          </div>
          <div className="operators">
            <button onClick={this.buttonClick(this.multiplicationRule)} type="button" className="btn small" data-name="multiplication" data-value="×" data-action="multiply" title="multiply">×</button>
            <button onClick={this.buttonClick(this.subtractionRule)} type="button" className="btn small" data-name="subtraction" data-value="-" data-action="subtract" title="subtract">−</button>
            <button onClick={this.buttonClick(this.additionRule)} type="button" className="btn small" data-name="addition" data-value="+" data-action="sum" title="sum">+</button>
            <button onClick={this.buttonClick(this.equalityRule)} type="button" className="btn small" data-name="equality" title="equals">=</button>
          </div>
        </div>
      </form>
    );
  }
}

export default Macwidget;
