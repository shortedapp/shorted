import React from 'react';
import Transition from 'react-transition-group/Transition';
import LegendCompanyCode from '../LegendCompanyCode';
import LegendCompanyLogo from '../LegendCompanyLogo';
import LegendCompanyPE from '../LegendCompanyPE';
import LegendCompanyMarketCap from '../LegendCompanyMarketCap';
import {
    Wrapper,
    duration,
    transitionStyles,
    UnselectedWrapper,
    CompanyName,
    CompanySector,
} from './style';
import ShortedAPI from '../../../../services/sapi/client';
/**
 * Renders a shorted.com.au logo
 * TODO: add data fetch here, async or prefetch based of top-short positions
 */
class Legend extends React.Component {
    constructor(props) {
        super(props);
        this.apiClient = new ShortedAPI();
        this.state = {
            inside: false,
            code: false,
        };
    }
    componentDidUpdate(prevProps) {
        // You don't have to do this check first, but it can help prevent an unneeded render
        if (prevProps.code !== this.props.code) {
            this.setState({
                code: this.props.code,
                inside: false,
            });
        }
    }
    componentDidMount() {
        this.toggleEnterState();
    }

    toggleEnterState() {
        this.setState({inside: true});
    }
    render() {
        const data = this.apiClient.getStockSummary(this.props.code);
        const logo = this.apiClient.getStockLogo(this.props.code);
        return (
            <Transition timeout={duration} in appear>
                {state => {
                    return this.props.code ? (
                        <Wrapper
                            duration={duration}
                            {...transitionStyles[state]}>
                            <LegendCompanyLogo logo={logo} />
                            <LegendCompanyCode code={this.props.code} />
                            <LegendCompanyPE pe={data.data.PE} />
                            <CompanyName>{data.metadata.name}</CompanyName>
                            <CompanySector>
                                {data.metadata.sector}
                            </CompanySector>
                            <LegendCompanyMarketCap
                                data={data.data.marketCap}
                            />
                        </Wrapper>
                    ) : (
                        <UnselectedWrapper
                            duration={duration}
                            {...transitionStyles[state]}>
                            <p>hover over graph to show profile</p>
                        </UnselectedWrapper>
                    );
                }}
            </Transition>
        );
    }
}

export default Legend;
