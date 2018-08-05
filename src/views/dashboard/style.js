import styled from 'styled-components';


export const DashboardWrapper = styled.div`
    display: grid;
    justify-content: center;
    .content {
        margin-top: 30px;
        display: grid;
        max-width: 1700px;
        grid-gap: 20px;
        grid-template-columns: repeat(4, 1fr);
        grid-template-areas:
        "top-list top-graph top-graph top-legend"
        "top-list top-graph top-graph top-alerts"
    }
    
`