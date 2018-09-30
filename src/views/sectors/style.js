import styled from 'styled-components';

export const Wrapper = styled.div`
    display: grid;
    background: ${props => props.background};
    color: ${props => props.color};
    display: grid;
    grid-gap: 13px;
    grid-template-columns: repeat(2, 1fr) 800px;
    grid-template-rows: 600px 1fr;
    grid-template-areas:
        'sector-legend sector-legend sector-piechart'
        'sector-panel sector-panel sector-panel';
`;

export const duration = 300;

export const transitionStyles = {
    entering: {opacity: 0},
    entered: {opacity: 1},
    exited: {opacity: 0},
};

export const SectorLegendWrapper = styled.div`
    grid-area: sector-legend;
`;
export const SectorPieChartWrapper = styled.div`
    grid-area: sector-piechart;
`;
export const SectorPanelWrapper = styled.div`
    grid-area: sector-panel;
`;
