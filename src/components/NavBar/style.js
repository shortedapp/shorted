import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    align-items: flex-end;
`;

export const ButtonsWrapper = styled.div`
    justify-content: space-between;
    text-align: center;
    display: flex;
    flex-direction: row;
    float: right;
`;

export const HamburgerWrapper = styled.div``;

export const NavButton = styled.a`
    background: rgba(0, 0, 0, 0.3);
    color: white;
    border-radius: 30px;
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    height: 36px;
    width: 120px;
    margin-right: 15px;
    margin-left: 15px;
    text-decoration: none;
    font-family: Avenir Next, sans-serif;
    font-size: 16px;
`;
