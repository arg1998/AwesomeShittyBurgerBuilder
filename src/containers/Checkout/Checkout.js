import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    state = {
        ingredients: null,
        totalPrice: 0
    };

    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ings = {};
        let price = 0;
        for (let param of query.entries()) {
            if (param[0] === 'price') {
                price = Number(param[1]).toFixed(2);
                continue;
            }
            ings[param[0]] = Number(param[1]);
        }
        this.setState({ ingredients: ings, totalPrice: price });
    }

    checkoutCancelled = () => {
        this.props.history.goBack();
    };

    checkoutContinued = () => {
        this.props.history.replace(this.props.match.url + '/contact-data');
    };

    render() {
        return (
            <div>
                <CheckoutSummary
                    checkoutContinued={this.checkoutContinued}
                    checkoutCancelled={this.checkoutCancelled}
                    ingredients={this.state.ingredients}
                />
                <Route
                    path={this.props.match.url + '/contact-data'}
                    // component={ContactData}
                    render={props => (
                        <ContactData
                            {...props}
                            ingredients={this.state.ingredients}
                            price={this.state.totalPrice}
                        />
                    )}
                />
            </div>
        );
    }
}

export default Checkout;
