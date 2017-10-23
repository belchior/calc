import React, {Component} from 'react';
import {connect} from 'react-redux';

class Output extends Component {
  componentDidUpdate() {
    this.outputElem.scrollTop = this.outputElem.scrollHeight;
  }

  render() {
    const results = this.props.results || [];
    return (
      <div className="output" ref={(output) => this.outputElem = output}>
        {results.map((item, index) => {
          return <output className="result" onClick={this.props.onClick} key={index}>{item}</output>;
        })}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state.terminal;
};

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: (e) => {
      dispatch({type: 'NUMBER', calc: 'terminal', payload: e.target.textContent});
    }
  };
};

export {Output};
export default connect(mapStateToProps, mapDispatchToProps)(Output);
