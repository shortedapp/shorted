import React from 'react'
import { Icon } from 'antd'
import { ThemeContext } from 'src/theme-context'
import {
  Wrapper,
  ProfilePE,
  ProfileMarketCap,
  ProfileDescription,
  ProfileASXLink,
  ProfileYahooLink,
  ProfileSector
} from './style'

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
              <div className='icon'>
                <Icon style={{ fontSize: 35}}type='pie-chart' theme='outlined' />
              </div>
              <div className='text'>{this.props.metadata.sector || 'sector goes here'}</div>
            </ProfileSector>
            <ProfilePE>PE</ProfilePE>
            <ProfileMarketCap>mc</ProfileMarketCap>
            <ProfileDescription>descr</ProfileDescription>
            <ProfileASXLink>asx link</ProfileASXLink>
            <ProfileYahooLink>yahoo</ProfileYahooLink>
          </Wrapper>
        )}
      </ThemeContext.Consumer>
    )
  }
}

export default ProfileSidePanel
