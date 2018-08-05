import styled from 'styled-components';


export const Wrapper = styled.div`
    background: white;
    border-radius: 30px;
    display: block;
    float: left;
    verticle-align: middle;
    flex-direction: row;
    justify-content: center;
    text-align: center;
    grid-area: themepicker;
`
export const Header = styled.div`
    font-weight: bold;
    font-size: 20px;
    font-family: Avenir Next,sans-serif;
`
export const ThemeItemWrapper = styled.div`
    font-weight: bold;
    font-size: 25px;
    font-family: Avenir Next,sans-serif;
    background-color: ${props => props.backgroundColor};
    color: ${props => props.textColor};
    margin: 7px;
    border-radius: 20px;
    border: solid 1px black;
    width: 100px;
    display: flex;
    flex-direction: row;
    justify-content:center;
    text-align: center;
`
export const ThemeItems = styled.div`
    display: flex;
    flex-direction: row;
    justify-content:center;
    text-align: center;
`