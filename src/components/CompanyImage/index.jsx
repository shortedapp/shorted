import React from 'react';
import Transition from 'react-transition-group/Transition';
import {duration, transitionStyles, Wrapper} from './style';

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
            inside: false,
        };
    }
    componentDidMount() {
        this.toggleEnterState();
    }

    toggleEnterState() {
        this.setState({inside: true});
    }

    render() {
        return (
            <Transition timeout={duration} in appear>
                {state => {
                    return (
                        <Wrapper
                            duration={duration}
                            {...transitionStyles[state]}>
                            <img
                                style={{width: 70}}
                                src={this.props.src}
                                alt="company-logo"
                            />
                        </Wrapper>
                    );
                }}
            </Transition>
        );
    }
}

export default Header;
