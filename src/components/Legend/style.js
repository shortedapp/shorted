import styled from 'styled-components';


export const PWrapper = styled.div`
    verticle-align: middle;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    grid-area: legend;
    display: grid;
    grid-gap: 5px;
    grid-template-rows: 80px 60px 170px 1fr;
    grid-template-columns: repeat(2, 1fr);
    grid-template-areas:
        "company-header company-header"
        "company-name company-name"
        "company-mc company-mc"
        "todo todo";
`
export const CompanyHeader = styled.div`
    display: flex;
    flex-direction: column;
    vertical-align: middle;
    justify-content: center;
    background: gray;
    grid-area: company-header;
`
export const CompanyMarketCap = styled.div`
    display: flex;
    flex-direction: column;
    vertical-align: middle;
    background: gray;
    grid-area: company-mc;
`
export const CompanyName = styled.div`
    display: flex;
    background: gray;
    grid-area: company-name;
`

