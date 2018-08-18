import styled from 'styled-components';

export const Wrapper = styled.a`
    display: grid;
    color: black;
    text-decoration: none !important;
    grid-template-columns: repeat(5, 1fr);
    grid-template-areas: 'code name name name percentage';
    margin: 4px;
    margin-left: 7px;
    margin-right: 4px;
    height: 65px;
    background: #dadada;
    border-radius: 0 30px 30px 0;
    padding-top: 4px;
    padding-bottom: 4px;
    margin-bottom: 4px;
    &:hover,
    &:visited,
    &:link,
    &:active {
        text-decoration: none !important;
        color: black;
    }
`;
export const WrapperHovered = styled.a`
    display: grid;
    color: black;
    text-decoration: none !important;
    z-index: 10;
    grid-template-columns: repeat(5, 1fr);
    grid-template-areas: 'code name name name percentage';
    margin: 4px;
    margin-left: 7px;
    margin-right: 4px;
    height: 65px;
    background: #dadada;
    border-radius: 0 15px 15px 0;
    padding-top: 4px;
    padding-bottom: 4px;
    margin-bottom: 6px;
    -webkit-box-shadow: -3px 4px 7px 0px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: -3px 4px 7px 0px rgba(0, 0, 0, 0.75);
    box-shadow: -3px 4px 7px 0px rgba(0, 0, 0, 0.75);
    &:hover,
    &:visited,
    &:link,
    &:active {
        text-decoration: none !important;
        color: black;
    }
`;

export const Name = styled.div`
    grid-area: name;
    display: flex;
    flex-direction: column;
    justify-content: center;
    vertical-align: middle;
    font-size: 18px;
`;

export const Code = styled.div`
    grid-area: code;
    display: flex;
    flex-direction: column;
    justify-content: center;
    vertical-align: middle;
    .code {
        background-color: gray;
        width: 60px;
        height: 45px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        vertical-align: middle;
        text-align: center;
        margin-left: 5px;
        font-size: 21px;
        font-weight: bold;
    }
`;

export const Percent = styled.div`
    grid-area: percentage;
    float: right;
    margin-left: auto;
    padding-right: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    vertical-align: middle;

    .circle {
        background: #f98080;
        height: 51px;
        width: 51px;
        border-radius: 50px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        vertical-align: middle;
        text-align: center;
        font-size: 12px;
        font-weight: 400;
    }
`;
