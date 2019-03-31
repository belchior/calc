import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import Custom from './Custom';

const setup = (props = {}) => {
  const requiredProps = {
    clearClick: () => {},
    deleteClick: () => {},
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
    parenthesisLeftClick: () => {},
    parenthesisRightClick: () => {},
    percentageClick: () => {},
    piClick: () => {},
    plusClick: () => {},
    powerClick: () => {},
    sqrtClick: () => {},
    ...props,
  };
  return shallow(<Custom {...requiredProps} />);
};

describe('Custom', () => {
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

    expect(props.disableError).toHaveBeenCalled();
    expect(custom).toMatchSnapshot();
  });

  it('should render the value of formula into element with css class display', () => {
    const props = { formula: '789' };
    const wrapper = setup(props);
    const custom = toJson(wrapper);

    expect(custom).toMatchSnapshot();
  });
});
