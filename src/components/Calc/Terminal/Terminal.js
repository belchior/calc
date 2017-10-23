import React, {Component} from 'react';
import Output from './Output.js';
import './Terminal.css';
import {connect} from 'react-redux';

class Terminal extends Component {
  render() {
    let className = 'Terminal';
    if (this.props.error) {
      className += ' shake-horizontal';
      this.props.disableError();
    }

    let formula = this.props.formula;
    if (this.props.startNewCalc) {
      formula = '';
    }
    return (
      <form className={className}>
        <div className="display">
          <Output results={this.props.results} />
          <p className="input">{formula}</p>
        </div>
        <div className="keyboard">
          <div className="row">
            <button onClick={this.props.parenthesisLeftClick} type="button" className="btn" data-name="parenthesisOpen" data-value="(" title="parenthesis opening">(</button>
            <button onClick={this.props.parenthesisRightClick} type="button" className="btn" data-name="parenthesisClose" data-value=")" title="parenthesis closing">)</button>
            <button onClick={this.props.deleteClick} type="button" className="btn" data-name="delete" title="delete">&lt;</button>
            <button onClick={this.props.clearClick} type="button" className="btn" data-name="clear" title="clear">c</button>
          </div>
          <div className="row">
            <button onClick={this.props.numberClick} type="button" className="btn" data-name="number1" data-value="1" title="number 1">1</button>
            <button onClick={this.props.numberClick} type="button" className="btn" data-name="number2" data-value="2" title="number 2">2</button>
            <button onClick={this.props.numberClick} type="button" className="btn" data-name="number3" data-value="3" title="number 3">3</button>
            <button onClick={this.props.plusClick} type="button" className="btn" data-name="addition" data-value="+" title="plus">+</button>
          </div>
          <div className="row">
            <button onClick={this.props.numberClick} type="button" className="btn" data-name="number4" data-value="4" title="number 4">4</button>
            <button onClick={this.props.numberClick} type="button" className="btn" data-name="number5" data-value="5" title="number 5">5</button>
            <button onClick={this.props.numberClick} type="button" className="btn" data-name="number6" data-value="6" title="number 6">6</button>
            <button onClick={this.props.minusClick} type="button" className="btn" data-name="subtraction" data-value="-" title="minus">−</button>
          </div>
          <div className="row">
            <button onClick={this.props.numberClick} type="button" className="btn" data-name="number7" data-value="7" title="number 7">7</button>
            <button onClick={this.props.numberClick} type="button" className="btn" data-name="number8" data-value="8" title="number 8">8</button>
            <button onClick={this.props.numberClick} type="button" className="btn" data-name="number9" data-value="9" title="number 9">9</button>
            <button onClick={this.props.multiplicationClick} type="button" className="btn" data-name="multiplication" data-value="×" title="times">×</button>
          </div>
          <div className="row">
            <button onClick={this.props.dotClick} type="button" className="btn" data-name="dot" data-value="." title="dot">.</button>
            <button onClick={this.props.numberClick} type="button" className="btn" data-name="number0" data-value="0" title="number 0">0</button>
            <button onClick={this.props.equalsClick} type="button" className="btn" data-name="equality" title="equals">=</button>
            <button onClick={this.props.divisionClick} type="button" className="btn" data-name="division" data-value="÷" title="divided">÷</button>
          </div>
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return state.terminal;
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearClick(e) {
      dispatch({type: 'CLEAR', calc: 'terminal', payload: e.target.getAttribute('data-value')});
    },
    deleteClick(e) {
      dispatch({type: 'DELETE', calc: 'terminal', payload: e.target.getAttribute('data-value')});
    },
    divisionClick(e) {
      dispatch({type: 'DIVISION', calc: 'terminal', payload: e.target.getAttribute('data-value')});
    },
    dotClick(e) {
      dispatch({type: 'DOT', calc: 'terminal', payload: e.target.getAttribute('data-value')});
    },
    equalsClick(e) {
      dispatch({type: 'EQUALS', calc: 'terminal', payload: e.target.getAttribute('data-value')});
    },
    minusClick(e) {
      dispatch({type: 'MINUS', calc: 'terminal', payload: e.target.getAttribute('data-value')});
    },
    multiplicationClick(e) {
      dispatch({type: 'MULTIPLY', calc: 'terminal', payload: e.target.getAttribute('data-value')});
    },
    numberClick(e) {
      dispatch({type: 'NUMBER', calc: 'terminal', payload: e.target.getAttribute('data-value')});
    },
    parenthesisLeftClick(e) {
      dispatch({type: 'PARENTHESIS_LEFT', calc: 'terminal', payload: e.target.getAttribute('data-value')});
    },
    parenthesisRightClick(e) {
      dispatch({type: 'PARENTHESIS_RIGHT', calc: 'terminal', payload: e.target.getAttribute('data-value')});
    },
    plusClick(e) {
      dispatch({type: 'PLUS', calc: 'terminal', payload: e.target.getAttribute('data-value')});
    },
    disableError() {
      setTimeout(() => dispatch({type: 'ERROR', calc: 'terminal', payload: false}), 400);
    },
  };
};

export {Terminal};
export default connect(mapStateToProps, mapDispatchToProps)(Terminal);
