import React from 'react';
import {ThemeContext} from 'src/theme-context';
import ShortedAPI from 'src/services/sapi/client';
import {Wrapper} from './style';
import AdvancedChart from '../../../../components/AdvancedChart';

/**
 * Top Navbar responsible for rendering the basic site-map layout including: blog | about | disclaimer etc
 * Will also manage the implementation of the navbar collapse on mobile devices i.e transition to burger and burger animation on open/close etc.
 * TODO:
 * * handle mobile compaction of navbar component
 *
 */
class ProfileChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.apiClient = new ShortedAPI();

    }

    render() {
        return (
            <ThemeContext.Consumer>
                {theme => <Wrapper {...theme}><AdvancedChart code={this.props.code}/></Wrapper>}
            </ThemeContext.Consumer>
        );
    }
}

export default ProfileChart;
