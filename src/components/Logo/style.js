import styled from 'styled-components';

export const LogoImageWrapper = styled.img`
    fill: #e7e6ea;
`;
export const Wrapper = styled.a`
    display: flex;
    float: left;
    text-decoration: none !important;
    color: ${props => props.color};
    background: ${props => props.background};
`;
export const LogoTextWrapper = styled.span`
    display: flex;
    flex-direction: column-reverse;
    font-size: 25px;
    letter-spacing: 5px;
    margin-left: 5px;
    font-weight: bold;
    font-family: Avenir Next, sans-serif;
    color: ${props => (props.color ? props.color : 'gray')};
    background: ${props => props.background};
`;
