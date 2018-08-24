import React, { Component } from 'react';
import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import { connect } from 'react-redux';
import { checkLocalAuthState } from './store/actions/exports';

class App extends Component {
    componentDidMount() {
        this.props.onLocalStorageAuth();
    }
    render() {
        let guarderRoutes = (
            <Switch>
                <Route path="/checkout" component={Checkout} />
                <Route path="/orders" component={Orders} />
                <Route path="/logout" component={Logout} />
                <Route path="/" exact component={BurgerBuilder} />
                <Redirect to="/" />
            </Switch>
        );

        if (!this.props.isLoggedIn) {
            guarderRoutes = (
                <Switch>
                    <Route path="/auth" component={Auth} />
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
