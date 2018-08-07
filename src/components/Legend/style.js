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
    padding-left: 30px;
    padding-right: 30px;
`
export const CompanyHeader = styled.div`
    display: flex;
    flex-direction: column;
    vertical-align: middle;
    justify-content: center;
    grid-area: company-header;
`
export const CompanyMarketCap = styled.div`
    grid-area: company-mc;
    display: flex;
    flex-direction: column;
    vertical-align: middle;


`
export const CompanyName = styled.div`
    grid-area: company-name;
    display: flex;
    background: white;
    font-size: 1.3vh;
    font-weight: bold;
    font-family: Avenir Next,sans-serif;
    text-align: center;
    flex-direction: column;
    vertical-align: middle;
    justify-content: center;
`

