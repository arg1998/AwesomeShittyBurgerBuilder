import React from 'react'
import Wrapper from '../../HOC/Wrapper';

const layout = (props) => {
    return (
        <Wrapper>
            <div>Toolbar, Side Drawer, BackDrop</div>
            <main>
                {props.children}
            </main>
        </Wrapper>
    );
}

export default layout;