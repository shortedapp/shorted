import React from 'react';
import ShortedAPI from 'src/services/sapi/client';
import ChartOptions from './components/ChartOptions';
import WindowPicker from './components/WindowPicker';
import Chart from './components/Chart';
import {
    Wrapper,
    duration,
    transitionStyles,
    OptionsWrapper,
    ChartWrapper,
    WindowWrapper,
} from './style';
class AdvancedChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            options: {
                values: ['d', 'w', 'm', 'y'],
            },
            selectedWindowOption: 'w',
            selectedCode: false,
            selectedChartOption: 'NORMAL',
            inside: false,
        };
    }
    handleWindowOptionSelected(value) {
        this.setState({
            selectedWindowOption: value,
        });
    }
    handleChartOptionChange(value) {
        this.setState({selectedChartOption: value});
    }
    handleSelectCode(value) {
        this.setState({
            selectedCode: value,
        });
    }
    componentDidMount() {
        this.toggleEnterState();
    }
    toggleEnterState() {
        this.setState({inside: true});
    }
    render() {
        return (
            <Wrapper>
                <OptionsWrapper>
                    <ChartOptions />
                </OptionsWrapper>
                <WindowWrapper>
                    <WindowPicker />
                </WindowWrapper>
                <ChartWrapper>
                    <Chart />
                </ChartWrapper>
            </Wrapper>
        );
    }
}

export default AdvancedChart;
