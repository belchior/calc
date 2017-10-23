import React from 'react';
import ReactDOM from 'react-dom';

import './components/reset.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducers from './store/reducers';

let store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}><App /></Provider>, document.getElementById('root')
);
registerServiceWorker();
