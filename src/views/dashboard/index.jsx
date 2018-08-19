import React from 'react';
import Transition from 'react-transition-group/Transition';
import {Menu, Icon, Switch, Button} from 'antd';
import 'antd/dist/antd.css';
import Logo from '../../components/Logo';
import ThemeSwitch from '../../components/ThemeSwitch';
import Sectors from '../../views/sectors';
import Alerts from '../../views/alerts';
import Seasonality from '../../views/seasonality';
import Movers from '../../views/movers';
import Summary from '../../views/summary';
import {
    DashboardWrapper,
    ContentWrapper,
    DashboardNavbarWrapper,
    ThemeWrapper,
    HeaderWrapper,
    NavBarCollapseButton,
    themes,
} from './style';

const SubMenu = Menu.SubMenu;
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
                return <Sectors theme={themes[theme]} />;
            case 'MOVERS':
                return <Movers theme={themes[theme]} />;
            case 'ALERTS':
                return <Alerts theme={themes[theme]} />;
            case 'SEASONALITY':
                return <Seasonality theme={themes[theme]} />;
            case 'SUMMARY':
                return <Summary theme={themes[theme]} />;
            default:
                return <Summary theme={themes[theme]} />;
        }
    }

    render() {
        const {theme} = this.state;
        return (
            <DashboardWrapper width={this.state.collapsed ? `80px` : `256px`}>
                <HeaderWrapper {...themes[theme]} />
                <Logo
                    collapsed={this.state.collapsed}
                    theme={themes[this.state.theme]}
                />
                <NavBarCollapseButton
                    {...themes[this.state.theme]}
                    width={this.state.collapsed ? `80px` : `256px`}>
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
                <ThemeWrapper width={this.state.collapsed ? `80px` : `256px`}>
                    <ThemeSwitch
                        theme={themes[this.state.theme]}
                        checked={this.state.theme}
                        changeTheme={value => this.changeTheme(value)}
                    />
                </ThemeWrapper>

                <DashboardNavbarWrapper
                    {...themes[this.state.theme]}
                    width={this.state.collapsed ? `80px` : `256px`}>
                    <Menu
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
                <ContentWrapper {...themes[theme]}>
                    {this.getView(this.state.current, theme)}
                </ContentWrapper>
            </DashboardWrapper>
        );
    }
}

export default Dashboard;
