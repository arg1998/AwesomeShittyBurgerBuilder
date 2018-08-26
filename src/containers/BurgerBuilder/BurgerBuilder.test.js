import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Burgeruilder } from './BurgerBuilder';
import BuildControls from '../../components/Burger/BuildControl/BuildControls';

configure({ adapter: new Adapter() });

describe('<BurgerBuilder />', () => {
    it('shoul not render <BuildControls /> if user is NOT Authenticated', () => {
        const wrapper = shallow(
            <Burgeruilder
                isLoggedIn={true}
                initIngredients={() => {}}
                ingredients={{}}
                totalPrice={2.3215}
            />
        );
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    });
});
