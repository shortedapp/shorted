import React from 'react';
import {Switch} from 'antd';
import 'antd/dist/antd.css';
import {SwitchWrapper, Wrapper, Header} from './style';
/**
 * Renders ThemePicker widget, allowing users to select between different theme modes
 */
const ThemeSwitch = props => (
    <Wrapper {...props.theme}>
        <Header {...props.theme}>Theme</Header>
        <SwitchWrapper>
            <Switch
                style={{width: '100%'}}
                checked={props.checked === 'dark'}
                onChange={props.changeTheme}
                checkedChildren="Dark"
                unCheckedChildren="Light"
            />
        </SwitchWrapper>
    </Wrapper>
);

export default ThemeSwitch;
