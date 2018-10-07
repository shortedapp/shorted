import styled from 'styled-components';

export const Wrapper = styled.div`
    display: grid;
    grid-gap: 5px;
    padding: 10px;
    /* max-width: 965px; */
    height: 100%;
    grid-template-rows: 10px 50px 1fr;
    grid-template-columns: 300px 1fr 40px;
    grid-template-areas:
        'selected-value chart-window chart-options'
        'selected-value chart-window chart-options'
        'chart chart chart';
`;

export const duration = 300;

export const transitionStyles = {
    entering: {opacity: 0},
    entered: {opacity: 1},
    exited: {opacity: 0},
};

export const WindowWrapper = styled.div`
    grid-area: chart-window;
    align-self: center;
`;

export const OptionsWrapper = styled.div`
    grid-area: chart-options;
    align-self: center;
`;

export const ChartWrapper = styled.div`
    grid-area: chart;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-self: center;
    align-content: center;
    text-align: center;
`;

export const SelectedValueWrapper = styled.div``;
