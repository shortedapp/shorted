import React from 'react'
import {
  VictoryChart,
  VictoryAxis,
  VictoryLabel,
  VictoryContainer,
  VictoryLine
} from 'victory'
import Transition from 'react-transition-group/Transition'
import ShortedAPI from '../../services/sapi/client'
import {
  duration,
  transitionStyles,
  Wrapper,
  PickerWrapper,
  ChartWrapper,
  OptionsWrapper,
  colors700
} from './style'
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
  constructor (props) {
    super(props)
    this.apiClient = new ShortedAPI()
    this.state = {
      inside: false
    }
  }
  componentDidMount () {
    this.toggleEnterState()
  }

  toggleEnterState () {
    this.setState({ inside: true })
  }
  handleLineHover (e, key) {
    this.props.onSelectCode(key)
  }

  render () {
    const { selectedOption } = this.props
    const fixtures = this.apiClient.getTopShorts(selectedOption)
    const lines = fixtures.dataKeys.map((key, index) => (
      <VictoryLine
        key={key}
        data={fixtures.data}
        x='date'
        y={key}
        events={[
          {
            target: 'parent',
            eventHandlers: {
              onMouseOver: e => this.handleLineHover(e, key)
            }
          }
        ]}
        style={{
          data: {
            stroke: colors700[index],
            strokeWidth: 2
          }
        }}
      />
    ))
    return (
      <Transition timeout={duration} in appear>
        {state => {
          return (
            <Wrapper duration={duration} {...transitionStyles[state]}>
              <PickerWrapper>
                {this.props.picker}
              </PickerWrapper>
              <OptionsWrapper>
                {this.props.options}
              </OptionsWrapper>
              <ChartWrapper>
                <VictoryChart
                  padding={{ top: 0, left: 40, right: 20, bottom: 50 }}
                  height={310}
                  containerComponent={<VictoryContainer responsive />}
                >
                  {lines}
                  <VictoryAxis
                    label='Time'
                    standalone={false}
                    tickCount={5}
                    style={{
                      axis: { stroke: '#756f6a' },
                      axisLabel: {
                        fontSize: 12,
                        padding: 25,
                        fontFamily: 'Avenir Next,sans-serif'
                      },
                      ticks: { stroke: 'grey', size: 5 },
                      tickLabels: { fontSize: 7, padding: 5 }
                    }}
                  />
                  <VictoryAxis
                    dependentAxis
                    tickFormat={t => `${Math.round(t)}`}
                    tickLabelComponent={<VictoryLabel textAnchor='middle' />}
                    domain={[0, 100]}
                    label='Percentage Shorted'
                    style={{
                      axisLabel: {
                        fontSize: 12,
                        padding: 32,
                        angle: 90,
                        fontFamily: 'Avenir Next,sans-serif'
                      },
                      ticks: { stroke: 'grey', size: 5 },
                      tickLabels: { fontSize: 7, angle: 90, padding: 7 }
                    }}
                  />
                </VictoryChart>
              </ChartWrapper>
            </Wrapper>
          )
        }}
      </Transition>
    )
  }
}

export default TopChartVictory
