import React from 'react';
import {Wrapper, Code, Header} from './style';

/**
 * Renders a nicely styled and dynamically scaling header for the legend view which will display the company icon/logo
 * as well as its stock code.
 *
 */
const LegendCompanyCode = props => (
    <Wrapper>
        <Header>Issuer code</Header>
        <Code>{props.code}</Code>
    </Wrapper>
);
export default LegendCompanyCode;
