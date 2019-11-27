/* eslint max-len:off */

import React from 'react';
import PropTypes from 'prop-types';

import { setColorTheme } from '../../../util/theme';
import Output from '../../Output';

import './Terminal.css';

const Terminal = (props) => {
  setColorTheme('terminal');

  let className = 'Terminal';
  if (props.error) {
    className += ' shake-horizontal';
    props.disableError();
  }

  let { formula } = props;
  if (props.startNewCalc) {
    formula = '';
  }

  return (
    <form className={className}>
      <div className="display">
        <Output results={props.results} />
        <p className="input">{formula}</p>
      </div>
      <div className="keyboard">
        <div className="row">
          <button onClick={props.parenthesisLeftClick} type="button" className="btn" data-name="parenthesisOpen" data-value="(" title="parenthesis opening">(</button>
          <button onClick={props.parenthesisRightClick} type="button" className="btn" data-name="parenthesisClose" data-value=")" title="parenthesis closing">)</button>
          <button onClick={props.deleteClick} type="button" className="btn" data-name="delete" title="delete">&lt;</button>
          <button onClick={props.clearClick} type="button" className="btn" data-name="clear" title="clear">c</button>
        </div>
        <div className="row">
          <button onClick={props.numberClick} type="button" className="btn" data-name="number1" data-value="1" title="number 1">1</button>
          <button onClick={props.numberClick} type="button" className="btn" data-name="number2" data-value="2" title="number 2">2</button>
          <button onClick={props.numberClick} type="button" className="btn" data-name="number3" data-value="3" title="number 3">3</button>
          <button onClick={props.plusClick} type="button" className="btn" data-name="addition" data-value="+" title="plus">+</button>
        </div>
        <div className="row">
          <button onClick={props.numberClick} type="button" className="btn" data-name="number4" data-value="4" title="number 4">4</button>
          <button onClick={props.numberClick} type="button" className="btn" data-name="number5" data-value="5" title="number 5">5</button>
          <button onClick={props.numberClick} type="button" className="btn" data-name="number6" data-value="6" title="number 6">6</button>
          <button onClick={props.minusClick} type="button" className="btn" data-name="subtraction" data-value="-" title="minus">−</button>
        </div>
        <div className="row">
          <button onClick={props.numberClick} type="button" className="btn" data-name="number7" data-value="7" title="number 7">7</button>
          <button onClick={props.numberClick} type="button" className="btn" data-name="number8" data-value="8" title="number 8">8</button>
          <button onClick={props.numberClick} type="button" className="btn" data-name="number9" data-value="9" title="number 9">9</button>
          <button onClick={props.multiplicationClick} type="button" className="btn" data-name="multiplication" data-value="×" title="times">×</button>
        </div>
        <div className="row">
          <button onClick={props.dotClick} type="button" className="btn" data-name="dot" data-value="." title="dot">.</button>
          <button onClick={props.numberClick} type="button" className="btn" data-name="number0" data-value="0" title="number 0">0</button>
          <button onClick={props.equalsClick} type="button" className="btn" data-name="equality" title="equals">=</button>
          <button onClick={props.divisionClick} type="button" className="btn" data-name="division" data-value="÷" title="divided">÷</button>
        </div>
      </div>
    </form>
  );
};

export default Terminal;

Terminal.propTypes = {
  clearClick: PropTypes.func,
  deleteClick: PropTypes.func,
  divisionClick: PropTypes.func,
  disableError: PropTypes.func,
  dotClick: PropTypes.func,
  equalsClick: PropTypes.func,
  error: PropTypes.bool,
  formula: PropTypes.string,
  minusClick: PropTypes.func,
  multiplicationClick: PropTypes.func,
  numberClick: PropTypes.func,
  parenthesisLeftClick: PropTypes.func,
  parenthesisRightClick: PropTypes.func,
  plusClick: PropTypes.func,
  results: PropTypes.array,
  startNewCalc: PropTypes.bool,
};
