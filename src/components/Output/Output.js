import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Output extends Component {
  componentDidUpdate() {
    this.outputElem.scrollTop = this.outputElem.scrollHeight;
  }

  render() {
    const results = this.props.results || [];
    return (
      <div className="output" ref={(elem) => {
        this.outputElem = elem;
      }}>
        {results.map((item, index) => {
          return <output className="result" onClick={this.props.onClick} key={index}>{item}</output>;
        })}
      </div>
    );
  }
}

export default Output;

Output.propTypes = {
  onClick: PropTypes.func.isRequired,
  results: PropTypes.array,
};
