import styled from 'styled-components';

export const Wrapper = styled.div`
display: flex;
min-height: 280px;
width: 100%;
justify-content: center;
background-image: ${props => `url(${props.background})`};
opacity: ${props => props.opacity};
transition: ${props => `opacity ${props.duration}ms ease-in-out`};
background-repeat: no-repeat;
background-size: cover;
height: 0;
padding: 0; /* reset */
padding-bottom: calc(100% * 600/ 1440);
`