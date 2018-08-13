import styled from 'styled-components';


export const StockProfileWrapper = styled.div`
    display: grid;
    justify-content: center;
    .content {
        margin-top: 30px;
        display: grid;
        max-width: 1900px;
        grid-gap: 20px;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: 130px 400px 1fr 1fr;
        grid-template-areas:
            "profile-header profile-header profile-header"
            "profile-chart profile-chart profile-side-panel"
            "profile-chart profile-chart profile-side-panel"
            "profile-alerts profile-alerts profile-side-panel"
    }
    .profile-side-panel {
        grid-area: profile-side-panel;
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

export const duration = 300;

export const transitionStyles = {
  entering: { opacity: 0 },
  entered: { opacity: 1 },
  exited: { opacity: 0}
};

export const themes = [
    {
        name: "dark",
        textColor: "#ffffff",
        backgroundColor: "#000000",
    },
    {
        name: "light",
        textColor: "#000000",
        backgroundColor: "#ffffff",
    }
]