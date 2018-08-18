import styled from 'styled-components';

export const Wrapper = styled.div`
    grid-area: company-mc;
    background: white;
    display: grid;
    height: 180px;
    grid-template-rows: 30px 170px;
    grid-template-areas:
        'header'
        'chart';
`;
export const Header = styled.div`
    grid-area: header;
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
