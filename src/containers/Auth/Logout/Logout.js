import React, { Component } from 'react';
import { logOut } from '../../../store/actions/exports';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class Logout extends Component {
    componentDidMount() {
        this.props.logOut();
    }
    render() {
        return <Redirect to='/' />;
    }
}

const mapDispatchToProps = dispatch => ({
    logOut: () => dispatch(logOut())
});

export default connect(
    null,
    mapDispatchToProps
)(Logout);
