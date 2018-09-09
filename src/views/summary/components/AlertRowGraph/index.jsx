import React from 'react';
import {
    VictoryGroup,
    VictoryVoronoiContainer,
    VictoryTooltip,
    VictoryLine,
    VictoryScatter,
} from 'victory';
import {ThemeContext} from '../../../../theme-context';
// import { LineChart, Line, ResponsiveContainer } from 'recharts';
import {Wrapper, Header, Chart} from './style';

/**
 * LegendCompanyMarketCap
 *
 */
class AlertRowGraph extends React.Component {
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
        const spark_data = this.props.data.map(value => value.y);
        const minValue = Math.min(...spark_data);
        const maxValue = Math.max(...spark_data);
        return (
            <ThemeContext.Consumer>
                {theme => (
                    <Chart>
                        <VictoryGroup
                            padding={{top: 10, left: 40, right: 20, bottom: 10}}
                            height={70}
                            width={200}
                            containerComponent={
                                <VictoryVoronoiContainer
                                    voronoiDimension="x"
                                    radius={5}
                                    padding={5}
                                />
                            }>
                            <VictoryLine
                                labelComponent={<VictoryTooltip />}
                                labels={d => d.y}
                                padding={{
                                    top: 0,
                                    left: 40,
                                    right: 20,
                                    bottom: 0,
                                }}
                                data={this.props.data}
                                style={{
                                    data: {
                                        stroke: this.props.changeDirection
                                            ? theme.downStroke
                                            : theme.upStroke,
                                        strokeWidth: 3,
                                    },
                                }}
                            />
                            <VictoryScatter
                                labelComponent={<VictoryTooltip />}
                                labels={d => d.y}
                                data={this.props.data}
                                size={datum =>
                                    datum.y === minValue || datum.y === maxValue
                                        ? 5
                                        : 0
                                }
                                style={{
                                    data: {
                                        fill: this.props.changeDirection
                                            ? theme.downStroke
                                            : theme.upStroke,
                                    },
                                }}
                            />
                        </VictoryGroup>
                    </Chart>
                )}
            </ThemeContext.Consumer>
        );
    }
}

export default AlertRowGraph;
