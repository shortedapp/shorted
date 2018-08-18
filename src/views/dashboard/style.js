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
        grid-template-rows: 400px 400px 1fr 1fr;
        grid-template-areas:
            'top-list top-graph top-graph top-right'
            'top-list top-graph top-graph todo'
            'top-list top-alerts top-alerts top-movers'
            'top-list top-alerts top-alerts top-movers';
    }
    .top-right {
        grid-area: top-right;
        display: grid;
        grid-gap: 10px;
        grid-template-rows: repeat(4, 85px);
        grid-template-columns: 1fr;
        grid-template-areas:
            'themepicker'
            'legend'
            'legend'
            'legend'
            'legend';
    }
`;

export const duration = 300;

export const transitionStyles = {
    entering: {opacity: 0},
    entered: {opacity: 1},
    exited: {opacity: 0},
};

export const themes = [
    {
        name: 'dark',
        textColor: '#ffffff',
        backgroundColor: '#000000',
    },
    {
        name: 'light',
        textColor: '#000000',
        backgroundColor: '#ffffff',
    },
];
