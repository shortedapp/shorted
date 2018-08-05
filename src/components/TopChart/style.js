import styled from 'styled-components';
export const duration = 500;
export const transitionStyles = {
  entering: { opacity: 0, Ypos: 500},
  entered: { opacity: 1, Ypos: 0},
  exited: { opacity: 0}
};

export const Wrapper = styled.div`
    grid-area: top-graph;
    opacity: ${props => props.opacity};
    transition: ${props => `${props.duration}ms ease-in-out`};
    transition-property: opacity, transform;
    transform: ${props => `translateY(${props.Ypos}px)`};
    max-width: 1200px;
    height: 800px;
    background-color: white;
    border-radius: 30px;
    border: 1px solid black;
`
export const PickerWrapper = styled.div`
`