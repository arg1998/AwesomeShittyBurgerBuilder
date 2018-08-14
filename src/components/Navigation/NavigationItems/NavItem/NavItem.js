import React from "react";
import classes from "./NavItem.css";

const NavItem = props => (
    <li className={classes.NavItem}>
        <a className={props.active ? classes.activ : null} href={props.link}>
            {props.children}
        </a>
    </li>
);

export default NavItem;
