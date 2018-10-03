import React from 'react'
import { ThemeContext } from 'src/theme-context'
import ShortedAPI from 'src/services/sapi/client'
import ChartOptions from './components/ChartOptions'
import WindowPicker from './components/WindowPicker'
import Chart from './components/Chart'
import {
  Wrapper,
  duration,
  transitionStyles,
  OptionsWrapper,
  ChartWrapper,
  WindowWrapper
} from './style'
class AdvancedChart extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      options: {
        values: ['d', 'w', 'm', 'y']
      },
      selectedWindowOption: 'm',
      selectedLine: false,
      selectedChartOption: 'NORMAL',
      inside: false
    }
    this.apiClient = new ShortedAPI()
  }
  handleWindowOptionSelected (value) {
    this.setState({
      selectedWindowOption: value
    })
  }
  handleChartOptionChange (value) {
    this.setState({ selectedChartOption: value })
  }
  handleSelectLine (value) {
    console.log('selectedLine:',value)
    this.setState({
      selectedLine: value
    })
  }
  componentDidMount () {
    this.toggleEnterState()
  }
  toggleEnterState () {
    this.setState({ inside: true })
  }
  render () {
    const {
      options,
      selectedChartOption,
      selectedWindowOption,
      selectedLine
    } = this.state
    const data = this.apiClient.getShortTimeseries(
      this.props.code,
      selectedWindowOption
    )
    return (
      <ThemeContext.Consumer>
        {theme => (
          <Wrapper>
            <OptionsWrapper>
              <ChartOptions
                onChartOptionChange={value =>
                  this.handleChartOptionChange(value)}
              />
            </OptionsWrapper>
            <WindowWrapper>
              <WindowPicker
                theme={theme}
                options={options}
                selectedOption={selectedWindowOption}
                onSelect={value => this.handleWindowOptionSelected(value)}
              />
            </WindowWrapper>
            <ChartWrapper>
              <Chart
                data={data}
                selectedWindowOption={selectedWindowOption}
                selectedLine={selectedLine}
                onSelectLine={value => this.handleSelectLine(value)}
              />
            </ChartWrapper>
          </Wrapper>
        )}
      </ThemeContext.Consumer>
    )
  }
}

export default AdvancedChart
