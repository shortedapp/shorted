import React from 'react';
import Transition from 'react-transition-group/Transition';
import AboutHeaderHero from '../../assets/images/about-main.svg';
import {
  HeroWrapper,
  HeroButtonWrapper,
  HeroTitleWrapper,
  duration,
  transitionStyles,
  Wrapper } from './style';


/**
 * Top Navbar responsible for rendering the basic site-map layout including: blog | about | disclaimer etc
 * Will also manage the implementation of the navbar collapse on mobile devices i.e transition to burger and burger animation on open/close etc.
 * TODO:
 * * handle mobile compaction of navbar component
 * 
 */
class AboutHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      inside: false,
    };
  }
  componentDidMount() {
    this.toggleEnterState();
  }

  toggleEnterState() {
      this.setState({ inside: true });
  }

  render() {
    return (
      <Transition timeout={duration} in={true} appear={true}>
        {
            state => {
              return (
                <Wrapper duration={duration} {...transitionStyles[state]} >
                  <HeroWrapper>
                    <img alt="shorted-hero" width={"100%"} src={AboutHeaderHero} />
                  </HeroWrapper>
                  <HeroTitleWrapper>
                  <div className="hero-title">
                    <div className="header-1">
                      Hello, we are
                    </div>
                    <div className="header-2">
                      Shorted
                    </div>
                  </div>
                  <div className="hero-description" >
                    Bringing ASX market short positions to your front door, with added insights and intelligence.
                  </div>
                  <div className="hero-button">
                    <HeroButtonWrapper href={'/'}>
                      Dashboard
                    </HeroButtonWrapper>
                  </div>
                  </HeroTitleWrapper>
                </Wrapper>
              );
            }
        }
      </Transition>)
  }
}

export default AboutHeader;
