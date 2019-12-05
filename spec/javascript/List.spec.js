import React from 'react'
import { shallow, mount } from 'enzyme'
import List from '../../app/javascript/components/List'
import { createShallow } from '@material-ui/core/test-utils';

describe('<List />', () => {
  let shallow;

  beforeAll(() => {
    shallow = createShallow();
  });

  it('render', () => {
    const wrapper = shallow(<List />);
  });

  it('render if props exist', () => {
    const todo = [{ name: "rails", login_name: "rails", stars: 2400, language:"Ruby" }];
    const lista = shallow(<List posts={todo}/>);
    expect(lista).toHaveLength(1);
  });

  it('not render', () => {
    const todo = [];
    const lista = shallow(<List posts={todo}/>);
    const loadingIndicator = lista.find(".widget");
    expect(loadingIndicator).toHaveLength(0);
  });

});