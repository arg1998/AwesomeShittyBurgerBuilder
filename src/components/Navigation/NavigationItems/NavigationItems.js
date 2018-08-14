import React from "react";
import classes from "./NavigationItems.css";
import NavItem from "./NavItem/NavItem";

const NavigationItems = props => (
    <ul className={classes.NavigationItems}>
        <NavItem link="/" active={true}>
            Burger Builder
        </NavItem>

        <NavItem link="/" active={false}>
            Checkout
        </NavItem>
    </ul>
);

export default NavigationItems;
