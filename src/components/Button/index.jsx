import React from 'react';
import { Wrapper } from './style';

const Button = (props) => (
    <Wrapper selected={props.selected} onClick={() => props.handleSelect(props.value)}>
        {props.value}
    </Wrapper>
)

export default Button;