import React from 'react';
import { Radio, Icon, Menu, Dropdown } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog } from '@fortawesome/free-solid-svg-icons'
import 'antd/dist/antd.css';
import {
    Button,
    OptionsWrapper,
    Option,
    OptionHeader,
    Wrapper,
    radioStyle,
    buttonStyle,
    } from './style';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const Options = (props) => (<OptionsWrapper {...props}>
    <OptionHeader>Chart display</OptionHeader>
    <div className="chart-modes">
        <RadioGroup onChange={props.onOptionsChange} defaultValue="a" buttonStyle="solid">
            <RadioButton style={radioStyle} value="a">Normal</RadioButton>
            <RadioButton style={radioStyle} value="b">CandleStick</RadioButton>
            <RadioButton style={radioStyle} value="c">Smoothed</RadioButton>
            <RadioButton style={radioStyle} value="d">Area</RadioButton>
        </RadioGroup>
      </div>
</OptionsWrapper>)
class ChartOptions extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
        }
        this.myRef = React.createRef();
    }
    handleOutsideClick(e) {
        console.log('outside click')
         // ignore clicks on the component itself
         console.log(this.myRef)
        if (this.myRef.node.contains(e.target)) {
            return;
        }
      this.handleSelect();
    }

    handleSelect() {
        if (!this.state.open) {
            // attach/remove event handler
            document.addEventListener('click', (e) => this.handleOutsideClick(e), false);
        } else {
        document.removeEventListener('click', (e) => this.handleOutsideClick(e), false);
        }
        this.setState(prevState => ({
            open: !prevState.open
        }))
    }
    handleOptionsChange(e, v) {
        console.log(e,v)
    }

    render() {
        return (<Wrapper ref={node => { this.node = node; }}>
            <Button onClick={() => this.handleSelect()} >
                <Icon type="setting" style={buttonStyle} spin={this.state.open} />
                {/* <FontAwesomeIcon icon={faCog} size="2x" /> */}
            </Button>
            <Options onOptionsChange={(e,v) => this.handleOptionsChange(e,v)} open={this.state.open} />
            </Wrapper>
        )
    }
}

export default ChartOptions;