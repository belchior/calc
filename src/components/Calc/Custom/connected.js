import {connect} from 'react-redux';
import Custom from './Custom';

export const mapStateToProps = (state) => {
  return state.custom;
};

export const mapDispatchToProps = (dispatch) => {
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

export default connect(mapStateToProps, mapDispatchToProps)(Custom);
