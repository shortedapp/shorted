import React from 'react';
import { Wrapper } from './style';


/**
 * Renders a nicely styled and dynamically scaling header for the legend view which will display the company icon/logo 
 * as well as its stock code.
 * 
 */
const LegendCompanyPE = (props) => (
  <Wrapper>
    {props.pe}
  </Wrapper>
)
export default LegendCompanyPE;
