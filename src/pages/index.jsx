import React from 'react';
import { injectGlobal } from 'styled-components';
import TopShorts from '../views/topshorts';

injectGlobal`
  body {
    margin: 0;
    padding: 0;
    border: 0;
    outline: 0;
  }
`;

const IndexPage = () => (
  <TopShorts />
);

export default IndexPage;
