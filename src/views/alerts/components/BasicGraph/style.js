import styled from 'styled-components';

export const Wrapper = styled.div`
    grid-area: graph;
    background: transparent;
    border-radius: 5px;
    display: grid;
    grid-template-rows: 20px 120px;
    grid-template-areas:
        'header'
        'chart';
`;
export const Header = styled.div`
    grid-area: header;
    padding-top: 3px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
`;
export const Chart = styled.div`
    grid-area: chart;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    height: 150px;
`;
