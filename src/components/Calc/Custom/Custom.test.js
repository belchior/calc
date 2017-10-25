import React from 'react';
import Custom from './Custom';
import ShallowRenderer from 'react-test-renderer/shallow';

describe('Custom', () => {
  const renderer = new ShallowRenderer();

  it('should render without crashing', () => {
    renderer.render(<Custom />);
    const result = renderer.getRenderOutput();

    expect(result).toMatchSnapshot();
  });

  it('should add css class shake-horizontal when error props is equal true', () => {
    const disableError = jest.fn();

    renderer.render(<Custom error={true} disableError={disableError}/>);
    const result = renderer.getRenderOutput();

    expect(result).toMatchSnapshot();
  });

  it('should render the value of formula into element with css class display', () => {
    renderer.render(<Custom formula="789" />);
    const result = renderer.getRenderOutput();

    expect(result).toMatchSnapshot();
  });
});
