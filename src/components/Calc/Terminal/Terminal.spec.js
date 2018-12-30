import React from 'react';
import Terminal from './Terminal';
import ShallowRenderer from 'react-test-renderer/shallow';

describe('Terminal', () => {
  const renderer = new ShallowRenderer();

  it('should render without crashing', () => {
    renderer.render(<Terminal />);
    const result = renderer.getRenderOutput();

    expect(result).toMatchSnapshot();
  });

  it('should add css class shake-horizontal when error props is equal true', () => {
    const disableError = jest.fn();

    renderer.render(<Terminal error={true} disableError={disableError}/>);
    const result = renderer.getRenderOutput();

    expect(result).toMatchSnapshot();
  });

  it('should render the value of formula into input class', () => {
    renderer.render(<Terminal formula="123" />);
    const result = renderer.getRenderOutput();

    expect(result).toMatchSnapshot();
  });

  it('should make element with css class input empty when startNewCalc props is true', () => {
    renderer.render(<Terminal formula="123" startNewCalc={true} />);
    const result = renderer.getRenderOutput();

    expect(result).toMatchSnapshot();
  });
});
