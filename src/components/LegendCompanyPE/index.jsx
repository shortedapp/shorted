import React from 'react'
import { Wrapper, Header, PE } from './style'

/**
 * Renders a nicely styled and dynamically scaling header for the legend view which will display the company icon/logo
 * as well as its stock code.
 *
 */
const LegendCompanyPE = props => (
  <Wrapper>
    <Header>P/E ratio</Header>
    <PE>{props.pe}</PE>
  </Wrapper>
)
export default LegendCompanyPE
