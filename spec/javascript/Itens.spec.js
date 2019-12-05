import React from 'react'
import { shallow, mount } from 'enzyme'
import Itens from '../../app/javascript/components/Itens'
import { createShallow } from '@material-ui/core/test-utils';

describe('<List />', () => {
  let shallow;

  beforeAll(() => {
    shallow = createShallow();
  });

  it('render', () => {
    const wrapper = shallow(<Itens />);
  });

  it('render if props exist', () => {
    const todo = [{ name: "rails", login_name: "rails", stars: 2400, language:"Ruby" }];
    const lista = shallow(<Itens posts={todo}/>);
    expect(lista).toHaveLength(1);
  });

  it('not render', () => {
    const todo = [];
    const lista = shallow(<Itens posts={todo}/>);
    const loadingIndicator = lista.find(".widget");
    expect(loadingIndicator).toHaveLength(0);
  });

});