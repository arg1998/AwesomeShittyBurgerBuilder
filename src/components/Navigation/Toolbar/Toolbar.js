import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = props => (
    <header className={classes.Toolbar}>
        <DrawerToggle toggleDrawer={props.toggleDrawer} />
        <Logo height="80%" />
        <nav className={classes.DesktopOnly}>
            <NavigationItems isLoggedIn={props.isLoggedIn} />
        </nav>
    </header>
);

export default toolbar;
