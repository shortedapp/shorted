import React from 'react';
import {Wrapper, Image} from './style';

/**
 * Renders a nicely styled and dynamically scaling header for the legend view which will display the company icon/logo
 * as well as its stock code.
 *
 */
const LegendCompanyLogo = props => (
    <Wrapper>
        <Image src={props.logo} />
    </Wrapper>
);
export default LegendCompanyLogo;
