import React from 'react';
import {ThemeContext} from 'src/theme-context';
import {Wrapper} from './style';

/**
 * Top Navbar responsible for rendering the basic site-map layout including: blog | about | disclaimer etc
 * Will also manage the implementation of the navbar collapse on mobile devices i.e transition to burger and burger animation on open/close etc.
 * TODO:
 * * handle mobile compaction of navbar component
 *
 */
class ProfileNews extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <ThemeContext.Consumer>
                {theme => <Wrapper {...theme}>profile news</Wrapper>}
            </ThemeContext.Consumer>
        );
    }
}

export default ProfileNews;
