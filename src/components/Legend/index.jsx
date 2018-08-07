import React from 'react';

import LegendCompanyHeader from '../../components/LegendCompanyHeader';
import LegendCompanyMarketCap from '../../components/LegendCompanyMarketCap';
import {
    Wrapper,
    UnselectedWrapper,
    CompanyName,
    CompanyMarketCap } from './style';
/**
 * Renders a shorted.com.au logo
 * TODO: add data fetch here, async or prefetch based of top-short positions
 */
class Legend extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        const profile = this.props.code ? (
            <Wrapper>
                <LegendCompanyHeader code={this.props.code}/>
                    <CompanyName />
                <LegendCompanyMarketCap />
            </Wrapper>
            ) : (<UnselectedWrapper><p>hover over graph to show profile</p></UnselectedWrapper>);
        return profile
    }
}

export default Legend;