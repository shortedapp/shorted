import React from 'react';
import ReactDOM from 'react-dom';
import {Radio, Icon} from 'antd';
// TODO: look at how antd style sheets can be inherently added into project without imports, plugin may be doing this
import 'antd/dist/antd.css';
import {
    Button,
    OptionsWrapper,
    OptionHeader,
    Wrapper,
    radioStyle,
    buttonStyle,
} from './style';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const Options = props => (
    <OptionsWrapper {...props}>
        <OptionHeader>Chart display</OptionHeader>
        <div className="chart-modes">
            <RadioGroup
                onChange={e => props.onOptionsChange(e.target.value)}
                defaultValue="a"
                buttonStyle="solid">
                <RadioButton style={radioStyle} value="NORMAL">
                    Normal
                </RadioButton>
                <RadioButton style={radioStyle} value="CANDLE">
                    CandleStick
                </RadioButton>
                <RadioButton style={radioStyle} value="SMOOTHED">
                    Smoothed
                </RadioButton>
                <RadioButton style={radioStyle} value="AREA">
                    Area
                </RadioButton>
            </RadioGroup>
        </div>
    </OptionsWrapper>
);

class ChartOptions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
        this.optionsArea = React.createRef();
        this.handleOutsideClick = this.handleOutsideClick.bind(this);
    }
    onComponentDidUnmount() {
        document.removeEventListener('click', e => this.handleOutsideClick(e));
    }
    handleOutsideClick(e) {
        const chartOptionsArea = ReactDOM.findDOMNode(this);
        // chartOptionsArea = this.node
        if (chartOptionsArea.contains(e.target)) {
            return;
        }
        this.handleSelect();
    }

    handleSelect() {
        if (!this.state.open) {
            // attach/remove event handler
            document.addEventListener('click', this.handleOutsideClick, false);
        } else {
            document.removeEventListener(
                'click',
                this.handleOutsideClick,
                false,
            );
        }
        this.setState(prevState => ({
            open: !prevState.open,
        }));
    }
    handleOptionsChange(e, v) {
        console.log(e, v);
    }

    render() {
        return (
            <Wrapper>
                <Button onClick={() => this.handleSelect()}>
                    <Icon type="setting" style={buttonStyle} />
                </Button>
                <Options
                    onOptionsChange={v => this.props.onChartOptionChange(v)}
                    open={this.state.open}
                />
            </Wrapper>
        );
    }
}

export default ChartOptions;
