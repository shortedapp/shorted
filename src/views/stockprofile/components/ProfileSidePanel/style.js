import styled from 'styled-components'

export const Wrapper = styled.div`
    justify-content: center;
    text-align: center;
    vertical-align: middle;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    margin-left: 20px;
    margin-top: 40px;
    color: ${props => props.color};
    height: 100%;
    display: grid;
    grid-gap: 10px;
    grid-template-rows: 70px 70px 50px 70px 50px;
    grid-template-columns: 1fr;
    grid-template-areas:
        'sector'
        'stock-description'
        'se'
        'asx-link'
        'stock-website';
`

export const ProfileSector = styled.div`
    grid-area: sector;
    display: grid;
    justify-self: center;
    text-align: center;
    align-content: center;
    align-self: center;
    width: 100%;
    height: 100%;
    grid-template-columns: 1fr;
    grid-template-rows: 20px 1fr;
    grid-template-areas:
        'title'
        'text';
    .title {
        grid-area: title;
        display: flex;
        align-items: center;
        justify-content: center;
        .icon {

        }
        .text {
            font-size: 15px;
            padding: 5px;
        }
    }
    .text {
        grid-area: text;
        font-size: 30px;
        font-family: Avenir Next, sans-serif;
        font-weight: bold;
    }

`
export const ProfileASXLink = styled.div`
    grid-area: asx-link;
    
`
export const ProfileYahooLink = styled.div`
    
`
export const ProfileDescription = styled.div`
    grid-area: stock-description;
    
`
export const StockEquityWrapper = styled.div`
    display: grid;
    grid-area: se;
    justify-self: center;
    text-align: center;
    align-content: center;
    align-self: center;
    width: 100%;
    height: 100%;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
    grid-template-areas:
        'pe mc';
`;
export const ProfilePE = styled.div`
    grid-area: pe;
    display: grid;
    justify-self: center;
    text-align: center;
    align-content: center;
    align-self: center;
    height: 60px;
    width: 70px;
    grid-template-columns: 1fr;
    grid-template-rows: 20px 1fr;
    grid-template-areas:
        'title'
        'value';
    .title {
        grid-area: title;
        text-align: left;
        font-family: Avenir Next, sans-serif;
        font-weight: bold;
    }
    .value {
        grid-area: value;
        font-family: Avenir Next, sans-serif;
    }
    
`
export const ProfileMarketCap = styled.div`
    grid-area: mc;
    display: grid;
    justify-self: center;
    text-align: center;
    align-content: center;
    align-self: center;
    height: 60px;
    width: 70px;
    grid-template-columns: 1fr;
    grid-template-rows: 20px 1fr;
    grid-template-areas:
        'title'
        'value';
    .title {
        grid-area: title;
        text-align: left;
        font-family: Avenir Next, sans-serif;
        font-weight: bold;
    }
    .value {
        grid-area: value;
        font-family: Avenir Next, sans-serif;
    }
    
`
export const ProfileStockWebsite = styled.div`
    grid-area: stock-website;

`
