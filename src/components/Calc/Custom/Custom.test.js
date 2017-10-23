import React from 'react';
import {Custom} from './Custom';
import ShallowRenderer from 'react-test-renderer/shallow';

it('should render Custom without crashing', () => {
  const renderer = new ShallowRenderer();

  renderer.render(<Custom />);
  const result = renderer.getRenderOutput();

  expect(result).toMatchSnapshot();
});
