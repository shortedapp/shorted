import styled from 'styled-components';

export const duration = 500;
export const transitionStyles = {
    entering: {opacity: 0, Ypos: -100},
    entered: {opacity: 1, Ypos: 0},
    exited: {opacity: 0},
};

export const Wrapper = styled.div`
    display: -webkit-flex;
    display: -ms-flex;
    display: flex;
    justify-content: center;
    -ms-align-items: center;
    align-items: center;
    background: white;
    width: 130px;
    height: 130px;
    border-radius: 130px;
    border: 3px solid gray;
    -webkit-box-shadow: inset 0px 0px 2px 3px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: inset 0px 0px 2px 3px rgba(0, 0, 0, 0.75);
    box-shadow: inset 0px 0px 2px 3px rgba(0, 0, 0, 0.75);
`;
