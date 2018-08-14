import React from 'react'
import {
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Line,
  Label
} from 'recharts'
import Transition from 'react-transition-group/Transition'
import ShortedAPI from '../../services/sapi/client'
import {
  duration,
  transitionStyles,
  Wrapper,
  PickerWrapper,
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
 *
 *
 */
class TopChart extends React.Component {
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
    console.log(e, key)
    this.props.onSelectCode(key)
  }

  render () {
    const { selectedOption } = this.props
    const fixtures = this.apiClient.getTopShorts(selectedOption)
    console.log(fixtures.data.length)
    const lines = fixtures.dataKeys.map((key, index) => (
      <Line
        key={key}
        onMouseOver={e => this.handleLineHover(e, key)}
        dot={false}
        type='monotone'
        dataKey={key}
        strokeWidth={3}
        stroke={colors700[index]}
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
              <div className='chart'>
                <ResponsiveContainer
                  aspect={4.0 / 3.0}
                  width='100%'
                  height={800}
                >
                  <LineChart
                    data={fixtures.data}
                    margin={{ top: 0, right: 50, left: 10, bottom: 40 }}
                  >
                    <XAxis
                      interval={Math.floor(fixtures.data.length / 5)}
                      dataKey='date'
                      fontFamily={'Avenir Next,sans-serif'}
                    >
                      <Label
                        value='Time'
                        offset={-20}
                        position='insideBottom'
                        fontFamily={'Avenir Next,sans-serif'}
                      />
                    </XAxis>
                    <YAxis
                      label={{
                        value: 'Shorted (%)',
                        angle: -90,
                        position: 'insideLeft',
                        offset: 10,
                        fontFamily: 'Avenir Next,sans-serif'
                      }}
                      fontFamily={'Avenir Next,sans-serif'}
                    />
                    <CartesianGrid stroke='#eee' strokeDasharray='5 5' />
                    <Tooltip />
                    {lines}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Wrapper>
          )
        }}
      </Transition>
    )
  }
}

export default TopChart
