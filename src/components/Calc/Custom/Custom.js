import React, {Component} from 'react';
import './Custom.css';
import {connect} from 'react-redux';

class Custom extends Component {
  render() {
    let className = 'Custom';
    if (this.props.error) {
      className += ' shake-horizontal';
      this.props.disableError();
    }
    return (
      <form className={className}>
        <p className="display">{this.props.formula}</p>
        <div className="keyboard">
          <div className="functions">
            <button onClick={this.props.percentageClick} type="button" className="btn" title="percentage" data-name="percentage" data-value="%">%</button>
            <button onClick={this.props.memoryPlusClick} type="button" className="btn" title="memory plus" data-name="madd">m+</button>
            <button onClick={this.props.memoryMinusClick} type="button" className="btn" title="memory minus" data-name="msubtract">m−</button>
            <button onClick={this.props.powerClick} type="button" className="btn" title="power" data-name="power" data-value="^">x<span>Y</span></button>
            <button onClick={this.props.memoryClearClick} type="button" className="btn" title="memory clear" data-name="mclear">mc</button>
            <button onClick={this.props.memoryRecallClick} type="button" className="btn" title="memory recall" data-name="mrecall">mr</button>
            <button onClick={this.props.sqrtClick} type="button" className="btn" title="square root" data-name="sqrt" data-value="√">√</button>
            <button onClick={this.props.deleteClick} type="button" className="btn double" title="delete" data-name="delete">delete</button>
            <button onClick={this.props.piClick} type="button" className="btn" title="constant PI" data-name="pi" data-value="π">π</button>
            <button onClick={this.props.clearClick} type="button" className="btn double" title="clear" data-name="clear">clear</button>
          </div>
          <div className="arithmetic">
            <button onClick={this.props.numberClick} type="button" className="btn" title="number 7" data-name="number7" data-value="7">7</button>
            <button onClick={this.props.numberClick} type="button" className="btn" title="number 8" data-name="number8" data-value="8">8</button>
            <button onClick={this.props.numberClick} type="button" className="btn" title="number 9" data-name="number9" data-value="9">9</button>
            <button onClick={this.props.plusClick} type="button" className="btn" title="plus" data-name="addition" data-value="+">+</button>
            <button onClick={this.props.multiplicationClick} type="button" className="btn" title="times" data-name="multiplication" data-value="×">×</button>
            <button onClick={this.props.numberClick} type="button" className="btn" title="number 4" data-name="number4" data-value="4">4</button>
            <button onClick={this.props.numberClick} type="button" className="btn" title="number 5" data-name="number5" data-value="5">5</button>
            <button onClick={this.props.numberClick} type="button" className="btn" title="number 6" data-name="number6" data-value="6">6</button>
            <button onClick={this.props.minusClick} type="button" className="btn" title="minus" data-name="subtraction" data-value="-">−</button>
            <button onClick={this.props.divisionClick} type="button" className="btn" title="divided" data-name="division" data-value="÷">÷</button>
            <button onClick={this.props.numberClick} type="button" className="btn" title="number 1" data-name="number1" data-value="1">1</button>
            <button onClick={this.props.numberClick} type="button" className="btn" title="number 2" data-name="number2" data-value="2">2</button>
            <button onClick={this.props.numberClick} type="button" className="btn" title="number 3" data-name="number3" data-value="3">3</button>
            <button onClick={this.props.parenthesisLeftClick} type="button" className="btn" title="parenthesis opening" data-name="parenthesisOpen" data-value="(">(</button>
            <button onClick={this.props.parenthesisRightClick} type="button" className="btn" title="parenthesis closing" data-name="parenthesisClose" data-value=")">)</button>
            <button onClick={this.props.numberClick} type="button" className="btn double" title="number 0" data-name="number0" data-value="0">0</button>
            <button onClick={this.props.dotClick} type="button" className="btn" title="dot" data-name="dot" data-value=".">.</button>
            <button onClick={this.props.equalsClick} type="button" className="btn double" title="equals" data-name="equality">=</button>
          </div>
        </div>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    clearClick(e) {
      dispatch({type: 'CLEAR', calc: 'custom', payload: e.target.getAttribute('data-value')});
    },
    deleteClick(e) {
      dispatch({type: 'DELETE', calc: 'custom', payload: e.target.getAttribute('data-value')});
    },
    divisionClick(e) {
      dispatch({type: 'DIVISION', calc: 'custom', payload: e.target.getAttribute('data-value')});
    },
    dotClick(e) {
      dispatch({type: 'DOT', calc: 'custom', payload: e.target.getAttribute('data-value')});
    },
    equalsClick(e) {
      dispatch({type: 'EQUALS', calc: 'custom', payload: e.target.getAttribute('data-value')});
    },
    memoryClearClick(e) {
      dispatch({type: 'MEMORY_CLEAR', calc: 'custom'});
    },
    memoryMinusClick(e) {
      dispatch({type: 'MEMORY_MINUS', calc: 'custom'});
    },
    memoryPlusClick(e) {
      dispatch({type: 'MEMORY_PLUS', calc: 'custom'});
    },
    memoryRecallClick(e) {
      dispatch({type: 'MEMORY_RECALL', calc: 'custom'});
    },
    minusClick(e) {
      dispatch({type: 'MINUS', calc: 'custom', payload: e.target.getAttribute('data-value')});
    },
    multiplicationClick(e) {
      dispatch({type: 'MULTIPLY', calc: 'custom', payload: e.target.getAttribute('data-value')});
    },
    numberClick(e) {
      dispatch({type: 'NUMBER', calc: 'custom', payload: e.target.getAttribute('data-value')});
    },
    parenthesisLeftClick(e) {
      dispatch({type: 'PARENTHESIS_LEFT', calc: 'custom', payload: e.target.getAttribute('data-value')});
    },
    parenthesisRightClick(e) {
      dispatch({type: 'PARENTHESIS_RIGHT', calc: 'custom', payload: e.target.getAttribute('data-value')});
    },
    percentageClick(e) {
      dispatch({type: 'PERCENTAGE', calc: 'custom', payload: e.target.getAttribute('data-value')});
    },
    piClick(e) {
      dispatch({type: 'PI', calc: 'custom', payload: e.target.getAttribute('data-value')});
    },
    plusClick(e) {
      dispatch({type: 'PLUS', calc: 'custom', payload: e.target.getAttribute('data-value')});
    },
    powerClick(e) {
      dispatch({type: 'POWER', calc: 'custom', payload: e.target.getAttribute('data-value')});
    },
    sqrtClick(e) {
      dispatch({type: 'SQRT', calc: 'custom', payload: e.target.getAttribute('data-value')});
    },
    disableError() {
      setTimeout(() => dispatch({type: 'ERROR', calc: 'custom', payload: false}), 400);
    },
  };
};

const mapStateToProps = (state) => {
  return state.custom;
};

export {Custom};
export default connect(mapStateToProps, mapDispatchToProps)(Custom);
