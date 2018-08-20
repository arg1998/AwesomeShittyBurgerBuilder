import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css';

const CheckoutSummary = props => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1> We hope it taste like shit !!!</h1>
            <div style={{ width: '100%', margin: 'auto' }}>
                <Burger ingredients={props.ingredients} />
            </div>
            <Button btnType="Danger" onClick={props.checkoutCancelled}>
                Cancel
            </Button>
            <Button btnType="Success" onClick={props.checkoutContinued}>
                Checkout
            </Button>
        </div>
    );
};

export default CheckoutSummary;
