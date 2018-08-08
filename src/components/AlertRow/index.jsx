import React from 'react';

import { Wrapper , Name, Code } from './style';

/**
 * Renders a given row in the alert & anomalies widget.
 */
const AlertRow = (props) =>  (
    <Wrapper>
        <Code><div className="code">{props.code}</div></Code>
        <Name>{props.name}</Name>
    </Wrapper>
)

export default AlertRow;