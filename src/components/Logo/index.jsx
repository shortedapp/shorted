import React from 'react';
import LogoImage from '../../assets/images/logo.svg'
import { Wrapper, LogoTextWrapper, LogoImageWrapper } from './style';
/**
 * Renders a shorted.com.au logo and stylised layout
 */
const LogoSvg = (props) => (
    <svg width="117" height="98" viewBox="0 0 117 98" fill={props.fill} xmlns="http://www.w3.org/2000/svg">
<path d="M99.6329 0C116.928 36.6404 95.3979 104.487 77.7588 81.2665C27.049 14.5109 42.0704 93.1702 0 79.8191" transform="translate(114 4) scale(-1 1)" stroke={props.stroke} stroke-width="15"/>
</svg>
)
const Logo = (props) => (
    <Wrapper>
        <LogoSvg fill="none" stroke="#e7e6ea"/>
        <LogoTextWrapper>shorted</LogoTextWrapper>
    </Wrapper>
)

export default Logo;