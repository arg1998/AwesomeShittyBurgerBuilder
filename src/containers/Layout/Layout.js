import React, { Component } from 'react';
import Wrapper from '../../HOC/Wrapper';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false
    };

    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false });
    };

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer }
        });
    };

    render() {
        return (
            <Wrapper>
                <Toolbar toggleDrawer={this.sideDrawerToggleHandler} />
                <SideDrawer
                    onClose={this.sideDrawerClosedHandler}
                    show={this.state.showSideDrawer}
                />
                <main className={classes.Content}>{this.props.children}</main>
            </Wrapper>
        );
    }
}

export default Layout;
