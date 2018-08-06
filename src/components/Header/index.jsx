import React from 'react';
import Transition from 'react-transition-group/Transition';
import Logo from '../../components/Logo';
import NavBar from '../../components/NavBar';
import { duration, transitionStyles, Wrapper } from './style';


/**
 * Top Navbar responsible for rendering the basic site-map layout including: blog | about | disclaimer etc
 * Will also manage the implementation of the navbar collapse on mobile devices i.e transition to burger and burger animation on open/close etc.
 * TODO:
 * * handle mobile compaction of navbar component
 * 
 */
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      routes: [
        { text: "About", url: "/about" },
        { text: "Blog", url: "/blog" },
        { text: "Disclaimer", url: "/disclaimer" }
      ],
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
                  <Logo />
                  <NavBar />
                </Wrapper>
              );
            }
        }
      </Transition>)
  }
}

export default Header;
