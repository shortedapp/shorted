import styled from 'styled-components';

export const Wrapper = styled.div`
display: flex;
width: 100%;
justify-content: center;
background-image: ${props => `url(${props.background})`};
opacity: ${props => props.opacity};
transition: ${props => `opacity ${props.duration}ms ease-in-out`};
background-repeat: no-repeat;
-webkit-background-size: cover;
-moz-background-size: cover;
-o-background-size: cover;
background-size: cover;
margin: -7px;
`