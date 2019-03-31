import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Custom.css';

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

export default Custom;

Custom.propTypes = {
  clearClick: PropTypes.func.isRequired,
  deleteClick: PropTypes.func.isRequired,
  disableError: PropTypes.func.isRequired,
  divisionClick: PropTypes.func.isRequired,
  dotClick: PropTypes.func.isRequired,
  equalsClick: PropTypes.func.isRequired,
  error: PropTypes.bool,
  formula: PropTypes.string,
  memoryPlusClick: PropTypes.func.isRequired,
  memoryMinusClick: PropTypes.func.isRequired,
  memoryClearClick: PropTypes.func.isRequired,
  memoryRecallClick: PropTypes.func.isRequired,
  minusClick: PropTypes.func.isRequired,
  multiplicationClick: PropTypes.func.isRequired,
  numberClick: PropTypes.func.isRequired,
  parenthesisLeftClick: PropTypes.func.isRequired,
  parenthesisRightClick: PropTypes.func.isRequired,
  percentageClick: PropTypes.func.isRequired,
  piClick: PropTypes.func.isRequired,
  plusClick: PropTypes.func.isRequired,
  powerClick: PropTypes.func.isRequired,
  sqrtClick: PropTypes.func.isRequired,
};
