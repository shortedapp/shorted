import React from 'react';
import Helmet from 'react-helmet';
import Transition from 'react-transition-group/Transition';

import ShortedAPI from '../../services/sapi/client';

import headerBackground from '../../assets/images/header-background.svg';
import AppViewWrapper from '../../components/AppViewWrapper';
import ProfileChart from '../../components/ProfileChart';
import ProfileSidePanel from '../../components/ProfileSidePanel';
import ProfileHeader from '../../components/ProfileHeader';
import ProfileAlerts from '../../components/ProfileAlerts';
import icon32 from '../../../static/favicon-32x32.png';
import {StockProfileWrapper, duration, transitionStyles} from './style';

/**
 * View:TopShorts
 * Overarching container for the top short view.
 * Showing the following key widgets/displays:
 *  * top 10 short positions graphically.
 *  * table of top short position changes
 *  * alerts/anomalies
 *  * reactive-widget on hover/select of a given graph
 * TODO:
 * * add Transitions of components such as window picker, graph and background etc.
 * * add graph integration via recharts etc.
 * * add legend component for on-select animation/effect
 *
 */

class StockProfileView extends React.Component {
    constructor(props) {
        super(props);
        this.apiClient = new ShortedAPI();
        this.state = {
            options: {
                values: ['d', 'w', 'm', 'y'],
            },
            selectedOption: 'w',
            inside: false,
            profile: false,
        };
    }
    handleOptionSelected(value) {
        this.setState({
            selectedOption: value,
        });
    }
    componentWillMount() {
        const profile = this.apiClient.getStockProfile(
            this.props.data.stocksYaml.code,
        );
        this.setState({profile});
    }
    componentDidMount() {
        this.toggleEnterState();
    }
    toggleEnterState() {
        this.setState({inside: true});
    }

    render() {
        const {profile} = this.state;
        return (
            <Transition timeout={duration} in appear>
                {state => {
                    return (
                        <AppViewWrapper
                            background={headerBackground}
                            duration={duration}
                            {...transitionStyles[state]}>
                            <Helmet
                                key="profiler-header"
                                titleTemplate=" Shorted · %s"
                                defaultTitle="Ben Ebsworth"
                                link={[
                                    {
                                        rel: 'shortcut icon',
                                        type: 'image/png',
                                        href: `${icon32}`,
                                    },
                                ]}>
                                <meta charSet="utf-8" />
                                <meta
                                    name="viewport"
                                    content="initial-scale=1.0, width=device-width"
                                />
                                <title>{this.props.data.stocksYaml.code}</title>
                                <meta
                                    name="description"
                                    content="Ben Ebsworth · About, Blog, Projects my online profile"
                                />
                                <meta
                                    name="keywords"
                                    content="Blog, technology, software engineering, about, personal, ben ebsworth, telstra, digio, projects, open source"
                                />
                                <meta
                                    name="apple-mobile-web-app-title"
                                    content="benebsworth.com"
                                />
                                <meta
                                    name="application-name"
                                    content="benebsworth.com"
                                />
                                <meta name="theme-color" content="#c800ec" />
                                <link
                                    rel="apple-touch-icon"
                                    sizes="180x180"
                                    href="/apple-touch-icon.png"
                                />
                                <link
                                    rel="icon"
                                    type="image/png"
                                    sizes="32x32"
                                    href="/favicon-32x32.png"
                                />
                                <link
                                    rel="icon"
                                    type="image/png"
                                    sizes="16x16"
                                    href="/favicon-16x16.png"
                                />
                                <link
                                    rel="mask-icon"
                                    href="/safari-pinned-tab.svg"
                                    color="#c800ec"
                                />
                            </Helmet>
                            <StockProfileWrapper>
                                <div className="content">
                                    <ProfileHeader {...profile} />
                                    <ProfileChart />
                                    <ProfileAlerts />
                                    <ProfileSidePanel />
                                </div>
                            </StockProfileWrapper>
                        </AppViewWrapper>
                    );
                }}
            </Transition>
        );
    }
}

export default StockProfileView;
