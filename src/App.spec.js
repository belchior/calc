import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducers from './store/reducers';

it('renders App without crashing', () => {
  let store = createStore(reducers);
  ReactDOM.render(
    <Provider store={store}><App /></Provider>,
    document.createElement('div')
  );
});
