import React from 'react';
import {
    VictoryChart,
    VictoryAxis,
    VictoryLabel,
    VictoryContainer,
    VictoryLine,
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
        
        if (this.props.victory) {
            return (
            <ThemeContext.Consumer>
                {theme => (
                <Wrapper>
                    <Chart>
                        {/* <VictoryChart
                            padding={{top: 0, left: 40, right: 20, bottom: 40}}
                            height={100}
                            width={580}
                            containerComponent={<VictoryContainer responsive />}> */}
                            <VictoryLine
                                height={100}
                                width={580}
                                padding={{top: 0, left: 40, right: 20, bottom: 40}}
                                data={this.props.data}
                                style={{
                                    data: {
                                        stroke: theme.stroke,
                                        strokeWidth: 3,
                                    },
                                }}
                            />
                        {/* </VictoryChart> */}
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
