import React from 'react';
import CompanyImage from 'src/components/CompanyImage';
import ShortedAPI from 'src/services/sapi/client';
import {ThemeContext} from 'src/theme-context';
import ProfileStockWidget from '../ProfileStockWidget';
import ProfileSectorWidget from '../ProfileSectorWidget';
import ProfileInterestWidget from '../ProfileInterestWidget';
import {
    CompanyLogoWrapper,
    CompanyNameWrapper,
    Wrapper,
    CompanyCodeWrapper,
    CompanySectorWrapper,
    CompanyInterestWrapper,
    CompanyStockWrapper,
} from './style';

/**
 * Top Navbar responsible for rendering the basic site-map layout including: blog | about | disclaimer etc
 * Will also manage the implementation of the navbar collapse on mobile devices i.e transition to burger and burger animation on open/close etc.
 * TODO:
 * * handle mobile compaction of navbar component
 *
 */
class ProfileHeader extends React.Component {
    constructor(props) {
        super(props);
        this.apiClient = new ShortedAPI();
        this.state = {data: null};
    }
    componentDidMount() {
        this.toggleEnterState();
    }

    toggleEnterState() {
        this.setState({
            inside: true,
        });
    }
    render() {
        const data = this.apiClient.getStockProfile(this.props.metadata.code);
        console.log(data);
        return (
            <ThemeContext.Consumer>
                {theme => (
                    <Wrapper>
                        <CompanyLogoWrapper {...theme}>
                            <CompanyImage src={this.props.logo} />
                        </CompanyLogoWrapper>
                        <CompanyNameWrapper {...theme}>
                            {this.props.metadata.name}
                        </CompanyNameWrapper>
                        <CompanyCodeWrapper {...theme}>
                            <div className="code">
                                {this.props.metadata.code}
                            </div>
                        </CompanyCodeWrapper>
                        <CompanySectorWrapper {...theme}>
                            <ProfileSectorWidget data={data.data.sectorShort} />
                        </CompanySectorWrapper>
                        <CompanyInterestWrapper {...theme}>
                            <ProfileInterestWidget
                                data={data.data.stockInterest}
                            />
                        </CompanyInterestWrapper>
                        <CompanyStockWrapper {...theme}>
                            <ProfileStockWidget data={data.data.stockPrice} />
                        </CompanyStockWrapper>
                    </Wrapper>
                )}
            </ThemeContext.Consumer>
        );
    }
}

export default ProfileHeader;
