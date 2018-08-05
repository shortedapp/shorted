import React from 'react';
import styled from 'styled-components';
import { Wrapper } from './style';


/**
 * Top Navbar responsible for rendering the basic site-map layout including: blog | about | disclaimer etc
 * Will also manage the implementation of the navbar collapse on mobile devices i.e transition to burger and burger animation on open/close etc.
 * TODO:
 * * handle mobile compaction of navbar component
 * 
 */
class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { inside: false };
  }

  render() {
    return (
      <Wrapper>
      <p>navbar goes here</p>
      </Wrapper>
    );
  }
}

export default NavBar;
