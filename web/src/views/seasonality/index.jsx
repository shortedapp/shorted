import React from 'react';
import Transition from 'react-transition-group/Transition';
import ShortedAPI from '../../services/sapi/client';
import {DashboardWrapper, duration, transitionStyles} from './style';

/**
 * View:Seasonality
 * Shows the comparison of data over same season/timedown a year apart. This will provide insights to regularities within markets and contextualise these
 * trends.
 * TODO:
 * * SeasonalityGraph - shows the graph of a stock over the seasoned windows
 * * Shows relative comparison of short positions relative to other seasonality behaviors like holidays, winter, summer
 * * refactor data management, should be moved to top level potentially with dumber components
 *
 */

class Seasonality extends React.Component {
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
                            Seasonality analytics goes here
                        </DashboardWrapper>
                    );
                }}
            </Transition>
        );
    }
}

export default Seasonality;
