import React from 'react';
import classes from './NavItem.css';
import { NavLink } from 'react-router-dom';

const NavItem = props => (
    <li className={classes.NavItem}>
        <NavLink exact activeClassName={classes.activ} to={props.link}>
            {props.children}
        </NavLink>
    </li>
);

export default NavItem;
