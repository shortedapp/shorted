import styled from 'styled-components';

export const duration = 500;
export const transitionStyles = {
    entering: { opacity: 0, Ypos: 500},
    entered: { opacity: 1, Ypos: 0},
    exited: { opacity: 0}
};
export const Wrapper = styled.div`
    opacity: ${props => props.opacity};
    transition: ${props => `${props.duration}ms ease-in-out`};
    transition-property: opacity, transform;
    transform: ${props => `translateY(${props.Ypos}px)`};
    background: white;
    display: flex;
    float: left;
    vertical-align: middle;
    flex-direction: column;
    text-align: center;
    grid-area: top-alerts;
`
export const Header = styled.div`
    font-size: 30px;
    font-family: Avenir Next,sans-serif;
    font-weight: bold;

`