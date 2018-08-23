import React from 'react';
import {Wrapper} from './style';
import Row from '../Row';
import UnAuthorized from '../../../../components/UnAuthorized';

const List = props => (
    <Wrapper>
        {props.data ? props.data.map(row => (
            <Row theme={props.theme} {...row} />
        )) : <UnAuthorized />}
    </Wrapper>
);

export default List;
