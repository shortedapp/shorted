import React from 'react';
import { Wrapper } from './style';

import Row from '../Row';

const List = (props) => (<Wrapper>
    {props.data.items.map((row) => <Row data={row} />)}
</Wrapper>)

export default List;