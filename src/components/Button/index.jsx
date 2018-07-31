import React from 'react';
import { Wrapper } from './style';

const Button = (props) => (
    <Wrapper onClick={() => props.handleSelect(props.value)}>
        {props.value}
    </Wrapper>
)

export default Button;