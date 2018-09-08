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
`;
export const Header = styled.div`
    margin-top: 10px;
    margin-bottom: 10px;
    height: 30px;
    text-align: center;
    font-size: 22px;
    font-weight: bold;
    font-family: Avenir Next, sans-serif;
`;
export const More = styled.div`
    height: 30px;
    text-align: center;
    font-size: 22px;
    font-weight: bold;
    background: #dadada;
    border-radius: 0 0 15px 15px;
    margin: 4px;
    justify-content: center;
    font-family: Avenir Next, sans-serif;
`;
