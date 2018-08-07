import React from 'react';
import { Wrapper, CompanyCode, CompanyLogo } from './style';


/**
 * Renders a nicely styled and dynamically scaling header for the legend view which will display the company icon/logo 
 * as well as its stock code.
 * 
 */
const LegendCompanyHeader = (props) => (
  <Wrapper>
    <CompanyLogo src={props.image}/>
    <CompanyCode>{props.code}</CompanyCode>
  </Wrapper>
)
export default LegendCompanyHeader;
