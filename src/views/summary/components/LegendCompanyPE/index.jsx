import React from 'react';
import { ThemeContext } from '../../../../theme-context';
import {Wrapper, Header, PE} from './style';

/**
 * Renders a nicely styled and dynamically scaling header for the legend view which will display the company icon/logo
 * as well as its stock code.
 *
 */
const LegendCompanyPE = props => (
    <ThemeContext.Consumer>
        { theme => (
        <Wrapper {...theme} >
            <Header {...theme} >P/E ratio</Header>
            <PE {...theme} >{props.pe}</PE>
        </Wrapper>
        )}
    </ThemeContext.Consumer>
);
export default LegendCompanyPE;
