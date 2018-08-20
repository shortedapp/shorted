import styled from 'styled-components';

export const Wrapper = styled.div`
    background: ${props => props.background};
    height: 100%;
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
`;
export const Header = styled.div`
    color: ${props => props.color};
    font-weight: bold;
    font-size: 20px;
    font-family: Avenir Next, sans-serif;
`;
export const SwitchWrapper = styled.div`
    margin-top: 10px;
    margin-bottom: 10px;
    width: 60px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;
