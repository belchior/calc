import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import Macwidget from './Macwidget';


const setup = (props = {}) => {
  const requiredProps = {
    clearClick: () => {},
    disableError: () => {},
    divisionClick: () => {},
    dotClick: () => {},
    equalsClick: () => {},
    memoryPlusClick: () => {},
    memoryMinusClick: () => {},
    memoryClearClick: () => {},
    memoryRecallClick: () => {},
    minusClick: () => {},
    multiplicationClick: () => {},
    numberClick: () => {},
    plusClick: () => {},
    ...props,
  };
  return shallow(<Macwidget {...requiredProps} />);
};


describe('Macwidget', () => {
  it('should render without crashing', () => {
    const component = () => setup();
    expect(component).not.toThrow();
  });

  it('should add css class shake-horizontal when error props is equal true', () => {
    const props = {
      disableError: jest.fn(),
      error: true,
    };
    const wrapper = setup(props);
    const custom = toJson(wrapper);

    expect(props.disableError).toHaveBeenCalledTimes(1);
    expect(custom).toMatchSnapshot();
  });

  it('should render the value of formula into element with css class display', () => {
    const props = { formula: '456' };
    const wrapper = setup(props);
    const custom = toJson(wrapper);

    expect(custom).toMatchSnapshot();
  });
});
