import React from 'react';
import Presentation from './Presentation';
import ShallowRenderer from 'react-test-renderer/shallow';

test('shallow renderer test', () => {
  const renderer = new ShallowRenderer();
  renderer.render(<Presentation />);
  const result = renderer.getRenderOutput();

  expect(result.type).toBe('div');
  expect(result.props.children).toEqual('Presentation');
});
