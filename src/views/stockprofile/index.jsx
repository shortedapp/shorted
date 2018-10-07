import React from 'react';
import Helmet from 'react-helmet';
import Transition from 'react-transition-group/Transition';
import {ThemeContext, themes} from '../../theme-context';
import ShortedAPI from 'src/services/sapi/client';
import ThemeSwitch from '../../components/ThemeSwitch';
import Logo from '../../components/Logo';
import ProfileChart from './components/ProfileChart';
import ProfileSidePanel from './components/ProfileSidePanel';
import ProfileHeader from './components/ProfileHeader';
import ProfileAlerts from './components/ProfileAlerts';
import ProfileNews from './components/ProfileNews';
import icon32 from './../../../static/favicon-32x32.png';
import {
    ProfileViewWrapper,
    ProfileHeaderWrapper,
    ProfileChartWrapper,
    ProfileSidePanelWrapper,
    ProfileNewsWrapper,
    ProfileAlertsWrapper,
    ProfileViewHeader,
    ThemeWrapper,
    LogoWrapper,
    ProfileWrapper,
    duration,
    transitionStyles,
} from './style';

/**
 * View:StockProfile
 * Overarching container for the top short view.
 * Shows a dashboard in a per-stock view mode. This displays contextualised graphs for the given stock and perhaps
 * a relative comparison to other shorted stocks within the same industry/market segment.
 * TODO:
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
            theme: 'dark',
        };
    }
    handleOptionSelected(value) {
        this.setState({
            selectedOption: value,
        });
    }
    changeTheme = value => {
        console.log(value);
        this.setState({
            theme: value ? 'dark' : 'light',
        });
    };

    UNSAFE_componentWillMount() {
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
        const logo = this.apiClient.getStockLogo(
            this.props.data.stocksYaml.code,
        );
        return (
            <ThemeContext.Provider value={themes[this.state.theme].style}>
                <ThemeContext.Consumer>
                    {theme => (
                        <Transition timeout={duration} in appear>
                            {state => {
                                return (
                                    <ProfileViewWrapper {...theme}>
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
                                            <title>
                                                {
                                                    this.props.data.stocksYaml
                                                        .code
                                                }
                                            </title>
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
                                            <meta
                                                name="theme-color"
                                                content="#c800ec"
                                            />
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
                                        <ThemeWrapper {...theme}>
                                            <ThemeSwitch
                                                theme={theme.name}
                                                checked={this.state.theme}
                                                changeTheme={value =>
                                                    this.changeTheme(value)
                                                }
                                            />
                                        </ThemeWrapper>
                                        <LogoWrapper>
                                            <Logo thene={theme} />
                                        </LogoWrapper>
                                        <ProfileViewHeader {...theme} />
                                        <ProfileWrapper {...theme}>
                                            <div className="content">
                                                <ProfileHeaderWrapper
                                                    {...theme}>
                                                    {' '}
                                                    <ProfileHeader
                                                        {...profile}
                                                        logo={logo}
                                                    />
                                                </ProfileHeaderWrapper>
                                                <ProfileChartWrapper>
                                                    <ProfileChart
                                                        code={
                                                            this.props.data
                                                                .stocksYaml.code
                                                        }
                                                    />
                                                </ProfileChartWrapper>
                                                <ProfileAlertsWrapper>
                                                    <ProfileAlerts />
                                                </ProfileAlertsWrapper>
                                                <ProfileSidePanelWrapper>
                                                    <ProfileSidePanel metadata={this.state.profile.metadata}/>
                                                </ProfileSidePanelWrapper>
                                                <ProfileNewsWrapper>
                                                    <ProfileNews />
                                                </ProfileNewsWrapper>
                                            </div>
                                        </ProfileWrapper>
                                    </ProfileViewWrapper>
                                );
                            }}
                        </Transition>
                    )}
                </ThemeContext.Consumer>
            </ThemeContext.Provider>
        );
    }
}

export default StockProfileView;
