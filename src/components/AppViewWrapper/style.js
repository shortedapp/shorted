import styled from 'styled-components';

export const Wrapper = styled.div`
display: flex;
min-height: 280px;
justify-content: center;
background-image: ${props => `url(${props.background})`};
opacity: ${props => props.opacity};
transition: ${props => `opacity ${props.duration}ms ease-in-out`};
background-repeat: no-repeat;
background-position: bottom;
background-size: cover;
`