import React from 'react';
import { ThemeContext } from '../../../../theme-context';
import {
    Wrapper,
    Name,
    Code,
    Percentage,
    MarketCap,
    IndicatorWrapper,
} from './style';

/**
 * Renders a given row in the alert & anomalies widget.
 */
const ListHeader = props => (
    <ThemeContext.Consumer>
        { theme => { console.log(theme); return (
       
        <Wrapper {...theme} >
            <Code>Code</Code>
            <Name>Name</Name>
            <Percentage>Change</Percentage>
            <IndicatorWrapper></IndicatorWrapper>
            <MarketCap>Market Cap</MarketCap>
        </Wrapper>)}}
    </ThemeContext.Consumer>
);

export default ListHeader;
