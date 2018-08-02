import React from 'react';

import { Wrapper } from './style';


/**
 * AppViewWrapper
 * provides a overall app layout & styling, to be shared across multiple `views`
 * takes child components/views which are rendered within this app-styling wrapper. Implements functionality
 * such as backgrounds, borders, transitions, animations etc.
 * @param {*} props
 */
const AppViewWrapper = (props) => (
    <Wrapper {...props}>
        {props.children}
    </Wrapper>
)

export default AppViewWrapper;