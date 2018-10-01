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
      selectedCode: false,
      selectedChartOption: 'NORMAL',
      inside: false
    }
    this.apiClient = new ShortedAPI();
  }
  handleWindowOptionSelected (value) {
    this.setState({
      selectedWindowOption: value
    })
  }
  handleChartOptionChange (value) {
    this.setState({ selectedChartOption: value })
  }
  handleSelectCode (value) {
    this.setState({
      selectedCode: value
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
      selectedCode
    } = this.state
    const data = this.apiClient.getShortTimeseries(this.props.code,selectedWindowOption)
    console.log('AdvanvedChart:',data)
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
              <Chart data={data}/>
            </ChartWrapper>
          </Wrapper>
        )}
      </ThemeContext.Consumer>
    )
  }
}

export default AdvancedChart
