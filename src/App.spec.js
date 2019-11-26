import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import reducers from './store/reducers';
import App from './App';

describe('App', () => {
  it('should render without crashing', () => {
    const renderComponent = () => {
      const store = createStore(reducers);
      ReactDOM.render(
        <Provider store={store}><App /></Provider>,
        document.createElement('div')
      );
    };
    expect(renderComponent).not.toThrow();
  });
});
