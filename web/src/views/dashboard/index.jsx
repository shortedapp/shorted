import React from 'react';
import Transition from 'react-transition-group/Transition';
import {Menu, Icon, Switch, Button} from 'antd';
import {ThemeContext, themes} from '../../theme-context';
import Logo from '../../components/Logo';
import { search } from 'src/services/elasticsearch/client'
import ErrorBoundary from '../../components/ErrorBoundary';
import SearchBar from '../../components/SearchBar';
import ThemeSwitch from '../../components/ThemeSwitch';
import Sectors from '../../views/sectors';
import Alerts from '../../views/alerts';
import Seasonality from '../../views/seasonality';
import Movers from '../../views/movers';
import Summary from '../../views/summary';
import {
    DashboardWrapper,
    SearchBarWrapper,
    ContentWrapper,
    DashboardNavbarWrapper,
    ThemeWrapper,
    HeaderWrapper,
    NavBarCollapseButton,
} from './style';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            theme: 'dark',
            current: 'SUMMARY',
            collapsed: false,
        };
    }
    changeTheme = value => {
        console.log(value);
        this.setState({
            theme: value ? 'dark' : 'light',
        });
    };
    handleClick = e => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    };
    toggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    getView(selection, theme) {
        switch (selection) {
            case 'SECTORS':
                return (
                    <ErrorBoundary>
                        <Sectors theme={theme} />
                    </ErrorBoundary>
                );
            case 'MOVERS':
                return (
                    <ErrorBoundary>
                        <Movers theme={theme} />
                    </ErrorBoundary>
                );
            case 'ALERTS':
                return (
                    <ErrorBoundary>
                        <Alerts theme={theme} />
                    </ErrorBoundary>
                );
            case 'SEASONALITY':
                return (
                    <ErrorBoundary>
                        <Seasonality theme={theme} />
                    </ErrorBoundary>
                );
            case 'SUMMARY':
                return (
                    <ErrorBoundary>
                        <Summary theme={theme} />
                    </ErrorBoundary>
                );
            default:
                return (
                    <ErrorBoundary>
                        <Summary theme={theme} />
                    </ErrorBoundary>
                );
        }
    }

    render() {
        console.log(this.state.theme);
        return (
            <ThemeContext.Provider value={themes[this.state.theme].style}>
                <ThemeContext.Consumer>
                    {theme => {
                        console.log('theme:dashboard:',theme);
                        return (
                            <DashboardWrapper
                                {...theme}
                                width={this.state.collapsed ? `80px` : `200px`}>
                                <HeaderWrapper {...theme}>
                                    <SearchBarWrapper>
                                        <SearchBar client={search} theme={theme} />
                                    </SearchBarWrapper>
                                </HeaderWrapper>
                                <Logo
                                    collapsed={this.state.collapsed}
                                    theme={theme}
                                />
                                <NavBarCollapseButton
                                    {...theme}
                                    width={
                                        this.state.collapsed ? `80px` : `200px`
                                    }>
                                    <Button
                                        type="primary"
                                        onClick={this.toggleCollapsed}
                                        style={{width: 50}}>
                                        <Icon
                                            type={
                                                this.state.collapsed
                                                    ? 'menu-unfold'
                                                    : 'menu-fold'
                                            }
                                        />
                                    </Button>
                                </NavBarCollapseButton>
                                <ThemeWrapper
                                    {...theme}
                                    width={
                                        this.state.collapsed ? `80px` : `200px`
                                    }>
                                    <ThemeSwitch
                                        theme={theme.name}
                                        checked={this.state.theme}
                                        changeTheme={value =>
                                            this.changeTheme(value)
                                        }
                                    />
                                </ThemeWrapper>
                                <DashboardNavbarWrapper
                                    {...theme}
                                    width={
                                        this.state.collapsed ? `80px` : `200px`
                                    }>
                                    <Menu
                                        className="menu"
                                        inlineCollapsed={this.state.collapsed}
                                        theme={this.state.theme}
                                        onClick={this.handleClick}
                                        defaultOpenKeys={['sub1']}
                                        selectedKeys={[this.state.current]}
                                        mode="inline">
                                        <Menu.Item key="SUMMARY">
                                            <Icon type="pie-chart" />
                                            <span>Summary</span>
                                        </Menu.Item>
                                        <Menu.Item key="SECTORS">
                                            <Icon type="desktop" />
                                            <span>Sector Breakdown</span>
                                        </Menu.Item>
                                        <Menu.Item key="SEASONALITY">
                                            <Icon type="inbox" />
                                            <span>Seasonality</span>
                                        </Menu.Item>
                                        <Menu.Item key="ALERTS">
                                            <Icon type="warning" />
                                            <span>Alerts</span>
                                        </Menu.Item>
                                        <Menu.Item key="MOVERS">
                                            <Icon type="line-chart" />
                                            <span>Movers</span>
                                        </Menu.Item>
                                    </Menu>
                                </DashboardNavbarWrapper>
                                <ContentWrapper {...theme}>
                                    {this.getView(this.state.current, theme)}
                                </ContentWrapper>
                            </DashboardWrapper>
                        );
                    }}
                </ThemeContext.Consumer>
            </ThemeContext.Provider>
        );
    }
}

export default Dashboard;
