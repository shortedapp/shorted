import React from 'react';
import {Wrapper, HamburgerWrapper, ButtonsWrapper, NavButton} from './style';

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
        this.state = {
            routes: [
                {text: 'About', url: '/about'},
                {text: 'Blog', url: '/blog'},
                {text: 'Disclaimer', url: '/disclaimer'},
                {text: 'Contact', url: '/contact'},
            ],
        };
    }

    render() {
        const buttons = this.state.routes.map(route => (
            <NavButton key={route.text} href={route.url}>
                {route.text}
            </NavButton>
        ));
        return (
            <Wrapper>
                <ButtonsWrapper>{buttons}</ButtonsWrapper>
                <HamburgerWrapper />
            </Wrapper>
        );
    }
}

export default NavBar;
