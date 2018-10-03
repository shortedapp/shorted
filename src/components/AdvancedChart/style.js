import styled from 'styled-components';

export const Wrapper = styled.div`
    display: grid;
    grid-gap: 5px;
    padding: 10px;
    max-width: 965px;
    height: 100%;
    grid-template-rows: 40px 1fr;
    grid-template-columns: 1fr 40px;
    grid-template-areas:
        'chart-window chart-options'
        'chart chart';
`;

export const duration = 300;

export const transitionStyles = {
    entering: {opacity: 0},
    entered: {opacity: 1},
    exited: {opacity: 0},
};

export const WindowWrapper = styled.div`
    grid-area: chart-window;
`;

export const OptionsWrapper = styled.div`
    grid-area: chart-options;
`;

export const ChartWrapper = styled.div`
    grid-area: chart;
`;
