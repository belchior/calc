import React from 'react';
import {Custom} from './Custom';
import renderer from 'react-test-renderer';

it('should render Custom without crashing', () => {
  let tree = renderer.create(<Custom />).toJSON();

  expect(tree).toMatchSnapshot();
});
