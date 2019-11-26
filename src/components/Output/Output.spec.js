import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import Output from './Output';


const setup = (props = {}) => {
  const requiredProps = {
    onClick: () => {},
    ...props,
  };
  return shallow(<Output {...requiredProps} />);
};


describe('Output', () => {
  it('should render Output with 0 items without crashing', () => {
    const component = () => setup();
    expect(component).not.toThrow();
  });

  it('should render Output with 2 items without crashing', () => {
    const props = { results: [ '1.2', '3.4' ] };
    const wrapper = setup(props);
    const custom = toJson(wrapper);

    expect(custom).toMatchSnapshot();
  });
});
