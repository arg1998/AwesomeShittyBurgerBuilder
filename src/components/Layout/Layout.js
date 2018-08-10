import React from 'react'
import Wrapper from '../../HOC/Wrapper';
import classes from './Layout.css'

const layout = (props) => {
    return (
        <Wrapper>
            <div>Toolbar, Side Drawer, BackDrop</div>
            <main className={classes.Content}>
                {props.children}
            </main>
        </Wrapper>
    );
}

export default layout;