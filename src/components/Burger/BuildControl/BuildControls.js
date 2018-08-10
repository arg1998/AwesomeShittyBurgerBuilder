import React from 'react';
import classes from './BuildControls.css';
import Control from './Control/Control'

const controls = [
    { label: '‌Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
    { label: 'Salad', type: 'salad' }
];


const buildControls = (props) => (
    <div className={classes.BuildControl}>
        {controls.map((ctrl) => (
            <Control
                ingredientAdded={() => props.ingredientAdded(ctrl.type)}
                key={ctrl.label}
                label={ctrl.label} />
        ))}
    </div>
);

export default buildControls;