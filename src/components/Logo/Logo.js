import React from 'react';

import logoImage from '../../assets/images/logo.png';
import classes from './Logo.css';

const Logo = props => (
    <div className={classes.Logo} style={{ height: props.height }}>
        <img src={logoImage} alt="Burger Builder" />
    </div>
);

export default Logo;
