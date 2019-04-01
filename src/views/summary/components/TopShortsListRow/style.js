import styled from 'styled-components';

export const WrapperHeader = styled.div`
    display: grid;
    color: ${props => props.textColor};
    background: ${props => props.widgetRowBackgroundColor};
    @media only screen and (max-width: 600px) {
        grid-template-columns: repeat(3, 1fr);
        grid-template-areas: 'code name percentage';
    } 

    /* Small devices (portrait tablets and large phones, 600px and up) */
    @media only screen and (min-width: 600px) {
        grid-template-columns: 100px repeat(2, 1fr);
        grid-template-areas: 'code name percentage';
    } 

    /* Medium devices (landscape tablets, 768px and up) */
    @media only screen and (min-width: 768px) {
        grid-template-columns: repeat(5, 1fr);
        grid-template-areas: 'code name name name percentage'; 
    } 

    /* Large devices (laptops/desktops, 992px and up) */
    @media only screen and (min-width: 992px) {
        grid-template-columns: repeat(5, 1fr);
        grid-template-areas: 'code name name name percentage';

    }

    /* Extra large devices (large laptops and desktops, 1200px and up) */
    @media only screen and (min-width: 1200px) {
        grid-template-columns: repeat(5, 1fr);
        grid-template-areas: 'code name name name percentage';

    }
    margin: 4px;
    height: 40px;
    margin-bottom: 0px;
    align-items: center;
    font-size: 20px;
    font-style: italic;
    font-weight: 300;
    .code {
        grid-area: code;
        text-align: center;
        width: 60px;
    }
    .company-name {
        grid-area: name;
        margin-right: 30px;
    }
    .percentage {
        grid-area: percentage;
        padding-right: 35px;
        text-align: right;
    }
`;
export const Wrapper = styled.a`
    display: grid;
    z-index: 0;
    position: relative;
    color: ${props => props.textColor};
    background: ${props => props.widgetRowBackgroundColor};
    border: 1px solid ${props => props.widgetRowBorderColor};
    text-decoration: none !important;
    /* Extra small devices (phones, 600px and down) */
    @media only screen and (max-width: 600px) {
        grid-template-columns: repeat(3, 1fr);
        grid-template-areas: 'code name percentage';
    } 

    /* Small devices (portrait tablets and large phones, 600px and up) */
    @media only screen and (min-width: 600px) {
        grid-template-columns: 100px repeat(2, 1fr);
        grid-template-areas: 'code name percentage';
    } 

    /* Medium devices (landscape tablets, 768px and up) */
    @media only screen and (min-width: 768px) {
        grid-template-columns: repeat(5, 1fr);
        grid-template-areas: 'code name name name percentage'; 
    } 

    /* Large devices (laptops/desktops, 992px and up) */
    @media only screen and (min-width: 992px) {
        grid-template-columns: repeat(5, 1fr);
        grid-template-areas: 'code name name name percentage';

    }

    /* Extra large devices (large laptops and desktops, 1200px and up) */
    @media only screen and (min-width: 1200px) {
        grid-template-columns: repeat(5, 1fr);
        grid-template-areas: 'code name name name percentage';

    }
    margin: 4px;
    height: 100%;
    border-radius: 0 30px 30px 0;
    &:hover,
    &:visited,
    &:link,
    &:active {
        text-decoration: none !important;
        color: ${props => props.textColor};
    }
    align-items: center;
`;
export const WrapperHovered = styled.a`
    display: grid;
    position: relative;
    color: ${props => props.textColor};
    background: ${props => props.widgetRowBackgroundColor};
    border: 1px solid ${props => props.widgetRowBorderColor};
    text-decoration: none !important;
    z-index: 10;
    grid-template-columns: repeat(5, 1fr);
    grid-template-areas: 'code name name name percentage';
    margin: 4px;
    height: 100%;
    border-radius: 0 30px 30px 0;
    transform: scale(1.01);
    transition-duration: 0.1s;
    -webkit-box-shadow: -3px 4px 7px 0px rgba(0, 0, 0, 0.25);
    -moz-box-shadow: -3px 4px 7px 0px rgba(0, 0, 0, 0.25);
    box-shadow: -3px 4px 7px 0px rgba(0, 0, 0, 0.25);
    &:hover,
    &:visited,
    &:link,
    &:active {
        text-decoration: none !important;
        color: ${props => props.textColor};
    }
    align-items: center;
`;

export const Name = styled.div`
    grid-area: name;
    display: inline-block;
    vertical-align: middle;
    flex-wrap: wrap;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    vertical-align: middle;
    font-size: 14px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    min-width: 0;
    margin-right: 30px;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
`;

export const Code = styled.div`
    grid-area: code;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .code {
        width: 60px;
        height: 45px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        vertical-align: middle;
        text-align: center;
        font-size: 21px;
        font-weight: bold;
    }
`;

export const Percent = styled.div`
    grid-area: percentage;
    margin-left: auto;
    padding-right: 8px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    vertical-align: middle;

    .circle {
        background: #f98080;
        height: 100%;
        padding: 4px;
        width: 70px;
        border-radius: 10px 50px 50px 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        vertical-align: middle;
        text-align: center;
        font-size: 16px;
        font-weight: 400;
    }
`;
