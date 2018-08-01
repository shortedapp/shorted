import styled from 'styled-components';

export const Wrapper = styled.div`
display: flex;
width: 100%;
justify-content: center;
background-image: ${props => `url(${props.background})`};
background-repeat: no-repeat;
-webkit-background-size: cover;
-moz-background-size: cover;
-o-background-size: cover;
background-size: cover;
margin-left: auto;
margin-right: auto;
`