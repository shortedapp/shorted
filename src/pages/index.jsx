import React from 'react'
import { injectGlobal } from 'styled-components'
import Dashboard from '../views/dashboard'

injectGlobal`
  body {
    margin: 0;
    padding: 0;
    border: 0;
    outline: 0;
  }
`
/**
 * IndexPage
 * Top level home-page, unifies all child views such as page1/page2/page3/page4 into a streamlined scroll experience etc.
 *
 */
const IndexPage = () => <Dashboard />

export default IndexPage
