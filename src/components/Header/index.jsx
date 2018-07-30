import React from 'react';
import styled from 'styled-components';
import Transition from 'react-transition-group/Transition';
import headerBackground from '../../assets/images/header-background.svg';
import Chart from '../Chart/index';
import './header.css';

const Background = styled.div`
  .hero-background {
    display: block;
    background-image: url(${headerBackground});
    background-repeat: no-repeat;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    background-position: bottom;
    min-height: 280px;
    margin: -7px;
    position: relative;
  }
  
  .container {
    display: block;
    margin: auto;
    max-width: 1140px;
    padding-left: 1em;
    padding-right: 1em;
    padding-top: 50px;
  }

  .hero-content {
    display: -ms-grid;
    display: grid;
    grid-template-columns: repeat(auto-fit,minmax(80px,1fr));
    grid-column-gap: 100px;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -ms-flex-line-pack: center;
    align-content: center;
  }
  
  .hero-form {
    grid-column-start: auto;
    grid-column-end: span 3;
  }
  @media (min-width: 1000px) {
    .hero-animate {
      padding: 2em 3em 3em;
    }
  }
  .hero-animate {
    grid-column-start: auto;
    grid-column-end: span 3;
  }
  margin: 0;
`;
const duration = 300;

const defaultStyle = {
  backgroundImage: `url(${headerBackground})`,
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
};

const transitionStyles = {
  entering: { opacity: 0 },
  entered: { opacity: 1 },
};

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = { inside: false };
  }

  componentDidMount() {
    this.toggleEnterState();
  }

  toggleEnterState() {
    this.setState({ inside: true });
  }

  render() {
    const { inside } = this.state;
    return (
      <div>
        <Transition
          timeout={duration}
          in={inside}
        >
          {
            state => (
              <div
                className="hero-background"
                style={{
                  ...defaultStyle,
                  ...transitionStyles[state],
                }}
              >
                <div className="container">
                  <div className="hero-content grid">
                    <div className="hero-animate">
                      <Chart />
                    </div>
                  </div>
                </div>
              </div>
            )
          }
        </Transition>
      </div>
    );
  }
}

export default Header;
