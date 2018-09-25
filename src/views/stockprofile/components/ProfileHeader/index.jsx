import React from 'react';
import CompanyImage from 'src/components/CompanyImage';
import {
    CompanyLogoWrapper,
    CompanyNameWrapper,
    Wrapper} from './style';

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
        this.state = {};
    }

    render() {
        return <Wrapper>
        <CompanyLogoWrapper>
            <CompanyImage src={this.props.logo} />
        </CompanyLogoWrapper>
        <CompanyNameWrapper>
            {this.props.metadata.name}
        </CompanyNameWrapper>
        {this.props.metadata.code}
        </Wrapper>;
    }
}

export default ProfileHeader;
