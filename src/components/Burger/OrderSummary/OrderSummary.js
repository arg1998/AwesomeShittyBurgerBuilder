import React from 'react';
import Wrapper from '../../../HOC/Wrapper';
import Button from '../../UI/Button/Button';

const orderSummary = props => {
    //do the logic here
    const summary = Object.keys(props.ingredients).map(ingKey => (
        <li key={ingKey}>
            <span style={{ textTransform: 'capitalize' }}>{ingKey}</span>:
            {props.ingredients[ingKey]}
        </li>
    ));

    // render the output here
    return (
        <Wrapper>
            <h3> .:: Summary of Your Order ::. </h3>
            <hr />
            <ul>{summary}</ul>
            <p>
                Total Price: <strong>{props.price}</strong>
            </p>
            <p>Continue to Checkout?</p>
            <Button btnType="Danger" onClick={props.cancelPurchase}>
                Cancel
            </Button>
            <Button btnType="Success" onClick={props.continuePurchase}>
                Continue
            </Button>
        </Wrapper>
    );
};

export default orderSummary;
