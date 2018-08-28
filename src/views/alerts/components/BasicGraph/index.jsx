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
import { ThemeContext } from '../../../../theme-context';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import {Wrapper, Header, Chart} from './style';

/**
 * LegendCompanyMarketCap
 *
 */
class BasicGraph extends React.Component {
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
        const spark_data = this.props.data.map((value) => value.y)
        const minValue = Math.min(...spark_data)
        const maxValue = Math.max(...spark_data)
        if (this.props.victory) {
            return (
            <ThemeContext.Consumer>
                {theme => (
                <Wrapper>
                    <Chart>
                        <VictoryGroup
                            padding={{top: 0, left: 40, right: 20, bottom: 0}}
                            height={90}
                            width={580}
                            containerComponent={
                                <VictoryVoronoiContainer
                                    voronoiDimension="x"
                                    radius={5}
                                    padding={5}
                                 
                                />
                              }
                            >
                            <VictoryLine
                                labelComponent={<VictoryTooltip />}
                                labels={(d) => d.y}
                                padding={{top: 0, left: 40, right: 20, bottom:0}}
                                data={this.props.data}
                                style={{
                                    data: {
                                        stroke: this.props.changeDirection ? theme.downStroke : theme.upStroke,
                                        strokeWidth: 3,
                                    },
                                }}
                            />
                            <VictoryScatter
                                labelComponent={<VictoryTooltip />}
                                labels={(d) => d.y}
                                data={this.props.data}
                                size={(datum) => (datum.y === minValue || datum.y === maxValue) ? 5 : 0}
                                style={{ data: {
                                    fill: this.props.changeDirection ?  theme.downStroke : theme.upStroke
                                }}}
                            />
                        </VictoryGroup>
                    </Chart>
                </Wrapper>)}
            </ThemeContext.Consumer>)
        } else if (this.props.spark) {
            const spark_data = this.props.data.map((value) => value.y)
            console.log(spark_data)
            return (
                <Wrapper>
                    <Chart>
                        <Sparklines data={spark_data} limit={20} width={200} height={100} margin={5}>
                        <SparklinesLine color="blue" />
                        </Sparklines>
                    </Chart>
                </Wrapper>
            )
        }
    }
}

export default BasicGraph;
