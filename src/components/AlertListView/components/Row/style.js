import styled from 'styled-components';

export const duration = 500;
export const transitionStyles = {
    entering: {opacity: 0, Ypos: 500},
    entered: {opacity: 1, Ypos: 0},
    exited: {opacity: 0},
};

export const Wrapper = styled.div`
    background: white;
    width: 100%;
    margin: 5px;
    height: 100px;
`;
export const RowHeaderWrapper = styled.div``;