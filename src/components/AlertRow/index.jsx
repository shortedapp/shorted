import React from 'react';

import {
    Wrapper,
    Name,
    Code,
    Percentage,
    IndicatorWrapper,
    IndicatorUp,
    IndicatorDown,
    PercentageChanged,
    PercentageCurrent } from './style';

/**
 * Renders a given row in the alert & anomalies widget.
 */
const AlertRow = (props) =>  (
    <Wrapper>
        <Code><div className="code">{props.code}</div></Code>
        <Name>{props.name}</Name>
        <Percentage>
            <PercentageCurrent>{props.current}%</PercentageCurrent>
            <PercentageChanged value={props.changed} >{props.changed}%</PercentageChanged>
        </Percentage>
        <IndicatorWrapper>
        {props.changed > 0 ? <IndicatorUp /> : <IndicatorDown/>}
        </IndicatorWrapper>
    </Wrapper>
)

export default AlertRow;