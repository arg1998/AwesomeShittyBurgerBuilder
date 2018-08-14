import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import Wrapper from '../../../HOC/Wrapper';
import Backdrop from '../../UI/Backdrop/Backdrop';

const SideDrawer = props => {
    const attachedClasses = [
        classes.SideDrawer,
        props.show ? classes.Open : classes.Close
    ].join(' ');

    return (
        <Wrapper>
            <Backdrop show={props.show} clicked={props.onClose} />
            <div className={attachedClasses}>
                <div className={classes.Logo}>
                    <Logo />{' '}
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Wrapper>
    );
};

export default SideDrawer;
