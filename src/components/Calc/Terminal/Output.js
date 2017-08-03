import React, { Component } from 'react';

class Output extends Component {
  componentDidUpdate() {
    this.outputElem.scrollTop = this.outputElem.scrollHeight;
  }

  render() {
    return (
      <div className="output" ref={(output) => this.outputElem = output}>
        {this.props.results.map((item, index) => <output className="result" key={index}>{item}</output>)}
      </div>
    );
  }
}

export default Output;
