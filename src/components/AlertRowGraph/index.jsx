import React from 'react';
import { VictoryChart, VictoryAxis, VictoryArea, VictoryLabel, VictoryContainer, VictoryLine } from 'victory';
// import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { Wrapper, Header, Chart } from './style';


/**
 * LegendCompanyMarketCap
 * 
 */
class AlertRowGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    console.log(this.props)
  }
  getTickValues() {
    return [
      new Date(2002, 1, 1),
      new Date(2017, 1, 1),
      new Date(2018, 1, 1)
    ]
  }

  render() {
    return (
      <Wrapper>
        <VictoryChart padding={{ top: 0, left: 0, right: 0, bottom: 0 }} height={100} width={400}
          containerComponent={<VictoryContainer responsive={true}/>}
        >
          <VictoryArea
            interpolation="natural"
            style={{
              data: {
                fill: "#c0caff",
                strokeWidth: 2,
                fillOpacity: "0.4",
                stroke: "#8396ff"
                }
            }}
            data={this.props.data} />
            <VictoryAxis tickFormat={() => ''} style={{ axis: {stroke: "none"} }} />
        </VictoryChart>
      </Wrapper>
    )
  }
}

export default AlertRowGraph;
