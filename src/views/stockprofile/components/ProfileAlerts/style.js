import styled from 'styled-components';

export const Wrapper = styled.div`
    text-align: center;
    vertical-align: top;
    display: grid;
    flex-direction: column;
    background: ${props => props.profileGraphWidgetBackground};
    width: 100%;
    border-radius: 10px;
    grid-gap: 5px;
    grid-template-rows: 30px 1fr;
    grid-template-columns: 1fr;
    grid-template-areas:
        'header'
        'results';
`;

export const Header = styled.div`
    grid-area: header;
    color: ${props => props.color};
    font-size: 30px;
    font-family: Avenir Next, sans-serif;
`;
export const Results = styled.div`
    grid-area: results;
    display: flex;
    flex-direction: column;
    background: transparent;
    margin: 20px;
`;
