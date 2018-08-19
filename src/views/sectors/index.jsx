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
 * View:Sectors
 * Shows the sector breakdown view
 * TODO:
 * * add graph integration via victory etc.
 * * add legend component for on-select animation/effect
 * * refactor data management, should be moved to top level potentially with dumber components
 *
 */

class Sectors extends React.Component {
    constructor(props) {
        super(props);
        this.apiClient = new ShortedAPI();
        this.state = {
            inside: false,
        };
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
                            Sector breakdown goes here
                        </DashboardWrapper>
                    );
                }}
            </Transition>
        );
    }
}

export default Sectors;
