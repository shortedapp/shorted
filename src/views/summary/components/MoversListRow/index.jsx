import React from 'react';
import {ThemeContext} from '../../../../theme-context';
import {
    Wrapper,
    WrapperHovered,
    HeaderWrapper,
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
    <ThemeContext.Consumer>
        {theme =>
            props.header ? (
                <HeaderWrapper {...theme}>
                    <div className="code">code</div>
                    <div className="percentage">change</div>
                    <div className="idicator" />
                </HeaderWrapper>
            ) : props.code === props.selectedRow ? (
                <WrapperHovered {...theme}>
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
                </WrapperHovered>
            ) : (
                <Wrapper onMouseOver={props.handleSelect} {...theme}>
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
            )
        }
    </ThemeContext.Consumer>
);

export default MoversListRow;
