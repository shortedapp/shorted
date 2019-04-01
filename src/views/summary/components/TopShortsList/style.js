import styled from 'styled-components';

export const duration = 500;
export const transitionStyles = {
    entering: {opacity: 0, Ypos: 500},
    entered: {opacity: 1, Ypos: 0},
    exited: {opacity: 0},
};

export const Wrapper = styled.div`
    grid-area: top-list;
    background: ${props => props.widgetBackgroundColor};
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    border: 1px solid ${props => props.widgetBorderColor};
    opacity: ${props => props.opacity};
    transition: ${props => `${props.duration}ms ease-in-out`};
    transition-property: opacity, transform;
    transform: ${props => `translateY(${props.Ypos}px)`};
    font-family: Avenir Next, sans-serif;
    max-height: 400px;
    overflow: scroll;
`;
export const Header = styled.div`
    margin-top: 10px;
    height: 30px;
    text-align: center;
    font-size: 22px;
    font-weight: bold;
`;
export const More = styled.div`
    height: 50px;
    text-align: center;
    font-size: 22px;
    font-weight: bold;
    background: ${props => props.widgetRowBackgroundColor};
    border: 1px solid ${props => props.widgetRowBorderColor};
    border-radius: 0 0 5px 5px;
    margin: 4px;
    justify-content: center;
    display: flex;
    flex-direction: column;
    text-align: center;
`;
