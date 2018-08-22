import React from 'react';
import {
    VictoryChart,
    VictoryAxis,
    VictoryLabel,
    VictoryContainer,
    VictoryLine,
} from 'victory';
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
        // return (
        //   <Wrapper>
        //     <ResponsiveContainer width='100%' height={170}>
        //       <LineChart height={100} data={this.props.data} margin={{top: 30, right: 20, left: 20, bottom: 30}}>
        //         <Line dot={false} isAnimationActive={false} type='linear' dataKey='value' stroke='#8884d8' strokeWidth={2} />
        //       </LineChart>
        //     </ResponsiveContainer>
        //   </Wrapper>
        // );
        return (
            <Wrapper>
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
                        padding={{top: 0, left: 40, right: 20, bottom: 20}}
                        height={120}
                        width={580}
                        containerComponent={<VictoryContainer responsive />}>
                        <VictoryLine data={this.props.data} />
                        <VictoryAxis
                            tickCount={5}
                            tickFormat={x => new Date(x).getFullYear()}
                        />
                    </VictoryChart>
                </Chart>
            </Wrapper>
        );
    }
}

export default LegendCompanyMarketCap;
