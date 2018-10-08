import React from 'react'
import { IconContext } from 'react-icons'
import { ThemeContext } from 'src/theme-context'
import { contentMap } from './contentMap'
import { Wrapper, Image, IconWrapper } from './style'
import GatsbyLink from 'gatsby-link'
import { Icon } from 'antd'

const getContent = (name, theme) => {
  const meta = contentMap[name]
  switch (meta.type) {
    case 'icon':
      return <IconWrapper>{meta.src}</IconWrapper>
    case 'svg':
      return <Image src={meta.src} alt={meta.alt} />
    default:
  }
}
const SocialMediaBar = props => (
  <ThemeContext.Consumer>
    {theme => (
      <IconContext.Provider value={{ color: theme.textColor, size: '2.2em' }}>
        <Wrapper>
          {props.items.map(item => (
            <GatsbyLink url={item.url}>{getContent(item.name)}</GatsbyLink>
          ))}
        </Wrapper>
      </IconContext.Provider>
    )}
  </ThemeContext.Consumer>
)

export default SocialMediaBar
