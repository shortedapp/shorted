import React from 'react';
import {Wrapper, LogoTextWrapper} from './style';
/**
 * Renders a shorted.com.au logo and stylised layout, has the ability to collapse when presented in a collapsable
 * menu layout
 */
const LogoSvg = props => (
    <div style={{ width: 70, height: 70, marginLeft: 10, marginTop: 10}}>
    <svg
            width={props.collapsed ? '80' : '90'}
            height={props.collapsed ? '60' : '140'}
            viewBox={props.collapsed ? "0 0 120 100" : "0 0 150 160"}
            fill={props.fill}
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M99.6329 0C116.928 36.6404 95.3979 104.487 77.7588 81.2665C27.049 14.5109 42.0704 93.1702 0 79.8191"
                transform="translate(114 4) scale(-1 1)"
                stroke={props.stroke}
                strokeWidth="15"
            />
        </svg>
    </div>
   
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
