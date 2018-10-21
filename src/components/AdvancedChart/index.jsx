import React from 'react';
import {ThemeContext} from 'src/theme-context';
import ShortedAPI from 'src/services/sapi/client';
import ChartOptions from './components/ChartOptions';
import WindowPicker from './components/WindowPicker';
import FixedTooltip from './components/FixedTooltip';
import Chart from './components/Chart';
import {
    Wrapper,
    duration,
    transitionStyles,
    SelectedValueWrapper,
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
            selectedWindowOption: 'm',
            selectedLine: false,
            selectedChartOption: 'NORMAL',
            valueSelected: null,
            inside: false,
            date: null,
        };
        this.apiClient = new ShortedAPI();
    }
    handleWindowOptionSelected(value) {
        this.setState({
            selectedWindowOption: value,
        });
    }
    handleChartOptionChange(value) {
        this.setState({selectedChartOption: value});
    }
    handleSelectLine(line, value) {
        this.setState({
            selectedLine: line,
            valueSelected: value,
        });
    }
    componentDidMount() {
        this._fetchData();
    }
    _fetchData() {
        Promise.resolve(
            this.apiClient.getShortTimeseries(
                this.props.code,
                this.state.selectedWindowOption,
            ),
        )
            .then(result => {
                this.setState({
                    data: result,
                    valueSelected: result[result.length - 1].y,
                    inside: true,
                });
            })
            .catch(error => console.log('_fetchData:error:', error));
    }
    componentDidUpdate(prevProps, prevState) {
        if (
            this.state.selectedWindowOption !== prevState.selectedWindowOption
        ) {
            this._fetchData();
            return true;
        }
    }
    render() {
        const {
            options,
            selectedChartOption,
            selectedWindowOption,
            selectedLine,
        } = this.state;
        return (
            <ThemeContext.Consumer>
                {theme =>
                    this.state.data ? (
                        <Wrapper>
                            <OptionsWrapper>
                                <ChartOptions
                                    onChartOptionChange={value =>
                                        this.handleChartOptionChange(value)
                                    }
                                />
                            </OptionsWrapper>
                            <WindowWrapper>
                                <WindowPicker
                                    theme={theme}
                                    options={options}
                                    selectedOption={selectedWindowOption}
                                    onSelect={value =>
                                        this.handleWindowOptionSelected(value)
                                    }
                                />
                            </WindowWrapper>
                            <ChartWrapper>
                                <Chart
                                    data={this.state.data}
                                    selectedWindowOption={selectedWindowOption}
                                    selectedLine={selectedLine}
                                    onSelectLine={(line, value) =>
                                        this.handleSelectLine(line, value)
                                    }
                                />
                            </ChartWrapper>
                            <SelectedValueWrapper>
                                <FixedTooltip
                                    value={this.state.valueSelected}
                                />
                            </SelectedValueWrapper>
                        </Wrapper>
                    ) : null
                }
            </ThemeContext.Consumer>
        );
    }
}

export default AdvancedChart;
