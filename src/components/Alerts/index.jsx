import React from 'react';
import Transition from 'react-transition-group/Transition';
import ShortedAPI from '../../services/sapi/client';
import AlertRow from '../../components/AlertRow';
import {
    duration,
    transitionStyles,
    Wrapper,
    Header } from './style';
/**
 * Responsible for the rendering/display of "alerts" which represent anomalous changes in short positions for a given stock.
 */
class Alerts extends React.Component {
    constructor(props) {
        super(props);
        this.apiClient = new ShortedAPI()
        this.state = {
            data: this.apiClient.getTopAlerts(),
            inside: false
        }
    }
    componentDidMount() {
        this.toggleEnterState();
    }
    
    toggleEnterState() {
        this.setState({ inside: true });
    }

    render() {
        const alerts = this.state.data.alerts.map((alert) => <AlertRow key={alert.code} {...alert} />)
        return (<Transition timeout={duration} in={true} appear={true}>
            {
                state => {
                    return (
                        <Wrapper
                        duration={duration}
                        {...transitionStyles[state]}
                        >
                            <Header>Alerts & Anomalies</Header>
                            {alerts}
                        </Wrapper>
                    )
                }
            }
        </Transition>)
            }
}

export default Alerts;