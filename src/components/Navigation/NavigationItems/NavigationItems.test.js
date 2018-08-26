import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './NavigationItems';
import NavItem from './NavItem/NavItem';

configure({ adapter: new Adapter() });

describe('<NavigationItems />', () => {

    it('should render 2 <NavItem /> if user is NOT authenticated', () => {
        const wrapper = shallow(<NavigationItems />);
        expect(wrapper.find(NavItem)).toHaveLength(2);
    });

    it('should render 3 <NavItem /> if user is authenticated', () => {
        const wrapper = shallow(<NavigationItems isLoggedIn={true} />);
        expect(wrapper.find(NavItem)).toHaveLength(3);
    });
});
