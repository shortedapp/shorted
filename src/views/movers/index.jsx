import React from 'react';
import Transition from 'react-transition-group/Transition';
import ShortedAPI from '../../services/sapi/client';
import {DashboardWrapper, duration, transitionStyles} from './style';

/**
 * View:Seasonality
 * Shows the sector breakdown view
 * TODO:
 * * add graph integration via victory etc.
 * * add legend component for on-select animation/effect
 * * refactor data management, should be moved to top level potentially with dumber components
 *
 */

class Movers extends React.Component {
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
        return (
            <Transition timeout={duration} in appear>
                {state => {
                    return (
                        <DashboardWrapper {...this.props.theme}>
                            Top Movers go here
                        </DashboardWrapper>
                    );
                }}
            </Transition>
        );
    }
}

export default Movers;
