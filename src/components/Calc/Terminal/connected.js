import { connect } from 'react-redux';
import Terminal from './Terminal';

export const mapStateToProps = (state) => {
  return state.terminal;
};

export const mapDispatchToProps = (dispatch) => {
  return {
    clearClick(e) {
      dispatch({ type: 'CLEAR', calc: 'terminal', payload: e.target.getAttribute('data-value') });
    },
    deleteClick(e) {
      dispatch({ type: 'DELETE', calc: 'terminal', payload: e.target.getAttribute('data-value') });
    },
    divisionClick(e) {
      dispatch({ type: 'DIVISION', calc: 'terminal', payload: e.target.getAttribute('data-value') });
    },
    dotClick(e) {
      dispatch({ type: 'DOT', calc: 'terminal', payload: e.target.getAttribute('data-value') });
    },
    equalsClick(e) {
      dispatch({ type: 'EQUALS', calc: 'terminal', payload: e.target.getAttribute('data-value') });
    },
    minusClick(e) {
      dispatch({ type: 'MINUS', calc: 'terminal', payload: e.target.getAttribute('data-value') });
    },
    multiplicationClick(e) {
      dispatch({ type: 'MULTIPLY', calc: 'terminal', payload: e.target.getAttribute('data-value') });
    },
    numberClick(e) {
      dispatch({ type: 'NUMBER', calc: 'terminal', payload: e.target.getAttribute('data-value') });
    },
    parenthesisLeftClick(e) {
      dispatch({ type: 'PARENTHESIS_LEFT', calc: 'terminal', payload: e.target.getAttribute('data-value') });
    },
    parenthesisRightClick(e) {
      dispatch({ type: 'PARENTHESIS_RIGHT', calc: 'terminal', payload: e.target.getAttribute('data-value') });
    },
    plusClick(e) {
      dispatch({ type: 'PLUS', calc: 'terminal', payload: e.target.getAttribute('data-value') });
    },
    disableError() {
      setTimeout(() => dispatch({ type: 'ERROR', calc: 'terminal', payload: false }), 400);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Terminal);
