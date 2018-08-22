import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';
import { purchaseInit } from '../../store/actions/exports';

class Checkout extends Component {

    checkoutCancelled = () => {
        this.props.history.goBack();
    };

    checkoutContinued = () => {
        this.props.history.replace(this.props.match.url + '/contact-data');
    };

    render() {
        if (this.props.purchased) {
            return <Redirect to="/" />;
        }

        return (
            <div>
                <CheckoutSummary
                    checkoutContinued={this.checkoutContinued}
                    checkoutCancelled={this.checkoutCancelled}
                    ingredients={this.props.ingredients}
                />
                <Route
                    path={this.props.match.url + '/contact-data'}
                    component={ContactData}
                />
            </div>
        );
    }
}

const mapStateToProps = newState => ({
    ingredients: newState.burgerBiulderReducer.ingredients,
    purchased: newState.orderReducer.purchased
});

const mapDispatchToProps = dispatch => ({
    
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Checkout);
