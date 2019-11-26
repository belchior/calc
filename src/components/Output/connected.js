import { connect } from 'react-redux';
import Output from './Output';

export const mapStateToProps = (state) => {
  return state.terminal;
};

export const mapDispatchToProps = (dispatch) => {
  return {
    onClick: (e) => {
      dispatch({ type: 'NUMBER', calc: 'termsinal', payload: e.target.textContent });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Output);
