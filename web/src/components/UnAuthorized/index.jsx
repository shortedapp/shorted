import React from 'react';
import { Wrapper, Message, Button } from './style';

const UnAuthorized = props => (
    <Wrapper
        {...props.theme}>
        <Message>You Must be Logged in to view this page</Message>
        <Button>Login</Button>
    </Wrapper>
);

export default UnAuthorized;
