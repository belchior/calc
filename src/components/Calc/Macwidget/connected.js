import { connect } from 'react-redux';
import Macwidget from './Macwidget';

export const mapStateToProps = (state) => {
  return state.macwidget;
};

export const mapDispatchToProps = (dispatch) => {
  return {
    clearClick(e) {
      dispatch({ type: 'CLEAR', calc: 'macwidget', payload: e.target.getAttribute('data-value') });
    },
    divisionClick(e) {
      dispatch({ type: 'DIVISION', calc: 'macwidget', payload: e.target.getAttribute('data-value') });
    },
    dotClick(e) {
      dispatch({ type: 'DOT', calc: 'macwidget', payload: e.target.getAttribute('data-value') });
    },
    equalsClick(e) {
      dispatch({ type: 'EQUALS', calc: 'macwidget', payload: e.target.getAttribute('data-value') });
    },
    memoryClearClick() {
      dispatch({ type: 'MEMORY_CLEAR', calc: 'macwidget' });
    },
    memoryMinusClick() {
      dispatch({ type: 'MEMORY_MINUS', calc: 'macwidget' });
    },
    memoryPlusClick() {
      dispatch({ type: 'MEMORY_PLUS', calc: 'macwidget' });
    },
    memoryRecallClick() {
      dispatch({ type: 'MEMORY_RECALL', calc: 'macwidget' });
    },
    minusClick(e) {
      dispatch({ type: 'MINUS', calc: 'macwidget', payload: e.target.getAttribute('data-value') });
    },
    multiplicationClick(e) {
      dispatch({ type: 'MULTIPLY', calc: 'macwidget', payload: e.target.getAttribute('data-value') });
    },
    numberClick(e) {
      dispatch({ type: 'NUMBER', calc: 'macwidget', payload: e.target.getAttribute('data-value') });
    },
    plusClick(e) {
      dispatch({ type: 'PLUS', calc: 'macwidget', payload: e.target.getAttribute('data-value') });
    },
    disableError() {
      setTimeout(() => dispatch({ type: 'ERROR', calc: 'macwidget', payload: false }), 400);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Macwidget);
