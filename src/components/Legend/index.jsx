import React from 'react';

import LegendCompanyCode from '../../components/LegendCompanyCode';
import LegendCompanyLogo from '../../components/LegendCompanyLogo';
import LegendCompanyPE from '../../components/LegendCompanyPE';
import LegendCompanyMarketCap from '../../components/LegendCompanyMarketCap';
import {
    Wrapper,
    UnselectedWrapper,
    CompanyName } from './style';
import ShortedAPI from '../../services/sapi/client';
/**
 * Renders a shorted.com.au logo
 * TODO: add data fetch here, async or prefetch based of top-short positions
 */
class Legend extends React.Component {
    constructor(props) {
        super(props)
        this.apiClient = new ShortedAPI()
    }
    render() {
        const data = this.apiClient.getStockSummary(this.props.code)
        const logo = this.apiClient.getStockLogo(this.props.code)
        console.log(data)
        console.log(logo)
        const profile = this.props.code ? (
            <Wrapper>
                <LegendCompanyLogo logo={logo} />
                <LegendCompanyCode code={this.props.code} />
                <LegendCompanyPE pe={data.data.PE} />
                <CompanyName>{data.metadata.name}</CompanyName>
                <LegendCompanyMarketCap data={data.data} />
            </Wrapper>
            ) : (<UnselectedWrapper><p>hover over graph to show profile</p></UnselectedWrapper>);
        return profile
    }
}

export default Legend;