import React from 'react';
import {Terminal} from './Terminal';
import renderer from 'react-test-renderer';

it('should render Terminal without crashing', () => {
  let tree = renderer.create(<Terminal />).toJSON();

  expect(tree).toMatchSnapshot();
});
