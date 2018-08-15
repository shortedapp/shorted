import React from 'react'
import ReactDOM from 'react-dom'
import { Radio, Icon, Menu, Dropdown } from 'antd'
import 'antd/dist/antd.css'
import {
  Button,
  OptionsWrapper,
  Option,
  OptionHeader,
  Wrapper,
  radioStyle,
  buttonStyle
} from './style'

const RadioButton = Radio.Button
const RadioGroup = Radio.Group
class Options extends React.Component {
  constructor (props) {
    super(props)
  }
  render () {
    return (
      <OptionsWrapper {...this.props}>
        <OptionHeader>Chart display</OptionHeader>
        <div className='chart-modes'>
          <RadioGroup
            onChange={this.props.onOptionsChange}
            defaultValue='a'
            buttonStyle='solid'
          >
            <RadioButton style={radioStyle} value='a'>Normal</RadioButton>
            <RadioButton style={radioStyle} value='b'>CandleStick</RadioButton>
            <RadioButton style={radioStyle} value='c'>Smoothed</RadioButton>
            <RadioButton style={radioStyle} value='d'>Area</RadioButton>
          </RadioGroup>
        </div>
      </OptionsWrapper>
    )
  }
}
class ChartOptions extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false
    }
    this.optionsArea = React.createRef()
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }
  componentDidMount () {
    this.node = ReactDOM.findDOMNode(this)
  }
  onComponentDidUnmount () {
    document.removeEventListener('click', e => this.handleOutsideClick(e))
  }
  handleOutsideClick (e) {
    const chartOptionsArea = ReactDOM.findDOMNode(this)
    // chartOptionsArea = this.node
    if (chartOptionsArea.contains(e.target)) {
      return
    }
    this.handleSelect()
  }

  handleSelect () {
    if (!this.state.open) {
      // attach/remove event handler
      document.addEventListener('click', this.handleOutsideClick, false)
    } else {
      document.removeEventListener('click', this.handleOutsideClick, false)
    }
    this.setState(prevState => ({
      open: !prevState.open
    }))
  }
  handleOptionsChange (e, v) {
    console.log(e, v)
  }

  render () {
    return (
      <Wrapper ref='chartOptions'>
        <Button onClick={() => this.handleSelect()}>
          <Icon type='setting' style={buttonStyle} />
        </Button>
        <Options
          ref={this.optionsArea}
          onOptionsChange={(e, v) => this.handleOptionsChange(e, v)}
          open={this.state.open}
        />
      </Wrapper>
    )
  }
}

export default ChartOptions
