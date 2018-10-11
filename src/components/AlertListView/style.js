import styled from 'styled-components';

export const duration = 500;
export const transitionStyles = {
    entering: {opacity: 0, Ypos: 500},
    entered: {opacity: 1, Ypos: 0},
    exited: {opacity: 0},
};
export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
`;
export const EmptyList = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    align-self: center;
    justify-content: center;
`;

export const RowWrapper = styled.div``;
export const RowHeaderWrapper = styled.div``;