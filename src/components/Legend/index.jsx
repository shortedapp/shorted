import React from 'react';
import Transition from 'react-transition-group/Transition';
import LegendCompanyCode from '../../components/LegendCompanyCode';
import LegendCompanyLogo from '../../components/LegendCompanyLogo';
import LegendCompanyPE from '../../components/LegendCompanyPE';
import LegendCompanyMarketCap from '../../components/LegendCompanyMarketCap';
import {
    Wrapper,
    duration,
    transitionStyles,
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
        this.state = {
            inside: false,
            code: false,
        }
    }
    componentWillReceiveProps(nextProps) {
        // You don't have to do this check first, but it can help prevent an unneeded render
        if (nextProps.code !== this.state.code) {
          this.setState({
              code: nextProps.code,
              data: this.apiClient.getStockSummary(nextProps.code),
              logo: this.apiClient.getStockLogo(nextProps.code),
              inside: false
            });

        }
      }
    componentDidMount() {
        this.toggleEnterState();
    }
    
    toggleEnterState() {
        this.setState({ inside: true });
    }
    render() {
        return (<Transition timeout={duration} in={true} appear={true}>
        {
            state => {
                return (this.props.code ? (
                    <Wrapper
                        duration={duration}
                        {...transitionStyles[state]}
                    >
                        <LegendCompanyLogo logo={this.state.logo} />
                        <LegendCompanyCode code={this.state.code} />
                        <LegendCompanyPE pe={this.state.data.data.PE} />
                        <CompanyName>{this.state.data.metadata.name}</CompanyName>
                        <LegendCompanyMarketCap data={this.state.data.data.marketCap} />
                    </Wrapper>
                    ) : (<UnselectedWrapper
                            duration={duration}
                            {...transitionStyles[state]}
                        >
                            <p>hover over graph to show profile</p>
                        </UnselectedWrapper>))
            }
        }
        </Transition>)
    }
}

export default Legend;