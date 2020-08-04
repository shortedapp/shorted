import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    border-radius: 3px;
    flex-direction: column;
    text-align: center;
    vertical-align: middle;
    justify-content: center;
    background: ${props => props.widgetBackgroundColor};
    color: ${props => props.textColor};
    border: 1px solid ${props => props.widgetRowBorderColor};
    grid-area: company-pe;
`;

export const PE = styled.div`
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
