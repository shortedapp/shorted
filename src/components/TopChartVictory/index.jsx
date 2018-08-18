import React from 'react';
import {
  VictoryChart,
  VictoryAxis,
  VictoryLabel,
  VictoryContainer,
  VictoryTooltip,
  VictoryLine,
  VictoryArea,
  VictoryVoronoiContainer,
} from 'victory';
import Transition from 'react-transition-group/Transition';
import {
  duration,
  transitionStyles,
  Wrapper,
  PickerWrapper,
  ChartWrapper,
  OptionsWrapper,
  colors700,
  colors300,
} from './style';
import { TopChartTooltip } from './components';
/**
 * Chart
 * Component responsible for rendering the page1 graphic displaying the top short positions
 * TODO:
 *   * add more styling to graph currently nothing present
 *   * add more intelligent x-axis ticks as windowpicker is changed
 *   * refactor to use victory charts
 *   * multiple display modes such as candleStick etc.
 *   * implement brush and zoom
 *   * implement select to zoom
 *   * implement hover filtering/hiding other lines
 *
 *
 */
class TopChartVictory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inside: false,
    };
  }
  componentDidMount() {
    this.toggleEnterState();
  }

  toggleEnterState() {
    this.setState({inside: true});
  }
  handleLineHover(e, key) {
    this.props.onSelectCode(key);
  }

  render() {
    const { data, selectedCode } = this.props;
    var lines = null;
    if (this.props.mode == 'NORMAL') {
      lines = data.dataKeys.map((key, index) => (
        <VictoryLine
          key={key}
          data={data.data}
          x="date"
          y={key}
          events={[
            {
              target: 'parent',
              eventHandlers: {
                onMouseOver: e => this.handleLineHover(e, key),
              },
            },
          ]}
          style={{
            data: {
              stroke: colors700[index],
              strokeOpacity: (key === selectedCode || !selectedCode) ? 1 : 0.2,
              strokeWidth: 2,
            },
          }}
        />
      ));
    } else if (this.props.mode == 'AREA') {
      lines = data.dataKeys.map((key, index) => (
        <VictoryArea
          key={key}
          data={data.data}
          x="date"
          y={key}
          events={[
            {
              target: 'parent',
              eventHandlers: {
                onMouseOver: e => this.handleLineHover(e, key),
              },
            },
          ]}
          style={{
            data: {
              stroke: colors700[index],
              fill: colors700[index],
              fillOpacity: 0.3,
              strokeWidth: 2,
            },
          }}
        />
      ));
    }
    return (
      <Transition timeout={duration} in appear>
        {state => {
          return (
            <Wrapper duration={duration} {...transitionStyles[state]}>
              <PickerWrapper>{this.props.picker}</PickerWrapper>
              <OptionsWrapper>{this.props.options}</OptionsWrapper>
              <ChartWrapper>
                <VictoryChart
                  padding={{top: 0, left: 40, right: 20, bottom: 50}}
                  height={310}
                  containerComponent={<VictoryVoronoiContainer
                    labels={(d) => `${d.date} \n stock: ${selectedCode} \n shorted: ${d[selectedCode]}%`}
                    labelComponent={
                      <VictoryTooltip flyoutComponent={<TopChartTooltip />} cornerRadius={0} flyoutStyle={{fill: "white"}}/>}
                  />}
                  // containerComponent={
                  //   <VictoryVoronoiContainer voronoiDimension="x"
                  //     labels={(d) => `y: ${d.y}`}
                  //     labelComponent={<VictoryTooltip cornerRadius={0} flyoutStyle={{fill: "white"}}/>}
                  //   />
                  // }
                  >
                  {lines}
                  <VictoryAxis
                    label="Time"
                    standalone={false}
                    tickCount={5}
                    style={{
                      axis: {stroke: '#756f6a'},
                      axisLabel: {
                        fontSize: 12,
                        padding: 25,
                        fontFamily: 'Avenir Next,sans-serif',
                      },
                      ticks: {stroke: 'grey', size: 5},
                      tickLabels: {fontSize: 7, padding: 5},
                    }}
                  />
                  <VictoryAxis
                    dependentAxis
                    tickFormat={t => `${Math.round(t)}`}
                    tickLabelComponent={<VictoryLabel textAnchor="middle" />}
                    domain={[0, 100]}
                    label="Percentage Shorted"
                    style={{
                      axisLabel: {
                        fontSize: 12,
                        padding: 32,
                        angle: 90,
                        fontFamily: 'Avenir Next,sans-serif',
                      },
                      ticks: {stroke: 'grey', size: 5},
                      tickLabels: {fontSize: 7, angle: 90, padding: 7},
                    }}
                  />
                  
                </VictoryChart>
              </ChartWrapper>
            </Wrapper>
          );
        }}
      </Transition>
    );
  }
}

export default TopChartVictory;
