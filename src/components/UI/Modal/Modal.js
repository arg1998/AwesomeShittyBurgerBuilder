import React, { Component } from 'react';
import Wrapper from '../../../HOC/Wrapper';
import Backdrop from '../Backdrop/Backdrop';

import classes from './Modal.css';

class modal extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show;
    }

    render() {
        return (
            <Wrapper>
                <Backdrop
                    clicked={this.props.modalClosed}
                    show={this.props.show}
                />
                <div
                    className={classes.Modal}
                    style={{
                        transform: this.props.show
                            ? 'translateY(0)'
                            : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}>
                    {this.props.children}
                </div>
            </Wrapper>
        );
    }
}

export default modal;
