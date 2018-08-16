import styled from 'styled-components'

export const Wrapper = styled.div`
    background: white;
    border-radius: 15px;
    display: block;
    float: left;
    vertical-align: middle;
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
    margin-bottom: ${props => (props.selected ? 10 : 7)}px;
    -webkit-box-shadow: ${props => (props.selected ? `-3px 4px 7px 0px rgba(0,0,0,0.75)` : `none`)};
    -moz-box-shadow: ${props => (props.selected ? `-3px 4px 7px 0px rgba(0,0,0,0.75)` : `none`)};
    box-shadow: ${props => (props.selected ? `-3px 4px 7px 0px rgba(0,0,0,0.75)` : `none`)};
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
