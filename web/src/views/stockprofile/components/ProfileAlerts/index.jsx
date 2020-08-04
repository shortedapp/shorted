import React from 'react';
import {ThemeContext} from 'src/theme-context';
import ALertListView from 'src/components/AlertListView';
import ShortedAPI from 'src/services/sapi/client';
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
        this.state = {
            data: null,
            inside: false,
        };
        this.apiClient = new ShortedAPI();
    }
    componentDidMount() {
        this._fetchData();
    }
    _fetchData() {
        Promise.resolve(this.apiClient.getAlerts(this.props.code))
            .then(result => {
                this.setState({
                    data: result,
                    inside: true,
                });
            })
            .catch(error => console.log('_fetchData:error:', error));
    }
    render() {
        const {data} = this.state;
        console.log('ProfileAlerts:data:', data);
        return (
            <ThemeContext.Consumer>
                {theme => (
                    <Wrapper {...theme}>
                        <Header {...theme}>Alerts</Header>
                        <Results>
                            <ALertListView data={data} />
                        </Results>
                    </Wrapper>
                )}
            </ThemeContext.Consumer>
        );
    }
}

export default ProfileAlerts;
