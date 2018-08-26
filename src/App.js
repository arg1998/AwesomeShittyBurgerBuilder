import React, { Component } from 'react';
import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Logout from './containers/Auth/Logout/Logout';
import { connect } from 'react-redux';
import { checkLocalAuthState } from './store/actions/exports';
import asyncComponent from './HOC/asyncComponent/asyncComponent';

const lazyLoadCheckout = asyncComponent(() => {
    return import('./containers/Checkout/Checkout');
});
const lazyLoadOrders = asyncComponent(() => {
    return import('./containers/Orders/Orders');
});
const lazyLoadAuth = asyncComponent(() => {
    return import('./containers/Auth/Auth');
});



class App extends Component {
    componentDidMount() {
        this.props.onLocalStorageAuth();
    }
    render() {
        let guarderRoutes = (
            <Switch>
                <Route path="/checkout" component={lazyLoadCheckout} />
                <Route path="/orders" component={lazyLoadOrders} />
                <Route path="/logout" component={Logout} />
                <Route path="/" exact component={BurgerBuilder} />
                <Redirect to="/" />
            </Switch>
        );

        if (!this.props.isLoggedIn) {
            guarderRoutes = (
                <Switch>
                    <Route path="/auth" component={lazyLoadAuth} />
                    <Route path="/" exact component={BurgerBuilder} />
                    <Redirect to="/" />
                </Switch>
            );
        }

        return (
            <div>
                <Layout>{guarderRoutes}</Layout>
            </div>
        );
    }
}
const mapStateToProps = newState => ({
    isLoggedIn: !!newState.authReducer.token
});

const mapDispatchToProps = dispatch => ({
    onLocalStorageAuth: () => dispatch(checkLocalAuthState())
});
export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(App)
);
