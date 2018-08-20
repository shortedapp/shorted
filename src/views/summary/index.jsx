import React from 'react';
import Transition from 'react-transition-group/Transition';
import headerBackground from '../../assets/images/header-background.svg';
import ShortedAPI from '../../services/sapi/client';
import AppViewWrapper from '../../components/AppViewWrapper';
import TopChartVictory from '../../components/TopChartVictory';
import MoversList from '../../components/MoversList';
import TopShortsList from '../../components/TopShortsList';
import Legend from '../../components/Legend';
import Alerts from '../../components/Alerts';
import ThemePicker from '../../components/ThemePicker';
import WindowPicker from './../../components/WindowPicker';
import ChartOptions from '../../components/ChartOptions';
import {DashboardWrapper, themes, duration, transitionStyles} from './style';
import {runInThisContext} from 'vm';

/**
 * View:TopShorts
 * Overarching container for the top short view.
 * Showing the following key widgets/displays:
 *  * top 10 short positions graphically.
 *  * table of top short position changes
 *  * alerts/anomalies
 *  * reactive-widget on hover/select of a given graph
 * TODO:
 * * add Transitions of components such as window picker, graph and background etc.
 * * add graph integration via recharts etc.
 * * add legend component for on-select animation/effect
 * * refactor data management, should be moved to top level potentially with dumber components
 *
 */

class Summary extends React.Component {
    constructor(props) {
        super(props);
        this.apiClient = new ShortedAPI();
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
        const {
            options,
            selectedChartOption,
            selectedWindowOption,
            selectedCode,
        } = this.state;
        return (
            <Transition timeout={duration} in appear>
                {state => {
                    return (
                        <DashboardWrapper {...this.props.theme}>
                            <div className="content">
                                <TopShortsList
                                    data={this.apiClient.getTopShortsList(20)}
                                />
                                <TopChartVictory
                                    picker={
                                        <WindowPicker
                                            theme={this.props.theme}
                                            options={options}
                                            selectedOption={
                                                selectedWindowOption
                                            }
                                            onSelect={value =>
                                                this.handleWindowOptionSelected(
                                                    value,
                                                )
                                            }
                                        />
                                    }
                                    options={
                                        <ChartOptions
                                            onChartOptionChange={value =>
                                                this.handleChartOptionChange(
                                                    value,
                                                )
                                            }
                                        />
                                    }
                                    data={this.apiClient.getTopShorts(
                                        selectedWindowOption,
                                    )}
                                    mode={selectedChartOption}
                                    selectedWindowOption={selectedWindowOption}
                                    selectedCode={selectedCode}
                                    onSelectCode={value =>
                                        this.handleSelectCode(value)
                                    }
                                />
                                <div className="top-right">
                                    <Legend
                                        theme={this.props.theme}
                                        code={selectedCode}
                                    />
                                </div>
                                <Alerts
                                    theme={this.props.theme}
                                    data={this.apiClient.getTopAlerts()}
                                />
                                <MoversList
                                    theme={this.props.theme}
                                    data={this.apiClient.getMovers(
                                        selectedWindowOption,
                                    )}
                                />
                            </div>
                        </DashboardWrapper>
                    );
                }}
            </Transition>
        );
    }
}

export default Summary;
