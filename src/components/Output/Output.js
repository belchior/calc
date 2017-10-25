import React, {Component} from 'react';

export class Output extends Component {
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

export default Output;
