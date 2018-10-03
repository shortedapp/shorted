import React from 'react';
import {
    VictoryChart,
    VictoryAxis,
    VictoryLabel,
    VictoryContainer,
    VictoryGroup,
    VictoryVoronoiContainer,
    VictoryTooltip,
    VictoryLine,
    VictoryScatter,
} from 'victory';
import {ThemeContext} from 'src/theme-context';
import {Wrapper, Header, Chart} from './style';

/**
 * LegendCompanyMarketCap
 *
 */
class SimpleSpark extends React.Component {
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
        var minValue = null;
        var maxValue = null;
        if (this.props.showMinMax) {
            minValue = Math.min(...spark_data);
            maxValue = Math.max(...spark_data);
        }
        return (
            <ThemeContext.Consumer>
                {theme => (
                    <Wrapper>
                        <Chart>
                            <VictoryGroup
                                padding={{
                                    top: 10,
                                    left: 20,
                                    right: 20,
                                    bottom: 10,
                                }}
                                height={80}
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
                                            stroke:
                                                theme.profileHeaderWidgetGraphStroke,
                                            strokeWidth: 3,
                                        },
                                    }}
                                />
                                {this.props.showMinMax ? (
                                    <VictoryScatter
                                        labelComponent={<VictoryTooltip />}
                                        labels={d => d.y}
                                        data={this.props.data}
                                        size={datum =>
                                            datum.y === minValue ||
                                            datum.y === maxValue
                                                ? 5
                                                : 0
                                        }
                                        style={{
                                            data: {
                                                fill:
                                                    theme.profileHeaderWidgetGraphStroke,
                                            },
                                        }}
                                    />
                                ) : null}
                            </VictoryGroup>
                        </Chart>
                    </Wrapper>
                )}
            </ThemeContext.Consumer>
        );
    }
}

export default SimpleSpark;
