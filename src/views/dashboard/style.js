import styled from 'styled-components';


export const DashboardWrapper = styled.div`
    display: grid;
    grid-gap: 20px;
    grid-template-columns: repeat(4, 1fr);
    grid-template-areas:
    "logo navbar navbar navbar"
    "top-list top-graph top-graph top-legend"
    "top-list top-graph top-graph top-alerts"
`