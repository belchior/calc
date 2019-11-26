import React from 'react';
import { shallow } from 'enzyme';
import { MemoryRouter } from 'react-router';

import Sidebar from './Sidebar';


describe('Sidebar', () => {
  it('renders Sidebar without crashing', () => {
    const component = () => shallow(<MemoryRouter><Sidebar /></MemoryRouter>);
    expect(component).not.toThrow();
  });
});
