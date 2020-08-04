import React from 'react';
import Transition from 'react-transition-group/Transition';
import ShortedAPI from '../../services/sapi/client';
import {DashboardWrapper, duration, transitionStyles} from './style';

/**
 * View:Movers
 * Shows the movers breakdown. This should represent stocks/sector trends in the market that are moving over short, medium and long term
 * time windows
 * Should utilise the advanced getMovers function, which supports specification of window when caluclating relavent windows. Also should
 * support filtering based of sectors.
 * TODO:
 * * add MoversListView(List + PieChart + Dynamic Data), 
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
