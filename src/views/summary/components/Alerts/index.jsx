import React from 'react';
import Transition from 'react-transition-group/Transition';
import AlertRow from '../AlertRow';
import {duration, transitionStyles, Wrapper, Header, More, Rows} from './style';
/**
 * Responsible for the rendering/display of "alerts" which represent anomalous changes in short positions for a given stock.
 */
class Alerts extends React.Component {
    constructor(props) {
        super(props);
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
        const alerts = this.props.data.map(alert => (
            <AlertRow key={alert.code} {...alert} />
        ));
        return (
            <Transition timeout={duration} in appear>
                {state => {
                    return (
                        <Wrapper
                            duration={duration}
                            {...transitionStyles[state]}>
                            <Header>Alerts & Anomalies</Header>
                            <Rows>
                            {alerts}
                            </Rows>
                            <More>Show More </More>
                        </Wrapper>
                    );
                }}
            </Transition>
        );
    }
}

export default Alerts;
