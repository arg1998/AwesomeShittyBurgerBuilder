import React from "react";
import classes from "./NavigationItems.css";
import NavItem from "./NavItem/NavItem";

const NavigationItems = props => (
    <ul className={classes.NavigationItems}>
        <NavItem link="/"  >
            Burger Builder
        </NavItem>

        <NavItem link="/orders">
            Orders
        </NavItem>
    </ul>
);

export default NavigationItems;
