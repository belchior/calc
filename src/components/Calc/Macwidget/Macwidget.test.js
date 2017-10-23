import React from 'react';
import {Macwidget} from './Macwidget';
import renderer from 'react-test-renderer';

it('should render Macwidget without crashing', () => {
  let tree = renderer.create(<Macwidget />).toJSON();

  expect(tree).toMatchSnapshot();
});
