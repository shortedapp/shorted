import React from 'react';
import { ThemeContext } from '../../../../theme-context';
import {Wrapper, Code, Header} from './style';

/**
 * Renders a nicely styled and dynamically scaling header for the legend view which will display the company icon/logo
 * as well as its stock code.
 *
 */
const LegendCompanyCode = props => (
    <ThemeContext.Consumer>
        { theme => (
            <Wrapper {...theme} >
                <Header {...theme} >Issuer code</Header>
                <Code {...theme} >{props.code}</Code>
            </Wrapper>)
        }
    </ThemeContext.Consumer>
);
export default LegendCompanyCode;
