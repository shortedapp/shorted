import styled from 'styled-components';

export const ProfileWrapper = styled.div`
    display: grid;
    grid-area: content;
    justify-content: center;
    max-width: 1300px;
    text-align: center;
    .content {
        margin-top: 30px;
        display: grid;
        grid-gap: 20px;
        width: 1300px;
        height: 1200px;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: 1fr 1fr 1fr 1fr;
        grid-template-areas:
            'profile-header profile-header profile-header'
            'profile-chart profile-chart profile-side-panel'
            'profile-chart profile-chart profile-side-panel'
            'profile-alerts profile-alerts profile-side-panel';
    }
`;

export const ProfileViewWrapper = styled.div`
display: grid;
justify-content: center;
background: ${props => props.background};
grid-template-rows: 100px 1fr;
grid-template-areas:
        'logo top-nav'
        'content content';
`;

export const ProfileViewHeader = styled.div`
    grid-area: top-nav;
`;
export const LogoWrapper = styled.div`
    grid-area: logo;
    max-width: 100px;
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

export const ProfileHeaderWrapper = styled.div`
    grid-area: profile-header;
`;

export const ProfileChartWrapper = styled.div`
    grid-area: profile-chart;

`;

export const ProfileAlertsWrapper = styled.div`
    grid-area: profile-alerts;

`;

export const ProfileSidePanelWrapper = styled.div`
    grid-area: profile-side-panel;
`;  


