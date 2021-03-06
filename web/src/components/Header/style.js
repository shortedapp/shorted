import styled from 'styled-components';

export const duration = 500;
export const transitionStyles = {
    entering: {opacity: 0, Ypos: -100},
    entered: {opacity: 1, Ypos: 0},
    exited: {opacity: 0},
};

export const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    opacity: ${props => props.opacity};
    transition: ${props => `${props.duration}ms ease-in-out`};
    transition-property: opacity, transform;
    transform: ${props => `translateY(${props.Ypos}px)`};
`;
