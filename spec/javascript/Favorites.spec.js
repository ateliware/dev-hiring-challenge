import React from 'react';
import { shallow, mount } from 'enzyme'
import Favorites from '../../app/javascript/components/Favorites';

it('should call componentDidMount once', () => {
    const componentDidMountSpy = spyOn(Favorites.prototype, 
                           'componentDidMount');
    const component = shallow(<Favorites/>);
    expect(componentDidMountSpy).toHaveBeenCalledTimes(1);
});