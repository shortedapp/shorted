import styled from 'styled-components';

export const duration = 500;
export const transitionStyles = {
    entering: {opacity: 0, Ypos: -100},
    entered: {opacity: 1, Ypos: 0},
    exited: {opacity: 0},
};

export const Wrapper = styled.div`
    display: -webkit-flex;
    display: -ms-flex;
    display: flex;
    justify-content: center;
    -ms-align-items: center;
    align-items: center;
    background: white;
    width: 130px;
    height: 130px;
    border-radius: 130px;
    border: 3px solid gray;
    -webkit-box-shadow: inset 0px 0px 2px 3px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: inset 0px 0px 2px 3px rgba(0, 0, 0, 0.75);
    box-shadow: inset 0px 0px 2px 3px rgba(0, 0, 0, 0.75);
    /* iPads (landscape) ----------- */
    @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: landscape) {
        width: 70px;
        height: 70px;
    }
    /* small Desktops and laptops ----------- */
    @media only screen and (min-width: 1024px) {
        width: 100px;
        height: 100px;
    }
    /* Desktops and laptops ----------- */
    @media only screen and (min-width: 1224px) {
        width: 130px;
        height: 130px;
    }
`;

export const Img = styled.img`
    width: 70px;
    height: 70px;
    /* iPads (landscape) ----------- */
    @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: landscape) {
        width: 50px;
        height: 50px;
    }
    /* small Desktops and laptops ----------- */
    @media only screen and (min-width: 1024px) {
        width: 60px;
        height: 60px;
    }
    /* Desktops and laptops ----------- */
    @media only screen and (min-width: 1224px) {
        width: 80px;
        height: 80px;
    }
`;
