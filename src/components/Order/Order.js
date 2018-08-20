import React from 'react';
import classes from './Order.css';

const Order = props => {
    let ings = [];
    for (let ing in props.ingredients) {
        ings.push(
            <span
                style={{
                    textTransform: 'capitalize',
                    display: 'inline-block',
                    margin: '3px 5px',
                    border: '1px solid #ccc',
                    padding: '5px',
                    borderRadius: '10%'
                }}>
                {ing} ({props.ingredients[ing]})
            </span>
        );
    }

    return (
        <div className={classes.Order}>
            <p>Ingredients: {ings}</p>
            <p>
                Price: <strong>${props.price}</strong>
            </p>
        </div>
    );
};

export default Order;
