import styled from 'styled-components';

export const DashboardWrapper = styled.div`
    display: grid;
    background: ${props => props.background};
    color: ${props => props.color};
    .content {
        display: grid;
        grid-gap: 13px;
        grid-template-columns: repeat(4, 1fr);
        grid-template-rows: 400px 400px 1fr 1fr;
        grid-template-areas:
            'top-list top-graph top-graph top-right'
            'top-list top-graph top-graph todo'
            'top-list top-alerts top-alerts top-movers'
            'top-list top-alerts top-alerts top-movers';
    }
`;
export const Header = styled.div`
    font-family: Avenir Next, sans-serif;
    font-size: 40px;
    font-weight: bold;
`

export const duration = 300;

export const transitionStyles = {
    entering: {opacity: 0},
    entered: {opacity: 1},
    exited: {opacity: 0},
};
