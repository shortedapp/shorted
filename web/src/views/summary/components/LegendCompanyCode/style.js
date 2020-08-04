import styled from 'styled-components';

export const Wrapper = styled.div`
    background: ${props => props.widgetBackgroundColor};
    color: ${props => props.textColor};
    border: 1px solid ${props => props.widgetRowBorderColor};
    grid-area: company-code;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    vertical-align: middle;
    text-align: center;
`;

export const Code = styled.div`
    background: ${props => props.widgetBackgroundColor};
    color: ${props => props.textColor};
    flex-direction: column;
    justify-content: center;
    vertical-align: middle;
    text-align: center;
    font-size: 15px;
    font-weight: 600;
    font-family: Avenir Next, sans-serif;
`;
export const Header = styled.div`
    background: ${props => props.widgetBackgroundColor};
    color: ${props => props.textColor};
    flex-direction: column;
    justify-content: center;
    vertical-align: middle;
    text-align: center;
    font-size: 11px;
    font-weight: bold;
    font-family: Avenir Next, sans-serif;
`;
