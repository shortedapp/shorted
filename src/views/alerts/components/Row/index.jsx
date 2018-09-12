import React from 'react';
import BasicGraph from '../BasicGraph';
import { ThemeContext } from '../../../../theme-context';
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
const Row = props => (
    <ThemeContext.Consumer>
        { theme =>(
        <Wrapper {...theme} >
            <Code>
                <div className="code">{props.code}</div>
            </Code>
            <Name>{props.name}</Name>
            <Percentage>
                <PercentageCurrent>{props.current}%</PercentageCurrent>
                <PercentageChanged value={props.changed}>
                    {props.changed}%
                </PercentageChanged>
            </Percentage>
            <IndicatorWrapper>
                {props.changed > 0 ? <IndicatorUp /> : <IndicatorDown />}
            </IndicatorWrapper>
            <BasicGraph
                victory
                changeDirection={props.changed > 0}
                theme={theme}
                data={props.recent_history} />
        </Wrapper>)}
    </ThemeContext.Consumer>
);

export default Row;
