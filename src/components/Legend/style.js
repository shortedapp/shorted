import styled from 'styled-components';


export const Wrapper = styled.div`
    border-radius: 4px;
    grid-area: legend;
    display: grid;
    grid-gap: 10px;
    grid-template-rows: 80px 60px 170px 1fr;
    grid-template-columns: repeat(2, 1fr);
    grid-template-areas:
        "company-header company-header"
        "company-name company-name"
        "company-mc company-mc"
        "todo todo";
`
export const UnselectedWrapper = styled.div`
    grid-area: legend;
    display: flex;
    flex-direction: column;
    vertical-align: middle;
    justify-content: center;
    text-align: center;
    background: white;
    border-radius: 4px;
    height: 100%;
    font-family: Avenir Next,sans-serif;
    font-size: 30px;
    font-weight: bold;
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

