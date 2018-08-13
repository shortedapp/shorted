import React from 'react';
import { Radio } from 'antd';
import 'antd/dist/antd.css';
import {
    Button,
    OptionsWrapper,
    Option,
    OptionHeader,
    Wrapper,
    radioStyle,
    } from './style';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;


const Options = (props) => (<OptionsWrapper {...props}>
    <OptionHeader>Chart display</OptionHeader>
    <RadioGroup onChange={props.onOptionsChange} defaultValue="a" buttonStyle="solid">
        <RadioButton style={radioStyle} value="a">Normal</RadioButton>
        <RadioButton style={radioStyle} value="b">CandleStick</RadioButton>
        <RadioButton style={radioStyle} value="c">Smoothed</RadioButton>
        <RadioButton style={radioStyle} value="d">Area</RadioButton>
      </RadioGroup>
</OptionsWrapper>)
class ChartOptions extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
        }
    }
    handleSelect() {
        this.setState(prevState => ({
            open: !prevState.open
        }))
    }
    handleOptionsChange(e, v) {
        console.log(e,v)
    }

    render() {
        return (<Wrapper>
            <Button onClick={() => this.handleSelect()} >   
            </Button>
            <Options onOptionsChange={(e,v) => this.handleOptionsChange(e,v)} open={this.state.open} />
            </Wrapper>
        )
    }
}

export default ChartOptions;