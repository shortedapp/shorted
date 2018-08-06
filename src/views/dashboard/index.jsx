import React from 'react';
import Transition from 'react-transition-group/Transition';
import headerBackground from '../../assets/images/header-background.svg';
import AppViewWrapper from '../../components/AppViewWrapper';
import TopChart from '../../components/TopChart';
import TopShortsList from '../../components/TopShortsList';
import Legend from '../../components/Legend';
import Alerts from '../../components/Alerts';
import ThemePicker from '../../components/ThemePicker'
import WindowPicker from './../../components/WindowPicker';
import ShortedAPI from '../../services/sapi/client';
import { DashboardWrapper, themes, duration, transitionStyles } from './style';


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
 * 
 */

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.apiClient = new ShortedAPI()
        const fixtures = this.apiClient.getTopShorts('w')
        this.state = {
            graphData: {
                data: fixtures.data,
                datakeys: fixtures.datakeys
            },
            options: {
                values: ['d', 'w', 'm', 'y'],
            },
            selectedOption: false,
            inside: false,
        }
    }
    handleOptionSelected(value) {
        const fixtures = this.apiClient.getTopShorts(value)
        this.setState({
            selectedOption: value,
            graphData: {
                data: fixtures.data,
                datakeys: fixtures.datakeys
            }
        })
    }
    componentDidMount() {
        this.toggleEnterState();
    }
    toggleEnterState() {
        this.setState({ inside: true });
    }

    render() {
        const { options, selectedOption } = this.state;
        const { data, datakeys } = this.state.graphData;
        return (
            <Transition timeout={duration} in={true} appear={true}>
            {
                state => {
                    return (
                    <AppViewWrapper
                        background={headerBackground}
                        duration={duration}
                        {...transitionStyles[state]}
                        >
                        <DashboardWrapper>
                            <div className="content" >
                                <TopShortsList />
                                <TopChart
                                    data={data}
                                    datakeys={datakeys}
                                    picker={<WindowPicker
                                        options={options}
                                        selectedOption={selectedOption}
                                        onSelect={(value) => this.handleOptionSelected(value)}
                                        />
                                    }
                                />
                                <div className="top-right">
                                    <ThemePicker themes={themes}/>
                                    <Legend />
                                </div>
                                <Alerts />
                            </div>
                        </DashboardWrapper>
                    </AppViewWrapper>
                    )
                }
            }
            </Transition>
            )
            
    }
}


export default Dashboard;
