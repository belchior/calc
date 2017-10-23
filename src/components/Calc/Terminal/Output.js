import React, {Component} from 'react';

class Output extends Component {
  componentDidUpdate() {
    this.outputElem.scrollTop = this.outputElem.scrollHeight;
  }

  render() {
    const results = this.props.results || [];
    return (
      <div className="output" ref={(output) => this.outputElem = output}>
        {results.map((item, index) => <output className="result" key={index}>{item}</output>)}
      </div>
    );
  }
}

export default Output;
