import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import Terminal from './Terminal';


const setup = (props = {}) => {
  const requiredProps = {
    clearClick: () => {},
    deleteClick: () => {},
    divisionClick: () => {},
    disableError: () => {},
    dotClick: () => {},
    equalsClick: () => {},
    minusClick: () => {},
    multiplicationClick: () => {},
    numberClick: () => {},
    parenthesisLeftClick: () => {},
    parenthesisRightClick: () => {},
    plusClick: () => {},
    ...props,
  };
  return shallow(<Terminal {...requiredProps} />);
};

describe('Terminal', () => {
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

  it('should render the value of formula into input class', () => {
    const props = { formula: '123' };
    const wrapper = setup(props);
    const custom = toJson(wrapper);

    expect(custom).toMatchSnapshot();
  });

  it('should make element with css class input empty when startNewCalc props is true', () => {
    const props = { formula: '123', startNewCalc: true };
    const wrapper = setup(props);
    const custom = toJson(wrapper);

    expect(custom).toMatchSnapshot();
  });
});
