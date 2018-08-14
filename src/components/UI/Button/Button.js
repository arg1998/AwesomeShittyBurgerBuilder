import React from "react";

import classes from "./Button.css";

const Button = props => (
    <button
        className={[classes.Button, classes[props.btnType]].join(' ')}
        onClick={props.onClick}>
        {props.children}
    </button>
);

export default Button;
