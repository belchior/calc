import React, { Component } from 'react';
import Calc from '../Calc';
import Output from './Output.js';
import './Terminal.css';

class Terminal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formula: '',
      results: [],
      error: false,
      startNewCalc: false
    };

    this.additionRule = this.additionRule.bind(this);
    this.clearRule = this.clearRule.bind(this);
    this.deleteRule = this.deleteRule.bind(this);
    this.divisionRule = this.divisionRule.bind(this);
    this.dotRule = this.dotRule.bind(this);
    this.equalityRule = this.equalityRule.bind(this);
    this.multiplicationRule = this.multiplicationRule.bind(this);
    this.numberRule = this.numberRule.bind(this);
    this.parenthesisCloseRule = this.parenthesisCloseRule.bind(this);
    this.parenthesisOpenRule = this.parenthesisOpenRule.bind(this);
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
      return;
    }
    try {
      let results = this.state.results;
      let result = String(Calc.calculate(formula));

      results.push(result);
      this.setState({results: results, startNewCalc: true});
      return '';

    } catch (err) {
      console.error(err);
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
      <form className={this.state.error ? 'Terminal shake-horizontal' : 'Terminal'}>
        <div className="display">
          <Output results={this.state.results} />
          <p className="input">{this.state.formula}</p>
        </div>
        <div className="keyboard">
          <div className="row">
            <button onClick={this.buttonClick(this.dotRule)} type="button" className="btn" data-name="dot" data-value="." title="dot">.</button>
            <button onClick={this.buttonClick(this.clearRule)} type="button" className="btn" data-name="clear" title="clear">c</button>
            <button onClick={this.buttonClick(this.deleteRule)} type="button" className="btn" data-name="delete" title="delete">&lt;</button>
            <button onClick={this.buttonClick(this.additionRule)} type="button" className="btn" data-name="addition" data-value="+" title="plus">+</button>
          </div>
          <div className="row">
            <button onClick={this.buttonClick(this.numberRule)} type="button" className="btn" data-name="number1" data-value="1" title="number 1">1</button>
            <button onClick={this.buttonClick(this.numberRule)} type="button" className="btn" data-name="number2" data-value="2" title="number 2">2</button>
            <button onClick={this.buttonClick(this.numberRule)} type="button" className="btn" data-name="number3" data-value="3" title="number 3">3</button>
            <button onClick={this.buttonClick(this.subtractionRule)} type="button" className="btn" data-name="subtraction" data-value="-" title="minus">−</button>
          </div>
          <div className="row">
            <button onClick={this.buttonClick(this.numberRule)} type="button" className="btn" data-name="number4" data-value="4" title="number 4">4</button>
            <button onClick={this.buttonClick(this.numberRule)} type="button" className="btn" data-name="number5" data-value="5" title="number 5">5</button>
            <button onClick={this.buttonClick(this.numberRule)} type="button" className="btn" data-name="number6" data-value="6" title="number 6">6</button>
            <button onClick={this.buttonClick(this.multiplicationRule)} type="button" className="btn" data-name="multiplication" data-value="×" title="times">×</button>
          </div>
          <div className="row">
            <button onClick={this.buttonClick(this.numberRule)} type="button" className="btn" data-name="number7" data-value="7" title="number 7">7</button>
            <button onClick={this.buttonClick(this.numberRule)} type="button" className="btn" data-name="number8" data-value="8" title="number 8">8</button>
            <button onClick={this.buttonClick(this.numberRule)} type="button" className="btn" data-name="number9" data-value="9" title="number 9">9</button>
            <button onClick={this.buttonClick(this.divisionRule)} type="button" className="btn" data-name="division" data-value="÷" title="divided">÷</button>
          </div>
          <div className="row">
            <button onClick={this.buttonClick(this.parenthesisOpenRule)} type="button" className="btn" data-name="parenthesisOpen" data-value="(" title="parenthesis opening">(</button>
            <button onClick={this.buttonClick(this.parenthesisCloseRule)} type="button" className="btn" data-name="parenthesisClose" data-value=")" title="parenthesis closing">)</button>
            <button onClick={this.buttonClick(this.numberRule)} type="button" className="btn" data-name="number0" data-value="0" title="number 0">0</button>
            <button onClick={this.buttonClick(this.equalityRule)} type="button" className="btn" data-name="equality" title="equals">=</button>
          </div>
        </div>
      </form>
    );
  }
}

export default Terminal;
