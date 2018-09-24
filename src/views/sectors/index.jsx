import React from 'react';
import Transition from 'react-transition-group/Transition';
import ShortedAPI from '../../services/sapi/client';
import {SectorsWrapper, themes, duration, transitionStyles} from './style';

/**
 * View:Sectors
 * Shows the sector breakdown view. This should provide an interface for viewing top shorted stocks in a given sector and their relative sizing to other sectors and other stocks within the same sector.
 * THis can be achieved through a reactive ListView + PieChart, the piechart would show market breakdown, idally also enabled a second layer for specific stock within the sector breakdown.@abstract
 * The listview would be tapped for each of the core sectors
 * TODO:
 * * Pot
 * * add graph integration via victory etc.
 * * add legend component for on-select animation/effect
 * * Should show comparison and contextualisation around relative goods for the given sector. For example iron-ore price, currency etc.
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
        return (
            <Transition timeout={duration} in appear>
                {state => {
                    return (
                        <SectorsWrapper {...this.props.theme}>
                            Sector breakdown goes here
                        </SectorsWrapper>
                    );
                }}
            </Transition>
        );
    }
}

export default Sectors;
