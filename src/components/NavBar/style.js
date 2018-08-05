import styled from 'styled-components';

export const Wrapper = styled.div`
    grid-area: navbar;
    justify-content: center;
    text-align: center;
    verticle-align: middle;
    display: flex;
    flex-direction: row;
    float: right;
    margin-left: auto;
`
export const NavButton = styled.a`
    background: rgba(0,0,0,0.3);
    color: white;
    border-radius: 30px;
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    height: 40px;
    width: 160px;
    margin: 30px;
    text-decoration:none;
    font-family: Avenir Next,sans-serif;
    font-size: 25px;
`