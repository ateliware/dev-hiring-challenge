import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router';
import App, {NoMatch} from '../../app/javascript/components/App';
import Home from '../../app/javascript/components/Home';


test('valid path', () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={[ '/' ]}>
      <App/>
    </MemoryRouter>
  );

  expect(wrapper.find(Home)).toHaveLength(1);
});

test('invalid path', () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={[ '/random' ]}>
      <App/>
    </MemoryRouter>
  );
  expect(wrapper.find(NoMatch)).toHaveLength(1);
});