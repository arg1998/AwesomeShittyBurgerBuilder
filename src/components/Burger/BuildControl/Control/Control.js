import React from 'react';
import classes from './Control.css'

const control = (props) => (
    <div className={classes.Control}>
        <div className={classes.Label}>{props.label}</div>

        <button
            disabled={props.disabled}
            onClick={props.ingredientRemoved}
            className={classes.Less}> Less
        </button>

        <button
            onClick={props.ingredientAdded}
            className={classes.More}> More
        </button>
    </div>
);


export default control;