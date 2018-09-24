import React from 'react';
import AlertRowGraph from '../../components/AlertRowGraph';
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
    Graph,
    More,
} from './style';

/**
 * Renders a given row in the alert & anomalies widget.
 */
const AlertRow = props => (
    <ThemeContext.Consumer>
        {theme =>
            props.header ? (
                <HeaderWrapper {...theme}>
                    <div className="code">code</div>
                    <div className="company-name">company-name</div>
                    <div className="percentage">change</div>
                    <div className="idicator" />
                    <div className="history">history</div>
                </HeaderWrapper>
            ) : props.selectedRow === props.code ? (
                <WrapperHovered {...theme}>
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
                        {props.changed > 0 ? (
                            <IndicatorUp />
                        ) : (
                            <IndicatorDown />
                        )}
                    </IndicatorWrapper>
                    <Graph>
                        <AlertRowGraph
                            changeDirection={props.changed > 0}
                            data={props.recent_history}
                        />
                    </Graph>
                </WrapperHovered>
            ) : (
                <Wrapper onMouseOver={props.handleSelect} {...theme}>
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
                        {props.changed > 0 ? (
                            <IndicatorUp />
                        ) : (
                            <IndicatorDown />
                        )}
                    </IndicatorWrapper>
                    <Graph>
                        <AlertRowGraph
                            changeDirection={props.changed > 0}
                            data={props.recent_history}
                        />
                    </Graph>
                </Wrapper>
            )
        }
    </ThemeContext.Consumer>
);

export default AlertRow;
