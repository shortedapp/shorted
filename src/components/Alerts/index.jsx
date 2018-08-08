import React from 'react';
import AlertRow from '../../components/AlertRow';
import { Wrapper } from './style';
/**
 * Responsible for the rendering/display of "alerts" which represent anomalous changes in short positions for a given stock.
 */
class Alerts extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const alerts = this.props.map((alert) => <AlertRow>{alert}</AlertRow>)
        return (
            <Wrapper>
                <p>alerts goes here</p>
            </Wrapper>
        )
    }
}

export default Alerts;