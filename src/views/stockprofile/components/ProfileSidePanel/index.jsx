import React from 'react'
import { Icon } from 'antd'
import { ThemeContext } from 'src/theme-context'
import { getLinks } from 'src/utils';
import {
  Wrapper,
  ProfilePE,
  ProfileMarketCap,
  StockEquityWrapper,
  ProfileDescription,
  ExternalLinks,
  ProfileASXLink,
  ProfileYahooLink,
  ProfileSector
} from './style'
import SocialMediaBar from '../../../../components/SocialMediaBar';

/**
 * Top Navbar responsible for rendering the basic site-map layout including: blog | about | disclaimer etc
 * Will also manage the implementation of the navbar collapse on mobile devices i.e transition to burger and burger animation on open/close etc.
 * TODO:
 * * handle mobile compaction of navbar component
 *
 */
class ProfileSidePanel extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    console.log(this.props.metadata)
    return (
      <ThemeContext.Consumer>
        {theme => (
          <Wrapper {...theme}>
            <ProfileSector>
              <div className='title'>
                <div className='icon'>
                <Icon style={{ fontSize: 15}}type='pie-chart' theme='outlined' />
                </div>
                <div className='text'>
                Sector
                </div>
              </div>
              <div className='text'>{this.props.metadata.sector || 'sector goes here'}</div>
            </ProfileSector>
            <StockEquityWrapper>
            <ProfilePE>
                <div className="title">P/E Ratio</div>
                <div className="value">{this.props.metadata.pe || 2342.32}</div>
            </ProfilePE>
            <ProfileMarketCap>
                <div className="title">Market Cap</div>
                <div className="value">{this.props.metadata.pe || "3423.22323M" }</div>
                </ProfileMarketCap>
            </StockEquityWrapper>
            <ProfileDescription>{this.props.metadata.description || 'NA'}</ProfileDescription>
            <ExternalLinks><SocialMediaBar items={getLinks(this.props.metadata)}/></ExternalLinks>
          </Wrapper>
        )}
      </ThemeContext.Consumer>
    )
  }
}

export default ProfileSidePanel
