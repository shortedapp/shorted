import React from 'react';

import { Wrapper, Header, ThemeItemWrapper, ThemeItems} from './style';

const ThemeItem = (props) => (
    <ThemeItemWrapper {...props}>{props.name}</ThemeItemWrapper>
)
/**
 * Renders ThemePicker widget, allowing users to select between different theme modes
 */
const ThemePicker = (props) => (
    <Wrapper>
        <Header>Theme</Header>
        <ThemeItems>{props.themes.map((theme) => <ThemeItem {...theme} key={theme.name}/>)}</ThemeItems>
    </Wrapper>
)

export default ThemePicker;