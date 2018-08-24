import React, { Component } from 'react';
import Wrapper from '../../HOC/Wrapper';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';

class Layout extends Component {
    state = {
        showSideDrawer: false
    };

    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false });
    };

    sideDrawerToggleHandler = () => {
        this.setState(prevState => {
            return { showSideDrawer: !prevState.showSideDrawer };
        });
    };

    render() {
        return (
            <Wrapper>
                <Toolbar
                    isLoggedIn={this.props.isLoggedIn}
                    toggleDrawer={this.sideDrawerToggleHandler}
                />
                <SideDrawer
                    isLoggedIn={this.props.isLoggedIn}
                    onClose={this.sideDrawerClosedHandler}
                    show={this.state.showSideDrawer}
                />
                <main className={classes.Content}>{this.props.children}</main>
            </Wrapper>
        );
    }
}

const mapStateTpProps = newState => ({
    isLoggedIn: !!newState.authReducer.token
});

export default connect(
    mapStateTpProps,
    null
)(Layout);
