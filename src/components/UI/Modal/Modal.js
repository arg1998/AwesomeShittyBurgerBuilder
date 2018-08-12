import React from 'react';
import Wrapper from '../../../HOC/Wrapper';
import Backdrop from '../Backdrop/Backdrop'

import classes from './Modal.css';

const modal = props => (
    <Wrapper>
        <Backdrop clicked={props.modalClosed} show={props.show} />
        <div
            className={classes.Modal}
            style={{
                transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.show ? '1' : '0'
            }}>
            {props.children}
        </div>
        
    </Wrapper>
);


export default modal;
