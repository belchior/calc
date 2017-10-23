import React from 'react';
import renderer from 'react-test-renderer';
import {MemoryRouter} from 'react-router';
import Sidebar from './index';

test('renders Sidebar without crashing', () => {
  let tree = renderer.create(<MemoryRouter><Sidebar /></MemoryRouter>).toJSON();

  expect(tree).toMatchSnapshot();
});
