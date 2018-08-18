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
    PercentageCurrent,
} from './style';

/**
 * Renders a given row in the alert & anomalies widget.
 */
const MoversListRow = props => (
    <Wrapper>
        <Code>
            <div className="code">{props.code}</div>
        </Code>
        <Name>{props.name}</Name>
        <Percentage>
            <PercentageCurrent>{props.current}%</PercentageCurrent>
            <PercentageChanged value={props.change}>
                {props.change}%
            </PercentageChanged>
        </Percentage>
        <IndicatorWrapper>
            {props.change > 0 ? <IndicatorUp /> : <IndicatorDown />}
        </IndicatorWrapper>
    </Wrapper>
);

export default MoversListRow;
