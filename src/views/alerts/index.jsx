import React from 'react';
import Transition from 'react-transition-group/Transition';
import ShortedAPI from '../../services/sapi/client';
import List from './components/List';
import {DashboardWrapper, duration, transitionStyles, Header} from './style';

/**
 * View:Alerts
 * Shows Alerts/Anomalies across specific stocks and sectors. As well as other information such as news, tweets etc.
 * TODO:
 * * Add AlertListView, UserAlertsListView, ManageAlertWidget
 */

class Alerts extends React.Component {
    constructor(props) {
        super(props);
        this.apiClient = new ShortedAPI();
        this.state = {
            inside: false,
            rowSelected: false,
            rowHovered: false,
        };
    }
    componentDidMount() {
        this.toggleEnterState();
    }
    toggleEnterState() {
        this.setState({inside: true});
    }
    handleClick(rowSelected) {
        this.setState({rowSelected});
    }
    handleHover(rowHovered) {
        this.setState({rowHovered});
    }
    render() {
        return (
            <Transition timeout={duration} in appear>
                {state => {
                    return (
                        <DashboardWrapper {...this.props.theme}>
                        <Header>Market Alerts</Header>
                        <List
                            onHover={row => this.handleHover(row)}
                            onSelect={row => this.handleClick(row)}
                            data={this.apiClient.getTopAlerts()}
                        />
                        <Header>Your Alerts</Header>

                        <List
                            onHover={row => this.handleHover(row)}
                            onSelect={row => this.handleClick(row)}
                            data={this.apiClient.getUserAlerts()}
                        />

                        </DashboardWrapper>
                    );
                }}
            </Transition>
        );
    }
}

export default Alerts;
