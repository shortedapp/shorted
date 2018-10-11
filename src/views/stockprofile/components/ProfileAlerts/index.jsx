import React from 'react';
import {ThemeContext} from 'src/theme-context';
import ALertListView from 'src/components/AlertListView';
import {Wrapper, Header, Results} from './style';

/**
 * Top Navbar responsible for rendering the basic site-map layout including: blog | about | disclaimer etc
 * Will also manage the implementation of the navbar collapse on mobile devices i.e transition to burger and burger animation on open/close etc.
 * TODO:
 * * handle mobile compaction of navbar component
 *
 */
class ProfileAlerts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <ThemeContext.Consumer>
                {theme => <Wrapper {...theme}>
                <Header>Alerts</Header>
                <Results><ALertListView /></Results>
                </Wrapper>}
            </ThemeContext.Consumer>
        );
    }
}

export default ProfileAlerts;
