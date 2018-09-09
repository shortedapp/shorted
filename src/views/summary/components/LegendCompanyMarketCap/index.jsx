import React from 'react';
import {
    VictoryChart,
    VictoryAxis,
    VictoryLabel,
    VictoryContainer,
    VictoryLine,
} from 'victory';
import {ThemeContext} from '../../../../theme-context';
// import { LineChart, Line, ResponsiveContainer } from 'recharts';
import {Wrapper, Header, Chart} from './style';

/**
 * LegendCompanyMarketCap
 *
 */
class LegendCompanyMarketCap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    getTickValues() {
        return [
            new Date(2002, 1, 1),
            new Date(2017, 1, 1),
            new Date(2018, 1, 1),
        ];
    }

    render() {
        return (
            <ThemeContext.Consumer>
                {theme => (
                    <Wrapper {...theme}>
                        <Header>
                            <VictoryLabel
                                text="Market Cap"
                                style={{
                                    fontSize: 20,
                                    fontWeight: 'bold',
                                    fontFamily: 'Avenir Next,sans-serif',
                                }}
                            />
                        </Header>
                        <Chart>
                            <VictoryChart
                                padding={{
                                    top: 0,
                                    left: 40,
                                    right: 20,
                                    bottom: 20,
                                }}
                                height={120}
                                width={580}
                                containerComponent={
                                    <VictoryContainer responsive />
                                }>
                                <VictoryLine
                                    style={{
                                        data: {
                                            stroke: theme.textColor,
                                        },
                                    }}
                                    data={this.props.data}
                                />
                                <VictoryAxis
                                    style={{
                                        axis: {stroke: theme.axisColor},
                                        ticks: {
                                            stroke: theme.axisColor,
                                            size: 5,
                                        },
                                        tickLabels: {
                                            fontSize: 7,
                                            padding: 5,
                                            fill: theme.axisColor,
                                        },
                                    }}
                                    tickCount={5}
                                    tickFormat={x => new Date(x).getFullYear()}
                                />
                            </VictoryChart>
                        </Chart>
                    </Wrapper>
                )}
            </ThemeContext.Consumer>
        );
    }
}

export default LegendCompanyMarketCap;
