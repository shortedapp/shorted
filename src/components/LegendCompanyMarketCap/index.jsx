import React from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { Wrapper } from './style';


/**
 * LegendCompanyMarketCap
 * 
 */
class LegendCompanyMarketCap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const data = [
      {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
      {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
      {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
      {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
      {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
      {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
      {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
    ];
    return (
      <Wrapper>
        <ResponsiveContainer width='100%' height={170}>
          <LineChart height={100} data={data} margin={{top: 30, right: 20, left: 20, bottom: 30}}>
            <Line dot={false} isAnimationActive={false} type='monotone' dataKey='pv' stroke='#8884d8' strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </Wrapper>
    );
  }
}

export default LegendCompanyMarketCap;
