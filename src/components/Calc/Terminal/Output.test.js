import React from 'react';
import {Output} from './Output';
import renderer from 'react-test-renderer';

it('should render Output with 0 items without crashing', () => {
  let tree = renderer.create(<Output />).toJSON();

  expect(tree).toMatchSnapshot();
});

it('should render Output with 2 items without crashing', () => {
  let tree = renderer.create(<Output results={['1.2', '3.4']}/>).toJSON();

  expect(tree).toMatchSnapshot();
});
