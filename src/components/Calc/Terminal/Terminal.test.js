import React from 'react';
import {Terminal} from './Terminal';
import ShallowRenderer from 'react-test-renderer/shallow';

it('should render Terminal without crashing', () => {
  const renderer = new ShallowRenderer();

  renderer.render(<Terminal />);
  const result = renderer.getRenderOutput();

  expect(result).toMatchSnapshot();
});
