import React from 'react';
import classes from './NavigationItems.css';
import NavItem from './NavItem/NavItem';
import Wrapper from '../../../HOC/Wrapper';

const NavigationItems = props => {
    let navItmes = (
        <Wrapper>
            <NavItem link="/orders">Orders</NavItem>
            <NavItem link="/logout">LogOut</NavItem>
        </Wrapper>
    );

    if (!props.isLoggedIn) {
        navItmes = <NavItem link="/auth">Authenticate</NavItem>;
    }
    return (
        <ul className={classes.NavigationItems}>
            <NavItem link="/">Burger Builder</NavItem>
            {navItmes}
        </ul>
    );
};

export default NavigationItems;
