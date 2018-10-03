import styled from 'styled-components';

export const ProfileWrapper = styled.div`
    display: grid;
    grid-area: content;
    background: ${props => props.profileBackgroundColor};
    width: 100%;
    height: 100%;
    /* iPads (landscape) ----------- */
    @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: landscape) {
        .content {
            margin-top: 30px;
            display: grid;
            grid-gap: 20px;
            width: 100%;
            max-width: 1456px;
            height: 1200px;
            grid-template-columns: 350px repeat(4, 1fr) 100px;
            grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
            grid-template-areas:
                'profile-header profile-header profile-header profile-header profile-header profile-header'
                'profile-side-panel profile-chart profile-chart profile-chart profile-chart todo'
                'profile-side-panel profile-chart profile-chart profile-chart profile-chart todo'
                'profile-side-panel profile-chart profile-chart profile-chart profile-chart todo'
                'profile-side-panel profile-alerts profile-alerts profile-news profile-news todo'
                'profile-side-panel profile-alerts profile-alerts profile-news profile-news todo';
        }
    }
    /* small Desktops and laptops ----------- */
    @media only screen and (min-width: 1024px) {
        .content {
            margin-top: 30px;
            display: grid;
            grid-gap: 20px;
            width: 100%;

            height: 1200px;
            grid-template-columns: 350px repeat(4, 1fr) 100px;
            grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
            grid-template-areas:
                'profile-header profile-header profile-header profile-header profile-header profile-header'
                'profile-chart profile-chart profile-chart profile-chart profile-chart todo'
                'profile-chart profile-chart profile-chart profile-chart profile-chart todo'
                'profile-chart profile-chart profile-chart profile-chart profile-chart todo'
                'profile-side-panel profile-alerts profile-alerts profile-news profile-news todo'
                'profile-side-panel profile-alerts profile-alerts profile-news profile-news todo';
        }
    }
    /* Desktops and laptops ----------- */
    @media only screen and (min-width: 1224px) {
        .content {
            margin-top: 30px;
            display: grid;
            grid-gap: 20px;
            width: 100%;
            max-width: 1456px;
            height: 1200px;
            grid-template-columns: 350px repeat(4, 1fr) 100px;
            grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
            grid-template-areas:
                'profile-header profile-header profile-header profile-header profile-header profile-header'
                'profile-side-panel profile-chart profile-chart profile-chart profile-chart todo'
                'profile-side-panel profile-chart profile-chart profile-chart profile-chart todo'
                'profile-side-panel profile-chart profile-chart profile-chart profile-chart todo'
                'profile-side-panel profile-alerts profile-alerts profile-news profile-news todo'
                'profile-side-panel profile-alerts profile-alerts profile-news profile-news todo';
        }
    }
`;

export const ThemeWrapper = styled.div`
    grid-area: theme;
    color: ${props => props.textColor};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
export const ProfileViewWrapper = styled.div`
    display: grid;
    width: 100%;
    justify-content: center;
    background: ${props => props.profileBackgroundColor};
    grid-template-rows: 100px 1fr;
    grid-template-columns: 250px 1fr 200px;
    grid-template-areas:
        'logo top-nav theme'
        'content content content';
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
    width: 100%;
    background: ${props => props.profileHeaderBackgroundColor};
`;

export const ProfileChartWrapper = styled.div`
    grid-area: profile-chart;
    position: relative;
    top: -160px;
`;

export const ProfileAlertsWrapper = styled.div`
    grid-area: profile-alerts;
    position: relative;
    top: -160px;
    height: calc(100% + 160px);
`;
export const ProfileNewsWrapper = styled.div`
    grid-area: profile-news;
    position: relative;
    top: -160px;
    height: calc(100% + 160px);
`;

export const ProfileSidePanelWrapper = styled.div`
    grid-area: profile-side-panel;
    height: calc(100% - 40px);
`;
