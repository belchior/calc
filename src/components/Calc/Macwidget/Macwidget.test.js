import React from 'react';
import {Macwidget} from './Macwidget';
import ShallowRenderer from 'react-test-renderer/shallow';

it('should render Macwidget without crashing', () => {
  const renderer = new ShallowRenderer();

  renderer.render(<Macwidget />);
  const result = renderer.getRenderOutput();

  expect(result).toMatchSnapshot();
});
