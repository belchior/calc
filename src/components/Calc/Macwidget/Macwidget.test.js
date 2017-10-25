import React from 'react';
import Macwidget from './Macwidget';
import ShallowRenderer from 'react-test-renderer/shallow';

describe('Macwidget', () => {
  const renderer = new ShallowRenderer();

  it('should render without crashing', () => {
    renderer.render(<Macwidget />);
    const result = renderer.getRenderOutput();

    expect(result).toMatchSnapshot();
  });

  it('should add css class shake-horizontal when error props is equal true', () => {
    const disableError = jest.fn();

    renderer.render(<Macwidget error={true} disableError={disableError}/>);
    const result = renderer.getRenderOutput();

    expect(result).toMatchSnapshot();
  });

  it('should render the value of formula into element with css class display', () => {
    renderer.render(<Macwidget formula="456" />);
    const result = renderer.getRenderOutput();

    expect(result).toMatchSnapshot();
  });
});
