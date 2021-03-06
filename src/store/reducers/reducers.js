import { combineReducers } from 'redux';
import custom from './custom';
import terminal from './terminal';
import macwidget from './macwidget';

const reducers = combineReducers({
  custom,
  terminal,
  macwidget,
});

export default reducers;
