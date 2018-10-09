import React from 'react';
import {IconContext} from 'react-icons';
import {ThemeContext} from 'src/theme-context';
import {contentMap} from './contentMap';
import {Wrapper, Image, IconWrapper} from './style';
import {OutboundLink} from 'gatsby-plugin-google-analytics';

const getContent = (name, theme) => {
    const meta = contentMap[name];
    console.log(theme);
    switch (meta.type) {
        case 'icon':
            return <IconWrapper>{meta.src}</IconWrapper>;
        case 'svg':
            if (theme.color === 'white') {
                return <Image src={meta.srcLight} alt={meta.alt} />;
            } else {
                return <Image src={meta.srcDark} alt={meta.alt} />;
            }
        default:
    }
};
const SocialMediaBar = props => (
    <ThemeContext.Consumer>
        {theme => (
            <IconContext.Provider
                value={{color: theme.profileSidePanelTextColor, size: '2.2em'}}>
                <Wrapper>
                    {props.items.map(item => (
                        <OutboundLink href={item.url}>
                            {getContent(item.name, theme)}
                        </OutboundLink>
                    ))}
                </Wrapper>
            </IconContext.Provider>
        )}
    </ThemeContext.Consumer>
);

export default SocialMediaBar;
