/* eslint max-len:off */

import React from 'react';
import PropTypes from 'prop-types';

import { setColorTheme } from '../../../util/theme';
import './Macwidget.css';

const Macwidget = (props) => {
  setColorTheme('macwidget');

  let className = 'Macwidget';
  if (props.error) {
    className += ' shake-horizontal';
    props.disableError();
  }

  return (
    <form className={className}>
      <output className="display">{props.formula}</output>
      <div className="keyboard">
        <div className="brackets">
          <button onClick={props.memoryPlusClick} type="button" className="btn small" data-name="madd" data-value="" title="memory add">m+</button>
          <button onClick={props.memoryMinusClick} type="button" className="btn small" data-name="msubtract" data-value="" title="memory subtract">m−</button>
          <button onClick={props.memoryClearClick} type="button" className="btn small" data-name="mclear" title="memory clear">mc</button>
          <button onClick={props.memoryRecallClick} type="button" className="btn small" data-name="mrecall" title="memory recall">mr</button>
          <button onClick={props.divisionClick} type="button" className="btn small" data-name="division" data-value="÷" data-action="divide" title="divide">÷</button>
        </div>
        <div className="numbers">
          <button onClick={props.numberClick} type="button" className="btn" data-name="number7" data-value="7" title="number 7">7</button>
          <button onClick={props.numberClick} type="button" className="btn" data-name="number8" data-value="8" title="number 8">8</button>
          <button onClick={props.numberClick} type="button" className="btn" data-name="number9" data-value="9" title="number 9">9</button>
          <button onClick={props.numberClick} type="button" className="btn" data-name="number4" data-value="4" title="number 4">4</button>
          <button onClick={props.numberClick} type="button" className="btn" data-name="number5" data-value="5" title="number 5">5</button>
          <button onClick={props.numberClick} type="button" className="btn" data-name="number6" data-value="6" title="number 6">6</button>
          <button onClick={props.numberClick} type="button" className="btn" data-name="number1" data-value="1" title="number 1">1</button>
          <button onClick={props.numberClick} type="button" className="btn" data-name="number2" data-value="2" title="number 2">2</button>
          <button onClick={props.numberClick} type="button" className="btn" data-name="number3" data-value="3" title="number 3">3</button>
          <button onClick={props.numberClick} type="button" className="btn" data-name="number0" data-value="0" title="number 0">0</button>
          <button onClick={props.dotClick} type="button" className="btn" data-name="dot" data-value="." title="dot">.</button>
          <button onClick={props.clearClick} type="button" className="btn" data-name="clear" title="clear">c</button>
        </div>
        <div className="operators">
          <button onClick={props.multiplicationClick} type="button" className="btn small" data-name="multiplication" data-value="×" data-action="multiply" title="multiply">×</button>
          <button onClick={props.minusClick} type="button" className="btn small" data-name="subtraction" data-value="-" data-action="subtract" title="subtract">−</button>
          <button onClick={props.plusClick} type="button" className="btn small" data-name="addition" data-value="+" data-action="sum" title="sum">+</button>
          <button onClick={props.equalsClick} type="button" className="btn small" data-name="equality" title="equals">=</button>
        </div>
      </div>
    </form>
  );
};

export default Macwidget;

Macwidget.propTypes = {
  clearClick: PropTypes.func.isRequired,
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
  plusClick: PropTypes.func.isRequired,
};
