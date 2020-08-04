import styled from 'styled-components';

export const duration = 500;
export const transitionStyles = {
    entering: {opacity: 0, Ypos: 500},
    entered: {opacity: 1, Ypos: 0},
    exited: {opacity: 0},
};
export const Wrapper = styled.div`
    border-radius: 5px;
    border: 1px solid ${props => props.widgetBorderColor};
    opacity: ${props => props.opacity};
    transition: ${props => `${props.duration}ms ease-in-out`};
    transition-property: opacity, transform;
    transform: ${props => `translateY(${props.Ypos}px)`};
    background: ${props => props.widgetBackgroundColor};
    display: grid;
    grid-template-rows: 45px 40px 1fr 60px;
    grid-template-areas:
        'header'
        'header-names'
        'rows'
        'more';
    float: left;
    vertical-align: middle;
    flex-direction: column;
    text-align: center;
    grid-area: top-alerts;
    height: 100%;
`;
export const Header = styled.div`
    grid-area: header;
    font-size: 22px;
    margin-top: 10px;
    font-family: Avenir Next, sans-serif;
    font-weight: bold;
`;
export const HeaderRow = styled.div`
    grid-area: header-names;
`;
export const More = styled.div`
    grid-area: more;
    height: 50px;
    display: flex;
    flex-direction: column;
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
    &:hover {
        transform: scale(1.02);
    }
`;
export const Rows = styled.div`
    grid-area: rows;
    display: flex;
    flex-direction: column;
`;
