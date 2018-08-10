import React from 'react';
import ShortedAPI from '../../services/sapi/client';
import AlertRow from '../../components/AlertRow';
import { Wrapper, Header } from './style';
/**
 * Responsible for the rendering/display of "alerts" which represent anomalous changes in short positions for a given stock.
 */
class Alerts extends React.Component {
    constructor(props) {
        super(props);
        this.apiClient = new ShortedAPI()
        this.state = {
            data: this.apiClient.getTopAlerts()
        }
    }

    render() {
        console.log(this.state)
        const alerts = this.state.data.alerts.map((alert) => <AlertRow key={alert.code} {...alert} />)
        return (
            <Wrapper>
                <Header>Alerts & Anomalies</Header>
                {alerts}
            </Wrapper>
        )
    }
}

export default Alerts;