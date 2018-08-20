import React from 'react';
// import LogoImage from '../../assets/images/logo.svg'
import {Wrapper, LogoTextWrapper} from './style';
import {runInThisContext} from 'vm';
/**
 * Renders a shorted.com.au logo and stylised layout
 */
const LogoSvg = props => (
    <svg
        width={props.collapsed ? '80' : '117'}
        height={props.collapsed ? '60' : '80'}
        viewBox="0 0 117 98"
        fill={props.fill}
        xmlns="http://www.w3.org/2000/svg">
        <path
            d="M99.6329 0C116.928 36.6404 95.3979 104.487 77.7588 81.2665C27.049 14.5109 42.0704 93.1702 0 79.8191"
            transform="translate(114 4) scale(-1 1)"
            stroke={props.stroke}
            strokeWidth="15"
        />
    </svg>
);
const Logo = props => (
    <Wrapper {...props.theme} href="/">
        <LogoSvg
            collapsed={props.collapsed}
            fill="none"
            stroke={props.theme ? props.theme.stroke : 'gray'}
        />
        {props.collapsed ? null : (
            <LogoTextWrapper {...props.theme}>shorted</LogoTextWrapper>
        )}
    </Wrapper>
);

export default Logo;
