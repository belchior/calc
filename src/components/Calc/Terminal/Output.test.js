import React from 'react';
import ReactDOM from 'react-dom';
import Output from './Output';

it('renders Output without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Output results={['1234', '432']}/>, div);
});
