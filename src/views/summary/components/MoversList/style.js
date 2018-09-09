import styled from 'styled-components';

export const duration = 500;
export const transitionStyles = {
    entering: {opacity: 0, Ypos: 500},
    entered: {opacity: 1, Ypos: 0},
    exited: {opacity: 0},
};

export const Wrapper = styled.div`
    height: 100%;
    grid-area: top-movers;
    background: ${props => props.widgetBackgroundColor};
    border: 1px solid ${props => props.widgetBorderColor};
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    opacity: ${props => props.opacity};
    transition: ${props => `${props.duration}ms ease-in-out`};
    transition-property: opacity, transform;
    transform: ${props => `translateY(${props.Ypos}px)`};
`;
export const Header = styled.div`
    margin-top: 10px;
    display: flex;
    height: 33px;
    flex-direction: column;
    text-align: center;
    font-size: 22px;
    font-weight: bold;
    font-family: Avenir Next, sans-serif;
`;
export const More = styled.div`
    height: 50px;
    text-align: center;
    font-size: 22px;
    font-weight: bold;
    background: ${props => props.widgetRowBackgroundColor};
    border: 1px solid ${props => props.widgetRowBorderColor};
    border-radius: 0 0 5px 5px;
    margin: 2px;
    margin-left: 7px;
    margin-right: 7px;
    justify-content: center;
    font-family: Avenir Next, sans-serif;
    display: flex;
    flex-direction: column;
    text-align: center;
`;
