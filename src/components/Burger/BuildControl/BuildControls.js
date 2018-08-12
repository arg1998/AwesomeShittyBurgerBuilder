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
        <p>Total Price: <strong>{props.price.toFixed(2)}</strong></p>

        {controls.map((ctrl) => (
            <Control
                ingredientAdded={() => props.ingredientAdded(ctrl.type)}
                ingredientRemoved={() => props.ingredientRemoved(ctrl.type)}
                key={ctrl.label}
                label={ctrl.label}
                disabled={props.disabled[ctrl.type]} />
        ))}

        <button
            onClick={props.initPurchase}
            disabled={!props.canPurchase}
            className={classes.OrderButton}>
            ORDER NOW
        </button>
    </div>
);

export default buildControls;