import styled from 'styled-components';

export const duration = 500;
export const transitionStyles = {
  entering: { opacity: 0, Ypos: -100},
  entered: { opacity: 1, Ypos: 0},
  exited: { opacity: 0}
};

export const HeroButtonWrapper = styled.a`
    width: 210px;
    height: 60px;
    display: flex;
    text-decoration:none;
    justify-content: center; /* align horizontal */
    align-items: center; /* align vertical */
    margin: 5px;
    border-radius: 30px;
    color: white;
    background: #282fc3;
    outline:0;
    font-size: 30px;
    font-family: "Avenir Next,Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
    font-weight: bold;
    background: linear-gradient(-135deg, #827D9F, #0F0646);
    &:hover {
        -webkit-box-shadow: -3px 4px 7px 0px rgba(0,0,0,0.75);
        -moz-box-shadow: -3px 4px 7px 0px rgba(0,0,0,0.75);
        box-shadow: -3px 4px 7px 0px rgba(0,0,0,0.75);
    }
`

export const Wrapper = styled.div`
    display: grid;
    grid-gap: 20px;
    grid-template-columns: 1fr 2fr;
    grid-template-areas:
        "hero-title hero-image";
    margin-right: 100px;
    margin-left: 100px;
    margin-top: 250px;
    opacity: ${props => props.opacity};
    transition: ${props => `${props.duration}ms ease-in-out`};
    transition-property: opacity, transform;
    transform: ${props => `translateY(${props.Ypos}px)`};
`

export const HeroWrapper = styled.div`
    grid-area: hero-image;
    width: 100%;
`
export const HeroTitleWrapper = styled.div`
    grid-area: hero-title;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 600px 140px 100px;
    grid-template-areas:
        "hero-title"
        "hero-description"
        "hero-button";

    .hero-title {
        margin-top: 450px;
        display: flex;
        flex-direction: column;
        .header-1 {
            display: flex;
            flex-direction: column;
            text-align: center;
            justify-content: center;
            vertical-align: middle;
            grid-area: hero-title;
            float: left;
            font-size: 70px;
            font-weight: bold;
            font-family: Avenir Next,sans-serif;
        }
        .header-2 {
            display: flex;
            flex-direction: column;
            text-align: center;
            justify-content: center;
            vertical-align: middle;
            grid-area: hero-title;
            font-size: 75px;
            font-family: Avenir Next,sans-serif;
            font-weight: bold;
            color: #282fc3;
            float: left;
        }
    }
    .hero-description {
        margin-top: 30px;
        display: flex;
        flex-direction: column;
        grid-area: hero-description;
        font-weight: 300;
        font-size: 30px;
        font-family: Avenir Next,sans-serif;
    }
    .hero-button {
        gird-area: hero-button;
        display: flex;
        flex-direction: column;
        justify-content: center;
        vertical-align: middle;
    }
    .hero-button:hover {
        padding-bottom: 5px;
    }
`


