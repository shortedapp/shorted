import styled from 'styled-components';


export const DashboardWrapper = styled.div`
    display: grid;
    justify-content: center;
    .content {
        margin-top: 30px;
        display: grid;
        max-width: 1900px;
        grid-gap: 20px;
        grid-template-columns: repeat(4, 1fr);
        grid-template-areas:
            "top-list top-graph top-graph top-right"
            "top-list top-graph top-graph top-alerts"
            "top-list top-graph top-graph top-alerts"
    }
    .top-right {
        grid-area: top-right;
        display: grid;
        grid-gap: 10px;
        grid-template-rows: repeat(4, 80px);
        grid-template-columns: 1fr;
        grid-template-areas:
            "themepicker"
            "legend"
            "legend"
            "legend"
            "legend"
    }
    
`