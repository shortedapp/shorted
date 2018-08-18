import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    flex-direction: column;
    max-width: ${props => (props.maxWidth ? props.maxWidth : 5000)}px;
    min-height: 280px;
    justify-content: center;
    background-image: ${props => `url(${props.background})`};
    opacity: ${props => props.opacity};
    transition: ${props => `opacity ${props.duration}ms ease-in-out`};
    background-repeat: no-repeat;
    background-position: bottom;
    background-size: cover;
`;
